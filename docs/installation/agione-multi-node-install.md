# AGIOne Multi-Node Environment Installation and Deployment Guide

## Introduction

| Item | Content |
|------|---------|
| Applicable Role | Production delivery engineer, field implementation engineer, customer platform operations engineer |
| Navigation Path | Deployment > AGIOne Multi-Node Installation |
| Function Description | Guides users through AGIOne host-mode multi-node deployment, including node planning, configuration preparation, precheck, installation, and acceptance |

Compared with single-node deployment, multi-node deployment adds three key tasks: **plan node roles, prepare `/root/agione-install.yml`, and verify SSH and middleware connectivity**. If this is your first deployment, use the timeline below to understand the full flow before running commands.

### Beginner Explanation

Multi-node installation is not a different product package. It is the same AGIOne installer running with a host-mode topology: you tell the installer which private IPs are App / Edge nodes, which node runs middleware, and which node is the database standby; the installer renders and synchronizes the required files for each host.

## Deployment Timeline

| Stage | What You Do | Completion Signal |
| --- | --- | --- |
| Step 1: Select mode | Choose self-managed middleware, managed middleware, or hybrid middleware | `self-managed`, `managed-middleware`, or `hybrid` is confirmed |
| Step 2: Plan nodes | Confirm App nodes, middleware node, standby database node, and expansion nodes | Node IPs, roles, SSH users, and ports are ready |
| Step 3: Fill YAML | Copy the minimal template from the configuration reference and add passwords, endpoints, domains, and optional services | `/root/agione-install.yml` is ready for installation |
| Step 4: Run precheck | Run `./agione doctor --file /root/agione-install.yml` with the same YAML | SSH, ports, disk, and middleware connectivity checks pass |
| Step 5: Install | Run `./agione quick --file /root/agione-install.yml` | Installation result shows success |
| Step 6: Accept and hand over | Run `health`, `ps`, and `handover`, then archive results | Browser access works, reports and account information are handed over |

## Terminology Quick Reference

| Term | Plain Explanation |
| --- | --- |
| Host-mode | Multi-node deployment mode where the installer renders per-host Compose files and port bindings based on host IPs |
| App / Edge node | Node that runs Nginx, Gateway, and core business services; user traffic usually enters here |
| Middleware node | Node that runs self-managed MariaDB, Redis, Nacos, Kafka, and MinIO / MinStore |
| Standby database node | Node that runs MariaDB standby for replication and data redundancy |
| Managed middleware | Middleware provided by a cloud provider or existing customer service; AGIOne connects to endpoints instead of deploying the component locally |
| Hybrid middleware | Some components are self-managed and others are managed, such as RDS for database while Redis and Nacos remain self-managed |
| `services` | Post-install command for inspecting or incrementally enabling optional application service groups |
| `agione_app.topology` | YAML section that describes node IPs, SSH users, ports, and passwords |
| `host_mode_service_placements` | Advanced service placement field used to manually assign services to specific machines |

## 1. Document Description

This document guides operators through AGIOne host-mode multi-node installation in offline or restricted-network environments.

Before installation, complete the quick environment assessment to confirm whether resources, network access, ports, offline assets, and data risks meet go-live prerequisites:

- [Quick Environmental Investigation](/product/investigation/quick-env-investigation)
- [Pre-install Environment Check](./agione-precheck-environment-check)
- [Deployment Requirements](./agione-deployment-requirements)

The default self-managed multi-node topology requires at least 4 machines and supports up to 8 machines. The installer only needs machine IPs and maps roles automatically:

| Order | Role | Default services |
| --- | --- | --- |
| Machine 1 | Primary App / Edge node | Nginx, Gateway, core_common, core Java services |
| Machine 2 | Secondary App / Edge node | Nginx, Gateway, core Java services |
| Machine 3 | Middleware node | MariaDB primary, Redis, Nacos, Kafka, Kafka UI, MinIO / MinStore |
| Machine 4 | Standby database node | MariaDB standby; the installer can initialize primary/standby replication |
| Machines 5-8 | Additional App / Edge nodes | Additional copies of App / Edge services |

Middleware deployment supports three modes:

| Mode | Description | Minimum machines |
| --- | --- | --- |
| `self-managed` | Default mode. The installer deploys MariaDB, Redis, Nacos, Kafka, and MinIO / MinStore on host-mode nodes | 4 |
| `managed-middleware` | All middleware uses external managed endpoints; target machines only run App / Edge services | 2 |
| `hybrid` | Each middleware component can be self-managed or external managed, for example RDS for database while Nacos / Redis / Kafka / object storage remain self-managed | 3 when database is managed, 4 when database is self-managed |

