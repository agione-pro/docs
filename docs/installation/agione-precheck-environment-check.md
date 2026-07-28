# AGIOne Pre-install Environment Check Guide

## Introduction

| Item | Content |
|------|---------|
| Applicable Role | Pre-install checker, delivery engineer, customer operations engineer |
| Navigation Path | Deployment > AGIOne Pre-install Environment Check |
| Function Description | Identifies resource, port, permission, Docker, SSH, offline bundle, and middleware connectivity risks before `./agione quick` or `./agione install` |

The precheck does not install the product. Its purpose is to expose blockers before formal installation. For a first run, remember the basic order: **run `doctor`, fix `FAIL`, then decide how to handle `WARN`**.

### Beginner Explanation

Precheck is a rehearsal, not an installation. It tells you whether the host, ports, SSH, disk, Docker, offline bundle, and managed middleware are ready before runtime data is unpacked.

## Precheck Timeline

| Stage | What You Do | Completion Signal |
| --- | --- | --- |
| Step 1: Prepare bundle | Enter the bundle directory and make `./agione` executable | `./agione help` can run |
| Step 2: Run doctor | Run `./agione doctor` for single-node, or `./agione doctor --file /root/agione-install.yml` for multi-node | Terminal prints a precheck conclusion |
| Step 3: Verify bundle | Run `./agione verify-bundle` | Bundle integrity verification passes |
| Step 4: Fix FAIL | Fix blockers such as disk, port, permission, SSH, or middleware issues | No `FAIL` items remain |
| Step 5: Confirm WARN | Confirm risk acceptance with the customer and delivery owner | Each `WARN` item has a clear decision |
| Step 6: Install | Run `quick` or TUI installation with the same configuration | Precheck report is archived |

## Terminology Quick Reference

| Term | Plain Explanation |
| --- | --- |
| `doctor` | Pre-install diagnostic command for host and configuration risks |
| `verify-bundle` | Command that verifies bundle integrity before installation |
| `PASS` | The check passed and you can continue |
| `WARN` | A risk exists but may not block installation; owner confirmation is required |
| `FAIL` | A blocker that must be fixed before installation |
| Port occupation | A target port is already listened on by another process, so the installer cannot bind it |
| Host-mode remote check | Multi-node check for SSH, resources, ports, and existing data on each target machine |
| External managed middleware check | Connectivity and credential check for cloud-provider or customer-provided database, Redis, Nacos, Kafka, and object storage |

This document describes the environment checks that should be completed before running `./agione quick` or `./agione install`. The current checks focus on the `agione-app` installation scope: host resources, runtime directories, Docker and Compose, SSH access, ports, offline assets, and middleware connectivity.

## 1. Applicable Scenarios

| Scenario | Recommended | Description |
| --- | --- | --- |
| Single-node installation | Yes | Check CPU, memory, disk, ports, Docker, Compose, and basic commands |
| Host-mode multi-node installation | Yes | Check SSH access, private node addresses, remote resources, remote commands, Docker status, and required ports |
| Offline or restricted-network delivery | Yes | Confirm the release bundle, offline images, offline Python runtime, and runtime directories |
| Reinstallation on an existing host | Yes | Confirm old data, old containers, occupied ports, and old directories before installation |
| External managed middleware | Yes | Confirm endpoint reachability, credentials, and access policies before installation |

## 2. Recommended Commands

Run `doctor` before formal installation:

```bash
cd /opt/hyperone/agione-release-v1.0-XXX
chmod +x ./agione
./agione doctor
```

Verify the release bundle after transfer:

```bash
./agione verify-bundle
```

For host-mode multi-node installation, run the precheck with the same configuration file that will be used for installation:

```bash
./agione doctor --file /root/agione-install.yml
```

## 3. Check Result Levels

| Result | Meaning | Suggested Action |
| --- | --- | --- |
| `PASS` | Meets installation requirements | Continue to installation |
| `WARN` | Risk exists but may not block installation | Delivery owner and customer owner must confirm whether to accept the risk |
| `FAIL` | Key prerequisite is not met | Stop installation, remediate, and run the check again |

