# Managed Compute Node Deployment Configuration Requirements

## 1 Environment Survey

### 1.1 Node Environment Survey Form

Before formal deployment, a complete environment survey must be conducted on every node that will be brought under management. Use the project-supplied template `AGIOne_Managed_Node_Environment_Survey.xlsx` and fill in each item. The survey is divided into two categories: hardware environment and system environment.

#### 1.1.1 Hardware Environment Items

| Category | Item | Example / Guidance | Notes |
| --- | --- | --- | --- |
| Hardware | CPU | 64 cores, x86_64 | Core count and architecture |
| Hardware | Memory | 256 GB | Total RAM capacity |
| Hardware | Accelerator vendor | NVIDIA / Huawei Ascend / Enflame / Biren | Determines the device-plugin variant |
| Hardware | Accelerator configuration | 8 × A800, 80 GB memory | Card count + model + per-card memory |
| Hardware | Inter-card interconnect | PCIe / NVLink | Affects multi-card tensor-parallel performance |
| Hardware | System disk | 500 GB | ≥ 100 GB minimum, ≥ 200 GB recommended for production |
| Hardware | Data storage | 1 × 3 TB NVMe SSD | Used for model weights and container data |
| Hardware | Management network bandwidth | 1000 Mbps | Inter-node management network ≥ 100 Mbps |
| Hardware | Public internet access | Yes / No | **"Yes" recommended** to simplify online retrieval of drivers and dependencies |
| Hardware | RDMA enabled | Yes / No | Mandatory for multi-host tensor-parallel scenarios |
| Hardware | RDMA network type | RoCE / IB | Influences SR-IOV and component configuration |
| Hardware | RDMA bandwidth | 100 Gbps | InfiniBand recommended at 200 Gbps+ |

#### 1.1.2 System Environment Items

| Category | Item | Example / Guidance | Notes |
| --- | --- | --- | --- |
| System | Operating system | CentOS 7 / Ubuntu 20.04 / Ubuntu 22.04 / OpenEuler 22.03 LTS | Ubuntu 22.04 is not supported on arm64 |
| System | Accelerator driver installed | Yes / No | Must be installed and operational |
| System | Accelerator driver version | NVIDIA 570 / CANN 8.x | Version must match the card model |
| System | RDMA NIC driver installed | Yes / No | Mandatory for RDMA scenarios |
| System | RDMA NIC driver version | MLNX_OFED-23.07-0.5.1.2 | 23.07 or later recommended |
| System | Docker already installed | Yes / No | **If yes, confirm whether it can be removed** |
| System | Kubernetes already installed | Yes / No | **If yes, confirm whether it can be removed** |

> **Important**: if a Worker node already has Docker or Kubernetes deployed, the existing environment must be cleaned up — under the customer's authorization — before installing AGIOne cluster components. This avoids port conflicts, container-runtime ambiguity, and CNI plugin clashes.

### 1.2 Survey Deliverables

The environment-survey phase must produce the following artifacts, which serve as inputs to the subsequent deployment phases:

1. A fully completed *AGIOne Managed Node Environment Survey* (one record per node, or a consolidated table)
2. Node IP and hostname inventory (with Master, etcd, and Worker role assignments)
3. Network topology diagram (covering the management network, business network, and RDMA network, with firewall-rule annotations)
4. Customer authorization letter for cleaning up any pre-existing Docker/Kubernetes environments (if applicable)

---

## 2 Chip Compatibility Validation

### 2.1 Supported Accelerator Inventory

The accelerator models that have been validated against the AGIOne platform span four vendors — NVIDIA, Huawei Ascend, Enflame, and Biren — as listed below:

#### 2.1.1 NVIDIA GPUs

| Architecture / Series | Models |
| --- | --- |
| Hopper | H800, H200, H100, H20 |
| Ampere | A100, A800, A40, A30, A10, RTX A6000, RTX A5000, RTX A4000, RTX A2000, RTX 3090, RTX 3060 |
| Ada | L40, L40S, L20, L20S, L4, L2, RTX 6000, RTX 5000, RTX 4500, RTX 4000, RTX 2000, RTX 4090, RTX 4090D |

#### 2.1.2 Huawei Ascend

| Architecture / Series | Models |
| --- | --- |
| Ascend 910 | Ascend 910B, Ascend 910C |

#### 2.1.3 Other Domestic Accelerators

| Vendor | Architecture / Series | Models |
| --- | --- | --- |
| Enflame | Enflame | 106 (S60) |
| Biren | Biren | S60 |

### 2.2 Compatibility Checkpoints