Both `managed-middleware` and `hybrid` need middleware endpoint hosts, ports, accounts, and passwords. The recommended approach is to keep these endpoint values directly in the main installation YAML under `agione_app.db`, `agione_app.redis`, `agione_app.nacos`, `agione_app.kafka`, and `agione_app.minio`, together with `agione_app.middleware`. `--middleware-endpoints-file` is retained only as a compatibility option for older delivery runbooks. In TUI mode, enter endpoint values directly in the interface. `hybrid` additionally uses component deployment mode to declare how each middleware component is deployed.

Confirm installation-time configuration before starting a production run. The recommended approach is to keep it in `/root/agione-install.yml`; TUI mode can collect middleware endpoints and node information, while advanced frontend access, optional service groups, and default account policy should be fixed in YAML. Minimal templates for multi-node self-managed middleware, managed middleware, and hybrid middleware are in the [Installation Configuration Reference](./agione-install-config-reference), which is ordered as required fields, common fields, scenario fields, and advanced fields.

| Item | Configuration path | Installation effect |
| --- | --- | --- |
| Node topology and SSH credentials | `agione_app.topology` | Defines App / Edge nodes, middleware node, standby database node, and per-node SSH authentication |
| Middleware endpoints | `agione_app.middleware`, `agione_app.db`, `redis`, `nacos`, `kafka`, `minio` | Controls self-managed / managed / hybrid middleware mode and writes AGIOne runtime connection settings |
| Domain, certificate, frontend root | `agione_app.frontend` | Rendered into Nginx configuration; configured certificate and frontend paths are mounted into Nginx containers |
| Optional application service groups | `agione_app.start_optional_app_services` | Enables extra application services by group, such as `kubem`, `cloud`, and `core_isync` |
| Default console accounts | `agione_app.default_access` | Generates customer-facing installation-time passwords for `operator` and `provider`; `provider` receives `Creator` and `cbdp_buyer` roles |

If `agione_app.frontend.public_access_url` and `agione_app.frontend.domain` are both empty, the installer prints the default access URL based on the App / Edge entry IP and port `18090`.

The recommended browser entry is machine 1 or the entry address behind an external load balancer:

```text
http://<app-entry-ip>:18090/modelone/
```

Standard directories:

| Type | Path |
| --- | --- |
| Release source directory | `agione-release-v1.0-XXX` |
| Installer runtime directory | `/opt/agione-installer-bundle` |
| AGIOne runtime data directory | `/opt/hyperone` |
| Offline Python runtime | `/opt/agione-python` |
| Offline installation assets | `/opt/agione-offline` |

Multi-node installation uses SSH copy distribution by default. The installer distributes the installer, compose files, manifest, database configuration, and rendered Nginx configuration over SSH: the full bundle uses `rsync` when available and falls back to `tar` over SSH; small configuration files use `scp`. When NFS code sharing is enabled, only backend `<runtime_root>/core/metis` and frontend `<runtime_root>/core/mamba` are shared. `runtime_root` may be `/opt/hyperone` on the system disk or `/data/hyperone` on a selected data disk. Host-mode rendered configuration, Nginx configuration, database data, MinStore data, logs, and Docker data are not shared. The installer renders a per-Nginx-node `nginx.conf` during artifact generation instead of modifying the remote baseline config with regular expressions. After installation, if host-mode configuration changes are made, run:

```bash
./agione sync-host-mode
```

This command requires a previous `quick` or TUI `install` run so that host-mode output files already exist. It is a one-time rendered configuration sync command and does not continuously watch configuration directories. NFS code sharing does not replace this configuration sync because NFS only shares `core/metis` and `core/mamba`.

---

## 2. Prerequisites

### 2.1 Operating system and permissions

Use Linux servers and run the installer as `root`. The default SSH user is `root`, and the default SSH port is `22`.

The initiating machine must be able to SSH to every target node, including its own target IP when it is part of the topology. Passwordless SSH is recommended. Password authentication is also supported when the initiating machine has `sshpass` installed.

To customize SSH access, prefer the main installation YAML: set `agione_app.topology.ssh_user`, `agione_app.topology.ssh_port`, and optional `agione_app.topology.ssh_password` for global defaults. When different machines require different SSH users, ports, or passwords, configure `agione_app.topology.ssh_credentials` in `/root/agione-install.yml`. This keeps all pre-install configuration in one file and reduces command-line delimiter and shell escaping issues. For SSH, middleware, and default account passwords, use only letters, digits, and underscores when possible.

The installation writes to these directories:

```text
/opt/agione-installer-bundle
/opt/hyperone
/opt/agione-python
/opt/agione-offline
```

### 2.2 Node count