## 4. Check Item Overview

| Category | Blocking Level | Description |
| --- | --- | --- |
| Operating system and permissions | High | Confirm Linux distribution, root or equivalent permission, and basic commands |
| CPU and memory | High | Confirm that the host meets the selected deployment mode |
| Disk space | High | With the default `runtime_root`, the installer prefers a suitable data disk and falls back to `/opt/hyperone` on the system disk only when needed; about 160 GiB or above is required |
| Runtime directory | High | Confirm that the selected runtime root can be created, written, and cleaned when reinstalling |
| Port occupation | High | Confirm that required ports are not occupied by unmanaged processes |
| Docker and Compose | High | If installed, check version and status; if missing, confirm that offline installation assets are available |
| SSH access | High for host-mode | Confirm that the initiating host can access all host-mode nodes |
| Host-mode node addresses | High | Confirm that runtime node addresses are private IPv4 addresses |
| Offline assets | High | Confirm release bundle checksums and offline resource availability |
| External managed middleware | High when selected | Confirm endpoint, username, password, protocol, and network policy |

## 5. Resource Checks

Focus on the partition hosting `/opt/hyperone`.

```bash
df -h /opt/hyperone 2>/dev/null || df -h /opt
df -ih /opt/hyperone 2>/dev/null || df -ih /opt
mkdir -p /opt/hyperone
touch /opt/hyperone/.agione-precheck-write-test
rm -f /opt/hyperone/.agione-precheck-write-test
```

| Check Item | Pass Criteria | Suggested Action |
| --- | --- | --- |
| Available space | Recommended 200 GiB, minimum about 160 GiB or above | Expand disk or change runtime directory if below threshold |
| Write permission | `root` or equivalent user can write to `/opt/hyperone` | Fix directory permission or use an account with sufficient permission |
| inode | inode usage is not close to 100% | Clean small files or adjust filesystem |
| Historical data | Confirm whether to keep, back up, or clean it | Complete data confirmation before reinstallation |

## 6. Port Checks

### 6.1 Key Ports

| Port | Purpose | Precheck Focus |
| --- | --- | --- |
| `22/TCP` | SSH operations | Operations side can log in to the target host |
| `18090/TCP` | AGIOne Web entry | Not occupied; clients can access it |
| `80/TCP` | Nginx / OpenResty entry | Not occupied by unmanaged processes |
| `443/TCP` | HTTPS entry, optional | Plan in advance if HTTPS is enabled |
| `8089/TCP` | Job access proxy | Not occupied by unmanaged processes |
| `3306/TCP` | MariaDB | Not occupied by old database or other services |
| `6379/TCP` | Redis | Not occupied by old Redis or other services |
| `8848/8849/TCP` | Nacos | Not occupied by old Nacos or other services |
| `9848/9849/TCP` | Nacos internal communication | Not occupied by old Nacos or other services |
| `9000/9001/TCP` | MinIO API and console | Not occupied by old MinIO or other services |
| `9092/9093/TCP` | Kafka broker / controller | Not occupied by old Kafka or other services |
| `18091/TCP` | Kafka UI | Free when self-managed Kafka UI is enabled |
| `8021/8022/18088/TCP` | KUBEM / CodeLab / IAM | Checked when the `kubem` service group is enabled |
| `8011/8017/8012/8001/8002/TCP` | Cloud provider integration services | Checked when the `cloud` service group is enabled |
| `7091/18181/18082/TCP` | ISync / InfluxDB | Checked when the `core_isync` service group is enabled |

### 6.2 Recommended Commands

```bash
ss -lntup | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|9093|9848|9849|18090|18091|8021|8022|18088|8011|8017|8012|8001|8002|7091|18181|18082)\b'
lsof -iTCP -sTCP:LISTEN -P -n | grep -E ':(22|80|443|3306|6379|8089|8848|8849|9000|9001|9092|9093|9848|9849|18090|18091|8021|8022|18088|8011|8017|8012|8001|8002|7091|18181|18082)\b'
nc -vz <target-host-ip> 18090
nc -vz <target-host-ip> 22
```