- The accelerators installed on a node must appear in the inventory above. For models outside the inventory, submit a compatibility-validation request to the AGIOne platform team; assessments typically take 2–4 weeks.
- Within a single Kubernetes cluster, **Worker nodes are strongly recommended to share the same CPU architecture** (all x86_64 or all arm64). Mixed-architecture deployments must be split into separate clusters.
- Mixing different NVIDIA models within the same cluster is supported (e.g., H20 + A10). However, mixing accelerators from different vendors (e.g., NVIDIA + Ascend) is **not recommended** — the corresponding device-plugins and monitoring agents cannot coexist on the same node.

---

## 3 Hardware and Node Resource Specifications

### 3.1 Management Nodes

Management nodes host the AGIOne core services, databases, middleware, and Kubernetes control-plane components. **They do not require GPUs or NPUs.** A minimum of three management nodes is recommended in production to guarantee high availability.

#### 3.1.1 Baseline Specifications

| Item | Minimum | Recommended (Production) |
| --- | --- | --- |
| CPU cores | ≥ 4 | ≥ 16 |
| Memory | ≥ 8 GB | ≥ 16 GB |
| System disk | ≥ 100 GB | ≥ 200 GB |
| Data disk | Optional, ≥ 500 GB | ≥ 400 GB (NAS volume acceptable) |
| Node count | ≥ 1 | ≥ 3 |
| Shared storage | — | ≥ 1024 GB (block device or NAS) |

#### 3.1.2 Capacity Tiering by Cluster Size

Management-node resources must scale with the size of the Worker fleet under management. The specifications below represent the per-node minimum for production environments; at least three management nodes are recommended at every tier:

| Managed Worker Fleet | Kubernetes Baseline | AGIOne Service Overhead | Per-Node Total | Minimum Nodes |
| --- | --- | --- | --- | --- |
| 1 – 5 nodes | 1C 4G | 7C 12G | 8C 16G | 3 |
| 6 – 10 nodes | 2C 8G | 7C 12G | 9C 20G | 3 |
| 11 – 100 nodes | 4C 16G | 12C 24G | 16C 40G | 3 |
| 101 – 250 nodes | 8C 32G | 12C 24G | 20C 56G | 3 |
| 251 – 500 nodes | 16C 64G | 24C 48G | 40C 112G | 3 |
| 500+ nodes | 32C 128G | 32C 64G | 64C 192G | 3 |

> **Recommendation**: a single cluster should manage no more than 1,000 Worker nodes. For larger fleets, adopt a multi-cluster federation architecture and rely on the AGIOne control plane for unified management.

### 3.2 Worker Nodes (NPU / GPU)

Worker nodes carry the actual inference workloads and must be equipped with at least one accelerator card.

#### 3.2.1 Baseline Specifications

| Item | Minimum | Recommended (Production) |
| --- | --- | --- |
| CPU cores | ≥ 8 | ≥ 16 (reserve for K8s and system processes) |
| Memory | ≥ 16 GB | ≥ 16 GB reserved + actual inference footprint |
| System disk | ≥ 100 GB | ≥ 200 GB |
| Data disk | ≥ 500 GB (mandatory) | ≥ 2 TB (for model weights and container volumes) |
| Accelerators | ≥ 1 card | 8–16 cards depending on workload |
| Shared storage | — | ≥ 2048 GB (NAS / IPFS / similar) |
| Networking | Full reachability with management nodes | Management network + RDMA network (for multi-host tensor parallelism) |
| Public internet access | **Required** | For drivers, dependencies, and model downloads |

#### 3.2.2 Operating System Support Matrix

| CPU Architecture | Supported Operating Systems |
| --- | --- |
| x86_64 | Ubuntu 20.04, Ubuntu 22.04, CentOS 7 |
| arm64 | Ubuntu 20.04, CentOS 7, OpenEuler 22.03 LTS |

> Within a single Kubernetes cluster, all Master, etcd, and Worker nodes must share the same CPU architecture.

### 3.3 Port Requirements

The following ports must be opened on Worker nodes for access from the management plane:

| Port | Protocol | Purpose |
| --- | --- | --- |
| 6443 | TCP | Kubernetes API Server |
| 8090 | TCP | Harbor image registry |
| 32761 | TCP | AGIOne service entry |
| 32762 | TCP | AGIOne service entry |
| 32763 | TCP | AGIOne service entry |
| 32764 | TCP | AGIOne service entry |
| 32765 | TCP | Grafana monitoring dashboard (default) |

The default cluster NodePort range is `30000 – 32767`, and can be adjusted at install time via the `--port-range` parameter.

---
