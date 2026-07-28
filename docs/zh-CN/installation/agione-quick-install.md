# AGIOne 环境安装部署指南

## 前言

| 项目 | 内容 |
| --- | --- |
| 适用角色 | 首次安装人员、交付工程师、客户运维工程师 |
| 导航路径 | 部署 > AGIOne 环境安装部署指南 |
| 功能定位 | 指导用户在单台目标主机上完成 AGIOne 下载、安装、访问验证和交付归档 |

本文档适用于单节点 / All in One 部署。如果你是第一次安装，先按下面的安装时间线走一遍，再回到具体命令细看。

### 新手理解

单节点安装就是让 AGIOne 先在一台 Linux 主机上跑起来：准备主机，打开固定下载页获取安装包，执行 `./agione quick`，最后用浏览器打开安装器输出的访问地址。

## 安装时间线

| 阶段 | 你要做什么 | 完成标志 |
| --- | --- | --- |
| 第 1 步：确认主机 | 确认 CPU、内存、磁盘、操作系统和 root 权限 | 主机满足 [主机规格](#主机规格) |
| 第 2 步：下载安装包 | 打开固定下载页，复制 `Download URL` 和 `MD5 URL` | 安装包下载完成并通过 MD5 校验 |
| 第 3 步：执行 quick | 执行 `./agione quick`，或带配置文件执行 | 终端输出 `Installation Result` |
| 第 4 步：浏览器访问 | 打开 `http://<目标主机IP>:18090/modelone/` | 页面可正常打开 |
| 第 5 步：交付归档 | 保存访问地址、默认账号、健康报告和 handover 包 | 客户或运维团队可接手 |

安装前建议先完成 [环境快速调研](/zh-CN/product/investigation/quick-env-investigation)，判断资源、网络和上线风险。

## 术语速查

| 术语 | 说明 |
| --- | --- |
| 交付包 | AGIOne 安装包，包含安装器、镜像、数据库基线和离线运行资源 |
| `quick` | 一键安装命令，会执行预检、解包、加载镜像、启动服务并输出结果 |
| `/opt/hyperone` | 默认运行数据目录，AGIOne 服务数据写入这里或安装器选择的数据盘路径 |
| `/opt/agione-installer-bundle` | 安装器运行目录，包含安装后的报告、渲染配置和输出文件 |
| `/root/agione-install.yml` | 可选配置文件，用于固定密码、域名、证书、运行路径和其他交付参数 |
| Nacos | AGIOne 使用的配置中心和服务注册中心 |
| 默认控制台账号 | 安装完成后面向客户交付的 `operator` 和 `provider` 账号 |

---

## 主机规格

推荐申请规格：

| 项目 | 推荐值 | 说明 |
| --- | --- | --- |
| 操作系统 | Linux | ubuntu 22.04 |
| CPU | 8 核 | CPU 核数必须满足 8 核 |
| 内存 | 推荐 16 GiB | 安装器要求检测内存至少 `12GiB`；16 GiB 仍是推荐申请规格 |
| 可用磁盘 | 200 GiB | `runtime_root` 保持默认值时，安装器优先选择可用空间约 `160GiB` 以上的数据盘；无合适数据盘时才回落检查系统盘 |
| 执行用户 | `root` | 推荐 root 安装，避免 Docker、目录权限和系统服务权限问题 |

架构支持：AGIOne 可部署在 x86_64 和 ARM64 / AArch64 架构机器上。安装前请下载与目标机器 CPU 架构一致的安装包。

## 快速安装

### 1. 下载交付包

先打开固定下载页，再复制页面中的 `Download URL` 包下载直链。`agione-release-latest` 本身是下载页，不是 `.tar.gz` 安装包直链。

固定下载页：[下载地址](https://agione.pro/release/download/agione-release-latest)

页面中同时提供 `MD5 URL`，建议下载后一起校验。

执行示例：

```bash
ssh root@<target-host>
AGIONE_RELEASE_PAGE="https://agione.pro/release/download/agione-release-latest"
AGIONE_RELEASE_URL="<复制下载页中的 Download URL>"
AGIONE_RELEASE_MD5_URL="<复制下载页中的 MD5 URL>"
AGIONE_RELEASE_ARCHIVE="${AGIONE_RELEASE_URL##*/}"

mkdir -p /opt/hyperone && \
cd /opt/hyperone && \
curl -fL -o "$AGIONE_RELEASE_ARCHIVE" "$AGIONE_RELEASE_URL" && \
curl -fL -o "$AGIONE_RELEASE_ARCHIVE.md5" "$AGIONE_RELEASE_MD5_URL" && \
echo "$(awk '{print $1}' "$AGIONE_RELEASE_ARCHIVE.md5")  $AGIONE_RELEASE_ARCHIVE" | md5sum -c - && \
AGIONE_RELEASE_DIR="$(tar -tzf "$AGIONE_RELEASE_ARCHIVE" | head -1 | cut -d/ -f1)" && \
tar -zxvf "$AGIONE_RELEASE_ARCHIVE" && \
cd "/opt/hyperone/$AGIONE_RELEASE_DIR"
```

### 2. 一键安装

推荐使用 `quick`，它会自动完成解包、环境检查和安装流程：

```bash
chmod +x ./agione
./agione quick
```

单节点 quick 默认使用交付包内置的 `compose/agione-app.yaml` 基础模板，不启用 host-mode 可选应用服务组。如果需要把交付参数固化到配置文件，先准备 `/root/agione-install.yml`，再执行：

```bash
./agione quick --file /root/agione-install.yml
```

最小可运行示例：

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

如果需要固定域名、HTTPS 证书、默认账号密码、运行目录或其他字段，请阅读 [安装配置文件字段说明](./agione-install-config-reference)。该文档按必填字段到高级字段排序。

安装器会自动执行：

1. 在 `/tmp/agione-quick-check.*` 临时工作区执行安装前检查
2. 检查通过后刷新交付包到 `/opt/agione-installer-bundle`
3. 准备离线 Python 运行时
4. 检查离线资源包
5. 渲染配置与 Compose 文件
6. 安装或修复 Docker / Compose
7. 加载离线镜像
8. 启动 AGIOne 服务
9. 导入 Nacos 配置
10. 输出安装结果和服务列表

### 3. 查看安装结果

安装成功后，`quick` 会在终端末尾输出实际访问入口和面向客户交付的默认账号信息。默认控制台账号密码会在每次安装时生成，除非在 `agione_app.default_access.credentials` 中显式配置固定密码。

`quick` 默认使用英文输出，格式如下：

```text
Installation Result:
Console URL: http://<target-host-ip>:18090/

Access Information (Account/Password):
operator <generated-random-password>
provider <generated-random-password>
```

同一份访问信息会写入安装器运行目录下的 `outputs/final-install-result.md` 和 `outputs/acceptance-report.md`。安装报告中也会列出默认控制台账号文件路径。请按客户认可的凭据交接流程归档这些文件。

也可以执行：

```bash
./agione health
./agione ps
```

### 4. 浏览器访问

默认访问地址：

```text
http://<target-host-ip>:18090/modelone/
```

如果使用域名或完整访问地址，请以安装配置中的 `agione_app.frontend.domain` / `agione_app.frontend.public_access_url` 为准。

---

## 概览

### AGIOne 安装器做什么

AGIOne 安装器负责完成以下工作：

- 解包离线交付物到标准运行目录
- 检查主机环境、资源、Docker、Compose、端口和基础命令
- 渲染安装配置与 `compose.rendered.yaml`
- 加载离线 Docker 镜像并启动 AGIOne 服务
- 导入 Nacos 配置并等待核心服务注册
- 输出安装结果、服务状态、诊断报告和交付包

### 推荐阅读路径

- **首次安装**：直接看 [快速安装](#快速安装)
- **需要图形化交互**：看 [高级安装](#高级安装)
- **安装失败或交付验收**：看 [运维文档](#运维文档)
- **强制安装、跳过检查、数据恢复**：看 [常见问题](#常见问题)

### 标准目录

| 类型 | 路径 |
| --- | --- |
| release 解包源目录 | `agione-release-v1.0-XXX` |
| 安装器运行目录 | `/opt/agione-installer-bundle` |
| AGIOne 运行数据目录 | `/opt/hyperone` |
| 离线 Python 运行时 | `/opt/agione-python` |
| 安装报告与诊断输出 | `/opt/agione-installer-bundle/reports` 或当前 bundle 的 `reports` |

---

## 开始前

### 交付包校验

如果需要确认交付物完整性：

```bash
./agione verify-bundle
```

`verify-bundle` 会校验安装包 Ed25519 签名和 `SHA256SUMS` 中记录的 SHA-256 摘要。校验通过后再执行安装；如果校验失败，请重新获取安装包。只有交付负责人确认是可信历史未签名包时，才允许使用 `./agione verify-bundle --allow-unsigned-legacy` 或对应兼容环境变量。

---

## 高级安装

### TUI 交互式安装

如果需要逐页确认参数、资源策略、节点信息和安装计划，可以使用：

```bash
chmod +x ./agione
./agione install
```

TUI 流程包含：

1. 欢迎页
2. 系统检查
3. 离线包检查
4. 安装概览
5. 模块选择
6. 基础信息
7. 中间件配置
8. 资源策略
9. 节点输入
10. 开始安装
11. 执行安装
12. 安装结果

适合正式交付、客户现场演示或需要人工确认配置的场景。

### 配置审阅

执行安装前可生成脱敏配置审阅报告：

```bash
./agione review-config
```

报告通常包含：

- 安装模式
- 访问地址
- 数据库、Redis、Nacos、Kafka、MinIO 配置摘要
- 资源策略
- 关键路径
- 风险提示

### 资源策略

安装器支持两种资源策略：

| 策略 | 说明 |
| --- | --- |
| Docker 默认资源策略 | 默认推荐，不在 `compose.rendered.yaml` 中写入 `cpus` / `mem_limit` / `mem_reservation` |
| 手动资源配额 | 安装人员为每个服务填写 CPU、内存限制和内存预留 |

一般交付建议使用默认策略，避免在不同客户主机规格下过度限制服务资源。

---

## 运维文档

### 常用命令

```bash
./agione help
./agione ps
./agione health
./agione restart <service>
./agione stop <service>
./agione down
./agione doctor
./agione handover
```

### 查看服务状态

```bash
./agione ps
```

或进入安装目录后查看 Compose 状态：

```bash
cd /opt/agione-installer-bundle/outputs/agione-app
docker compose -f compose.rendered.yaml ps
```

如果系统使用旧版 Compose：

```bash
docker-compose -f compose.rendered.yaml ps
```

### 重启服务

重启全部服务：

```bash
./agione restart
```

重启指定服务：

```bash
./agione restart core_upms md_gateway nginx
```

### 健康检查

```bash
./agione health
```

健康检查报告用于交付验收和失败排查，建议安装完成后归档。

### 诊断包

安装失败后优先执行：

```bash
./agione doctor
```

诊断包通常包含：

- 系统检查结果
- 配置快照
- Compose 文件
- 服务状态
- 日志摘要
- 失败分类和建议命令

### 交付包

安装成功后建议导出交付包：

```bash
./agione handover
```

交付包可用于客户验收、内部归档和后续运维交接。

### 有状态备份与恢复

如果需要备份或恢复 MariaDB、Nacos、MinIO、InfluxDB 或安装器生成配置，先查看恢复计划：

```bash
scripts/agione_stateful_recovery.sh plan
```

创建备份时，MinIO 和 InfluxDB 的一致性文件备份需要允许短暂停服：

```bash
AGIONE_ALLOW_BRIEF_SERVICE_STOP=1 scripts/agione_stateful_recovery.sh backup
```

恢复前先校验备份归档：

```bash
scripts/agione_stateful_recovery.sh verify --archive /path/to/agione-stateful-backup-v1-*.tar.gz
```

恢复会修改运行数据，必须按脚本提示设置确认环境变量后再执行。生产环境恢复前需要客户确认停服窗口和回退方案。

---

## 常见问题

### Q1：`quick` 和 `install` 怎么选？

- 想最快安装：使用 `./agione quick`
- 想逐步确认配置：使用 `./agione install`
- 想只做检查不安装：使用 `./agione doctor`

### Q2：目标机没有 `python3` 怎么办？

不需要手动安装。交付包内置离线 Python 运行时，安装器会优先准备 `/opt/agione-python`。

### Q3：为什么申请了 16G 内存，检测不是 16GiB？

云主机、虚拟化平台和操作系统会保留一部分内存，所以检测值可能低于购买规格。安装器要求检测内存至少 `12GiB`；16 GiB 仍是更平稳启动和运行的推荐申请规格。

### Q4：安装器如何选择运行数据磁盘？

当 `agione_app.runtime_root` 保持 `/opt/hyperone` 默认值时，安装器会先扫描物理数据盘挂载点，找到可用空间约 `160GiB` 以上的数据盘后选择 `<挂载点>/hyperone`。如果没有合适数据盘，则检查系统盘上的 `/opt/hyperone`。如果显式配置了 `runtime_root`，安装器会尊重该路径，并校验该路径所在文件系统。

### Q5：系统检查失败能跳过吗？

不建议跳过。系统检查失败通常意味着后续可能出现 OOM、初始化超时、服务注册失败或数据库启动缓慢。

如确认为临时联调或演示环境，可按安装器界面提示执行隐藏覆盖操作；`quick` 模式也支持：

```bash
./agione quick --skip-system-check
```

该参数只跳过安装前检查；执行阶段仍会检查并尽量使用离线资产安装或修复 Docker / Compose。跳过检查可能导致运行数据已解包后才暴露资源、端口或运行时问题，正式交付不建议使用。

### Q6：什么情况下使用强制干净安装？

只有在确认目标机旧数据可以被清理、且希望从基线包重新构建环境时才使用。完整重装优先使用：

```bash
./agione quick -f
```

如果只需要单独刷新解包基线，也可以使用：

```bash
./agione unpackage --force-clean-install
```

强制流程会先备份已有 AGIOne 服务数据，再删除旧运行数据并解压新基线。

### Q7：强制安装的备份在哪里？

默认路径：

```text
/opt/hyperone/backups/force-restore/<timestamp>/all-service-data/
```

强制安装不会自动恢复旧数据。如需恢复，必须先停止服务，再按目录恢复。

### Q8：Nacos 配置缺失或服务启动失败怎么办？

优先执行：

```bash
./agione doctor
./agione health
./agione ps
```

然后查看失败服务日志：

```bash
docker logs <container-name> --tail 300
```

常见原因包括：Nacos 配置未导入、Redis 密码不一致、数据库未就绪、镜像未加载或主机资源不足。

### Q9：安装完成后需要交付哪些信息？

建议至少交付：

- 访问地址
- 面向客户交付的初始化账号信息
- `/opt/agione-installer-bundle` 路径
- `/opt/hyperone` 路径
- `health` 报告
- `handover` 交付包
- 如使用强制安装，还需记录备份路径

---

## 附录：推荐安装流程

```bash
# 1. 进入交付包目录
cd /opt/hyperone/agione-release-v1.0-XXX

# 2. 授权入口脚本
chmod +x ./agione

# 3. 可选：校验交付包
./agione verify-bundle

# 4. 一键安装
./agione quick

# 5. 验收
./agione health
./agione ps

# 6. 导出交付包
./agione handover
```
