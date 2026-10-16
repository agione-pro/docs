# ClusterD 安装、升级与卸载

本指南面向在全新环境中安装的人员，按“获取安装包 → 准备主机 → 安装 ClusterD → 创建账户 → 部署 AGIOne”的顺序操作即可。

首次安装阅读第 1～5 节；已有 ClusterD 需要更新时，直接阅读 [6. 升级 ClusterD](#_6-升级-clusterd)；不再使用时，阅读 [7. 卸载 ClusterD](#_7-卸载-clusterd)。

| 项目 | 说明 |
| --- | --- |
| 适用环境 | Linux x86_64 主机；以 Ubuntu 22.04 为例，新装步骤面向全新环境 |
| 安装入口 | 解压目录中的 `install.sh` |
| 默认网页地址 | `http://<ClusterD 主机 IP>:18093/` |
| 最终目标 | ClusterD 网页可访问，并通过网页完成 AGIOne 部署与登录验证 |

::: tip 先分清 ClusterD 和 AGIOne 安装在哪里
**ClusterD 主机**提供安装网页和任务服务；**AGIOne 目标节点**运行 Kubernetes、中间件和业务服务。只需在 ClusterD 主机安装一次，不需要在每台目标节点重复安装 ClusterD。

两者可以使用同一台机器，但需要一起规划磁盘、端口和资源。**安装好 ClusterD 后，还需要在网页中选择目标节点，才能开始部署 AGIOne。**
:::

本指南适用于使用 `install.sh` 和 systemd 的交付包。ARM、CentOS、macOS 不属于本版已核对的安装范围，请勿直接套用。

## 操作时间线

| 阶段 | 你要做什么 | 完成标志 |
| --- | --- | --- |
| 1. 获取安装包 | 取得全量包或轻量包，以及可信 SHA-256 校验值 | 版本、架构和校验值已确认 |
| 2. 准备主机 | 检查系统、工具、磁盘和网络 | 主机满足要求，能够连接目标节点 |
| 3. 下载并校验 | 下载、校验压缩包、解压、校验包内文件 | 两次校验均通过 |
| 4. 安装 ClusterD | 执行安装脚本，检查服务和网页 | 服务为 `active`，网页返回 `HTTP 200` |
| 5. 部署 AGIOne | 创建账户，在网页填写配置、预检并部署 | 节点和服务就绪，能够登录 AGIOne |
| 6. 升级（按需） | 校验新包，执行升级并检查 | 新版本服务正常，原账户和集群记录可用 |
| 7. 卸载（按需） | 停止服务，移除程序，按需清除数据 | 服务已移除，ClusterD 不再监听网页端口 |

## 术语速查

| 术语 | 通俗说明 |
| --- | --- |
| 全量包 | 包含 ClusterD 程序、执行引擎、Python 和离线部署资源，适合离线交付 |
| 轻量包 | 包含程序和执行引擎，不含离线部署资源及内置 Python 安装文件 |
| SHA-256 | 文件的校验值，用于核对安装包是否完整、是否与交付文件一致 |
| systemd | Linux 服务管理工具，安装脚本通过它启动 ClusterD 并设置开机启动 |
| SSH | ClusterD 连接目标节点、执行安装任务所用的远程连接方式 |
| 预检 | 正式部署前检查节点连接、资源、端口等是否满足要求 |
| Web 访问地址 | 部署完成后，页面提供的 AGIOne 网页入口 |

## 1. 获取安装包

**ClusterD 下载地址：待提供。**

::: warning 先取得实际下载地址
请向交付方取得安装包下载地址及该压缩包的 SHA-256 校验值。下方命令中的 `<CLUSTERD_PACKAGE_URL>`、`XXX` 和 `<TRUSTED_OUTER_ARCHIVE_SHA256>` 都需要替换为实际值，不能直接复制执行。
:::

### 1.1 选择安装包

| 安装包 | 文件名示例 | 如何选择 |
| --- | --- | --- |
| 全量包，推荐用于离线交付 | `agione-clusterd-full-release-XXX-linux-x86_64.tar.gz` | 自带离线资源，安装后可直接选择离线部署 AGIOne |
| 轻量包 | `agione-clusterd-release-XXX-linux-x86_64.tar.gz` | 主机需要 Python 3.10 或以上；部署时需在线获取资源，或先导入匹配的离线资源 |

后续以全量包为例。使用轻量包时，替换对应的下载地址和文件名，安装命令相同。

**开始前确认：安装包版本、Linux x86_64 架构，以及交付方提供的可信 SHA-256 校验值。**不要把自己对刚下载文件计算出的摘要当作交付校验值。

## 2. 安装前准备

### 2.1 准备 ClusterD 主机

所有终端命令都在 **ClusterD 主机**执行。安装需要使用系统 `root` 或 `sudo`。

| 检查项 | 要求 |
| --- | --- |
| 系统 | 本指南以 Ubuntu 22.04、x86_64 为例，systemd 正常运行 |
| 基础工具 | Bash、系统 `python3`、`sha256sum`、`tar`、`gzip`、coreutils、OpenSSH 客户端；联网下载需要 `curl` 和 CA 证书 |
| 磁盘 | 为压缩包、解压内容、安装后的资源和临时工作区预留空间，不要只按压缩包大小计算 |
| 网页网络 | 允许安装人员所在的可信运维网络访问 ClusterD 主机的 TCP `18093` |
| 节点网络 | ClusterD 主机可通过私网直连或已配置的跳板机 SSH 访问目标节点，目标节点已启动 SSH 服务 |
| AGIOne 目标节点 | 按 [部署配置要求](../agione-deployment-requirements) 提前准备资源、存储和网络 |

::: warning 全量包仍需要系统 Python
全量包内的 Python 在包校验之后才会安装，不能代替首次校验所需的系统 `python3`。完全离线主机需要提前准备好基础工具。
:::

联网 Ubuntu 主机缺少工具时，执行：

```bash
sudo apt-get update
sudo apt-get install -y python3 openssh-client ca-certificates curl tar gzip coreutils
```

### 2.2 确认主机环境

```bash
uname -m
python3 --version
systemctl --version
df -h /opt /var/lib /var/log
```

确认架构输出为 `x86_64`，Python 和 systemd 可用，相关磁盘空间充足。使用轻量包时，Python 版本必须为 3.10 或以上。

第 1～5 节以全新环境为前提。如果主机已存在 ClusterD 服务或集群记录，请先确认机器和用途；需要更新版本时按第 6 节升级，不要直接覆盖安装或删除数据。

## 3. 下载、校验与解压

### 3.1 下载到 ClusterD 主机

进入 root Bash，后续步骤沿用同一个终端。`/opt/clusterd-packages` 用于存放安装包，不是程序的运行目录。

```bash
sudo -i
bash
set -e
mkdir -p /opt/clusterd-packages
cd /opt/clusterd-packages
```

将以下三个值替换为本次交付的实际内容。SHA-256 是 64 位十六进制文本，不是下载地址。

```bash
CLUSTERD_PACKAGE_URL="<CLUSTERD_PACKAGE_URL>"
CLUSTERD_PACKAGE_NAME="agione-clusterd-full-release-XXX-linux-x86_64.tar.gz"
CLUSTERD_PACKAGE_SHA256="<TRUSTED_OUTER_ARCHIVE_SHA256>"

curl --fail --location --output "$CLUSTERD_PACKAGE_NAME" "$CLUSTERD_PACKAGE_URL"
```

完全离线时，将安装包通过交付介质或 `scp` 放入 `/opt/clusterd-packages`，设置上述文件名和可信校验值，跳过 `curl` 下载命令。

### 3.2 校验下载的压缩包

这一步用于确认文件下载或传输后没有损坏，**使用 SHA-256，不是 MD5**。

```bash
printf '%s  %s\n' "$CLUSTERD_PACKAGE_SHA256" "$CLUSTERD_PACKAGE_NAME" | sha256sum -c -
```

看到 `<安装包文件名>: OK` 才继续。出现 `FAILED`、格式错误或找不到文件时，先确认文件名、版本和交付校验值，必要时重新下载。不要跳过失败的校验。

### 3.3 解压并校验包内文件

```bash
CLUSTERD_PACKAGE_DIR="${CLUSTERD_PACKAGE_NAME%.tar.gz}"
tar -xzf "$CLUSTERD_PACKAGE_NAME"
cd "/opt/clusterd-packages/$CLUSTERD_PACKAGE_DIR"
bash verify.sh
```

`verify.sh` 检查包内清单、`SHA256SUMS` 和资源；整个命令成功退出才表示通过。这一步不能替代上一步的压缩包校验。

::: warning 保持解压目录原样
不要向解压目录添加配置、日志或上传文件，也不要修改其中的文件，否则可能导致包校验失败。安装日志放在 `/var/log`；安装后的配置位于 `/etc/agione-clusterd`。
:::

## 4. 安装并打开 ClusterD

### 4.1 执行安装

继续在上一步的解压目录、root Bash 中执行：

```bash
CLUSTERD_INSTALL_LOG=/var/log/agione-clusterd-install.log
if bash install.sh install > "$CLUSTERD_INSTALL_LOG" 2>&1; then
  tail -n 20 "$CLUSTERD_INSTALL_LOG"
else
  tail -n 100 "$CLUSTERD_INSTALL_LOG"
  false
fi
```

脚本会校验安装包、安装程序和运行资源、生成配置、设置开机启动并启动服务。成功结束时显示 **`agione-clusterd-install-ok`**。

上面的命令会将完整输出保存到 `/var/log/agione-clusterd-install.log`，结束后显示结果摘要。全量包需读取多 GB 资源，安装可能需要较长时间；请等待命令结束，不要重复启动安装或移动解压目录。失败时先查看日志，不要继续下一步。

### 4.2 检查服务和网页

```bash
systemctl is-active agione-clusterd
systemctl --no-pager --full status agione-clusterd
curl --fail --silent --show-error --output /dev/null \
  --write-out 'HTTP %{http_code}\n' http://127.0.0.1:18093/
```

看到 **`active`** 和 **`HTTP 200`** 后，在自己电脑的浏览器打开：

```text
http://<ClusterD 主机 IP>:18093/
```

将 `<ClusterD 主机 IP>` 替换为实际 IP。若本机检查正常但浏览器打不开，先检查 TCP `18093` 的防火墙、安全组和路由，不要关闭整个防火墙。

### 4.3 创建账户

1. 首次打开全新安装的 ClusterD 网页，进入“创建账户”。
2. 填写用户名和密码。密码至少 8 位，建议使用独立强密码。
3. 创建成功后进入 ClusterD。后续访问使用该账户登录，无需再次创建。

ClusterD 登录账户、目标节点 SSH 账户和 AGIOne 登录账户用途不同，请分别记录，不要混用。

## 5. 通过网页部署 AGIOne

### 5.1 选择部署方式

进入“操作向导”，或在“我的集群”选择“创建我的集群”，再根据交付方式选择：

| 部署方式 | 开始前确认 |
| --- | --- |
| 离线安装 | 使用全量包时，页面应显示“本地资源已就绪”，不需要重复下载随包资源；额外导入分类离线资源时，需要配套的 manifest 和 bundle |
| 在线安装 | 页面所需资源版本均已就绪，ClusterD 主机和目标维护节点能够访问资源地址；当前交付包已预置公开 HTTPS 读取配置，无需填写云存储 AK/SK |

### 5.2 填写配置并开始部署

1. **填写集群和节点。**填写集群名称、服务选择、节点 IP、SSH 连接地址、端口、用户名和认证信息。没有公网的节点需要通过可达私网或已配置的跳板机连接。
2. **确认存储和网络。**按实际环境填写存储、访问地址及 HTTP/HTTPS 方案。使用 HTTPS 时，需要准备与访问域名匹配的有效证书，仅开放 `443` 端口不能完成 HTTPS 配置。
3. **执行预检。**按页面和任务日志处理所有阻断项，确认警告后再安装。连接失败、磁盘不足等问题应先解决，不要直接跳过。
4. **开始安装并等待完成。**查看任务日志，不要重复提交同一安装任务。任务完成后，在“我的集群”检查节点、服务和健康状态。
5. **打开 AGIOne 并验证。**使用详情页提供的 **Web 访问地址**，领取并安全保存页面提供的登录凭据，登录 AGIOne 并验证实际业务访问。

### 5.3 安装完成检查

- [ ] ClusterD 服务为 `active`，安装人员能够打开网页并登录。
- [ ] AGIOne 部署任务成功，节点、中间件和业务服务就绪。
- [ ] 通过详情页的 Web 访问地址能够打开 AGIOne。
- [ ] 使用部署后提供的账户能够登录 AGIOne，并完成业务访问验证。

**ClusterD 首页返回 HTTP 200，只代表安装网页可访问，不代表 AGIOne 已部署完成。**请以上述检查结果为准。

## 6. 升级 ClusterD

::: tip 先确认升级对象
本节更新 ClusterD 程序、网页和执行引擎，会重启 ClusterD；**不会自动升级已部署的 AGIOne 业务服务**。升级沿用原配置、账户及集群和任务记录，不需要重新创建账户。
:::

### 6.1 准备新版本安装包

1. 在网页确认没有排队或执行中的任务，等待现有任务结束后再升级。
2. 按第 1、3 节获取并校验新版本安装包，解压到新的版本目录，不覆盖旧的解压目录。
3. 以下命令适用于本指南的默认安装路径。如果原来使用了自定义安装参数，升级和检查时应沿用原来的路径，不要改成新的空数据目录。

### 6.2 检查并执行升级

在 ClusterD 主机打开 root Bash，进入**新版本**解压目录。将 `XXX` 替换为实际新版本；使用轻量包时改为对应的目录名。

```bash
sudo -i
bash
set -e
cd /opt/clusterd-packages/agione-clusterd-full-release-XXX-linux-x86_64
bash install.sh upgrade --dry-run
```

看到 `release-dry-run-ok` 表示检查通过，尚未实际升级。继续在同一终端执行：

```bash
CLUSTERD_UPGRADE_LOG=/var/log/agione-clusterd-upgrade.log
if bash install.sh upgrade > "$CLUSTERD_UPGRADE_LOG" 2>&1; then
  tail -n 20 "$CLUSTERD_UPGRADE_LOG"
else
  tail -n 100 "$CLUSTERD_UPGRADE_LOG"
  false
fi
```

成功结束时显示 **`agione-clusterd-upgrade-ok`**。执行期间网页可能短暂不可访问，请等待命令结束，不要重复提交升级。失败时先查看 `/var/log/agione-clusterd-upgrade.log`，不要删除数据重新安装。

### 6.3 确认升级结果

```bash
systemctl is-active agione-clusterd
curl --fail --silent --show-error --output /dev/null \
  --write-out 'HTTP %{http_code}\n' http://127.0.0.1:18093/
```

确认返回 `active` 和 `HTTP 200`，再刷新网页，使用原账户登录，检查原有集群和任务记录仍可查看。如已调整网页端口，检查命令使用实际端口。

安装器可能生成 `.upgrade.new` 配置文件，供比较新默认值；不要直接覆盖正在使用的配置。

## 7. 卸载 ClusterD

当前安装器没有 `uninstall` 子命令，按以下步骤移除本机服务和程序即可。**如果只是暂时停用，执行 `sudo systemctl stop agione-clusterd` 即可，不需要删除文件。**

::: warning 卸载范围
卸载 ClusterD 后，其网页和任务服务不再可用，但已部署的 AGIOne、Kubernetes 和业务数据不会自动删除。如需同时移除 AGIOne 环境，应先在 ClusterD 网页完成对应集群的环境清理并确认结果，再卸载 ClusterD。
:::

### 7.1 卸载前确认

1. 确认没有排队或执行中的任务，并且不再需要通过该 ClusterD 操作现有集群。
2. 以下命令只适用于默认安装路径。自定义安装应先通过 `sudo systemctl cat agione-clusterd` 和实际配置确认路径，不能直接套用删除命令。
3. 确认待删除目录不是挂载点、软链接，也未被其他服务共用。

### 7.2 移除服务和程序，保留配置与数据

在 ClusterD 主机的 root Bash 中执行。旧版本未提供清理定时器时，命令会跳过不存在的单元。

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

这一步保留以下内容：

| 路径 | 保留内容 |
| --- | --- |
| `/etc/agione-clusterd` | 原有配置 |
| `/var/lib/agione-clusterd` | 账户、集群和任务记录、资源缓存及运行数据 |
| `/var/log/agione-clusterd-*.log` | 安装、升级日志 |

`/opt/agione-python` 和 `/etc/kubemore` 也不会在这一步删除，避免影响共用这些目录的其他工具。仅在确认属于 ClusterD 独占且不再需要时，才单独清理。

### 7.3 永久清除本机配置与数据（可选）

**只卸载程序、希望保留原记录时，跳过本节。**仅当确认账户、集群和任务记录、资源缓存都不再需要时，才继续。

::: danger 此操作不可撤销
以下操作永久删除默认路径中的 ClusterD 配置和数据。再次安装将使用新配置，原账户和记录不会自动恢复。不要删除 `/var/lib/agione`、`/var/lib/rancher/k3s`、`/etc/rancher/k3s` 或 Docker/containerd 数据目录。
:::

完成第 7.2 节后，在同一个 root Bash 中执行。只有输入 `DELETE-CLUSTERD` 才会删除：

```bash
read -r -p "Type DELETE-CLUSTERD to permanently remove local data: " CLUSTERD_CONFIRM
if [ "$CLUSTERD_CONFIRM" = "DELETE-CLUSTERD" ]; then
  rm -rf /etc/agione-clusterd /var/lib/agione-clusterd
else
  printf '%s\n' "Cancelled; local data kept."
fi
```

### 7.4 确认卸载结果

```bash
systemctl list-unit-files agione-clusterd.service \
  agione-clusterd-housekeeping.service agione-clusterd-housekeeping.timer --no-pager
test ! -e /opt/agione-clusterd
ss -ltnp | grep ':18093' || true
```

确认 ClusterD 服务单元已移除、程序目录不存在、`18093` 不再由 ClusterD 监听；使用自定义端口时按实际端口检查。远端 AGIOne 是否已清理，必须看对应清理任务和目标节点状态，不能根据 ClusterD 网页打不开判断。

## 8. 常见问题

| 现象 | 优先检查什么 |
| --- | --- |
| 提示 `python3 is required` | 安装系统 Python；全量包内置 Python 不能替代首次校验工具 |
| 压缩包或包内校验失败 | 核对版本、可信 SHA-256，以及文件是否缺失或被修改；不要修改校验清单来绕过检查 |
| 安装过程中终端没有连续输出 | 完整日志保存在 `/var/log/agione-clusterd-install.log`；结合进程和磁盘状态判断，不要重复启动安装 |
| ClusterD 服务未启动 | 执行 `sudo journalctl -u agione-clusterd -n 100 --no-pager`，检查配置、路径和端口冲突 |
| 本机返回 HTTP 200，浏览器打不开 | 检查监听地址、TCP `18093` 的防火墙、安全组和路由 |
| 在线安装资源不可用 | 检查所需资源版本，以及 ClusterD 主机和目标维护节点的 DNS、HTTPS 与出网连接 |
| 目标节点预检失败 | 打开对应任务日志，按提示处理 SSH 连接、资源、端口等问题 |

排查时记录安装包版本、任务 ID、失败阶段和脱敏日志。不要公开 SSH 密码、登录凭据或含敏感信息的配置文件。