The default `self-managed` host-mode multi-node deployment requires 4 to 8 distinct machine IPs. Machine IPs must be private IPv4 addresses. Do not use public IPs or public DNS names. The installer uses this private IP for SSH, Nacos registration / discovery, Nginx upstreams, database / Redis / Kafka / MinIO connections, and Docker port binding.

If fewer than 4 machines are provided, the installer blocks the installation. The minimum 4-machine role layout is:

| Machine count | Supported | Description |
| --- | --- | --- |
| 1-3 | No | Does not satisfy the minimum layout: two App nodes, one middleware node, and one standby DB node |
| 4 | Yes | Two App / Edge nodes, one middleware node, and one standby database node |
| 5-8 | Yes | Machines 5 and later are additional App / Edge nodes |

When external managed middleware is selected:

| Middleware mode | Node count requirement |
| --- | --- |
| `managed-middleware` | 2 to 8 App / Edge machines |
| `hybrid` with managed database | 3 to 8 machines: two App / Edge nodes plus one self-managed middleware node; machine 4 and later become additional App / Edge nodes |
| `hybrid` with self-managed database | 4 to 8 machines: two App / Edge nodes, one self-managed middleware node, and one standby DB node; machine 5 and later become additional App / Edge nodes |

### 2.3 Runtime dependencies

The installer tries to complete runtime dependencies from bundled offline assets, including the Python runtime, Docker / Compose, offline Docker images, AGIOne runtime assets, database baseline resources, and MinStore baseline resources.

Target nodes do not need Docker preinstalled. Multi-node preflight reports Docker / Compose status; if they are missing, the installation phase tries to install or repair them from the offline bundle. If the bundle does not include the required offline Docker packages or image archives, installation fails.

Remote nodes should provide at least:

| Dependency | Description |
| --- | --- |
| `bash` | Executes remote installation scripts |
| `tar` | Extracts installation assets |
| `python3` or `python` | Runs remote preflight helper logic |
| `sha256sum` or `shasum` | Runs the SHA-256 capability preflight and file verification before bundle synchronization and unpacking |
| `ssh` service | Accepts SSH login from the initiating machine; passwordless login is recommended, password authentication requires local `sshpass` |

### 2.4 Existing data protection

If a target node already has `<runtime_root>/core`, `<runtime_root>/database`, `<runtime_root>/minstore`, or `<runtime_root>/.agione-install-complete`, the installer blocks overwrite by default to avoid deleting existing runtime data. The runtime root may be the default `/opt/hyperone` or a selected data-disk path such as `/data/hyperone`.

After a failed run, do not delete only one or two runtime directories manually and rerun immediately. Multi-node installation checks App, middleware, standby, and completion-marker state together; leftovers can cause preflight failure or inconsistent role state.

For repeated reinstall testing, preview cleanup first:

```bash
./agione reset-host-mode --dry-run
```

This local preview does not open SSH connections.

If the nodes use different SSH users, ports, or passwords, use the same main installation YAML used by quick:

```bash
./agione reset-host-mode --dry-run --file /root/agione-install.yml
```

To verify the remote cleanup script on each node without deleting data, use:

```bash
./agione reset-host-mode --remote-dry-run --file /root/agione-install.yml
```

Then execute cleanup after confirmation:

```bash
./agione reset-host-mode --yes --file /root/agione-install.yml
```

For simple CLI-only cleanup, node IPs can still be passed directly:

```bash
./agione reset-host-mode --yes --nodes <ip1>,<ip2>,<ip3>,<ip4>
```

If cleanup is not run first and old runtime data must deliberately be replaced through a controlled installation workflow, use `--force-overwrite` only with `quick` or the TUI installation command. `-f PATH` is an alias for `--file PATH`; it selects the main installation YAML and never grants overwrite permission. Force reinstall does not create a backup automatically. Complete the stateful backup and confirm the production service-stop and rollback plans first.

---

## 3. Network Configuration

### 3.1 Node connectivity

Confirm the following before installation:

| Source | Target | Requirement |
| --- | --- | --- |
| Initiating machine | All target nodes | SSH port `22` is reachable by default; use root passwordless SSH or provide SSH credentials |
| App / Edge nodes | Middleware node | MariaDB, Redis, Nacos, Kafka, and MinIO / MinStore are reachable |
| Standby database node | Middleware node | MariaDB primary port `3306` is reachable |
| Browser or load balancer | App / Edge nodes | Port `18090` is reachable |

### 3.2 External access ports

| Port | Role | Purpose |
| --- | --- | --- |
| `18090` | App / Edge node | AGIOne Web entry |
| `80` | App / Edge node | Nginx HTTP entry |
| `8089` | App / Edge node | Job proxy entry |
| `22` | All nodes | SSH operations and installation distribution |

### 3.3 Role port occupancy check

