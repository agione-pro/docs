---
prev: false
next: true
---

# Deployment & Configuration

This section contains deployment, configuration, and acceptance documentation for AGIOne products.

## Documents

Read the [Overview](./agione-deployment-requirements) first, then follow the two tracks below. Use the install documents for both AGIOne and compute onboarding.

| Document | Purpose |
| --- | --- |
| [Overview](./agione-deployment-requirements) | Deployment shape, capacity, and network planning |

### Install AGIOne

| Document | Purpose |
| --- | --- |
| [Install AGIOne](./clusterd-agione-best-practices) | Install, precheck, and accept AGIOne through the Web wizard |

Command-line installation is being retired. Environments that still use `./agione` are covered below:

| Document | Purpose |
| --- | --- |
| [Pre-install Check](./agione-precheck-environment-check) | Environment check before `./agione quick` or `./agione install` |
| [Single-Node Install](./agione-quick-install) | Command-line installation and handover on one host |
| [Multi-Node Install](./agione-multi-node-install) | Host-mode multi-node command-line installation |
| [Configuration Fields](./agione-install-config-reference) | Field reference for `/root/agione-install.yml` |

### Onboard Compute

| Document | Purpose |
| --- | --- |
| [Before You Start](./deployment-requirements-for-managing-compute-nodes) | Whether accelerators, operating systems, capacity, and network are ready |
| [Install Compute](./quick-install-with-agione-clusterd) | Onboard GPU / NPU nodes and activate components from the Web interface |
| [Command-Line Install](./quick-install-for-managing-compute-nodes) | Install the compute cluster from the command line and run basic validation |

### After Deployment

| Document | Purpose |
| --- | --- |
| [Operations Edition](./post-deployment/operation-edition) | Business configuration and go-live checks for the Operations Edition |
| [Enterprise Internal Edition](./post-deployment/enterprise-internal-edition) | Initialization, confirmation, and go-live checks for internal enterprise use |

### ClusterD

ClusterD is the Web program used during installation. It runs on the control host. If the control host does not have ClusterD yet, start with the quick install.

| Document | Purpose |
| --- | --- |
| [What ClusterD Does](./clusterd-overview) | What ClusterD is, and how it relates to AGIOne |
| [Install, Upgrade, and Uninstall](./clusterd/) | Quick install, full installation, upgrade, and removal |