## 7. Host-mode Remote Checks

For host-mode multi-node installation, check every node defined in `agione-install.yml`.

| Check Item | Pass Criteria | Failure Signal |
| --- | --- | --- |
| SSH connectivity | Target node can be reached through the configured user and port | Authentication failure or timeout |
| Private IPv4 address | Node address is an RFC1918 private IPv4 address | Public IP address, public DNS name, or placeholder hostname |
| Remote commands | `bash`, `tar`, and Python are available or repairable from bundled assets | Required commands are missing and cannot be repaired |
| Remote resources | CPU, memory, and selected install disk meet the selected role | Node resource below the threshold |
| Existing data | Old runtime data is either absent or explicitly overwritten with `-f` | Old runtime data exists and overwrite was not confirmed |
| Docker status | Docker and Compose are running or can be installed from offline assets | Docker repair failed |
| Ports | Required ports are free on the node that will bind them | Existing process occupies a required port |

## 8. External Managed Middleware Checks

When external managed middleware is selected in `agione-install.yml`, verify connectivity before installation.

| Component | Required Check |
| --- | --- |
| Database | Host, port, root user, root password, SSL mode, and schema initialization permission |
| Redis | Host, port, password, and network policy |
| Nacos | Host, API port, namespace, username, password, and health endpoint |
| Kafka | Bootstrap servers, protocol, authentication settings, and topic creation permission |
| Object storage | Endpoint, access key, secret key, bucket access, and upload/download permission |

Managed Kafka requires both metadata reachability and a topic policy decision. App nodes must be able to reach the advertised broker addresses returned by Kafka; bootstrap TCP reachability alone is not enough. If `agione_app.kafka.auto_create_topics` is `true`, precheck treats broker-side topic auto-creation as enabled. If it is `false`, precheck verifies that required AGIOne topics already exist. If the installer should create missing topics, the account must have topic management permission and `AGIONE_MANAGED_KAFKA_CREATE_TOPICS=1` must be set before installation.

## 9. Recommended Report Content

The precheck or doctor report should contain at least:

| Module | Output |
| --- | --- |
| Host information | hostname, IP, operating system, kernel, CPU architecture |
| Resource information | CPU cores, memory, disk, inode, runtime directory permission |
| Ports | Occupying process, listening address, conflicting port list |
| Docker / Compose | Version, service status, whether offline installation is available |
| Host-mode nodes | SSH result, private address validation, remote resources, remote commands, old data, Docker, and ports |
| Offline assets | bundle manifest, checksum, image package, offline Python |
| External middleware | Endpoint reachability and credential validation result |
| Conclusion | PASS / WARN / FAIL, blocking items, remediation suggestions |

## 10. Installation Admission Recommendations

Enter formal installation only after:

1. `./agione doctor` or the precheck script has completed, and the report has been archived.
2. CPU, memory, disk, ports, permissions, and Docker checks are all `PASS`.
3. Host-mode remote precheck is `PASS` when host-mode nodes are configured.
4. External managed middleware connectivity is `PASS` when external managed middleware is selected.
5. All `FAIL` items have been remediated and passed recheck.
6. All `WARN` items have been accepted by the delivery owner and customer owner.
7. Offline delivery has passed `./agione verify-bundle`.

## 11. Relationship with the Installation Workflow

Recommended execution sequence:

```bash
cd /opt/hyperone/agione-release-v1.0-XXX
chmod +x ./agione
./agione doctor --file /root/agione-install.yml
./agione verify-bundle
./agione quick --file /root/agione-install.yml
./agione health
./agione ps
```

`doctor` identifies risks early. It does not replace the system checks in the installation workflow. During formal installation, `quick` still runs installation checks again and continues with unpacking, configuration, image loading, and service startup only after the checks pass.
