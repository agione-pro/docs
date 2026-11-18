---
prev: false
next: true
---

# What Is ClusterD?

ClusterD is the graphical control and orchestration tool used to deploy and manage an AGIOne environment. It provides a Web interface for entering deployment parameters, checking target nodes, selecting storage, running precheck, starting installation, and reviewing task results.

ClusterD is not the AGIOne business platform itself. It is the control layer that helps an installer deliver AGIOne to one or more target nodes.

## ClusterD's Role

| Question | Plain-language answer |
| --- | --- |
| What is it? | A Web-based installation and deployment control tool |
| Where is it installed? | Once on the ClusterD control host |
| What does it manage? | Deployment plans, target-node connections, storage selection, precheck results, installation tasks, and runtime verification |
| Where do services run? | On the selected AGIOne target nodes, not in the installer's browser |
| How is it accessed? | By default, through `http://<ClusterD-host-IP>:18093/` |
| Does it replace AGIOne? | No. It deploys and helps maintain the AGIOne environment; it does not replace the business platform |

## ClusterD and AGIOne

The two parts have different responsibilities:

```text
Installer's browser
        |
        v
ClusterD control host
  Web interface, tasks, precheck, orchestration
        |
        | SSH / deployment connection
        v
AGIOne target nodes
  Kubernetes, middleware, and AGIOne services
```

The ClusterD host and an AGIOne target node may be the same physical or cloud machine. Even in that arrangement, the wizard must connect to the node through its real reachable address; do not use the installer's browser address or `127.0.0.1` as a substitute.

## What ClusterD Helps You Do

1. Select a single-node, primary/standby, or enterprise high-availability topology.
2. Choose online or offline deployment resources and the target CPU architecture.
3. Define Kubernetes network ranges, console access, certificates, and log storage.
4. Add target nodes and test SSH connectivity and disk eligibility.
5. Select a dedicated empty disk or reuse an eligible existing filesystem.
6. Run precheck before any destructive installation step.
7. Review the exact nodes and disks in the confirmation dialog, then start installation.
8. Review installation tasks, node health, service health, storage paths, and the Web access URL.

## What ClusterD Does Not Do Automatically

- Installing ClusterD does not install AGIOne. AGIOne deployment starts only after the Web wizard is configured and installation is confirmed.
- Selecting a data disk in the host does not automatically move ClusterD's program files or cache. The AGIOne storage mode must be selected and verified in the wizard.
- A successful ClusterD Web page or installer exit does not by itself prove that all AGIOne services are healthy. Check the deployment task, nodes, services, persistent storage, and access URL.
- Upgrading ClusterD does not automatically upgrade deployed AGIOne business services.
- Uninstalling ClusterD does not automatically delete the remote AGIOne environment or its business data.

## Recommended Reading Order

| Need | Read next |
| --- | --- |
| Install ClusterD on a new host | [ClusterD Installation, Upgrade, and Uninstallation](./clusterd/) |
| Deploy AGIOne through the wizard | [Best Practices for Deploying AGIOne with ClusterD](./clusterd-agione-best-practices) |
| Prepare capacity and network requirements | [Deployment Overview](./agione-deployment-requirements) |
| Use command-line installation instead | [Installation & Deployment](./agione-quick-install) |

::: warning Keep the boundaries clear
ClusterD is the deployment control plane. AGIOne is the environment being deployed. Keep the ClusterD account, target-node SSH credentials, and AGIOne account information separate during delivery.
:::
