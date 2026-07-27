# AGIOne 多节点环境安装部署文档

## 1. 文档说明

本文档用于指导安装人员在离线或弱网环境中完成 AGIOne host-mode 多节点安装部署。

安装前建议先完成环境快速调研，确认资源、网络、端口、离线包和数据风险是否满足上线条件：

- [环境快速调研](/zh-CN/product/investigation/quick-env-investigation)
- [安装前环境预检](./agione-precheck-environment-check)
- [部署配置要求](./agione-deployment-requirements)

默认自建中间件的多节点标准拓扑至少需要 4 台机器，最多支持 8 台机器。安装器只需要输入机器 IP，默认自动映射：

| 顺序 | 角色 | 默认运行内容 |
| --- | --- | --- |
| 第 1 台 | 应用 / 入口主节点 | Nginx、Gateway、core_common、核心 Java 服务 |
| 第 2 台 | 应用 / 入口副节点 | Nginx、Gateway、核心 Java 服务 |
| 第 3 台 | 中间件节点 | MariaDB 主库、Redis、Nacos、Kafka、Kafka UI、MinIO / MinStore |
| 第 4 台 | 数据库备库节点 | MariaDB 备库，安装器可初始化主备复制 |
| 第 5-8 台 | 扩展应用 / 入口节点 | 继续复制应用 / 入口节点服务 |

中间件部署支持三种模式：

| 模式 | 说明 | 最少机器数 |
| --- | --- | --- |
| `self-managed` | 默认模式，由安装器在 host-mode 节点上自建 MariaDB、Redis、Nacos、Kafka、MinIO / MinStore | 4 台 |
| `managed-middleware` | 全部中间件使用外部托管端点，只在目标机器上部署应用 / 入口服务 | 2 台 |
| `hybrid` | 每个中间件组件单独选择自建或外部托管，例如数据库用 RDS，Nacos / Redis / Kafka / 对象存储继续自建 | 数据库托管时至少 3 台，数据库自建时至少 4 台 |

`managed-middleware` 和 `hybrid` 都需要记录中间件端点、端口、账号和密码。推荐把这些端点值直接写在主安装 YAML 的 `agione_app.db`、`agione_app.redis`、`agione_app.nacos`、`agione_app.kafka`、`agione_app.minio` 和 `agione_app.middleware` 下。`--middleware-endpoints-file` 仅作为旧交付流程的兼容选项保留。TUI 模式可在界面直接填写端点值。`hybrid` 额外通过组件模式指明每个中间件组件的部署方式。

生产安装前还需要确认安装期业务预配置。TUI 模式在“中间件配置”页的“业务预配置”、“注册邮箱配置”、“域名与前端路径”中填写；quick / YAML 模式在 `agione_app.business` 和 `agione_app.default_access` 下填写。

| 配置项 | 配置路径 | 安装效果 |
| --- | --- | --- |
| 支付币种 | `agione_app.business.payment_currency`、`agione_app.business.payment_units` | `payment_currency` 写入 `metis.sys.currency`；`payment_units` 写入 CBDP 的 `account.units` 和 `stripe.supportCurrency` |
| 审批方式 | `agione_app.business.approval` | 写入 CBDP 租户申请审批配置 |
| 注册与邮箱 | `agione_app.business.registration`、`agione_app.business.mail` | 写入 `metis-upms-biz.yml`；示例邮箱配置生产前必须替换为真实可用配置 |
| 域名、证书、前端路径 | `agione_app.business.frontend` | 渲染到 Nginx 配置；已配置的证书和前端路径会挂载到 Nginx 容器 |
| 默认控制台账号 | `agione_app.default_access` | 安装时为 `admin`、`operator`、`provider` 生成密码；`provider` 账号授予 `Creator` 和 `cbdp_buyer` 角色 |

如果 `business.frontend.public_access_url` 和 `business.frontend.domain` 都为空，安装器会按应用入口节点 IP 和 `18090` 端口输出默认访问地址。

默认浏览器入口建议使用第 1 台或外部负载均衡后的入口地址：

```text
http://<app-entry-ip>:18090/modelone/
```

