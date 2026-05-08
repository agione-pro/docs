# Managed Node Quick Deployment Guide

## 1 Document Overview

### 1.1 Key Terminology

| Term | Definition |
| --- | --- |
| Master Node | Kubernetes cluster control-plane node |
| Worker Node | Compute node hosting inference workloads (equipped with GPU/NPU) |
| etcd Node | Kubernetes metadata storage node |
| device-plugin | Kubernetes accelerator-card plugin that registers GPU/NPU resources with the scheduler |
| OFED | Mellanox InfiniBand/RoCE NIC driver suite |
| SR-IOV | Single Root I/O Virtualization, used for splitting RDMA NICs into virtual functions |
| Harbor | Enterprise-grade container image registry |
| MinIO | S3-compatible object storage service |

---

## 2 Node Environment Preparation

### 2.1 Operating System Initialization

#### 2.1.1 Common Initialization

The following initialization steps must be completed on every node (both Master and Worker):

- **Disable SELinux** (CentOS family): run `setenforce 0` and persist the change in `/etc/selinux/config`
- **Disable firewall** or open the required ports listed below: `systemctl disable --now firewalld` (decide according to the customer's security policy)
- **Disable swap**: `swapoff -a` and comment out the swap entries in `/etc/fstab`
- **Configure time synchronization (NTP)**: align time zone and clock across all nodes; pointing to the customer's internal NTP server is recommended
- **Configure DNS**: ensure all nodes can resolve internal domains (including `easzlab.io.local`)
- **Kernel parameters**: enable `net.bridge.bridge-nf-call-iptables=1` and `net.ipv4.ip_forward=1`

#### 2.1.2 Cleanup of Pre-existing Environments

If a node already has Docker, Kubernetes, or another container runtime deployed, cleanup must be performed only **after written authorization** from the customer:

```bash
# Stop and uninstall Docker
systemctl stop docker && systemctl disable docker
yum remove -y docker docker-* containerd     # or use apt remove

# Reset Kubernetes
kubeadm reset -f
rm -rf /etc/kubernetes /var/lib/etcd /var/lib/kubelet
rm -rf $HOME/.kube
```

A node reboot is recommended after cleanup.

### 2.2 Accelerator Card Driver Installation

#### 2.2.1 NVIDIA Drivers

- Download the official driver matching the GPU model (version 570 or later recommended): `NVIDIA-Linux-x86_64-570.xx.run`
- Installation command: `bash NVIDIA-Linux-x86_64-570.xx.run --silent --no-questions`
- Verification: `nvidia-smi` should list every GPU together with the driver version

#### 2.2.2 Huawei Ascend Drivers

- Install the CANN toolkit and Ascend NPU drivers (version must match Ascend 910B/910C)
- Verification: `npu-smi info` should display every NPU along with temperature and power draw

#### 2.2.3 Enflame / Biren Drivers

- Contact the vendor's technical support team to obtain the appropriate driver package
- After installation, validate using the vendor-provided utilities (e.g., Enflame `efsmi`, Biren `birsmi`)

### 2.3 RDMA NIC Driver Installation (Optional)

Configure only when the node is equipped with an RDMA network (RoCE or InfiniBand) and multi-host tensor parallelism needs to be enabled:

- Download the Mellanox OFED driver (MLNX_OFED-23.07-0.5.1.2 or later recommended)
- Installation command: `./mlnxofedinstall --add-kernel-support`
- Verification: `ibstat` should report port state as `Active`; `ibv_devinfo` should display the device list

### 2.4 Passwordless SSH Configuration

On the deployment node (the host that will run the cluster installer), passwordless SSH access must be established to every node in the cluster.

#### 2.4.1 When the root Password Is Known

```bash
# Run on the deployment node
ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa

# Run for each cluster node IP
ssh-copy-id root@192.168.1.3
ssh-copy-id root@192.168.1.4
ssh-copy-id root@192.168.1.5
ssh-copy-id root@192.168.1.6
```

#### 2.4.2 When the root Password Is Unknown

Create a sudo-privileged non-root user on every cluster node:

```bash
# Run on each cluster node
adduser powerone
passwd powerone

# Edit /etc/sudoers and add a passwordless sudo entry
echo 'powerone   ALL=(ALL)  NOPASSWD:ALL' >> /etc/sudoers
```

Then, on the deployment node:

```bash
ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa
ssh-copy-id powerone@192.168.1.3
ssh-copy-id powerone@192.168.1.4
# ... repeat for the remaining nodes
```

### 2.5 Network Connectivity Verification

After SSH key-based access is configured, perform an end-to-end network verification from the deployment node:

```bash
# Verify passwordless SSH login
for ip in 192.168.1.3 192.168.1.4 192.168.1.5 192.168.1.6; do
    ssh root@$ip "hostname && uname -a"
done

# Verify NTP time synchronization
for ip in 192.168.1.3 192.168.1.4 192.168.1.5 192.168.1.6; do
    ssh root@$ip "date"
done

# Verify management-network bandwidth (pick any pair of nodes)
# Node A: iperf3 -s
# Node B: iperf3 -c <A-IP> -t 30
```

---

## 3 Installation Package Preparation

### 3.1 Download and Extract

```bash
# 1. Download the latest installation package (link provided by the AGIOne team)
wget <install.tar.gz URL>

# 2. Extract
tar -xzf install.tar.gz
cd install/installer
```

### 3.2 Resource Package Preparation

Before initialization, download the architecture-matching `resource` bundle into the `installer` directory. The bundles are hosted under the `resources` directory of the Alibaba Cloud account `wanm`; the exact path and credentials are provided by the AGIOne team.

### 3.3 Initialize the Installation Package

Choose the initialization command that matches the target CPU architecture:

```bash
# x86_64 architecture
bash init-package x86_64

# arm64 architecture
bash init-package arm64
```

Initialization automatically unpacks the container images, configuration files, and binary toolchain. When it completes, a fully populated deployment toolkit is available under `installer/kubemore`.

---

## 4 Kubernetes Cluster Installation

### 4.1 Deployment Toolkit Setup

```bash
# 1. Copy the kubemore toolkit into the system directory
cp -r installer/kubemore /etc/kubemore

# 2. Switch to the working directory
cd /etc/kubemore

# 3. Inspect the install command help
./morecli install --help
```

### 4.2 Special Handling for Non-root Users

When the installer is executed by a non-root user (e.g., `powerone`), small modifications to the `prepare` role are required:

```bash
# Edit the file
vim /etc/kubemore/roles/prepare/tasks/main.yml
```

- Change line 41 from `when: "inventory_hostname == ansible_env.SSH_CLIENT.split(' ')[0]"` to:
  ```yaml
  when: 'inventory_hostname in ["<local IP>"]'
  ```
- Change line 48 from `line: " ansible_env.SSH_CLIENT.split(' ')[0]    easzlab.io.local"` to:
  ```yaml
  line: "<local IP>    easzlab.io.local"
  ```
- Replace the Ansible config: `cp ansible.cfg.not_root ansible.cfg`

### 4.3 Cluster Installation Command

#### 4.3.1 Standard Installation Example

```bash
./morecli install \
    --masters 192.168.1.3,192.168.1.4 \
    --etcd 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.5,192.168.1.6 \
    --xpu-mode nvidia \
    --xpu-type nvidia-a10080g \
    --kubelet-root-data /data/kubelet \
    --containerd-root-data /data/containerd
```

#### 4.3.2 Key Parameter Reference

| Parameter | Required | Description |
| --- | --- | --- |
| `--masters / -m` | ✔ | Comma-separated list of Master node IPs |
| `--etcds / -e` | ✔ | Comma-separated list of etcd node IPs; co-locating with Masters is recommended (≥ 3 nodes in production) |
| `--workers / -w` | ✔ | Comma-separated list of Worker node IPs |
| `--service-cidr` |   | Service CIDR; default `10.68.0.0/16` |
| `--cluster-cidr` |   | Pod CIDR; default `172.20.0.0/16` |
| `--password` |   | Unified password for all nodes (mandatory for non-root users) |
| `--ssh-user` |   | SSH login user; default `root` |
| `--ssh-port` |   | SSH port; default `22` |
| `--ntp-server` |   | NTP server address |
| `--port-range / -p` |   | NodePort range; default `30000-32767` |
| `--max-pods` |   | Maximum Pods per node; default `110` |
| `--exter-eip` |   | External elastic IP for the cluster (if any) |
| `--dns-domain / -d` |   | Cluster DNS domain; default `cluster.local` |
| `--xpu-mode` |   | Accelerator mode: `nvidia` / `ascend910` / `enflame`; applied only to Worker nodes |
| `--xpu-type` |   | Accelerator model; see the table below |
| `--kubelet-root-data` |   | kubelet data directory; default `/var/lib/kubelet`; **point to a data disk in production** |
| `--containerd-root-data` |   | containerd data directory; default `/var/lib/containerd`; **point to a data disk in production** |

#### 4.3.3 Accelerator Model Reference (`--xpu-type`)

| Vendor (`--xpu-mode`) | Available Models |
| --- | --- |
| nvidia | `nvidia-v10032g`, `nvidia-v10016g`, `nvidia-t4`, `nvidia-a10040g`, `nvidia-a10080g` |
| ascend910 | `ascend-910a`, `ascend-910b` |
| enflame | `enflame-s60` |

> For models that are not in the list above (such as H20, L20, or H200), please contact the AGIOne team for the latest parameter inventory.

### 4.4 Cluster Operations

#### 4.4.1 Add Nodes

After the cluster is online, additional nodes can be joined seamlessly:

```bash
./morecli add \
    --masters 192.168.1.3,192.168.1.4 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.7,192.168.1.8
```

#### 4.4.2 Remove Nodes

Use the following command to decommission failing nodes or scale the cluster down:

```bash
./morecli del \
    --masters 192.168.1.5,192.168.1.6 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.7,192.168.1.8
```

#### 4.4.3 Destroy the Cluster

For test environments or cluster rebuilds:

```bash
./morecli destroy
```

> ⚠️ This operation is irreversible and wipes all Kubernetes data. **Never run it directly in production.**

### 4.5 Post-installation Verification

Validate the cluster's health after installation completes:

```bash
# 1. Node status
kubectl get nodes -o wide

# 2. System component Pods
kubectl get pods -A

# 3. Cluster version
kubectl version

# 4. etcd health
kubectl -n kube-system get pod | grep etcd
```

All nodes should be in the `Ready` state, and every system Pod should be `Running`.

---

## 5 Core Component Activation

Once the underlying infrastructure is ready, activate the AGIOne core components in the following order.

### 5.1 Accelerator device-plugin Component

Activate the device-plugin matching the accelerator vendor on the Worker nodes:

```bash
# NVIDIA GPUs
./morecli activate-kdp nvidia

# Huawei Ascend 910 series
./morecli activate-kdp ascend910

# Enflame accelerators
./morecli activate-kdp enflame

# HAMI memory over-subscription for NVIDIA GPUs (multi-model card-sharing scenarios)
./morecli activate-kdp hami
```

> **HAMI use case**: when several small models need to share the same NVIDIA GPU, HAMI enforces logical memory partitioning and quota control, increasing overall GPU utilization. **HAMI and the native NVIDIA device-plugin are mutually exclusive — pick one.**

Validation after activation:

```bash
kubectl get pods -n kube-system | grep -E 'nvidia|ascend|enflame|hami'
kubectl describe node <worker-node> | grep -A 5 'Allocatable'
# Resources such as nvidia.com/gpu or huawei.com/Ascend910 should appear
```

### 5.2 Monitoring Components

#### 5.2.1 Deploy the Monitoring Database (KubeDB)

```bash
# 1. Set the database storage path; placing it on shared NAS storage attached to the management nodes is recommended
export DB_DATA=/opt/kubedb

# 2. Install KubeDB
./morecli install-kubedb

# 3. Retrieve the KubeDB password (used by downstream monitoring components)
cat ./kubedb/kubedb.yaml
```

#### 5.2.2 Deploy the Base Monitoring Stack

Choose the monitoring mode that matches the Worker node accelerator vendor:

```bash
# Pick one — must align with the device-plugin mode
./morecli activate-monitor --xpu-mode ascend910
./morecli activate-monitor --xpu-mode hami
./morecli activate-monitor --xpu-mode nvidia
./morecli activate-monitor --xpu-mode enflame
./morecli activate-monitor --xpu-mode biren
```

The monitoring stack automatically collects GPU/NPU utilization, memory, temperature, and power-draw metrics, and exposes them via a Prometheus endpoint.

#### 5.2.3 [Optional] Kubernetes Cluster Monitoring

Install only when the customer explicitly requires a cluster-level dashboard:

```bash
./morecli activate-k8s-monitor
# Default Grafana port: 32765
# Access via http://<any-node-IP>:32765
```

### 5.3 Jupyter Proxy Component

Provides remote Jupyter Notebook access for R&D users:

```bash
./morecli activate-jupy-proxy test
```

### 5.4 Toolkit Activation

Activate the following three commonly used utilities:

```bash
./morecli activate-tools
```

The toolkit includes:

1. **nerdctl** — image-build utility for containerd-based environments
2. **model-downloader** — automated model download tool supporting Hugging Face, ModelScope, and similar registries
3. **s3fs** — dynamically mount object storage buckets as POSIX file systems

### 5.5 [Optional] Storage CSI Component

Install only when an object storage service is configured for the cluster:

```bash
./morecli activate-osc
```

---

## 6 [Optional] RDMA / SR-IOV Deployment

Configure this section only when NVIDIA Worker nodes are equipped with an RDMA network (RoCE or InfiniBand) and multi-host tensor parallelism is needed.

### 6.1 SR-IOV Prerequisites

- SR-IOV must be enabled in BIOS (the location varies by motherboard vendor; commonly under `Advanced > PCIe Configuration`)
- Ansible must be installed on the deployment node (`yum install -y ansible` or `apt install -y ansible`)

### 6.2 SR-IOV Configuration Procedure

#### 6.2.1 Enter the Configuration Directory

```bash
cd install/kubemore/sriov
```

#### 6.2.2 Edit the `hosts` Inventory

Assign a unique virtual-NIC MAC starting prefix to each node (**`mac_start` must be unique per node**):

```ini
[nodes]
10.190.31.1 mac_start=00:50:56:00:01
10.190.31.2 mac_start=00:50:56:00:02
10.190.31.3 mac_start=00:50:56:00:03
```

#### 6.2.3 Edit `sriov.yml`

```yaml
---
- hosts: nodes
  serial: 50
  remote_user: root
  vars:
    # PCI IDs of the physical NICs that should be SR-IOV-enabled
    devices: "0000:81:00.0 0000:82:00.0"
    # Number of Virtual Functions (VFs) to create per NIC
    vf_number: 8
```

#### 6.2.4 Apply the Configuration

```bash
bash run
```

After completion, log in to any node and verify:

```bash
lspci -nn | grep Virtual
# A VF list should be printed for each NIC
```

### 6.3 RDMA Component Activation

```bash
# RoCE network
./morecli activate-rdma roce

# InfiniBand network
./morecli activate-ib roce
```

---

## 7 [Optional] Harbor Image Registry Deployment

The image registry is the backbone for distributing inference-engine and model-service images on the AGIOne platform. A dedicated host is strongly recommended — do **not** co-locate Harbor with K8s nodes.

### 7.1 Node Specifications

| Item | Minimum | Recommended (Production) |
| --- | --- | --- |
| CPU cores | ≥ 4 | ≥ 8 |
| Memory | ≥ 8 GB | ≥ 16 GB |
| System disk | ≥ 100 GB | ≥ 200 GB |
| Data disk | Optional, ≥ 500 GB (NAS recommended) | ≥ 2 TB (NAS recommended) |
| Port requirements | Cluster reachable on 8090 | 8090 + 8443 (if HTTPS is enabled) |
| Operating system | Ubuntu 20.04 / 22.04, CentOS 7, OpenEuler 22.03 | Same as minimum |

### 7.2 Harbor Installation

#### 7.2.1 Enter the Working Directory

```bash
cd install/kubeimg
vim harbor.yml
```

#### 7.2.2 Modify Key Configurations

- **Hostname and port**

  ```yaml
  hostname: 10.8.104.12
  http:
    port: 8090
  ```

- **Initial admin password** (change it from the UI immediately after first login)

  ```yaml
  harbor_admin_password: Harbor12345
  ```

- **Data storage path** (point to large-capacity NAS storage)

  ```yaml
  data_volume: /data
  ```

#### 7.2.3 Run the Installer

```bash
bash install.sh
```

Once installation completes, browse to `http://<harbor-ip>:8090` and log in with `admin / <harbor_admin_password>`.

### 7.3 Cluster Integration with Harbor

The containerd configuration on every cluster node must include the Harbor registry endpoint (this is automatically injected during the `morecli` installation; update manually if the address changes):

```toml
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."10.8.104.12:8090"]
  endpoint = ["http://10.8.104.12:8090"]
```

After integration, push the inference-engine images supplied by AGIOne (vLLM, MindIE, SGLang, etc.) to Harbor for Worker-node consumption.

---

## 8 [Optional] Object Storage Deployment

Deploy object storage only when the customer requires an S3-compatible store (e.g., for model repositories, log archives, or training data).

### 8.1 Node Specifications

| Item | Minimum | Recommended (Production) |
| --- | --- | --- |
| CPU cores | ≥ 4 | ≥ 8 |
| Memory | ≥ 8 GB | ≥ 16 GB |
| System disk | ≥ 100 GB | ≥ 200 GB |
| Data disk | Optional, ≥ 500 GB (NAS recommended) | ≥ 4 TB (more for multi-replica deployments) |
| Port requirements | Cluster reachable on 9000, 9001 | Same as minimum |

### 8.2 Single-Node MinIO Installation

Suitable for R&D or small-scale environments:

```bash
export MINIO_HOME=/opt/kubestore
export MINIO_ROOT_USER=kubestoreadmin
export MINIO_ROOT_PASSWORD=kubestoreadmin

bash storecli install-minio
```

### 8.3 Multi-Node Cluster Installation

Required for production environments; at least 4 nodes are needed for erasure-coding availability:

```bash
export MINIO_SIZE=1024
export MINIO_PATH=/data

./morecli install-kubestore \
    192.168.1.21 \
    192.168.1.22 \
    192.168.1.23 \
    192.168.1.24
```

### 8.4 Mounting Object Storage in the Cluster

After object storage is deployed, activate the Storage CSI component on the K8s side to enable dynamic PVC mounts:

```bash
./morecli activate-osc
```

Workloads can then claim object-storage volumes via PVCs.

---

## 9 Deployment Acceptance Checklist

Once every component is activated, walk through the checklist below, verifying each item and obtaining sign-off.

### 9.1 Cluster Foundation

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | Node status | `kubectl get nodes` | All nodes `Ready` |
| 2 | System Pods | `kubectl get pods -A` | All `Running` or `Completed` |
| 3 | etcd health | `kubectl -n kube-system exec etcd-<master> -- etcdctl endpoint health` | Every endpoint `is healthy` |
| 4 | DNS resolution | `kubectl run -it --rm test --image=busybox -- nslookup kubernetes` | Resolution succeeds |
| 5 | NodePort reachability | `curl http://<node>:32765` | Monitoring page is accessible |

### 9.2 Accelerator Resources

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | GPU resource registration | `kubectl describe node <worker> \| grep -A 3 Allocatable` | `nvidia.com/gpu: <N>` (or the equivalent vendor key) is present |
| 2 | Accelerator metrics | Open Grafana → GPU Monitoring dashboard | Utilization, memory, temperature, and power values are present |
| 3 | Test Pod scheduling | Deploy a Pod requesting 1 GPU and run `nvidia-smi` inside | The allocated GPU is visible |

### 9.3 Image Registry and Storage

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | Harbor login | Browse to `http://<harbor>:8090` | Login succeeds |
| 2 | Image push | `nerdctl push <harbor>/library/test:v1` | Push succeeds |
| 3 | Node image pull | On a Worker node: `crictl pull <harbor>/library/test:v1` | Pull succeeds |
| 4 | Object storage (if enabled) | Connect with the `mc` client, create a bucket, and upload a file | Operations succeed |

### 9.4 RDMA (If Enabled)

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | SR-IOV VFs | `lspci -nn \| grep Virtual` | The configured number of VFs appears |
| 2 | RDMA ports | `ibstat` | Port `Active`, speed matches the spec |
| 3 | Cross-node bandwidth | `ib_send_bw` test between nodes | Throughput close to the physical bandwidth |

---

## 10 Common Issues and Troubleshooting

### 10.1 SSH Trust Failure

**Symptom**: `./morecli install` reports `Permission denied (publickey,password)`.

**Investigation steps**:

1. Verify that the deployment node's `~/.ssh/id_rsa.pub` has been written to the target node's `~/.ssh/authorized_keys`
2. Check that `PubkeyAuthentication yes` is set in the target node's `/etc/ssh/sshd_config`
3. Verify file permissions: `~/.ssh` should be `700` and `authorized_keys` should be `600`
4. For non-root scenarios, confirm that `ansible.cfg.not_root` has been copied to `ansible.cfg`

### 10.2 GPU Resources Not Registered with Kubernetes

**Symptom**: `kubectl describe node` does not show `nvidia.com/gpu`.

**Investigation steps**:

1. Confirm that `nvidia-smi` works on the affected node
2. Inspect the device-plugin Pod: `kubectl get pods -n kube-system | grep nvidia`
3. Read the plugin logs: `kubectl logs -n kube-system <plugin-pod>`
4. Restart kubelet: `systemctl restart kubelet`

### 10.3 Node Power Draw Exceeds Rack Capacity

**Symptom**: rack circuit-breaker trips or alarms when many users invoke the service.

**Mitigations**:

- Configure rack-level power thresholds in the monitoring dashboard (yellow at 70%, orange at 85%, red at 95%)
- Enable concurrency caps in the AGIOne scheduling policy to suppress instantaneous spikes
- For sustained ceiling-hitting workloads, distribute nodes across multiple racks

### 10.4 Node Fails to Self-Recover After OS Reimage

**Symptom**: an Ascend node cannot rejoin the cluster after the operating system is reimaged.

**Investigation steps**:

1. Confirm that the node initialization script is embedded in the base image
2. Verify that data-disk mount points (`/data/models`, the `/etc/kubernetes` mapping) survived the reimage
3. Test management-plane connectivity to the node (dedicated line / VPC)
4. Inspect the AGIOne Agent startup logs and confirm the registration call to the control plane succeeded

### 10.5 Harbor Push Timeout

**Symptom**: pushing large images (>10 GB) to Harbor is interrupted mid-transfer.

**Mitigations**:

- Increase `max-concurrent-uploads` in the client `daemon.json`
- Raise `client_max_body_size` and timeout values in Harbor's reverse proxy (Nginx)
- For very large images, prefer offline import via `nerdctl save | nerdctl load` to the target node

---

## 11 Appendix

### 11.1 Deployment Node Inventory Template

| # | Role | Hostname | Mgmt IP | Data IP | RDMA IP | CPU/RAM | Data Disk | Accelerator | OS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Master + etcd | mgmt-01 | 192.168.1.3 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 2 | Master + etcd | mgmt-02 | 192.168.1.4 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 3 | Master + etcd | mgmt-03 | 192.168.1.5 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 4 | Worker | gpu-01 | 192.168.1.11 | 10.0.1.11 | 10.10.1.11 | 64C / 512G | 4 TB | 8 × A800-80G | Ubuntu 22.04 |
| 5 | Worker | gpu-02 | 192.168.1.12 | 10.0.1.12 | 10.10.1.12 | 64C / 512G | 4 TB | 8 × H20-96G | Ubuntu 22.04 |

### 11.2 Port Reference

| Service | Port | Description |
| --- | --- | --- |
| Kubernetes API Server | 6443 | Exposed on Master nodes |
| etcd Client | 2379 | Internal to Master/etcd nodes |
| etcd Peer | 2380 | Between etcd nodes |
| kubelet | 10250 | All nodes |
| Harbor HTTP | 8090 | Harbor host |
| Harbor HTTPS (optional) | 8443 | Harbor host |
| MinIO API | 9000 | Object storage host |
| MinIO Console | 9001 | Object storage host |
| AGIOne Service NodePort | 32761 – 32765 | All Workers |
| Grafana | 32765 | Monitoring entry point |
| Default NodePort range | 30000 – 32767 | Business model services |

### 11.3 morecli Command Reference

| Category | Command |
| --- | --- |
| Install cluster | `./morecli install --masters ... --etcd ... --workers ...` |
| Add nodes | `./morecli add --workers 192.168.1.7,192.168.1.8` |
| Remove nodes | `./morecli del --workers 192.168.1.7,192.168.1.8` |
| Destroy cluster | `./morecli destroy` |
| Activate NVIDIA plugin | `./morecli activate-kdp nvidia` |
| Activate Ascend plugin | `./morecli activate-kdp ascend910` |
| Activate HAMI memory over-subscription | `./morecli activate-kdp hami` |
| Install KubeDB | `./morecli install-kubedb` |
| Activate monitoring | `./morecli activate-monitor --xpu-mode nvidia` |
| Activate K8s monitoring | `./morecli activate-k8s-monitor` |
| Activate Jupyter | `./morecli activate-jupy-proxy test` |
| Activate toolkit | `./morecli activate-tools` |
| Activate object-storage CSI | `./morecli activate-osc` |
| Activate RoCE | `./morecli activate-rdma roce` |
| Activate InfiniBand | `./morecli activate-ib roce` |
| Install multi-node MinIO | `./morecli install-kubestore <ip1> <ip2> ...` |
