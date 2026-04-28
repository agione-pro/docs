# Quick Environmental Investigation

This document is used to investigate a customer's on‑prem environment in the early stage. After collecting information, you can evaluate deployment readiness and feasibility for integrating/governing resources via AGIOne.

## Objectives

- Determine whether the infrastructure meets deployment prerequisites
- Identify risks in network, security, and capacity
- Clarify required remediation items and go-live preparations

## Environment Basic Information Collection Form

### Hardware Environment

| Key Item | Example / Instructions | Value | Assessment Result | Remarks |
|----------|------------------------|-------|-------------------|---------|
| CPU | 64 cores, x86_64 | | | |
| Memory | 256G | | | |
| Accelerator Vendor | NVIDIA | | | |
| Accelerator Configuration | 8 * A800, 80GB VRAM | | | |
| Inter-Accelerator Network | PCIe \| NVLink | | | |
| Base Storage | 500G | | | |
| Data Storage | 1 * 3T NVMe SSD | | | |
| Management Network Bandwidth | 1000M | | | |
| External Network Access | Yes | | | Recommended to have external network access |
| RDMA Configured | Yes | | | |
| RDMA Network Type | RoCE \| IB | | | |
| RDMA Network Bandwidth | 100G | | | |

### System Environment

| Key Item | Example / Instructions | Value | Assessment Result | Remarks |
|----------|------------------------|-------|-------------------|---------|
| Operating System | CentOS7 \| Ubuntu 20.04 \| Ubuntu22.04 | | | |
| Accelerator Driver Installed | Yes | | | |
| Accelerator Driver Version | 570 | | | |
| RDMA NIC Driver Installed | Yes | | | |
| RDMA NIC Driver Version | MLNX_OFED-23.07-0.5.1.2 | | | |
| Docker Environment Installed | Yes | | | If Docker is already installed, can it be cleared? |
| Kubernetes Environment Installed | Yes | | | If Kubernetes is already installed, can it be cleared? |


## Quick Investigation Checklist (Example)

### 1) Infrastructure

- Server sizing (CPU, memory, GPU, disk)
- OS versions and kernel information
- Virtualization/containerization baseline

### 2) Network

- Inter-node connectivity and bandwidth
- Required port opening and firewall policies
- Cross-subnet / cross-region deployment needs

### 3) Platform and Middleware

- Kubernetes / Docker versions
- Storage approach (local disks, NAS, object storage)
- Observability stack status (Prometheus, ELK, etc.)

### 4) Security and Compliance

- Identity provider (LDAP, AD, OIDC)
- Audit and log retention requirements
- Compliance requirements (vulnerability scanning, security baselines, internal controls)

## Outputs (Example)

| Output | Description |
|------|------|
| Feasibility conclusion | Deployable / deployable after remediation / not recommended yet |
| Remediation list | Network, capacity, version, and permission gaps |
| Deployment recommendation | Single-node / multi-node / HA topology suggestion |
| Prerequisites | Accounts, certificates, ports, image registry access, etc. |