Host-mode multi-node no longer uses Docker `network_mode: host`. The installer generates bridge-network Compose files for each node and explicitly binds cross-node service ports to that node private IP, for example `192.168.x.x:18090:18090`. This avoids exposing container listeners on the public IP. Before starting services, the installer still checks critical ports and stops on blocking port conflicts.

| Role | Critical ports |
| --- | --- |
| App / Edge node | `80`, `18090`, `8089`, `8080`, `3000`, `4000`, `5007`, `7002`, `7003`, `8031`, `8032`, `8033`; `8021`, `8022`, and `18088` when `kubem` is explicitly enabled |
| Middleware node | `3306`, `6379`, `8848`, `8849`, `9848`, `9849`, `9092`, `9093`, `18091`, `8080`, `9000`, `9001` |
| Standby database node | `3306`; `7091`, `18181`, and `18082` when the `core_isync` service group is enabled |

Optional application services are not enabled by the IP-based quick path by default. When `start_optional_app_services` is explicitly configured, the installer enables services by group:

| Group | Services | Ports and constraints |
| --- | --- | --- |
| `kubem` | `core_kubem`, `core_codelab`, `core_iam` | `core_kubem` uses `8021`, `core_codelab` uses `8022`, and `core_iam` uses `18088`. Port conflicts are treated as optional-service warnings. |
| `cloud` | `core_sgeneral`, `core_saws`, `core_saliyun`, `core_general`, `core_aliyun` | Cloud provider integration services use `8011`, `8017`, `8012`, `8001`, and `8002`. |
| `core_isync` | `core_isync`, `influxdb3` | Supported only with self-managed MariaDB and a standby database node. Placed on the same node as `db_mariadb_standby` by default. Uses `7091`, `18181`, and `18082`. |

### 3.4 Offline environment

For offline installation, ensure the bundle includes the installer core package, AGIOne application package, Docker offline package, Docker image package, database baseline package, MinStore baseline package, offline Python runtime, `SHA256SUMS`, and `bundle-manifest.json`.

The `Enable offline delivery asset integrity checks` switch in the TUI only validates local bundle assets. It does not download missing packages from the public internet. Managed middleware is supported through `managed-middleware` and `hybrid`; when external endpoints are selected and `verify_connectivity` is enabled, the installer checks endpoint reachability from App / Edge nodes during preflight.

---

## 4. Product Installation

### 4.1 Required machine resources

The following requirements apply to each machine:

| Item | Recommended value | Current installer check |
| --- | --- | --- |
| Operating system | Linux | Ubuntu 22.04 is recommended |
| CPU | 8 cores | CPU count must be at least 8 cores |
| Memory | 16 GiB recommended | The installer requires at least `12GiB` detected memory; 16 GiB remains the recommended request profile |
| Free disk | 200 GiB | With the default `runtime_root`, each node prefers a data disk with about `160GiB` or more free space; if no suitable data disk exists, the system disk path `/opt/hyperone` is checked |

Architecture support: AGIOne can be deployed on both x86_64 and ARM64 / AArch64 machines. For one multi-node deployment batch, use the installation bundle that matches the target CPU architecture and keep node architectures consistent unless the release note explicitly states mixed-architecture support.

To override the minimum disk threshold for a special delivery environment, set:

```bash
export AGIONE_MIN_DISK_FREE_GIB=160
```

Or set it by ratio:

```bash
export AGIONE_DISK_TOLERANCE_RATIO=0.80
```

### 4.2 Package acquisition

Open the fixed download page on the initiating machine first, then copy the package link from `Download URL`. After extraction, the directory name is determined by the top-level directory inside the archive, for example `agione-release-v1.0-XXX/`. Download it on the initiating machine first; the installer synchronizes it to the other target nodes during multi-node installation.

Fixed download page: [Download link]({{DOCS_RELEASE_PAGE_URL_EN}})

The page also provides an `MD5 URL`. Verify it after download. MD5 detects download or transfer corruption, but does not authenticate the package publisher. For a production delivery, independently obtain the outer `.tar.gz` SHA-256 digest through an access-controlled delivery channel and compare it as well.

It is recommended to run the installation from machine 1, the primary App / Edge node:

