# ClusterD Installation, Upgrade, and Uninstallation

This guide is for installers working in a new environment. Follow the steps in order: obtain the package, prepare the host, install ClusterD, create an account, and deploy AGIOne.

For a first installation, read sections 1-5. To update an existing ClusterD installation, go to [6. Upgrade ClusterD](#_6-upgrade-clusterd). To remove it, read [7. Uninstall ClusterD](#_7-uninstall-clusterd).

| Item | Description |
| --- | --- |
| Environment | Linux x86_64 hosts; examples use Ubuntu 22.04, and installation steps assume a new environment |
| Installation entry | `install.sh` in the extracted package directory |
| Default Web URL | `http://<ClusterD-host-IP>:18093/` |
| Goal | Access ClusterD, then deploy AGIOne through its Web interface and verify login |

::: tip Understand where ClusterD and AGIOne run
The **ClusterD host** provides the installation Web interface and task service. **AGIOne target nodes** run Kubernetes, middleware, and business services. Install ClusterD once on the ClusterD host, not on every target node.

They can share a machine, but plan disk space, ports, and resources together. **After installing ClusterD, select target nodes in the Web interface to start deploying AGIOne.**
:::

This guide applies to delivery packages using `install.sh` and systemd. ARM, CentOS, and macOS are outside the verified installation scope of this guide; do not apply these instructions unchanged.

## Workflow Timeline

| Stage | What you do | Completion signal |
| --- | --- | --- |
| 1. Obtain the package | Obtain a full or light package and its trusted SHA-256 checksum | Version, architecture, and checksum are confirmed |
| 2. Prepare the host | Check the system, tools, disk, and network | Host requirements are met and target nodes are reachable |
| 3. Download and verify | Download, verify the archive, extract, and verify its contents | Both verification steps pass |
| 4. Install ClusterD | Run the installer and check the service and Web interface | Service is `active` and the home page returns `HTTP 200` |
| 5. Deploy AGIOne | Create an account, configure deployment, run precheck, and install | Nodes and services are ready, and AGIOne login works |
| 6. Upgrade (when needed) | Verify the new package, upgrade, and check the result | New service runs and existing accounts and cluster records remain available |
| 7. Uninstall (when needed) | Stop the service, remove the program, and optionally erase data | Service is removed and ClusterD no longer listens on its Web port |

## Terminology Quick Reference

| Term | Plain explanation |
| --- | --- |
| Full package | Includes the ClusterD program, execution engine, Python, and offline deployment resources |
| Light package | Includes the program and execution engine, but not offline deployment resources or embedded Python installation files |
| SHA-256 | A file checksum used to check that the package is intact and matches the delivered file |
| systemd | Linux service management; the installer uses it to start ClusterD and enable it at boot |
| SSH | The remote connection ClusterD uses to access target nodes and run installation tasks |
| Precheck | Checks node connectivity, resources, ports, and other requirements before deployment |
| Web access URL | The AGIOne Web entry provided on the page after deployment |

## 1. Obtain the Release Package

**ClusterD download URL: to be provided.**

::: warning Obtain the actual download URL first
Ask your delivery contact for the package URL and the archive's SHA-256 checksum. Replace `<CLUSTERD_PACKAGE_URL>`, `XXX`, and `<TRUSTED_OUTER_ARCHIVE_SHA256>` below with actual values before running the commands.
:::

### 1.1 Choose a package

| Package | Example filename | When to choose it |
| --- | --- | --- |
| Full package, recommended for offline delivery | `agione-clusterd-full-release-XXX-linux-x86_64.tar.gz` | Includes offline resources; select offline AGIOne deployment after installation |
| Light package | `agione-clusterd-release-XXX-linux-x86_64.tar.gz` | Host needs Python 3.10 or later; deployment requires online resources or matching offline resources imported beforehand |

The following steps use a full package. For a light package, substitute its URL and filename; the installation command is the same.

**Before starting, confirm the release version, Linux x86_64 architecture, and trusted SHA-256 supplied by the delivery contact.** Do not use a checksum calculated from the file you just downloaded as the trusted delivery checksum.

## 2. Prepare for Installation

### 2.1 Prepare the ClusterD host

Run all terminal commands on the **ClusterD host**. Installation requires system `root` or `sudo` access.

| Check | Requirement |
| --- | --- |
| System | These examples use Ubuntu 22.04, x86_64, with functioning systemd |
| Basic tools | Bash, system `python3`, `sha256sum`, `tar`, `gzip`, coreutils, and an OpenSSH client; downloads need `curl` and CA certificates |
| Disk | Allow for the archive, extracted contents, installed resources, and temporary workspace; archive size alone is insufficient |
| Web network | Allow access to TCP `18093` on the ClusterD host from the installer's trusted operations network |
| Node network | The ClusterD host can SSH to target nodes over a private network or configured jump host; target SSH services are running |
| AGIOne target nodes | Prepare resources, storage, and networking using [Deployment Requirements](../agione-deployment-requirements) |

Installing ClusterD itself does not require Docker or `/opt/agione-install`.

::: warning A full package still needs system Python
The package's embedded Python is installed after package verification. It cannot replace system `python3` for the initial check. Prepare basic tools in advance on an air-gapped host.
:::

On a connected Ubuntu host, install missing tools:

```bash
sudo apt-get update
sudo apt-get install -y python3 openssh-client ca-certificates curl tar gzip coreutils
```

### 2.2 Check the host environment

```bash
uname -m
python3 --version
systemctl --version
df -h /opt /var/lib /var/log
```

Confirm that the architecture is `x86_64`, Python and systemd are available, and the relevant disks have sufficient space. A light package requires Python 3.10 or later.

Sections 1-5 assume a new environment. If ClusterD services or cluster records already exist, confirm the host and intended operation first. To update the version, follow section 6 instead of overwriting an installation or deleting data.

## 3. Download, Verify, and Extract

### 3.1 Download to the ClusterD host

Enter root Bash and keep using the same terminal for subsequent steps. `/opt/clusterd-packages` stores packages; it is not the program's runtime directory.

```bash
sudo -i
bash
set -e
mkdir -p /opt/clusterd-packages
cd /opt/clusterd-packages
```

Replace the following three values with the actual delivery details. SHA-256 is a 64-character hexadecimal string, not a download URL.

```bash
CLUSTERD_PACKAGE_URL="<CLUSTERD_PACKAGE_URL>"
CLUSTERD_PACKAGE_NAME="agione-clusterd-full-release-XXX-linux-x86_64.tar.gz"
CLUSTERD_PACKAGE_SHA256="<TRUSTED_OUTER_ARCHIVE_SHA256>"

curl --fail --location --output "$CLUSTERD_PACKAGE_NAME" "$CLUSTERD_PACKAGE_URL"
```

For an air-gapped host, transfer the package to `/opt/clusterd-packages` using delivery media or `scp`, set the filename and trusted checksum above, and skip the `curl` command.

### 3.2 Verify the downloaded archive

This checks that the file was not damaged during download or transfer. **It uses SHA-256, not MD5.**

```bash
printf '%s  %s\n' "$CLUSTERD_PACKAGE_SHA256" "$CLUSTERD_PACKAGE_NAME" | sha256sum -c -
```

Continue only when the output is `<package-filename>: OK`. For `FAILED`, a format error, or a missing file, check the filename, version, and delivery checksum first. Download again if needed. Do not skip a failed check.

### 3.3 Extract and verify package contents

```bash
CLUSTERD_PACKAGE_DIR="${CLUSTERD_PACKAGE_NAME%.tar.gz}"
tar -xzf "$CLUSTERD_PACKAGE_NAME"
cd "/opt/clusterd-packages/$CLUSTERD_PACKAGE_DIR"
bash verify.sh
```

`verify.sh` checks the package manifests, `SHA256SUMS`, and resources. The entire command must exit successfully. This does not replace archive verification in the previous step.

::: warning Keep the extracted directory unchanged
Do not add configuration, logs, or uploaded files to the extracted directory, or modify its contents. Doing so can fail package verification. Store installation logs in `/var/log`; installed configuration belongs in `/etc/agione-clusterd`.
:::

## 4. Install and Open ClusterD

### 4.1 Run installation

Continue in the extracted directory from the previous step, in root Bash:

```bash
CLUSTERD_INSTALL_LOG=/var/log/agione-clusterd-install.log
if bash install.sh install > "$CLUSTERD_INSTALL_LOG" 2>&1; then
  tail -n 20 "$CLUSTERD_INSTALL_LOG"
else
  tail -n 100 "$CLUSTERD_INSTALL_LOG"
  false
fi
```

The script verifies the package, installs the program and runtime resources, generates configuration, enables startup at boot, and starts the service. Successful completion prints **`agione-clusterd-install-ok`**.

The command saves complete output to `/var/log/agione-clusterd-install.log` and displays a summary when finished. A full package reads multiple GB of resources and can take time. Wait for the command to finish; do not start a duplicate installation or move the extracted directory. On failure, inspect the log before continuing.

### 4.2 Check the service and Web interface

```bash
systemctl is-active agione-clusterd
systemctl --no-pager --full status agione-clusterd
curl --fail --silent --show-error --output /dev/null \
  --write-out 'HTTP %{http_code}\n' http://127.0.0.1:18093/
```

After seeing **`active`** and **`HTTP 200`**, open this URL in your computer's browser:

```text
http://<ClusterD-host-IP>:18093/
```

Replace `<ClusterD-host-IP>` with the actual IP. If local checks pass but the browser cannot connect, check the firewall, security group, and routing for TCP `18093`. Do not disable the entire firewall.

### 4.3 Create an account

1. On first access to a new ClusterD installation, open Create Account.
2. Enter a username and password. Use a unique, strong password of at least 8 characters.
3. Account creation opens ClusterD. Use this account to sign in on later visits; you do not need to create it again.

The ClusterD login account, target-node SSH accounts, and AGIOne login account serve different purposes. Record them separately and do not use them interchangeably.

## 5. Deploy AGIOne Through the Web Interface

### 5.1 Select the deployment mode

Open the operation wizard, or choose Create My Cluster in My Cluster, then select the mode that matches your delivery:

| Mode | Confirm before starting |
| --- | --- |
| Offline installation | With a full package, the page should show that local resources are ready; no repeat download of bundled resources is needed. Additional categorized offline imports require the matching manifest and bundle |
| Online installation | All required resource versions are ready, and the ClusterD host and target maintenance node can reach the resource URLs. The current package includes public HTTPS read configuration; cloud storage AK/SK is not required |

### 5.2 Configure and start deployment

1. **Enter cluster and node details.** Specify the cluster name, services, node IPs, SSH addresses, ports, usernames, and authentication details. Nodes without public access need a reachable private network or a configured jump host.
2. **Confirm storage and networking.** Enter storage, access addresses, and the HTTP/HTTPS plan for your environment. HTTPS requires a valid certificate matching the access domain; allowing port `443` alone does not configure it.
3. **Run precheck.** Resolve every blocker shown on the page or in task logs, and review warnings before installing. Fix connection failures and insufficient disk space instead of bypassing them.
4. **Start installation and wait.** View task logs without submitting the same installation twice. Once finished, check node, service, and health status in My Cluster.
5. **Open AGIOne and verify access.** Use the **Web access URL** in the details, retrieve and securely store the provided login credentials, then sign in to AGIOne and verify actual business access.

### 5.3 Installation completion checklist

- [ ] ClusterD is `active`, and the installer can open its Web interface and sign in.
- [ ] The AGIOne deployment task succeeded, and nodes, middleware, and business services are ready.
- [ ] AGIOne opens through the Web access URL shown in the details.
- [ ] The account provided after deployment can sign in to AGIOne, and business access has been verified.

**HTTP 200 from the ClusterD home page only means the installation Web interface is reachable. It does not mean AGIOne deployment is complete.** Use the checklist above to confirm completion.

## 6. Upgrade ClusterD

::: tip Confirm what is being upgraded
This updates the ClusterD program, Web interface, and execution engine, and restarts ClusterD. **It does not automatically upgrade AGIOne business services already deployed.** The upgrade retains configuration, accounts, and cluster and task records; account creation is not required again.
:::

### 6.1 Prepare the new package

1. Check the Web interface for queued or running tasks. Wait for them to finish before upgrading.
2. Obtain and verify the new package using sections 1 and 3. Extract it into a new version directory without overwriting the previous extracted directory.
3. The commands below use this guide's default installation paths. If the original installation used custom arguments, retain those paths for upgrade and verification. Do not switch to an empty data directory.

### 6.2 Check and run upgrade

Open root Bash on the ClusterD host and enter the **new version's** extracted directory. Replace `XXX` with the actual new version; use the matching directory name for a light package.

```bash
sudo -i
bash
set -e
cd /opt/clusterd-packages/agione-clusterd-full-release-XXX-linux-x86_64
bash install.sh upgrade --dry-run
```

`release-dry-run-ok` means the check passed; no upgrade has run yet. Continue in the same terminal:

```bash
CLUSTERD_UPGRADE_LOG=/var/log/agione-clusterd-upgrade.log
if bash install.sh upgrade > "$CLUSTERD_UPGRADE_LOG" 2>&1; then
  tail -n 20 "$CLUSTERD_UPGRADE_LOG"
else
  tail -n 100 "$CLUSTERD_UPGRADE_LOG"
  false
fi
```

Successful completion prints **`agione-clusterd-upgrade-ok`**. The Web interface may be briefly unavailable; wait for the command to finish without starting another upgrade. On failure, inspect `/var/log/agione-clusterd-upgrade.log` first. Do not delete data and reinstall.

### 6.3 Verify the upgrade

```bash
systemctl is-active agione-clusterd
curl --fail --silent --show-error --output /dev/null \
  --write-out 'HTTP %{http_code}\n' http://127.0.0.1:18093/
```

Confirm `active` and `HTTP 200`, then refresh the Web interface, sign in with your existing account, and check that cluster and task records remain available. Use the actual port in the check if the Web port was changed.

The installer may create `.upgrade.new` configuration files for comparing new defaults. Do not overwrite the active configuration directly.

## 7. Uninstall ClusterD

The current installer has no `uninstall` subcommand. Follow these steps to remove the local service and program. **To pause it temporarily, run `sudo systemctl stop agione-clusterd`; no file deletion is needed.**

::: warning Removal scope
Removing ClusterD makes its Web interface and task service unavailable. It does not automatically delete deployed AGIOne, Kubernetes, or business data. To remove the AGIOne environment as well, first complete the corresponding cluster environment cleanup in ClusterD and verify the result, then uninstall ClusterD.
:::

### 7.1 Confirm before removal

1. Confirm that no tasks are queued or running and that this ClusterD instance is no longer needed to operate existing clusters.
2. The commands below apply only to default installation paths. For a custom installation, inspect `sudo systemctl cat agione-clusterd` and the actual configuration first; do not copy deletion commands unchanged.
3. Confirm that directories to be removed are not mount points or symbolic links and are not shared with other services.

### 7.2 Remove the service and program, retaining configuration and data

Run in root Bash on the ClusterD host. Missing housekeeping units in older versions are skipped.

```bash
sudo -i
bash
set -e
if systemctl cat agione-clusterd-housekeeping.timer >/dev/null 2>&1; then
  systemctl disable --now agione-clusterd-housekeeping.timer
fi
if systemctl cat agione-clusterd-housekeeping.service >/dev/null 2>&1; then
  systemctl stop agione-clusterd-housekeeping.service
fi
systemctl disable --now agione-clusterd

rm -f /etc/systemd/system/agione-clusterd.service \
  /etc/systemd/system/agione-clusterd-housekeeping.service \
  /etc/systemd/system/agione-clusterd-housekeeping.timer
systemctl daemon-reload
rm -rf /opt/agione-clusterd
```

This step retains:

| Path | Retained contents |
| --- | --- |
| `/etc/agione-clusterd` | Existing configuration |
| `/var/lib/agione-clusterd` | Accounts, cluster and task records, resource caches, and runtime data |
| `/var/log/agione-clusterd-*.log` | Installation and upgrade logs |

`/opt/agione-python` and `/etc/kubemore` are also retained to avoid affecting other tools that share them. Clean these separately only after confirming they are exclusive to ClusterD and no longer needed.

### 7.3 Permanently erase local configuration and data (optional)

**Skip this section to remove the program while retaining records.** Continue only when accounts, cluster and task records, and resource caches are no longer needed.

::: danger This cannot be undone
The following permanently deletes ClusterD configuration and data at the default paths. A later installation uses new configuration; previous accounts and records will not return automatically. Do not delete `/var/lib/agione`, `/var/lib/rancher/k3s`, `/etc/rancher/k3s`, or Docker/containerd data directories.
:::

After section 7.2, run in the same root Bash. Deletion requires typing `DELETE-CLUSTERD`:

```bash
read -r -p "Type DELETE-CLUSTERD to permanently remove local data: " CLUSTERD_CONFIRM
if [ "$CLUSTERD_CONFIRM" = "DELETE-CLUSTERD" ]; then
  rm -rf /etc/agione-clusterd /var/lib/agione-clusterd
else
  printf '%s\n' "Cancelled; local data kept."
fi
```

### 7.4 Verify removal

```bash
systemctl list-unit-files agione-clusterd.service \
  agione-clusterd-housekeeping.service agione-clusterd-housekeeping.timer --no-pager
test ! -e /opt/agione-clusterd
ss -ltnp | grep ':18093' || true
```

Confirm that ClusterD units are removed, the program directory is absent, and ClusterD no longer listens on `18093`. Check the actual port if customized. Determine remote AGIOne cleanup from its cleanup task and target-node state, not from an unreachable ClusterD page.

## 8. Troubleshooting

| Symptom | First check |
| --- | --- |
| `python3 is required` | Install system Python; embedded Python cannot replace the initial verification tool |
| Archive or package verification fails | Check the version, trusted SHA-256, and missing or modified files; do not edit checksum manifests to bypass verification |
| No continuous terminal output during installation | Complete logs are saved in `/var/log/agione-clusterd-install.log`; check process and disk state without starting another installation |
| ClusterD service does not start | Run `sudo journalctl -u agione-clusterd -n 100 --no-pager`; check configuration, paths, and port conflicts |
| Local HTTP 200 but browser cannot connect | Check the listen address, TCP `18093` firewall rules, security groups, and routing |
| Online resources are unavailable | Check required resource versions and DNS, HTTPS, and outbound connectivity from the ClusterD host and target maintenance node |
| Target-node precheck fails | Open the task log and resolve the reported SSH, resource, or port issues |

Record the package version, task ID, failure stage, and redacted logs when troubleshooting. Do not publish SSH passwords, login credentials, or configuration files containing sensitive information.