标准目录如下：

| 类型 | 路径 |
| --- | --- |
| release 解包源目录 | `agione-release-v1.0-XXX` |
| 安装器运行目录 | `/opt/agione-installer-bundle` |
| AGIOne 运行数据目录 | `/opt/hyperone` |
| 离线 Python 运行时 | `/opt/agione-python` |
| 离线安装资源目录 | `/opt/agione-offline` |

多节点安装默认使用 SSH 复制分发。安装器会通过 SSH 分发安装器、Compose 文件、manifest、数据库配置和已渲染的 Nginx 配置：完整交付包优先使用 `rsync`，缺少 `rsync` 时回退为通过 SSH 传输 `tar` 数据流；小型配置文件使用 `scp`。如启用 NFS 代码共享，安装器只共享后端 `<runtime_root>/core/metis` 和前端 `<runtime_root>/core/mamba`。`runtime_root` 可能是系统盘上的 `/opt/hyperone`，也可能是自动选择的数据盘路径 `/data/hyperone`。不会共享 host-mode 渲染配置、Nginx 配置、数据库数据、MinStore 数据、日志或 Docker 数据。安装器会在生成产物阶段为每个 Nginx 节点渲染独立的 `nginx.conf`，不再依赖远端正则修改基线配置。安装后如修改 host-mode 配置，可执行：

```bash
./agione sync-host-mode
```

该命令要求已经执行过一次 `quick` 或 TUI `install`，并且已生成 host-mode 输出文件。它只做一次性渲染配置同步，不会持续监听配置目录。NFS 代码共享不会替代该配置同步，因为 NFS 只共享 `core/metis` 和 `core/mamba`。

---

## 2. 前提条件

### 2.1 操作系统与权限

建议使用 Linux 服务器，并使用 `root` 用户执行安装。默认 SSH 用户为 `root`，默认 SSH 端口为 `22`。

安装发起机需要能够 SSH 到所有目标节点，包括它自身作为目标节点时对应的 IP。推荐使用 SSH 免密；如果使用密码认证，安装发起机需要先安装 `sshpass`。

如果需要修改 SSH 访问方式，优先使用主安装 YAML：在 `agione_app.topology.ssh_user`、`agione_app.topology.ssh_port` 和可选的 `agione_app.topology.ssh_password` 中配置全局默认值。如果不同机器需要不同 SSH 用户、端口或密码，请在 `/root/agione-install.yml` 的 `agione_app.topology.ssh_credentials` 中逐台配置。这样可以把安装前配置统一放在一个文件里，也能避免密码包含逗号、冒号、空格或 `@` 时被命令行分隔符错误拆分。

安装过程需要写入以下目录：

```text
/opt/agione-installer-bundle
/opt/hyperone
/opt/agione-python
/opt/agione-offline
```

### 2.2 节点数量

默认 `self-managed` host-mode 多节点部署必须填写 4 到 8 个不重复的机器 IP。机器 IP 必须填写私网 IPv4 地址，不能填写公网 IP 或公网 DNS。安装器会用这个私网 IP 做 SSH、Nacos 注册 / 发现、Nginx upstream、数据库 / Redis / Kafka / MinIO 连接和 Docker 端口绑定。

如果少于 4 台，安装器会阻止继续安装。4 台机器的最低角色要求为：

| 机器数量 | 可安装性 | 说明 |
| --- | --- | --- |
| 1-3 台 | 不支持 | 不满足应用双节点、中间件节点、备库节点的最低拓扑 |
| 4 台 | 支持 | 2 台应用 / 入口，1 台中间件，1 台数据库备库 |
| 5-8 台 | 支持 | 第 5 台开始继续作为应用 / 入口扩展节点 |

如果选择外部托管中间件：

| 中间件模式 | 节点数量要求 |
| --- | --- |
| `managed-middleware` | 2 到 8 台应用 / 入口机器 |
| `hybrid` 且数据库为 `managed` | 3 到 8 台机器：2 台应用 / 入口 + 1 台自建中间件节点；第 4 台开始作为应用 / 入口扩展节点 |
| `hybrid` 且数据库为 `self-managed` | 4 到 8 台机器：2 台应用 / 入口 + 1 台自建中间件节点 + 1 台数据库备库；第 5 台开始作为应用 / 入口扩展节点 |