```bash
ssh root@<app-node-1>
AGIONE_RELEASE_PAGE="{{DOCS_RELEASE_PAGE_URL_EN}}"
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

Typical extracted bundle contents:

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

`verify-bundle` validates split-bundle file SHA-256 checksums against `SHA256SUMS`. A missing `SHA256SUMS`, unsafe entry, missing file, or checksum mismatch causes failure. Reacquire the package instead of bypassing the error. The download-page MD5 does not replace this check or the independent production check of the outer archive SHA-256.

Before synchronizing a host-mode bundle, the installer verifies that every target node has either `sha256sum` or `shasum`; one failed node stops the operation. `AGIONE_SKIP_BUNDLE_VERIFY=1` skips SHA-256 verification only. It is a high-risk switch for troubleshooting a trusted local package and must not be used for formal delivery.

### 4.4 Execute installation

For the standard multi-node scenario, write the node topology, SSH credentials, middleware endpoints, frontend access, optional service groups, and default account policy in one main installation YAML, then run `quick` with that YAML:

```bash
chmod +x ./agione
./agione quick --file /root/agione-install.yml
```

Start by copying the minimal YAML for the matching scenario from the [Installation Configuration Reference](./agione-install-config-reference), then add SSH settings, domains, certificates, managed middleware endpoints, or optional service groups as needed.

After backing up required data, use the following command only when old AGIOne runtime data must be replaced after prechecks pass:

```bash
./agione quick --file /root/agione-install.yml --force-overwrite
```

Run this command through the `./agione` launcher in the current complete bundle; do not call `installer/cli.py` directly. The installer binds the target directory, runtime root, configuration fingerprint, and `SHA256SUMS` fingerprint to the precheck and stops old services or removes managed runtime data only after all checks pass. The release directory may be inside `runtime_root`, but it cannot exactly equal `<runtime_root>/core`, `<runtime_root>/database`, or `<runtime_root>/minstore`.

Example with NFS backend/frontend code sharing enabled:

```bash
./agione quick \
  --file /root/agione-install.yml \
  --host-mode-shared-storage nfs
```

By default, the primary app node is used as the NFS server. The shared relative paths are fixed to `core/metis` and `core/mamba` under the selected `runtime_root`. To specify the NFS server or mount options:

```bash
./agione quick \
  --file /root/agione-install.yml \
  --host-mode-shared-storage nfs \
  --host-mode-nfs-server 192.168.31.204 \
  --host-mode-nfs-mount-options rw,sync,hard,intr
```

NFS nodes need NFS server / client capability. In offline environments, place OS-matching `.rpm` / `.deb` packages under `assets/offline/nfs` before building the release bundle. After unpacking, the installer checks `/opt/agione-installer-bundle/assets/offline/nfs`; if `exportfs` or `mount.nfs` is missing, `setup-nfs` installs these offline packages first, then falls back to the OS package manager only when needed.

#### Managed middleware / cloud-native delivery flow

For cloud-native delivery, use managed middleware to replace part or all of the self-managed middleware node. A typical flow is:

> **Compatibility gate**: Formal delivery may use only the Alibaba Cloud or Huawei Cloud products, versions, and access modes listed in the [cloud middleware compatibility matrix](./agione-deployment-requirements#_5-1-2-databases-and-middleware). Databases are limited to the MySQL-family RDS MariaDB baselines in that matrix; Dameng, Kingbase, GaussDB, openGauss, OceanBase, TiDB, PostgreSQL, and similar alternatives are unsupported. Treat any other provider, product version, or untested protocol as unsupported even when its endpoint is reachable.

1. Prepare 2 to 8 App / Edge nodes in the same private network, or confirm private connectivity between App / Edge nodes and the managed middleware VPC.
2. Following the compatibility matrix, prepare the specified managed database, Redis, Nacos, Kafka, and object-storage products and versions through the customer cloud console, the optional provider helper, or existing customer resources.
3. Generate or merge `/root/agione-install.yml`, including node topology, SSH credentials, middleware endpoints, domain / certificate settings, optional service groups, and default account policy.
4. Confirm Nacos behavior. If the installer should publish configs, the configured Nacos account must have config publish permission in namespace `agione-prod`. If the customer has already imported all AGIOne configs, set `agione_app.nacos.assume_preimported_configs: true`.
5. Run `./agione quick --file /root/agione-install.yml` or use TUI installation with the same field values.

The cloud resource helper is optional and provider-specific. It can create or reuse resources and render the main installation YAML, but the AGIOne installer itself only reads the final endpoint fields from `/root/agione-install.yml`. Cloud account AK/SK is not required by the AGIOne installer for Nacos config publishing; Nacos publishing uses the native Nacos OpenAPI with `agione_app.nacos.username` and `agione_app.nacos.password`.

Private network connectivity is preferred for managed middleware. Public ELB / EIP exposure should be used only for test or special delivery cases with strict source IP restrictions. Kafka should use the managed Kafka service's advertised listener mechanism; do not assume a shared TCP ELB can replace Kafka broker advertised addresses.

Managed Kafka also requires a topic policy decision. If broker-side topic auto-creation is enabled, or the delivery team explicitly accepts runtime creation of required AGIOne topics, set `agione_app.kafka.auto_create_topics: true`. If it stays `false`, the installer checks that required topics already exist. Create missing topics in the cloud console first; if the installer should create them, the Kafka account must have topic management permission and `AGIONE_MANAGED_KAFKA_CREATE_TOPICS=1` must be set before installation.

When all middleware components use external managed endpoints, configure `agione_app.middleware.mode: managed-middleware` and the endpoint fields in the main installation YAML, then run:

```bash
./agione quick --file /root/agione-install.yml
```

When some middleware components are external managed and others remain self-managed by the installer, set `agione_app.middleware.mode: hybrid` and configure each component mode:

```bash
./agione quick --file /root/agione-install.yml
```

`--middleware-mode managed-middleware` and `--middleware-mode hybrid` remain available as command-line overrides for temporary tests, but production delivery should keep the selected mode in `/root/agione-install.yml`.

Unified installation YAML example:

```yaml
# /root/agione-install.yml
global_config:
  deploy_mode: host-mode
  language: en_US

