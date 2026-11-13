---
prev: false
next: true
---

# Deployment & Configuration

This section contains deployment, configuration, and acceptance documentation for AGIOne products.

## Documents

| Document | Purpose |
| --- | --- |
| [Overview](./agione-deployment-requirements) | Deployment overview and requirements for AGIOne |

### Deploy AGIOne via CLI

| Document | Purpose |
| --- | --- |
| [Pre-install Environment Check](./agione-precheck-environment-check) | Use precheck / doctor to check drivers, CUDA, disk, and ports before installation |
| [Installation & Deployment](./agione-quick-install) | Offline or restricted-network AGIOne installation workflow and delivery handover |
| [Multi-Node Installation](./agione-multi-node-install) | Host-mode multi-node installation workflow for AGIOne |
| [Installation Configuration Reference](./agione-install-config-reference) | Field reference for `/root/agione-install.yml` |

### Deploy AGIOne via GUI

| Document | Purpose |
| --- | --- |
| [ClusterD Installation, Upgrade, and Uninstallation](./clusterd/) | New-environment installation, dual-architecture online/offline deployment, and ClusterD upgrade and removal |
| [Best Practices for Deploying AGIOne with ClusterD](./clusterd-agione-best-practices) | Reserved page; content to be added |

### Compute Node Management

| Document | Purpose |
| --- | --- |
| [Compute Nodes Requirements](./deployment-requirements-for-managing-compute-nodes) | Environment survey, resource planning, and deployment configuration requirements for managed compute nodes |
| [Compute Nodes Installation](./quick-install-for-managing-compute-nodes) | Kubernetes cluster, components, and validation workflow for managed compute nodes |
| [Compute Nodes Installation with ClusterD](./quick-install-with-agione-clusterd) | Install and manage compute nodes using ClusterD |

### Post-Deployment

| Document | Purpose |
| --- | --- |
| [Operations Edition](./post-deployment/operation-edition) | Business configuration, direct-entry links, and go-live acceptance checklist for Operations Edition deployments |
| [Enterprise Internal Edition](./post-deployment/enterprise-internal-edition) | Initialization, configuration confirmation, and go-live acceptance checklist for enterprise internal deployments |