### 2.3 运行时依赖

安装器会尽量使用交付包内置离线资源自动补齐运行时依赖，包括 Python 运行时、Docker / Compose、离线 Docker 镜像、AGIOne 应用运行资产、数据库和 MinStore 基线资源。

目标节点不要求预先安装 Docker。多节点预检会报告 Docker / Compose 状态；如果缺失，安装阶段会尝试使用离线包安装或修复。若交付包中缺少离线 Docker 包或镜像包，安装会失败。

远端节点至少应具备：

| 依赖 | 说明 |
| --- | --- |
| `bash` | 执行远端安装脚本 |
| `tar` | 解压安装资源 |
| `python3` 或 `python` | 执行远端预检辅助逻辑 |
| `ssh` 服务 | 接收安装发起机的 SSH 登录；推荐免密登录，密码认证需要安装发起机具备 `sshpass` |

### 2.4 已有数据保护

如果目标节点已经存在 `<runtime_root>/core`、`<runtime_root>/database`、`<runtime_root>/minstore` 或 `<runtime_root>/.agione-install-complete`，安装器默认会阻止覆盖，避免误删已有运行数据。运行根目录可能是默认的 `/opt/hyperone`，也可能是自动选择的数据盘路径，例如 `/data/hyperone`。

失败重试时不要只手工删除其中一两个目录后直接重跑。多节点安装会同时检查应用、中间件、备库和完成标记，残留数据可能导致预检失败或角色状态不一致。

确认要反复重装测试时，先预览清理内容：

```bash
./agione reset-host-mode --dry-run
```

该本地预览不会连接远端 SSH。

如果各节点使用不同 SSH 用户、端口或密码，请复用 `quick` 使用的主安装 YAML：

```bash
./agione reset-host-mode --dry-run --file /root/agione-install.yml
```

如需在每个节点远端验证清理脚本但不删除数据，可执行：

```bash
./agione reset-host-mode --remote-dry-run --file /root/agione-install.yml
```

确认清理：

```bash
./agione reset-host-mode --yes --file /root/agione-install.yml
```

简单命令行清理仍可直接传节点 IP：

```bash
./agione reset-host-mode --yes --nodes <ip1>,<ip2>,<ip3>,<ip4>
```

如仍需覆盖旧数据，可在安装命令中追加 `-f`。

`-f` 表示接受覆盖已有 AGIOne 运行数据的风险，适合测试环境反复重装；生产环境使用前必须确认备份与回退方案。

---

## 3. 网络配置

### 3.1 节点互通

安装前需要确认：

| 来源 | 目标 | 要求 |
| --- | --- | --- |
| 安装发起机 | 所有目标节点 | 默认 SSH `22` 端口可达；可使用 root 免密 SSH，或填写 SSH 连接凭据 |
| 应用 / 入口节点 | 中间件节点 | 可访问 MariaDB、Redis、Nacos、Kafka、MinIO / MinStore |
| 数据库备库节点 | 中间件节点 | 可访问 MariaDB 主库 `3306` |
| 浏览器或负载均衡 | 应用 / 入口节点 | 可访问 `18090` |

### 3.2 对外访问端口

| 端口 | 所在角色 | 用途 |
| --- | --- | --- |
| `18090` | 应用 / 入口节点 | AGIOne Web 访问入口 |
| `80` | 应用 / 入口节点 | Nginx HTTP 入口 |
| `8089` | 应用 / 入口节点 | 作业代理入口 |
| `22` | 所有节点 | SSH 运维与安装分发 |

### 3.3 角色端口占用检查

host-mode 多节点不再使用 Docker `network_mode: host`。安装器会为每个节点生成 bridge 网络 Compose 文件，并把需要跨节点访问的端口显式绑定到该节点私网 IP，例如 `192.168.x.x:18090:18090`。这样可避免容器监听直接暴露到公网 IP；安装器在启动服务前仍会检查关键端口，如果存在阻塞性端口冲突会停止安装。