selected_modules:
  - agione-app

agione_app:
  node_mode: host-mode
  topology:
    ssh_user: root
    ssh_port: 22
    app_nodes:
      - 192.168.31.204
      - 192.168.31.207
    middleware_node: 192.168.31.208
    backup_nodes:
      - 192.168.31.209
    ssh_credentials:
      192.168.31.204:
        user: root
        port: 22
        password: "Password_204"
      192.168.31.207:
        user: admin
        port: 2222
        password: "Password_207"
      192.168.31.208:
        user: root
        port: 22
      192.168.31.209:
        user: ops
        port: 2209
        password: "Password_209"
  middleware:
    mode: hybrid
    provider: generic
    verify_connectivity: true
    database:
      mode: managed
    redis:
      mode: self-managed
    nacos:
      mode: self-managed
    kafka:
      mode: managed
    object_storage:
      mode: self-managed
  db:
    host: rds-mariadb.internal.example.com
    port: 3306
    root_username: root
    root_password: "DbRoot_2026"
    ssl: false
  redis:
    host: 192.168.31.208
    port: 6379
    password: "Redis_2026"
  nacos:
    host: 192.168.31.208
    port: 8848
    namespace: agione-prod
    username: nacos
    password: "Nacos_2026"
    auth_token: "QWdJT25lX05hY29zX0F1dGhUb2tlbl8yMDI2X1BsZWFzZVJlcGxhY2VfNDhCeXRlcw=="
  kafka:
    bootstrap_servers: kafka-1.internal.example.com:9092
    security_protocol: PLAINTEXT
    auto_create_topics: true
  minio:
    endpoint: http://192.168.31.208:9000
    api_direct_host: 192.168.31.208:9000
    web_direct_host: 192.168.31.208:9001
    access_key: "MinioAccess_2026"
    secret_key: "MinioSecret_2026"
```

In this example, application nodes, the middleware node, the standby node, and per-node SSH credentials all live in `/root/agione-install.yml`. Database and Kafka use external endpoints; Redis, Nacos, and object storage are still deployed on `192.168.31.208` by the installer. Redis can still keep `agione_app.redis.mode: standalone`; component deployment mode should be written under `agione_app.middleware.redis.mode` so it is not confused with the Redis runtime mode.

Frontend access, optional service groups, and default account policy are written in the same YAML:

```yaml
agione_app:
  frontend:
    domain: ""
    public_access_url: ""
    ssl_certificate_path: ""
    ssl_certificate_key_path: ""
    frontend_root: ""
  start_optional_app_services:
    - kubem
    - cloud
  default_access:
    generate_random_passwords: true
    password_length: 20
```

Customer-facing default account passwords are generated for each installation unless explicit passwords are configured. The generated passwords are 6 to 32 characters and use only uppercase letters, lowercase letters, digits, and underscores. The final installation result prints the actual `operator` and `provider` passwords; save them through the customer-approved credential handover process.

Compatibility options remain available for older runbooks. `--host-mode-ips` or repeated `--host-mode-ip` can still provide machine IPs directly, and `--host-mode-nodes-file` can still load a legacy node credential file. New deliveries should keep node IPs, SSH credentials, middleware endpoints, frontend access, and default account policy in `/root/agione-install.yml`. If `--host-mode-ips` is used together with `--host-mode-nodes-file`, the IP order from `--host-mode-ips` controls role mapping, and the node file only supplies SSH credentials for those IPs.

For 5 to 8 machines, append additional App / Edge nodes:

```yaml
agione_app:
  topology:
    app_nodes:
      - 192.168.31.204
      - 192.168.31.207
      - 192.168.31.210
```

For ad hoc CLI-only testing, you can also repeat `--host-mode-ip`:

```bash
./agione quick \
  --host-mode-ip 192.168.31.204 \
  --host-mode-ip 192.168.31.207 \
  --host-mode-ip 192.168.31.208 \
  --host-mode-ip 192.168.31.209
