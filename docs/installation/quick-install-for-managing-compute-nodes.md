# Install the Compute Cluster

::: tip Use the install document by default
Compute onboarding uses [Install Compute](./quick-install-with-agione-clusterd) by default. ClusterD is the Web program on the control host. See [What ClusterD Does](./clusterd-overview). Installation, upgrade, and removal are in [Install, Upgrade, and Uninstall](./clusterd/). This page is the command-line installation.
:::

## Introduction

| Item | Content |
|------|---------|
| Applicable Role | Compute cluster implementation engineer, GPU / NPU node operations engineer, customer platform administrator |
| Navigation Path | Deployment > Onboard Compute > Command-Line Install |
| Function Description | Guides users through managed compute node environment preparation, package initialization, Kubernetes cluster installation, component installation, and basic validation |

This document is for compute node deployment scenarios where resource planning and environment survey have already been completed. If accelerator, operating system, port, or network requirements are not confirmed yet, read [Managed Compute Node Deployment Configuration Requirements](./deployment-requirements-for-managing-compute-nodes) first.

### Beginner Explanation

Use this document after the compute nodes have passed planning and survey. It installs the prepared machines as a Kubernetes compute cluster, then uses `plugincli` to install accelerator, monitoring, and image-registry components.

## Deployment Timeline

| Stage | What You Do | Completion Signal |
| --- | --- | --- |
| Step 1: Prepare node environment | Initialize OS, install drivers, configure passwordless SSH, and verify network connectivity | Every node can be accessed from the deployment node |
| Step 2: Prepare package | Download and initialize the resource bundle matching the CPU architecture | `installer/kubemore` toolkit is generated |
| Step 3: Install cluster | Run `morecli install` with Master, etcd, and Worker parameters | Kubernetes cluster installation completes |
| Step 4: Install components | Use `plugincli` to install accelerator components and monitoring, and install the image registry when needed | The accelerator resource from this installation appears on the nodes |

## 1 Document Overview

### 1.1 Terminology Quick Reference

| Term | Definition |
| --- | --- |
| Master Node | Kubernetes cluster control-plane node |
| Worker Node | Compute node hosting inference workloads (equipped with GPU/NPU) |
| etcd Node | Kubernetes metadata storage node |
| device-plugin | Kubernetes accelerator-card plugin that registers GPU/NPU resources with the scheduler |
| OFED | Mellanox InfiniBand/RoCE NIC driver suite |
| SR-IOV | Single Root I/O Virtualization, used for splitting RDMA NICs into virtual functions |
| Harbor | Enterprise-grade container image registry |
| plugincli | Component installation command in `installer/kube-plugin` |

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
- Change line 48 from <span v-pre>`line: "{{ ansible_env.SSH_CLIENT.split(' ')[0] }}    easzlab.io.local"`</span> to:
  ```yaml
  line: "<local IP>    easzlab.io.local"
  ```
- Replace the Ansible config: `cp ansible.cfg.not_root ansible.cfg`

A root installation leaves this file unchanged.

### 4.3 Cluster Installation Command

#### 4.3.1 Standard Installation Example

Cluster installation does not select the accelerator vendor or model. `plugincli` handles that during component installation.

`./morecli install --help` prints `--etcd` in its example. Passing `--etcd` makes the install script report `Bad command`. The command accepts `--etcds` and `-e`.

```bash
./morecli install \
    --masters 192.168.1.3,192.168.1.4 \
    --etcds 192.168.1.3,192.168.1.4 \
    --workers 192.168.1.5,192.168.1.6
```

For a non-root user, pass `--ssh-user`, `--password`, and `--ssh-port`, and run `cp ansible.cfg.not_root ansible.cfg`. When `ssh-user` is not root, the install script makes the same copy.

#### 4.3.2 Key Parameter Reference

| Parameter | Required | Description |
| --- | --- | --- |
| `--masters / -m` | ✔ | Comma-separated Master node IPs |
| `--etcds / -e` | ✔ | Comma-separated etcd node IPs |
| `--workers / -w` | ✔ | Comma-separated Worker node IPs |
| `--service-cidr` |   | Service CIDR. Default `10.68.0.0/16` |
| `--cluster-cidr` |   | Pod CIDR. Default `172.20.0.0/16` |
| `--password` |   | Password used on every node. Required for a non-root user |
| `--ssh-user` |   | SSH user. Default `root` |
| `--ssh-port` |   | SSH port. Default `22` |
| `--ntp-server` |   | NTP server for the cluster |
| `--port-range / -p` |   | NodePort range. Default `30000-32767` |
| `--max-pods` |   | Maximum Pods per node. Default `110` |
| `--exter-eip` |   | External EIP of the cluster |
| `--dns-domain / -d` |   | Cluster DNS domain. Default `cluster.local` |
| `--kubelet-root-data` |   | kubelet data directory. Default `/var/lib/kubelet` |
| `--containerd-root-data` |   | containerd data directory. Default `/var/lib/containerd` |