| 角色 | 关键端口 |
| --- | --- |
| 应用 / 入口节点 | `80`、`18090`、`8089`、`8080`、`3000`、`4000`、`5007`、`7002`、`7003`、`8031`、`8032`、`8033`、`18088` |
| 中间件节点 | `3306`、`6379`、`8848`、`8849`、`9848`、`9849`、`9092`、`9093`、`18091`、`8080`、`9000`、`9001` |
| 数据库备库节点 | `3306` |

可选应用服务在 `quick` 的 IP 快速模式下默认不启用。若通过配置文件显式启用可选服务，相关端口冲突会按可选服务告警处理。

### 3.4 离线环境

离线安装时应确保交付包内包含：安装器核心包、AGIOne 应用包、Docker 离线安装包、Docker 镜像包、database 基线包、MinStore 基线包、Python 离线运行时、`SHA256SUMS` 和 `bundle-manifest.json`。

TUI 中的“启用离线交付资源完整性校验”只检查本地交付包资产完整性，不会从公网下载缺失包。当前安装器已支持 `managed-middleware` 和 `hybrid` 托管中间件模式；选择外部端点且启用 `verify_connectivity` 时，预检会从应用 / 入口节点检查端点连通性。

---

## 4. 产品安装

### 4.1 所需机器资源

以下资源要求按每台机器计算：

| 项目 | 推荐值 | 当前安装器检查说明 |
| --- | --- | --- |
| 操作系统 | Linux | 推荐 Ubuntu 22.04 |
| CPU | 8 核 | CPU 核数需满足 8 核 |
| 内存 | 16 GiB | 允许少量系统 / 虚拟化保留损耗，约 `15.2GiB` 以上可通过 |
| 可用磁盘 | 200 GiB | 默认 `runtime_root` 时，每台节点优先选择可用空间约 `160GiB` 以上的数据盘；无合适数据盘时才检查系统盘路径 `/opt/hyperone` |

如特殊交付环境需要覆盖磁盘最低阻断阈值，可在执行安装前设置：

```bash
export AGIONE_MIN_DISK_FREE_GIB=160
```

或使用比例方式：

```bash
export AGIONE_DISK_TOLERANCE_RATIO=0.80
```

### 4.2 软件包获取

先在安装发起机打开固定下载页，再复制页面中的 `Download URL` 包下载直链；解压后目录名由交付包内部目录决定，例如 `agione-release-v1.0-XXX/`。只需要先下载到安装发起机，安装器会在多节点安装过程中同步到其他目标节点。

