# AGIOne Environment Installation and Deployment Guide

> 中文版本：[AGIOne 环境安装部署指南](/zh/installation/agione-environment-installation-deployment)
> Audience: implementation engineers, delivery engineers, and operations engineers

---

## 1. Document Overview

This document guides operators through AGIOne single-node installation in offline or restricted-network environments.

It explains:

- what must be prepared before installation
- required network and host resource conditions
- how to obtain and verify the installation package
- how to run one-click installation
- how to verify the result
- how to reference the installation demo video

The AGIOne installer uses `quick` as the standard one-click installation path. For installations requiring step-by-step confirmation, use the TUI interactive installer.

Before installation, complete the quick environment assessment to confirm the resource, network, port, offline asset, and risk checklist for local or cloud-native deployment:

- [Quick Environmental Investigation](/product/investigation/quick-env-investigation)
- [环境快速调研](/zh/product/investigation/quick-env-investigation)

Standard paths:

| Type | Path |
| --- | --- |
| Release source directory | `agione-release-v1.0-YYYYMMDD` |
| Installer runtime directory | `/opt/agione-installer-bundle` |
| AGIOne runtime data directory | `/opt/hyperone` |
| Offline Python runtime | `/opt/agione-python` |

---

## 2. Prerequisites

### 2.1 Operating system and permissions

Use a Linux server and run the installer as `root`.

The installer needs write access to:

```text
/opt/agione-installer-bundle
/opt/hyperone
/opt/agione-python
```

### 2.2 Runtime dependencies

The installer uses offline assets in the bundle to prepare runtime dependencies when possible, including:

- Python runtime
- Docker / Compose
- offline Docker images
- AGIOne application runtime assets
- database and MinStore baseline assets

Do not assume a fresh host already has `python3`, Docker, or Compose.

### 2.3 Pre-install diagnostics

Before first delivery, run:

```bash
./agione doctor
```

`doctor` generates a diagnostic report and support bundle for pre-install checks or post-failure troubleshooting. On a fresh host, it uses a temporary `/tmp` workspace and does not create `/opt/agione-installer-bundle`.

---

## 3. Network Configuration

### 3.1 Access ports

Default browser URL:

```text
http://<target-host-ip>:18090/modelone/
```

The target host should allow:

| Port | Purpose |
| --- | --- |
| `22` | SSH login and operations |
| `18090` | AGIOne Web access |
| `80` | Nginx / Web entry configuration |
| `8089` | Job proxy access |

If the customer environment uses firewall rules, security groups, or bastion hosts, allow these ports in advance.

### 3.2 Private IP

The installer auto-detects the host private IP and uses it for access URL and service configuration.

If the target host has multiple network interfaces, confirm the node IP in the TUI installation flow.

### 3.3 Offline environment

AGIOne supports offline installation. Ensure the bundle contains:

- installer core package
- AGIOne application package
- Docker offline installer
- Docker image package
- database baseline package
- MinStore baseline package
- offline Python runtime

---

## 4. Product Installation

### 4.1 Required host resources

Recommended request profile:

| Item | Recommended Value | Check Notes |
| --- | --- | --- |
| CPU | 8 cores | CPU must be at least 8 cores |
| Memory | 16 GiB | A small OS/hypervisor reservation is tolerated; about `15.2GiB` or above passes |
| Free disk | 200 GiB | The filesystem that hosts `/opt/hyperone` tolerates about 20% reservation; about `160GiB` or above passes |

Cloud hosts, hypervisors, and operating systems usually reserve part of the requested resources. The installer uses a tolerant range to avoid blocking valid host profiles by mistake.

### 4.2 Package acquisition

The installation package is usually delivered as an `agione-release-v1.0-YYYYMMDD.tar.gz` archive. After extraction, the directory name is the archive basename without `.tar.gz`, for example `agione-release-v1.0-20260513/`.

Upload example:

```bash
scp -r agione-release-v1.0-20260513.tar.gz root@<target-host>:/opt/hyperone/
ssh root@<target-host>
cd /opt/hyperone && \
tar -zxvf agione-release-v1.0-20260513.tar.gz && \
cd /opt/hyperone/agione-release-v1.0-20260513
```

Typical bundle contents:

```text
agione
agione-installer-core.tar.gz
agione-app.tar.gz
docker-images.tar.gz
docker-offline.tar.gz
database-*.tar.gz
minstore.*.tar.gz
SHA256SUMS
bundle-manifest.json
```

### 4.3 Package integrity check

Verify the bundle before installation:

```bash
chmod +x ./agione
./agione verify-bundle
```

If verification fails, obtain a new package instead of continuing.

### 4.4 Execute installation

For standard delivery, run one-click installation:

```bash
chmod +x ./agione
./agione quick
```

`quick` automatically:

1. unpacks and refreshes the installer into `/opt/agione-installer-bundle`
2. prepares the offline Python runtime
3. runs system checks
4. checks offline assets
5. renders configuration and `compose.rendered.yaml`
6. installs or repairs Docker / Compose
7. loads offline images
8. starts AGIOne services
9. imports Nacos configuration
10. prints the installation result

`quick` first runs pre-install checks in a temporary `/tmp/agione-quick-check.*` workspace. Runtime data is unpacked to `/opt/hyperone` only after that precheck path passes.

`--skip-system-check` is intended only for temporary integration or troubleshooting. It skips the local pre-install system check, but the execution phase still checks and attempts to install or repair Docker / Compose from bundled offline assets. Do not use it for formal delivery unless the risk is accepted.

For interactive configuration review, run:

```bash
./agione install
```

### 4.5 Verify result

After installation, run:

```bash
./agione health
./agione ps
```

Open in browser:

```text
http://<target-host-ip>:18090/modelone/
```

Acceptance checklist:

- `health` reports success
- core services are healthy
- AGIOne Web page opens in browser
- Nacos configuration import has no missing items
- installation report is archived

After successful installation, export a handover bundle:

```bash
./agione handover
```

---

## 5. Installation Demo Video

For operator training, the demo video should cover:

1. upload `agione-release-v1.0-YYYYMMDD.tar.gz`
2. run `./agione verify-bundle`
3. run `./agione quick`
4. review the installation result
5. run `./agione health` and `./agione ps`
6. open `http://<target-host-ip>:18090/modelone/` in a browser

Recommended video file name:

```text
AGIOne-Quick-Install-Demo.mp4
```

Recommended repository path:

```text
docs/public/videos/AGIOne-Quick-Install-Demo.mp4
```

Markdown link example:

```markdown
[AGIOne Quick Install Demo](/videos/AGIOne-Quick-Install-Demo.mp4)
```

> No official installation demo video file is currently found in this repository. After the video is provided, place it under `docs/public/videos/` and add the link to this document.