```

`quick` automatically performs:

1. Runs checks in a temporary `/tmp/agione-quick-check.*` workspace, without unpacking runtime data before checks pass.
2. Validates private machine IPs, rejects duplicate IPs, and applies the node-count rule for the selected middleware mode.
3. Runs multi-node remote preflight: SSH, remote resources, `bash` / `tar` / `python`, existing runtime data, role port occupancy, and Docker / Compose status reporting.
4. After preflight passes, unpacks the installer to `/opt/agione-installer-bundle` and writes runtime data to `/opt/hyperone`.
5. Renders host-mode compose files, manifest, and MariaDB primary/standby configuration.
6. Synchronizes the installer bundle, compose files, and configuration to each node.
7. Prepares or repairs Docker / Compose on each node and loads offline images.
8. Starts self-managed middleware and standby DB services according to component deployment mode; when the database is managed, local standby and replication initialization are skipped.
9. Imports Nacos configuration, prepares the Nginx upstream, starts core_common and application services.
10. Runs business initialization, executes the host-mode health check, and writes completion markers.

`--skip-system-check` is intended only for temporary integration or troubleshooting. It skips the local pre-install system check; when host-mode IPs are provided, it also skips remote node preflight. The execution phase still checks and attempts to install or repair Docker / Compose from bundled offline assets. Skipping checks can expose remote data, port, or resource failures only after `/opt/hyperone` has been unpacked, so it is not recommended for formal delivery.

For interactive confirmation, run:

```bash
./agione install
```

In the TUI, you can choose the middleware deployment mode directly. You do not need to pre-create an endpoint YAML file:

- Select "Self-managed middleware" to use the default 4 to 8 machine host-mode layout with application, middleware, and standby database nodes.
- Select "All external managed middleware" to enter the database, Redis, Nacos, Kafka, and object storage hosts, ports, usernames, and passwords on the next page. The installer generates the endpoint configuration required by installation automatically.
- Select "Hybrid per-component mode" to choose which components use external managed middleware on the next page, then fill their connection details. Unchecked components remain self-managed by the installer.
- On the Nacos section of the middleware page, set `Nacos Configs Pre-imported (true/false)` to `true` only when all AGIOne configuration items already exist in the target Nacos namespace and installation should skip namespace creation and config publishing.

On the node page, fill machine IPs according to the middleware mode: 4 to 8 for the default self-managed mode, 2 to 8 for all managed middleware, and at least 3 or 4 for hybrid depending on whether the database is self-managed. Each machine row includes SSH user, SSH port, and optional SSH password. Leave a row password empty for passwordless SSH on that node. Press `F5` to run node preflight. The preflight covers SSH access, remote Docker status, `bash` / `tar` / `python`, install disk selection, existing runtime data, and role port occupancy. When `runtime_root` is default, all nodes must pass preflight before the automatically selected runtime root is accepted. If any node fails, the TUI blocks navigation to the execution page. The service-level placement matrix is an advanced capability and is hidden in the standard flow; use a configuration file when advanced placement is required.

### 4.5 Reinstall testing and configuration sync

The installer records execution state and completion markers. After fixing temporary network, SSH, offline asset, or permission failures, rerun `quick` with the same `/root/agione-install.yml` first. Do not manually delete one remote runtime directory and continue. For data backup or restore involving MariaDB, Nacos, MinIO, InfluxDB, or generated configuration, review the recovery plan first:

```bash
scripts/agione_stateful_recovery.sh plan
```

Create a stateful backup:

```bash
AGIONE_ALLOW_BRIEF_SERVICE_STOP=1 scripts/agione_stateful_recovery.sh backup
```

Verify the archive before restore:

```bash
scripts/agione_stateful_recovery.sh verify --archive /path/to/agione-stateful-backup-v1-*.tar.gz
```

Restore changes runtime data and requires the confirmation environment variables printed by the script. In production, confirm the service-stop window and rollback plan with the customer before restoring.

For repeated installation tests, use this sequence:

```bash
./agione reset-host-mode --dry-run --file /root/agione-install.yml
./agione reset-host-mode --remote-dry-run --file /root/agione-install.yml
./agione reset-host-mode --yes --file /root/agione-install.yml
./agione quick --file /root/agione-install.yml
```

If only rendered host-mode compose, manifest, MariaDB configuration, or Nginx configuration has changed, a full reinstall is not required. Run:

```bash
./agione sync-host-mode
```

If the generated scripts require SSH password authentication again, pass the same main installation YAML:

```bash
./agione sync-host-mode --file /root/agione-install.yml
```

This command only syncs generated configuration. It does not unpack runtime baseline packages again and does not restart business containers automatically. Decide whether services need a restart based on the actual configuration change. If the Nginx config changed, restart the affected Nginx container after synchronization.

### 4.6 Verify result

After installation finishes, run:

```bash
./agione health
./agione ps
```

Review the latest installation report:

```text
/opt/agione-installer-bundle/reports/install-*.md
```

Open the browser entry:

```text
http://<app-entry-ip>:18090/modelone/
```

Acceptance checklist:

| Check item | Expected result |
| --- | --- |
| Installation result | `Quick Install Result` or the TUI result shows success |
| Service status | Containers are running on App / Edge, middleware, and standby nodes |
| Nacos | Configuration import completed, and key services are registered |
| Database replication | Standby replication is healthy with no obvious lag |
| Web entry | Browser opens `http://<app-entry-ip>:18090/modelone/` |
| Report archive | Installation report and host-mode health report are generated |