### 4.4 Cluster Operations

Adding and removing nodes use `--etcds` or `-e`. The help examples print `--etcd`. Passing that flag makes the script report `Bad command`.

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

## 5 Component Installation

Component installation is separate from cluster installation. Run `plugincli` in the package directory `installer/kube-plugin`. `morecli` stays in `/etc/kubemore`.

```bash
cd installer/kube-plugin
```

The machine that runs `plugincli` needs Docker installed and started. The command exits when Docker is unavailable.

### 5.1 Label Accelerator Nodes

This step is optional. Both `--mode` and `--type` are required. The example from the installation description:

```bash
./plugincli label-xpu --mode nvidia --type nvidia-a10080g
```

`--mode` is one of `nvidia`, `ascend910`, `ascend950`, `amd-gpu`, `google-tpu`, `biren`, `enflame`, `cambricon`, `hygon`, `iluvatar`, `kunlunxin`, `metax`, or `moore-threads`. `--nodes node1,node2` selects nodes. Without `--nodes`, the command labels nodes that do not yet have `kubemore_xpu_device_mode`.

The command writes `kubemore_xpu_device_mode` and `kubemore_xpu_type`. NVIDIA nodes also receive `gpu=on`. Ascend nodes also receive `ascend=on`. Every other `--mode` also receives `kubemore_accelerator_scheduling=volcano-direct`.

### 5.2 Install Volcano

`--backend` is required. The values are `none`, `hami`, `mindcluster`, and `direct`.

Whole-card scheduling also installs the matching native Device Plugin:

```bash
./plugincli component install volcano --backend none nvidia
./plugincli component install volcano --backend none ascend
./plugincli component install volcano --backend none ascend950
```

`ascend` is the same as `ascend910`. One command accepts one device. The Ascend 910 whole-card resource is `huawei.com/Ascend910`. The 950 resource is `huawei.com/npu`.

NVIDIA uses HAMi vGPU. The example values of `--gpu-split` and `--mem-split` are `4` and `1`:

```bash
./plugincli component install volcano --backend hami nvidia
./plugincli component install volcano --backend hami nvidia --gpu-split 4 --mem-split 1
```

Ascend can use HAMi vNPU or MindCluster. HAMi does not accept `ascend950`:

```bash
./plugincli component install volcano --backend hami ascend
./plugincli component install volcano --backend mindcluster ascend
./plugincli component install volcano --backend mindcluster ascend950
```

MindCluster has two modes:

```bash
# Soft sharing. Prepare vCANN-RT on the nodes first
./plugincli component install volcano --backend mindcluster ascend --mindcluster-mode soft-share

# Whole card
./plugincli component install volcano --backend mindcluster ascend --mindcluster-mode whole-card
```

Without `--mindcluster-mode`, `plugincli` uses `whole-card`. Kubernetes 1.36 is outside the validated range, and the install refuses it. An acceptance environment can pass `--allow-unvalidated-k8s`.

MindCluster uses its own scheduler. Jobs set `schedulerName: mindcluster-volcano`. The vendor Device Plugin reports `huawei.com/Ascend910`. Training jobs use `AscendJob` from `mindxdl.gitee.com/v1`. The cluster container backend is containerd. Ascend nodes need the Ascend container runtime. The chart only changes containerd's runc `BinaryName`.

For direct extended resources, with the vendor Device Plugin supplied outside this command:

```bash
./plugincli component install volcano \
    --backend direct \
    --direct-backends amd-gpu,google-tpu,biren,enflame,cambricon,hygon,iluvatar,kunlunxin,metax,moore-threads
```

Installation updates Volcano for the selected backend and removes the other Ascend plugin, so two Device Plugins do not claim the same node.

Uninstall:

```bash
./plugincli component uninstall hami
./plugincli component uninstall mindcluster
./plugincli component uninstall volcano
```

### 5.3 Native Kubernetes Scheduler

The native Kubernetes default-scheduler uses these commands:

```bash
./plugincli component install device-plugin nvidia
./plugincli component install device-plugin ascend910
./plugincli component install device-plugin ascend950
```

`device-plugin ascend` is the same as `ascend910`. 910 reports `huawei.com/Ascend910`. 950 reports `huawei.com/npu`.

### 5.4 Resource Names Requested by Jobs

A Volcano job that is not using MindCluster sets `schedulerName: volcano`.

NVIDIA HAMi:

```yaml
resources:
  limits:
    volcano.sh/vgpu-number: 1
    volcano.sh/vgpu-memory: 4096
    volcano.sh/vgpu-cores: 50
```

