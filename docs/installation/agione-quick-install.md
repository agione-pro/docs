# AGIOne Environment Installation and Deployment Guide

## Introduction

| Item | Content |
|------|---------|
| Applicable Role | First-time installer, delivery engineer, customer operations engineer |
| Navigation Path | Deployment > AGIOne Environment Installation and Deployment Guide |
| Function Description | Guides users through AGIOne download, installation, access verification, and handover archiving on a single target host |

This document applies to single-node / All in One deployment. If you are reading it for the first time, follow the timeline below first, then return to the detailed commands.

### Beginner Explanation

Single-node installation is the shortest path to get AGIOne running: prepare one Linux host, download the bundle from the fixed release page, run `./agione quick`, then open the printed URL in a browser.

## Installation Timeline

| Stage | What You Do | Completion Signal |
| --- | --- | --- |
| Step 1: Confirm host | Confirm CPU, memory, disk, operating system, and root permission | Host meets [Host Specification](#host-specification) |
| Step 2: Download bundle | Open the fixed download page and copy `Download URL` and `MD5 URL` | MD5 transfer check passes; production delivery also verifies the outer archive SHA-256 |
| Step 3: Run quick | Run `./agione quick` or run it with a configuration file | Terminal prints `Installation Result` |
| Step 4: Browser access | Open `http://<target-host-ip>:18090/modelone/` | The page opens successfully |
| Step 5: Handover archive | Save the access URL, default accounts, health report, and handover package | Customer or operations team can take over |

Before installation, complete the [Quick Environmental Investigation](/product/investigation/quick-env-investigation) to identify resource, network, and go-live risks.

## Terminology Quick Reference

| Term | Plain Explanation |
| --- | --- |
| Bundle | AGIOne installation package containing the installer, images, database baseline, and offline runtime assets |
| MD5 / SHA-256 | MD5 detects download corruption; SHA-256 checks that bundle content matches a trusted delivery record |
| `quick` | One-click installation command that runs prechecks, unpacks assets, loads images, starts services, and prints the result |
| `services` | Post-install command for inspecting or incrementally enabling optional application service groups without a full reinstall |
| `/opt/hyperone` | Default runtime data directory; AGIOne service data is written here or to the data-disk path selected by the installer |
| `/opt/agione-installer-bundle` | Installer runtime directory that contains post-install reports, rendered configuration, and output files |
| `/root/agione-install.yml` | Optional configuration file for fixed passwords, domain names, certificates, runtime path, and other delivery parameters |
| Nacos | Configuration center and service registry used by AGIOne |
| Default console accounts | Customer-facing `operator` and `provider` accounts printed after installation |

---

## Host Specification

Recommended request profile:

| Item | Recommended Value | Description |
| --- | --- | --- |
| Operating system | Linux | Ubuntu 22.04 |
| CPU | 8 cores | CPU must be at least 8 cores |
| Memory | 16 GiB recommended | The installer requires at least `12GiB` detected memory; 16 GiB remains the recommended request profile |
| Free disk | 200 GiB | When `runtime_root` keeps the default value, the installer prefers a data disk that has at least about `160GiB` free, and falls back to the system disk only when no suitable data disk is available |
| Execution user | `root` | Root installation is recommended to avoid Docker, directory permission, and system service permission issues |

Architecture support: AGIOne can be deployed on both x86_64 and ARM64 / AArch64 machines. Download the installation bundle that matches the target CPU architecture before installation.

## Quick Install

### 1. Download bundle

Open the fixed download page first, then copy the package link from `Download URL`. `agione-release-latest` is a download page, not a direct `.tar.gz` package URL.

Fixed download page: [Download link](https://agione.pro/release/download/agione-release-latest)

The page also provides an `MD5 URL`. Verify it after download. MD5 detects download or transfer corruption, but does not authenticate the package publisher. For a production delivery, independently obtain the outer `.tar.gz` SHA-256 digest through an access-controlled delivery channel and compare it as well.

Example:

```bash
ssh root@<target-host>
AGIONE_RELEASE_PAGE="https://agione.pro/release/download/agione-release-latest"
AGIONE_RELEASE_URL="<copy-the-Download-URL-from-the-page>"
AGIONE_RELEASE_MD5_URL="<copy-the-MD5-URL-from-the-page>"
AGIONE_RELEASE_ARCHIVE="${AGIONE_RELEASE_URL##*/}"

mkdir -p /opt/hyperone && \
cd /opt/hyperone && \
curl -fL -o "$AGIONE_RELEASE_ARCHIVE" "$AGIONE_RELEASE_URL" && \
curl -fL -o "$AGIONE_RELEASE_ARCHIVE.md5" "$AGIONE_RELEASE_MD5_URL" && \
echo "$(awk '{print $1}' "$AGIONE_RELEASE_ARCHIVE.md5")  $AGIONE_RELEASE_ARCHIVE" | md5sum -c -
```

Verify the outer archive SHA-256 for a production delivery:

```bash
AGIONE_RELEASE_SHA256="<outer-archive-SHA-256-from-a-trusted-delivery-channel>"
echo "$AGIONE_RELEASE_SHA256  $AGIONE_RELEASE_ARCHIVE" | sha256sum -c -
```

Extract the archive only after verification passes:

```bash
AGIONE_RELEASE_DIR="$(tar -tzf "$AGIONE_RELEASE_ARCHIVE" | head -1 | cut -d/ -f1)"
tar -zxvf "$AGIONE_RELEASE_ARCHIVE"
cd "/opt/hyperone/$AGIONE_RELEASE_DIR"
```

### 2. One-click installation

Use `quick` as the recommended path. It automatically completes unpacking, environment checks, and installation:

```bash
chmod +x ./agione
./agione quick
```

Single-node quick installation uses the packaged `compose/agione-app.yaml` base template by default and does not enable host-mode optional application service groups. To keep delivery parameters in a configuration file, prepare `/root/agione-install.yml` and run:

```bash
./agione quick --file /root/agione-install.yml
```

Minimal runnable example:

```yaml
global_config:
  deploy_mode: single
  language: en_US
  offline_mode: true

selected_modules:
  - agione-app

agione_app:
  node_mode: all-in-one
  db:
    root_password: "DbRoot_2026"
  redis:
    password: "Redis_2026"
  nacos:
    password: "Nacos_2026"
    auth_token: "QWdJT25lX05hY29zX0F1dGhUb2tlbl8yMDI2X1BsZWFzZVJlcGxhY2VfNDhCeXRlcw=="
  default_access:
    generate_random_passwords: true
    password_length: 20
```

For fixed domains, HTTPS certificates, fixed default account passwords, runtime paths, or other fields, see the [Installation Configuration Reference](./agione-install-config-reference), which is ordered from required fields to advanced fields.

The installer automatically performs:

1. runs pre-install checks in the temporary `/tmp/agione-quick-check.*` workspace
2. refreshes the bundle to `/opt/agione-installer-bundle` after checks pass
3. prepares the offline Python runtime
4. checks offline assets
5. renders configuration and Compose files
6. installs or repairs Docker / Compose
7. loads offline images
8. starts AGIOne services
9. imports Nacos configuration
10. prints the installation result and service list

### 3. View installation result

After installation succeeds, `quick` prints the actual access entry and customer-facing default account information at the end of the terminal output. The customer-facing default console account passwords are generated during each installation unless fixed credentials are explicitly configured in `agione_app.default_access.credentials`.

`quick` uses English output by default, in the following format:

```text
Installation Result:
Console URL: http://<target-host-ip>:18090/

Access Information (Account/Password):
operator <generated-random-password>
provider <generated-random-password>
```

The same access information is written to `outputs/final-install-result.md` and `outputs/acceptance-report.md` under the installer runtime directory. The installation report also lists the path to the default console account file. Archive these files according to the customer-approved credential handover process.

You can also run:

```bash
./agione health
./agione ps
```

### 4. Browser access

Default access URL:

```text
http://<target-host-ip>:18090/modelone/
```

If a domain name or full access URL is used, follow `agione_app.frontend.domain` / `agione_app.frontend.public_access_url` in the installation configuration.

---

## Home

### What the AGIOne installer does

The AGIOne installer is responsible for:

- unpacking offline delivery artifacts to standard runtime directories
- checking host environment, resources, Docker, Compose, ports, and basic commands
- rendering installation configuration and `compose.rendered.yaml`
- loading offline Docker images and starting AGIOne services
- importing Nacos configuration and waiting for core service registration
- printing installation results, service status, diagnostic reports, and handover packages

### Recommended reading path

- **First installation**: read [Quick Install](#quick-install)
- **Graphical interaction required**: read [Advanced Installation](#advanced-installation)
- **Installation failure or delivery acceptance**: read [Operations Documentation](#operations-documentation)
- **Force install, skip checks, or data recovery**: read [FAQ](#faq)

### Standard directories

| Type | Path |
| --- | --- |
| Release source directory | `agione-release-v1.0-XXX` |
| Installer runtime directory | `/opt/agione-installer-bundle` |
| AGIOne runtime data directory | `/opt/hyperone` |
| Offline Python runtime | `/opt/agione-python` |
| Installation reports and diagnostics | `/opt/agione-installer-bundle/reports` or the `reports` directory in the current bundle |

---

## Getting Started

### Bundle verification

To confirm delivery artifact integrity:

```bash
./agione verify-bundle
```

`verify-bundle` validates split-bundle file SHA-256 checksums against `SHA256SUMS`. A missing `SHA256SUMS`, unsafe entry, missing file, or checksum mismatch causes failure. Reacquire the package instead of bypassing the error. The download-page MD5 does not replace this check or the independent production check of the outer archive SHA-256.

`AGIONE_SKIP_BUNDLE_VERIFY=1` skips SHA-256 integrity verification only. It is a high-risk switch for troubleshooting a trusted local package and must not be used for formal delivery.

---

## Advanced Installation

### TUI interactive installation

If you need to confirm parameters, resource policy, node information, and the installation plan page by page, use:

```bash
chmod +x ./agione
./agione install
```

The TUI flow includes:

1. Welcome
2. System Check
3. Offline Package Check
4. Install Overview
5. Module Selection
6. Basic Info
7. Middleware Config
8. Resource Policy
9. Node Input
10. Start Install
11. Execute
12. Result

It is suitable for formal delivery, customer on-site demonstrations, or scenarios that require manual configuration confirmation.

### Configuration review

Before installation, generate a desensitized configuration review report:

```bash
./agione review-config
```

The report usually includes:

- installation mode
- access address
- database, Redis, Nacos, Kafka, and MinIO configuration summaries
- resource policy
- key paths
- risk prompts

### Resource policy

The installer supports two resource policies:

| Policy | Description |
| --- | --- |
| Docker default resource policy | Recommended by default; does not write `cpus` / `mem_limit` / `mem_reservation` into `compose.rendered.yaml` |
| Manual resource quota | Installation engineers fill CPU, memory limit, and memory reservation for each service |

For general delivery, use the default policy to avoid over-restricting service resources across different customer host specifications.

---

## Operations Documentation

### Common commands

```bash
./agione help
./agione ps
./agione health
./agione services status
./agione services enable kubem --dry-run
./agione restart <service>
./agione stop <service>
./agione down
./agione doctor
./agione handover
```

### View service status

```bash
./agione ps
```

Or enter the installation directory and view Compose status:

```bash
cd /opt/agione-installer-bundle/outputs/agione-app
docker compose -f compose.rendered.yaml ps
```

If the system uses legacy Compose:

```bash
docker-compose -f compose.rendered.yaml ps
```

### Restart services

Restart all services:

```bash
./agione restart
```

Restart specified services:

```bash
./agione restart core_upms md_gateway nginx
```

### Health check

```bash
./agione health
```

The health check report is used for delivery acceptance and failure troubleshooting. Archive it after installation is complete.

### Incrementally enable optional services after installation

After a single-node installation is complete, optional services can be enabled without rerunning `quick` or recreating existing containers. From a complete bundle directory that matches the installed CPU architecture, inspect status and run the read-only preflight first:

```bash
./agione services status
./agione services enable kubem --dry-run
./agione services enable kubem
```

Use commas or spaces to preflight or enable multiple groups:

```bash
./agione services enable kubem,cloud --dry-run
./agione services enable kubem cloud
```

Single-node incremental enablement supports these groups:

| Group | Added services | Description |
| --- | --- | --- |
| `kubem` | `core_kubem`, `core_codelab`, `core_iam` | Also runs the business initialization required by KUBEM |
| `cloud` | `core_sgeneral`, `core_saws`, `core_saliyun`, `core_general`, `core_aliyun` | Enables cloud provider integration services |

`core_isync` cannot be enabled incrementally on a single-node deployment. It is available only in host-mode when the primary/standby database prerequisites are met. `services enable` checks installation completion state, final configuration, ports, container names, Nacos configuration, runtime assets, and offline images. Missing images are loaded only from the verified bundle and are never pulled from a public registry. `--dry-run` does not change Compose, containers, or saved configuration.

`services status` reports a group as `enabled`, `disabled`, or `partial`. In a compatible host-mode deployment, `core_isync` may also be reported as `prepared (installed, not started)`. This means its offline assets and images are already on the standby node, but its containers have not been created or started. See [Multi-node Installation](./agione-multi-node-install#_4-7-incrementally-enable-optional-services-after-installation).

A real enable operation starts only the newly requested services and verifies that existing containers are not recreated or restarted. The installer rolls back the current transaction on failure and tries to recover an interrupted transaction before the next real operation. Re-enabling an already healthy group succeeds as a no-op. The command currently supports enablement only, not disablement.

After success, run:

```bash
./agione services status
./agione health
```

The command updates `outputs/final-result-config.yml` in the installed target. Archive this file. If `/root/agione-install.yml` will be used for a later full reinstall, add the newly enabled groups there as well so the reinstall configuration does not fall back.

### Diagnostic package

After an installation failure, run first:

```bash
./agione doctor
```

The diagnostic package usually includes:

- system check results
- configuration snapshots
- Compose file
- service status
- log summary
- failure classification and suggested commands

### Handover package

After successful installation, export a handover package:

```bash
./agione handover
```

The handover package can be used for customer acceptance, internal archiving, and later operations handover.

### Stateful backup and recovery

If MariaDB, Nacos, MinIO, InfluxDB, or generated installer configuration needs backup or restore, review the recovery plan first:

```bash
scripts/agione_stateful_recovery.sh plan
```

For backup, MinIO and InfluxDB consistent filesystem backup requires allowing a brief service stop:

```bash
AGIONE_ALLOW_BRIEF_SERVICE_STOP=1 scripts/agione_stateful_recovery.sh backup
```

Verify the archive before restore:

```bash
scripts/agione_stateful_recovery.sh verify --archive /path/to/agione-stateful-backup-v1-*.tar.gz
```

Restore changes runtime data and requires the confirmation environment variables printed by the script. In production, confirm the service-stop window and rollback plan with the customer before restoring.

---

## FAQ

### Q1: How do I choose between `quick` and `install`?

- To install as quickly as possible: use `./agione quick`
- To confirm configuration step by step: use `./agione install`
- To only run checks without installation: use `./agione doctor`

### Q2: What if the target host does not have `python3`?

No manual installation is required. The bundle includes an offline Python runtime, and the installer prepares `/opt/agione-python` first.

### Q3: Why is detected memory not exactly 16 GiB after requesting 16G?

Cloud hosts, virtualization platforms, and operating systems reserve part of the memory, so the detected value can be lower than the purchased specification. The installer requires at least `12GiB` detected memory, while 16 GiB remains the recommended request profile for smoother startup and operation.

### Q4: How does the installer choose the disk for runtime data?

When `agione_app.runtime_root` is left as `/opt/hyperone`, the installer scans physical data-disk mounts first and selects `<mount>/hyperone` when the free space is about `160GiB` or above. If no suitable data disk exists, it checks `/opt/hyperone` on the system disk. If `runtime_root` is explicitly configured, the installer respects that path and validates the filesystem behind it.

### Q5: Can system check failures be skipped?

Skipping is not recommended. System check failures usually mean later risks such as OOM, initialization timeout, service registration failure, or slow database startup.

If it is confirmed to be a temporary integration or demo environment, follow the installer UI prompt to execute the hidden override action. `quick` mode also supports:

```bash
./agione quick --skip-system-check
```

This parameter only skips pre-install checks. During execution, the installer still checks and attempts to use offline assets to install or repair Docker / Compose. Skipping checks may expose resource, port, or runtime issues only after runtime data has been unpacked. It is not recommended for formal delivery.

### Q6: When should controlled force reinstall be used?

Use it only after confirming that the existing AGIOne runtime data can be deleted, required data has been backed up separately, and the environment must be rebuilt from the current bundle:

```bash
./agione quick --file /root/agione-install.yml --force-overwrite
```

`-f PATH` is an alias for `--file PATH`; it selects the configuration file and never grants overwrite permission. `--force-overwrite` must run through `./agione quick` or the TUI workflow from the current bundle. Direct `unpackage` or `installer/cli.py` execution cannot replace a completed deployment.

The installer first runs mandatory configuration, topology, resource, runtime-ownership, and bundle-binding checks. It stops old services and removes managed `core`, `database`, and `minstore` runtime data only after every check passes. If authorization cannot be bound securely, runtime data remains unchanged.

### Q7: Does force reinstall back up old data automatically?

No. `--force-overwrite` removes old managed runtime data. Create and verify a backup first as described in [Stateful backup and recovery](#stateful-backup-and-recovery), and record the customer-approved service-stop window and rollback plan. Do not use force reinstall as a routine production upgrade path.

### Q8: What should I do if Nacos configuration is missing or services fail to start?

Run first:

```bash
./agione doctor
./agione health
./agione ps
```

Then view failed service logs:

```bash
docker logs <container-name> --tail 300
```

Common causes include missing Nacos configuration import, inconsistent Redis password, database not ready, images not loaded, or insufficient host resources.

### Q9: What information should be handed over after installation?

At minimum, hand over:

- access address
- customer-facing initial account information
- `/opt/agione-installer-bundle` path
- `/opt/hyperone` path
- `health` report
- `handover` package
- if force installation is used, record the backup path

---

## Appendix: Recommended Installation Flow

```bash
# 1. Enter the bundle directory
cd /opt/hyperone/agione-release-v1.0-XXX

# 2. Grant execute permission to the entry script
chmod +x ./agione

# 3. Verify the bundle (required for formal delivery)
./agione verify-bundle

# 4. One-click installation
./agione quick

# 5. Acceptance
./agione health
./agione ps

# 6. Export handover package
./agione handover
```