固定下载页：[下载地址](https://agione.pro/release/download/agione-release-latest)

页面中同时提供 `MD5 URL`，建议下载后一起校验。

推荐在第 1 台应用 / 入口节点执行安装：

```bash
ssh root@<app-node-1>
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

解压后的典型交付包内容包括：

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

### 4.3 软件包完整性检查

执行安装前建议校验交付包：

```bash
chmod +x ./agione
./agione verify-bundle
```

校验通过后再继续安装。如果校验失败，请重新获取安装包，不建议继续执行。

### 4.4 执行安装

标准多节点场景推荐把节点拓扑、SSH 凭据、中间件端点、业务预配置和默认账号策略统一写入主安装 YAML，再使用 `quick` 执行：

```bash
chmod +x ./agione
./agione quick --file /root/agione-install.yml
```

反复重装测试且确认可以覆盖旧 AGIOne 运行数据时：

```bash
./agione quick -f --file /root/agione-install.yml
```

启用 NFS 后端/前端代码共享示例：

```bash
./agione quick \
  --file /root/agione-install.yml \
  --host-mode-shared-storage nfs
```

默认使用首个应用节点作为 NFS 服务端。共享相对目录固定为所选 `runtime_root` 下的 `core/metis` 和 `core/mamba`。如需指定 NFS 服务端或挂载参数：

```bash
./agione quick \
  --file /root/agione-install.yml \
  --host-mode-shared-storage nfs \
  --host-mode-nfs-server 192.168.31.204 \
  --host-mode-nfs-mount-options rw,sync,hard,intr
```

NFS 节点需要具备 NFS 服务端 / 客户端能力。离线环境请在打包前将与目标系统匹配的 `.rpm` / `.deb` 包放入 `assets/offline/nfs`。解包后安装器会检查 `/opt/agione-installer-bundle/assets/offline/nfs`；如果缺少 `exportfs` 或 `mount.nfs`，`setup-nfs` 会优先安装这些离线包，必要时才回退到操作系统包管理器。

#### 云托管中间件交付流程

云上交付时，可以用托管中间件替代部分或全部自建中间件节点。典型流程如下：

1. 准备 2 到 8 台应用 / 入口节点，并确保它们位于同一私网，或已与托管中间件所在 VPC 建立私网连通。
2. 通过客户云控制台、可选云厂商辅助脚本，或客户已有资源，准备托管数据库、Redis、Nacos、Kafka 和对象存储。
3. 生成或合并 `/root/agione-install.yml`，写入节点拓扑、SSH 凭据、中间件端点、业务预配置、域名 / 证书配置和默认账号策略。
4. 确认 Nacos 行为。如果由安装器发布配置，配置的 Nacos 账号必须在 `agione-prod` 命名空间具备配置发布权限；如果客户已经提前导入全部 AGIOne 配置，请设置 `agione_app.nacos.assume_preimported_configs: true`。
5. 执行 `./agione quick --file /root/agione-install.yml`，或在 TUI 安装中填写同一组字段。

云资源创建辅助脚本是可选的云厂商专用工具。它可以创建或复用资源，并渲染主安装 YAML；AGIOne 安装器本身只读取 `/root/agione-install.yml` 中最终生成的端点字段。AGIOne 安装器发布 Nacos 配置不需要云账号 AK/SK，而是使用 `agione_app.nacos.username` 和 `agione_app.nacos.password` 调用原生 Nacos OpenAPI。

托管中间件优先使用私网连通。公网 ELB / EIP 暴露只建议用于测试或特殊交付场景，并且必须严格限制来源 IP。Kafka 需要使用托管 Kafka 服务自身的 advertised listener 机制，不要默认认为共享 TCP ELB 可以替代 Kafka broker 的 advertised 地址。

全部中间件使用外部托管端点时，在主安装 YAML 中配置 `agione_app.middleware.mode: managed-middleware` 和各中间件端点字段，然后执行：

```bash
./agione quick --file /root/agione-install.yml
```

部分中间件使用外部托管、部分继续由安装器自建时，在主安装 YAML 中设置 `agione_app.middleware.mode: hybrid`，并配置每个组件的部署方式：

```bash
./agione quick --file /root/agione-install.yml
```

`--middleware-mode managed-middleware` 和 `--middleware-mode hybrid` 仍可作为临时测试时的命令行覆盖参数；正式交付建议把选定模式固定写入 `/root/agione-install.yml`。

统一安装 YAML 示例：

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
        password: "a,b:c@204"
      192.168.31.207:
        user: admin
        port: 2222
        password: "pass,207"
      192.168.31.208:
        user: root
        port: 22
      192.168.31.209:
        user: ops
        port: 2209
        password: "pass@209"
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
    root_password: "change-me"
    ssl: false
  redis:
    host: 192.168.31.208
    port: 6379
    password: "change-me"
  nacos:
    host: 192.168.31.208
    port: 8848
    namespace: agione-prod
    username: nacos
    password: "change-me"
  kafka:
    bootstrap_servers: kafka-1.internal.example.com:9092
    security_protocol: PLAINTEXT
  minio:
    endpoint: http://192.168.31.208:9000
    api_direct_host: 192.168.31.208:9000
    web_direct_host: 192.168.31.208:9001
```

在这个示例中，应用节点、中间件节点、备库节点和每节点 SSH 凭据都写在 `/root/agione-install.yml` 中。数据库和 Kafka 使用外部端点；Redis、Nacos、对象存储仍由安装器部署在 `192.168.31.208` 上。注意 Redis 自身仍可保留 `agione_app.redis.mode: standalone`，组件部署方式请写在 `agione_app.middleware.redis.mode`，避免与 Redis 运行模式混淆。

安装期业务预配置和默认账号策略写在同一个 YAML 中：

```yaml
agione_app:
  business:
    payment_currency:
      name: US Dollar
      code: USD
      sign: "$"
    payment_units:
      CASH:
        - code: USD
          name: US Dollar
          symbol: "$"
        - code: CNY
          name: Chinese Yuan
          symbol: CNY
      POINTS:
        - code: Credit
          name: Credit
          symbol: pts
    approval:
      tenant_apply_auto_auth: true
      tenant_apply_auth: true
    registration:
      email_enabled: true
      phone_enabled: false
      email_code_expire_minutes: 5
      phone_code_expire_minutes: 5
    mail:
      provider: smtp
      smtp:
        host: smtp.example.com
        port: 465
        username: ""
        password: ""
        from_address: no-reply@example.com
        from_name: AGIOne
        auth: true
        ssl_enabled: true
    frontend:
      domain: ""
      public_access_url: ""
      ssl_certificate_path: ""
      ssl_certificate_key_path: ""
      frontend_root: ""
  default_access:
    generate_random_passwords: true
    password_length: 20
```

默认账号密码每次安装都会生成，除非在配置中显式指定密码。生成密码长度为 6 到 32 位，并至少包含大写字母、小写字母、数字和支持的特殊符号中的三类。最终安装结果会输出 `admin`、`operator`、`provider` 的实际密码，请按客户认可的凭据交接流程保存。

旧交付流程的兼容参数仍保留。可以继续用 `--host-mode-ips` 或重复 `--host-mode-ip` 直接传机器 IP，也可以继续用 `--host-mode-nodes-file` 读取旧版节点凭据文件。新交付推荐统一把机器 IP、SSH 凭据、中间件端点和业务预配置写入 `/root/agione-install.yml`。如果同时传入 `--host-mode-ips` 和 `--host-mode-nodes-file`，角色顺序以 `--host-mode-ips` 为准，节点文件只为这些 IP 提供 SSH 凭据。

5 到 8 台机器时，继续在后面追加应用 / 入口扩展节点：

```yaml
agione_app:
  topology:
    app_nodes:
      - 192.168.31.204
      - 192.168.31.207
      - 192.168.31.210
```

临时命令行测试时，也可以重复传入 `--host-mode-ip`：

```bash
./agione quick \
  --host-mode-ip 192.168.31.204 \
  --host-mode-ip 192.168.31.207 \
  --host-mode-ip 192.168.31.208 \
  --host-mode-ip 192.168.31.209
```

`quick` 会自动完成以下流程：

1. 在 `/tmp/agione-quick-check.*` 临时工作区执行检查，不会在检查通过前解包运行数据。
2. 校验私网机器 IP，检查重复 IP，并按所选中间件模式应用节点数量规则。
3. 执行多节点远端预检：SSH、远端资源、`bash` / `tar` / `python`、已有运行数据、角色端口占用，并报告 Docker / Compose 状态。
4. 预检通过后解包到 `/opt/agione-installer-bundle`，运行数据写入 `/opt/hyperone`。
5. 渲染 host-mode Compose 文件、manifest 和 MariaDB 主备配置。
6. 同步安装器交付包、Compose 文件和配置到各节点。
7. 准备或修复各节点 Docker / Compose，并加载离线镜像。
8. 按组件部署模式启动自建中间件和备库；如果数据库为外部托管，则跳过本地备库和主从初始化。
9. 导入 Nacos 配置，准备 Nginx 上游，启动 core_common 和应用服务。
10. 执行业务初始化，运行 host-mode 健康检查，并写入安装完成标记。

`--skip-system-check` 仅建议用于临时联调或研发排障。它会跳过 `quick` 安装前的本机系统检查；如果传入 host-mode IP，也会跳过远端节点预检。后续执行阶段仍会检查并尽量使用离线资产安装或修复 Docker / Compose。跳过检查可能导致 `/opt/hyperone` 已解包后才暴露远端数据、端口或资源问题，因此正式交付不建议使用。

如需交互式确认配置，可执行：

```bash
./agione install
```

TUI 中可直接选择中间件部署模式，不需要提前手写端点 YAML：

- 选择“自建中间件”时，安装器按默认 4 到 8 台 host-mode 方案部署应用、中间件和备库。
- 选择“全部使用外部托管中间件”时，下一页直接填写数据库、Redis、Nacos、Kafka 和对象存储的地址、端口、用户名和密码；安装器会自动生成安装所需端点配置。
- 选择“混合模式”时，下一页先勾选哪些组件使用外部托管中间件，再填写对应连接信息；未勾选组件继续由安装器自建。
- 在中间件页的 Nacos 区域，只有当目标 Nacos 命名空间中已经提前导入全部 AGIOne 配置项，并且安装时需要跳过命名空间创建和配置发布时，才把 `Nacos 配置已提前导入(true/false)` 设置为 `true`。

节点页需要按中间件模式填写机器 IP：默认自建模式为 4 到 8 台，全部外部中间件为 2 到 8 台，混合模式按是否自建数据库决定最少 3 或 4 台。每台机器行都包含 SSH 用户、SSH 端口和可选 SSH 密码。某一行密码留空表示该节点使用 SSH 免密。然后按 `F5` 执行节点预检。预检范围包括 SSH 访问、远端 Docker 状态、`bash` / `tar` / `python`、安装磁盘选择、已有运行数据和角色端口占用。默认 `runtime_root` 时，只有全部节点预检通过后才会采纳自动选择的运行根目录。若某个节点检查失败，TUI 会阻止继续进入安装执行页。服务级编排矩阵属于高级能力，标准流程默认隐藏；如需使用，可通过配置文件承载服务编排。

### 4.5 重装测试与配置同步

反复测试安装功能时，推荐使用以下顺序：

```bash
./agione reset-host-mode --dry-run --file /root/agione-install.yml
./agione reset-host-mode --remote-dry-run --file /root/agione-install.yml
./agione reset-host-mode --yes --file /root/agione-install.yml
./agione quick -f --file /root/agione-install.yml
```

如果只是修改已渲染的 host-mode Compose 文件、manifest、MariaDB 配置或 Nginx 配置，不需要完整重装，可执行：

```bash
./agione sync-host-mode
```

如果已生成脚本后仍需使用 SSH 密码认证，可继续传入同一份主安装 YAML：

```bash
./agione sync-host-mode --file /root/agione-install.yml
```

该命令只同步已生成配置，不会重新解包 runtime 基线包，也不会自动重启业务容器。配置变更后是否需要重启服务，应按具体变更内容判断；如果变更了 Nginx 配置，同步后需要重启受影响的 Nginx 容器。

### 4.6 验证结果

安装完成后执行：

```bash
./agione health
./agione ps
```

查看最新安装报告：

```text
/opt/agione-installer-bundle/reports/install-*.md
```

浏览器访问：

```text
http://<app-entry-ip>:18090/modelone/
```

验收时重点确认：

| 检查项 | 期望结果 |
| --- | --- |
| 安装结果 | 快速安装或 TUI 结果显示成功 |
| 服务状态 | 应用 / 入口节点、中间件节点、备库节点容器正常运行 |
| Nacos | 配置导入完成，关键服务已注册 |
| 数据库复制 | 备库复制状态正常，无明显延迟 |
| Web 入口 | 浏览器可打开 `http://<app-entry-ip>:18090/modelone/` |
| 报告归档 | 安装报告和 host-mode 健康报告已生成 |

如安装失败，安装器会尽量自动收集 host-mode 支持包，常见位置为：

```text
/opt/agione-installer-bundle/outputs/agione-app/host-mode/support/
```

也可以执行：

```bash
./agione doctor
```

生成诊断报告和脱敏支持包，便于继续排查。

### 4.7 语言与输出约定

`quick` 模式下日志默认采用英文，便于标准化归档和自动化识别。终端图形界面会跟随欢迎页选择的语言显示，并过滤另一种语言的辅助日志。若发现英文模式下仍出现中文业务日志，优先保留完整安装报告和支持包，便于定位是安装器日志过滤问题还是容器自身日志输出。