Ascend HAMi. 910B3 uses `huawei.com/Ascend910B`. 910B2 and 910B2C use `huawei.com/Ascend910B2`. Memory is in MiB:

```yaml
resources:
  limits:
    huawei.com/Ascend910B2: "1"
    huawei.com/Ascend910B2-memory: "4096"
```

After installation, check the node resources:

```bash
kubectl get pods -A
kubectl describe node <worker-node>
```

`Allocatable` should show the resource name installed by this command.

### 5.5 Monitoring Components

Change the monitoring database path for the site. The installation description places it on shared NAS attached to the management nodes when possible.

```bash
./plugincli component install influxdb --data-path /opt/kubedb
./plugincli component install monitor --xpu-mode ascend910 --server-port 32761
./plugincli component install monitor --xpu-mode ascend950 --server-port 32761
```

Without `--xpu-mode`, the command reads the node label `kubemore_xpu_device_mode`. When that label is `nvidia`, the current command exits and reports that the NVIDIA exporter archive is not included. A validated dcgm-exporter image has to be added first. The `plugincli` help text still shows `--xpu-mode nvidia`.

Cluster monitoring itself is installed when a dashboard for the cluster is required. It provides a Grafana dashboard. The command has no port:

```bash
./plugincli component install k8s-monitor
```

### 5.6 Jupyter Proxy Component

```bash
./plugincli component install jupyterlab-proxy --proxy-port 32762
```

### 5.7 Tools

The following command installs `nerdctl`, `model-downloader`, and `s3fs`:

```bash
./plugincli images push-tools
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
# RDMA network is RoCE
bash /etc/kubemore/utils/activate-rdma roce

# RDMA network is IB
bash /etc/kubemore/utils/activate-rdma ib
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
| Port requirements | Cluster reachable on 8090 | 8090 |
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

## 8 Deployment Acceptance Checklist

Once every component is activated, walk through the checklist below, verifying each item and obtaining sign-off.

### 8.1 Cluster Foundation

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | Node status | `kubectl get nodes` | All nodes `Ready` |
| 2 | System Pods | `kubectl get pods -A` | All `Running` or `Completed` |
| 3 | etcd health | `kubectl -n kube-system exec etcd-<master> -- etcdctl endpoint health` | Every endpoint `is healthy` |
| 4 | DNS resolution | `kubectl run -it --rm test --image=busybox -- nslookup kubernetes` | Resolution succeeds |
| 5 | Monitoring component | `kubectl get pods -n kube-system \| grep monitor` | The monitor Pod is `Running`. The port in the install command is `32761` |

### 8.2 Accelerator Resources

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | Accelerator registration | `kubectl describe node <worker>` | `Allocatable` shows the resource name from this installation |
| 2 | Test Pod scheduling | Submit a Pod that requests the resource name from section 5.4 | The Pod is scheduled onto a Worker |

NVIDIA HAMi uses `volcano.sh/vgpu-number`, `volcano.sh/vgpu-memory`, and `volcano.sh/vgpu-cores`. Ascend HAMi uses `huawei.com/Ascend910B` for 910B3, and `huawei.com/Ascend910B2` for 910B2 and 910B2C. Whole-card or native Device Plugin uses `huawei.com/Ascend910` for 910 and `huawei.com/npu` for 950.

### 8.3 Image Registry

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | Harbor login | Browse to `http://<harbor>:8090` | Login succeeds |
| 2 | Image push | `nerdctl push <harbor>/library/test:v1` | Push succeeds |
| 3 | Node image pull | On a Worker node: `crictl pull <harbor>/library/test:v1` | Pull succeeds |

### 8.4 RDMA (If Enabled)

| # | Item | Method | Expected Result |
| --- | --- | --- | --- |
| 1 | SR-IOV VFs | `lspci -nn \| grep Virtual` | The configured number of VFs appears |
| 2 | RDMA ports | `ibstat` | Port `Active`, speed matches the spec |
| 3 | Cross-node bandwidth | `ib_send_bw` test between nodes | Throughput close to the physical bandwidth |

---

## 9 Common Issues and Troubleshooting

### 9.1 SSH Trust Failure

**Symptom**: `./morecli install` reports `Permission denied (publickey,password)`.

**Investigation steps**:

1. Verify that the deployment node's `~/.ssh/id_rsa.pub` has been written to the target node's `~/.ssh/authorized_keys`
2. Check that `PubkeyAuthentication yes` is set in the target node's `/etc/ssh/sshd_config`
3. Verify file permissions: `~/.ssh` should be `700` and `authorized_keys` should be `600`
4. For non-root scenarios, confirm that `ansible.cfg.not_root` has been copied to `ansible.cfg`

### 9.2 Accelerator Resources Not Registered with Kubernetes

**Symptom**: `kubectl describe node` does not show the resource name from this installation, such as `volcano.sh/vgpu-number`, `huawei.com/Ascend910B2`, `huawei.com/Ascend910`, or `huawei.com/npu`.