If installation fails, the installer tries to collect a host-mode support bundle automatically. Common location:

```text
/opt/agione-installer-bundle/outputs/agione-app/host-mode/support/
```

You can also run:

```bash
./agione doctor
```

This generates a diagnostic report and redacted support bundle for further troubleshooting.

### 4.7 Incrementally enable optional services after installation

After a host-mode installation is complete, use `services` to add optional application services without rerunning the full `quick` workflow. From a complete bundle directory that matches the installed CPU architecture, run:

```bash
./agione services status
./agione services enable kubem,cloud --dry-run
./agione services enable kubem,cloud
```

`--dry-run` performs read-only prechecks without changing remote Compose files, containers, or final configuration. Remove it only after prechecks pass. Supported groups and default placement are:

| Group | Default host-mode placement | Prerequisites |
| --- | --- | --- |
| `kubem` | `core_kubem` and `core_codelab` on every App node; `core_iam` on the primary App node only | Corresponding Nacos configuration, ports, assets, and offline images are available |
| `cloud` | All five cloud provider integration services on every App node | Corresponding Nacos configuration, ports, assets, and offline images are available |
| `core_isync` | `core_isync` and `influxdb3` on the standby database node only | Host-mode, self-managed MariaDB, and exactly one standby node; replication must be healthy or the standby must meet the safe automatic bootstrap conditions |

When the initial installation does not enable `core_isync`, but the deployment uses host-mode, self-managed MariaDB, exactly one standby node, and does not disable `agione_app.influxdb.enabled`, the installer prepares the `core_isync` / `influxdb3` assets and images on the standby node. It does not create or start their containers or occupy their service ports. `services status` then reports `prepared (installed, not started)`, and a later `services enable core_isync` reuses these offline assets.

Before a real operation, the installer checks the installed final configuration and completion marker, every node's runtime baseline, SSH, existing containers, ports, Nacos configuration, service assets, images, and candidate Compose files. For `core_isync`, it also checks MariaDB replication and prepares private InfluxDB credentials and data directories on the standby node. If replication is absent, automatic bootstrap is allowed only when the standby is empty, read-only, has no replication metadata, and the only health failure is missing replication metadata. Non-empty data, unhealthy replication, role mismatch, or ambiguous state blocks enablement. Missing images are sent only from the verified bundle to nodes that need them; no public image registry is contacted.

When `core_isync` is disabled, the base installation does not import `metis-influx-sync.yml`. During incremental enablement, the installer renders, publishes, and reads back this Nacos configuration only after preparing private InfluxDB credentials. A later startup or initialization failure restores the previous configuration.

A real enable operation starts only the newly requested services and does not recreate existing services. Local and remote transaction locks protect the operation. On failure, only additions from the current transaction are rolled back; after interruption, the next real operation first recovers the unfinished transaction. Re-enabling an already healthy group succeeds as a no-op. The command currently supports enablement only, not disablement, and cannot enable the separate top-level `kube-cluster` module.

After success, run:

```bash
./agione services status
./agione health
./agione ps
```

The command updates `outputs/final-result-config.yml` and host-mode runtime artifacts in the installed target. Archive the final configuration. If `/root/agione-install.yml` will be used for a later full reinstall, add the new groups to `agione_app.start_optional_app_services` there as well.

Installation and `services enable` share `<runtime_root>/.agione/operation.lock`; do not run them in parallel. The operating system releases the lock when the process exits, and a remaining lock file does not by itself mean the deployment is still locked.

### 4.8 Language and output policy

`quick` uses English output by default for consistent log archiving and automation parsing. The TUI follows the language selected on the welcome page and filters helper logs from the other language. If Chinese text still appears in English mode, preserve the full installation report and support bundle so the issue can be identified as either installer log filtering or container application log output.