**Investigation steps**:

1. Confirm the vendor command works on the node, such as `nvidia-smi` for NVIDIA or `npu-smi info` for Ascend
2. Confirm the matching `plugincli component install` was run in `installer/kube-plugin`
3. Check component Pods: `kubectl get pods -A`
4. Read the Pod log: `kubectl logs -n <namespace> <pod>`

### 9.3 Node Power Draw Exceeds Rack Capacity

**Symptom**: rack circuit-breaker trips or alarms when many users invoke the service.

**Mitigations**:

- Configure rack-level power thresholds in the monitoring dashboard (yellow at 70%, orange at 85%, red at 95%)
- Enable concurrency caps in the AGIOne scheduling policy to suppress instantaneous spikes
- For sustained ceiling-hitting workloads, distribute nodes across multiple racks

### 9.4 Node Fails to Self-Recover After OS Reimage

**Symptom**: an Ascend node cannot rejoin the cluster after the operating system is reimaged.

**Investigation steps**:

1. Confirm that the node initialization script is embedded in the base image
2. Verify that data-disk mount points (`/data/models`, the `/etc/kubernetes` mapping) survived the reimage
3. Test management-plane connectivity to the node (dedicated line / VPC)
4. Inspect the AGIOne Agent startup logs and confirm the registration call to the control plane succeeded

### 9.5 Harbor Push Timeout

**Symptom**: pushing large images (>10 GB) to Harbor is interrupted mid-transfer.

**Mitigations**:

- Increase `max-concurrent-uploads` in the client `daemon.json`
- Raise `client_max_body_size` and timeout values in Harbor's reverse proxy (Nginx)
- For very large images, prefer offline import via `nerdctl save | nerdctl load` to the target node

---

## 10 Appendix

### 10.1 Deployment Node Inventory Template

| # | Role | Hostname | Mgmt IP | Data IP | RDMA IP | CPU/RAM | Data Disk | Accelerator | OS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Master + etcd | mgmt-01 | 192.168.1.3 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 2 | Master + etcd | mgmt-02 | 192.168.1.4 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 3 | Master + etcd | mgmt-03 | 192.168.1.5 | — | — | 16C / 64G | 1 TB | — | Ubuntu 22.04 |
| 4 | Worker | gpu-01 | 192.168.1.11 | 10.0.1.11 | 10.10.1.11 | 64C / 512G | 4 TB | 8 × A800-80G | Ubuntu 22.04 |
| 5 | Worker | gpu-02 | 192.168.1.12 | 10.0.1.12 | 10.10.1.12 | 64C / 512G | 4 TB | 8 × H20-96G | Ubuntu 22.04 |

### 10.2 Port Reference

| Service | Port | Description |
| --- | --- | --- |
| Kubernetes API Server | 6443 | Exposed on Master nodes |
| etcd Client | 2379 | Internal to Master/etcd nodes |
| etcd Peer | 2380 | Between etcd nodes |
| kubelet | 10250 | All nodes |
| Harbor HTTP | 8090 | Harbor host |
| Monitoring component | 32761 | `plugincli component install monitor --server-port` |
| Jupyter proxy | 32762 | `plugincli component install jupyterlab-proxy --proxy-port` |
| Default NodePort range | 30000 - 32767 | `morecli install --port-range` |

### 10.3 Command Reference

| Category | Command |
| --- | --- |
| Install cluster | `./morecli install --masters ... --etcds ... --workers ...` |
| Add nodes | `./morecli add --masters ... --etcds ... --workers ...` |
| Remove nodes | `./morecli del --masters ... --etcds ... --workers ...` |
| Destroy cluster | `./morecli destroy` |
| Accelerator label | `./plugincli label-xpu --mode nvidia --type nvidia-a10080g` |
| Volcano whole card | `./plugincli component install volcano --backend none nvidia` |
| Volcano + HAMi | `./plugincli component install volcano --backend hami nvidia` |
| Ascend HAMi | `./plugincli component install volcano --backend hami ascend` |
| Ascend MindCluster | `./plugincli component install volcano --backend mindcluster ascend` |
| Native Device Plugin | `./plugincli component install device-plugin nvidia` |
| Monitoring database | `./plugincli component install influxdb --data-path /opt/kubedb` |
| Monitoring component | `./plugincli component install monitor --xpu-mode ascend910 --server-port 32761` |
| Cluster monitoring | `./plugincli component install k8s-monitor` |
| Jupyter proxy | `./plugincli component install jupyterlab-proxy --proxy-port 32762` |
| Tools | `./plugincli images push-tools` |
| RoCE | `bash /etc/kubemore/utils/activate-rdma roce` |
| IB | `bash /etc/kubemore/utils/activate-rdma ib` |
