---
prev: false
next: true
---

# AGIOne 安装配置文件字段说明

## 前言

| 项目 | 内容 |
| --- | --- |
| 适用角色 | 交付工程师、实施工程师、客户运维工程师 |
| 导航路径 | 部署 > AGIOne 安装配置文件字段说明 |
| 功能定位 | 帮助安装人员从最小 YAML 模板开始，按必填、常用、场景、高级字段的顺序写出可执行的 `/root/agione-install.yml` |

本文档说明如何编写 `/root/agione-install.yml`。建议不要一开始通读全部字段，而是先复制匹配场景的最小模板，再只补充本次交付确实需要的字段。

### 新手理解

`/root/agione-install.yml` 可以理解为安装器的“任务单”：它告诉安装器要装单节点还是多节点、哪些机器参与、密码是什么、中间件是自建还是托管、用户最终从哪个域名访问。

## 配置时间线

| 阶段 | 你要做什么 | 完成标志 |
| --- | --- | --- |
| 第 1 步：选择模板 | 根据单节点、多节点自建中间件或托管中间件选择最小示例 | 已复制一份可运行 YAML |
| 第 2 步：填写必填字段 | 填写部署模式、节点模式、基础密码和 host-mode 拓扑 | 安装器能识别目标部署形态 |
| 第 3 步：填写中间件 | 确认自建、托管或混合模式，并填写连接端点 | 数据库、Redis、Nacos、Kafka、对象存储连接信息完整 |
| 第 4 步：填写访问入口 | 按需添加域名、HTTPS 证书和默认账号策略 | 安装结果能输出正确访问地址和账号 |
| 第 5 步：填写场景字段 | 仅在需要时启用 KUBEM、云服务、ISync、NFS 等能力 | 配置中只保留当前交付需要的字段 |
| 第 6 步：审查密码和风险 | 检查密码字符集、备库重建风险、托管中间件权限 | 可执行 `doctor` 和正式安装 |

## 术语速查

| 术语 | 说明 |
| --- | --- |
| YAML | 使用缩进表达层级的配置文件格式；缩进错误会导致字段无法被安装器读取 |
| 顶层字段 | 最外层配置，例如 `global_config`、`selected_modules`、`agione_app` |
| 必填字段 | 不填写就无法安装或无法连接核心组件的字段 |
| 常用字段 | 不改变基础部署形态，但常用于域名、证书、默认账号、运行目录等交付要求 |
| 场景字段 | 只在特定场景需要的字段，例如托管中间件、可选服务组、NFS |
| 高级字段 | 标准交付通常不需要填写，主要用于特殊编排、排障或非默认资源策略 |
| 安全字符集 | 推荐密码只使用字母、数字和下划线，避免 URL、Shell、YAML 转义问题 |

标准执行命令：

```bash
./agione quick --file /root/agione-install.yml
```

反复重装测试且确认可以覆盖已有运行数据时：

```bash
./agione quick -f --file /root/agione-install.yml
```

## 1. 先选择模板

| 场景 | 从哪里开始 | 主要填写字段 |
| --- | --- | --- |
| 单节点自建中间件 | [2.1 单节点最小配置](#_2-1-单节点最小配置) | 部署模式、基础密码、默认账号策略 |
| 多节点自建中间件 | [2.2 多节点自建中间件最小配置](#_2-2-多节点自建中间件最小配置) | 节点拓扑、SSH、基础密码、备库重建确认 |
| 多节点托管中间件 | [2.3 多节点托管中间件最小配置](#_2-3-多节点托管中间件最小配置) | 应用节点、托管中间件端点和账号 |
| 混合中间件 | 先复制自建或托管模板，再看 [5.1 中间件部署模式](#_5-1-中间件部署模式) | 为每个组件选择 `self-managed` 或 `managed` |
| 需要补充中间件连接字段 | [5.2 中间件端点字段详情](#_5-2-中间件端点字段详情) | 数据库、Redis、Nacos、Kafka、对象存储可选字段 |
| 需要域名 / HTTPS | [4.1 前端访问入口](#_4-1-前端访问入口) | `agione_app.frontend` |
| 需要 KUBEM / 云服务 / ISync | [5.3 可选应用服务组](#_5-3-可选应用服务组) | `agione_app.start_optional_app_services` |
| 需要高级服务编排 | [6.1 host-mode 服务级编排](#_6-1-host-mode-服务级编排) | `agione_app.host_mode_service_placements` |

推荐编写顺序：

1. 选择部署模式：`single` 或 `host-mode`。
2. 填写必填字段：模块、节点模式、基础密码、host-mode 拓扑。
3. 选择中间件模式：自建、托管或混合。
4. 增加常用配置：域名、证书、默认账号策略。
5. 仅在需要时增加可选服务组、NFS、服务编排或其他高级字段。

## 2. 最小配置示例

下面的密码只演示安全字符格式。生产交付请为每个组件生成不同密码，并只使用 `A-Z`、`a-z`、`0-9`、`_`。

### 2.1 单节点最小配置

一台机器同时运行 AGIOne 应用服务和自建中间件时使用。

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

如果没有固定域名、证书或固定默认账号密码，单节点安装通常不需要更多字段。

### 2.2 多节点自建中间件最小配置

适用于默认 4 到 8 台机器的 host-mode 部署，由安装器自建 MariaDB、Redis、Nacos、Kafka、MinIO / MinStore。

```yaml
global_config:
  deploy_mode: host-mode
  language: en_US
  offline_mode: true

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
  db:
    host: 192.168.31.208
    port: 3306
    root_username: root
    root_password: "DbRoot_2026"
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
    host: 192.168.31.208
    port: 9092
    bootstrap_servers: 192.168.31.208:9092
    security_protocol: PLAINTEXT
  minio:
    endpoint: http://192.168.31.208:9000
    api_direct_host: 192.168.31.208:9000
    web_direct_host: 192.168.31.208:9001
    access_key: "MinioAccess_2026"
    secret_key: "MinioSecret_2026"
  auto_initialize_db_replication: true
  accept_standby_rebuild_risk: true
  default_access:
    generate_random_passwords: true
    password_length: 20
```

如果每台机器 SSH 用户、端口或密码不同，增加 `topology.ssh_credentials`；见 [3.2 host-mode 节点拓扑](#_3-2-host-mode-节点拓扑)。

### 2.3 多节点托管中间件最小配置

数据库、Redis、Nacos、Kafka、对象存储由云服务或客户已有服务提供，目标机器只运行 AGIOne App / Edge 服务时使用。

```yaml
global_config:
  deploy_mode: host-mode
  language: en_US
  offline_mode: true

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
  middleware:
    mode: managed-middleware
    provider: generic
    verify_connectivity: true
  db:
    host: rds-mariadb.internal.example.com
    port: 3306
    root_username: root
    root_password: "DbRoot_2026"
    ssl: false
  redis:
    host: redis.internal.example.com
    port: 6379
    password: "Redis_2026"
    ssl: false
  nacos:
    host: nacos.internal.example.com
    port: 8848
    namespace: agione-prod
    username: nacos
    password: "Nacos_2026"
    assume_preimported_configs: false
  kafka:
    bootstrap_servers: kafka-1.internal.example.com:9092
    security_protocol: PLAINTEXT
  minio:
    storage_type: s3
    endpoint: https://oss.internal.example.com
    access_key: "ObjectAccess_2026"
    secret_key: "ObjectSecret_2026"
    bucket_name: agione
    path_style_access: true
  default_access:
    generate_random_passwords: true
    password_length: 20
```

只有当目标 Nacos 命名空间已提前导入全部 AGIOne 配置时，才设置 `agione_app.nacos.assume_preimported_configs: true`。

## 3. 第一级：必填字段

第一级字段决定安装器能否开始部署。正式交付先确认这些字段。

### 3.1 所有场景必填

| 字段 | 类型 | 为什么必填 | 推荐值 |
| --- | --- | --- | --- |
| `global_config.deploy_mode` | string | 选择单节点或 host-mode 流程 | `single` 或 `host-mode` |
| `selected_modules` | list | 选择执行模块 | 标准安装使用 `["agione-app"]` |
| `agione_app.node_mode` | string | 选择应用节点模式 | 单节点 `all-in-one`；多节点 `host-mode` |
| `agione_app.db.root_password` | string | 数据库初始化需要 | 按安全密码规范生成 |
| `agione_app.nacos.password` | string | 配置发布、注册检查和运行时访问需要 | 按安全密码规范生成 |
| `agione_app.nacos.auth_token` | string | 自建 Nacos 服务端鉴权需要 | 自建 Nacos 必填，使用至少 32 字节随机值生成的 Base64 字符串 |
| `agione_app.redis.password` | string | 自建 Redis AUTH 需要 | 自建 Redis 必填 |

标准模块选择：

```yaml
selected_modules:
  - agione-app
```

### 3.2 host-mode 节点拓扑

host-mode 必须填写私网 IPv4 地址，不要使用公网 IP 或公网 DNS。安装器会把这些地址用于 SSH、Nacos 注册 / 发现、Nginx upstream、中间件连接和 Docker 端口绑定。

| 字段 | 类型 | 什么时候必填 | 说明 |
| --- | --- | --- | --- |
| `agione_app.topology.app_nodes` | list | host-mode 必填 | 应用 / 入口节点。自建和托管中间件都至少需要 2 台。 |
| `agione_app.topology.middleware_node` | string | 任一中间件组件自建时必填 | MariaDB 主库、Redis、Nacos、Kafka、MinIO / MinStore 的默认节点。 |
| `agione_app.topology.backup_nodes` | list | 自建数据库需要备库时必填 | 当前 host-mode 支持 1 台数据库备库节点。 |
| `agione_app.topology.ssh_user` | string | 可选 | 全局 SSH 用户，默认 `root`。 |
| `agione_app.topology.ssh_port` | integer | 可选 | 全局 SSH 端口，默认 `22`。 |
| `agione_app.topology.ssh_password` | string | 所有节点共用一个 SSH 密码时填写 | 生产推荐 SSH 免密；密码认证要求安装发起机有 `sshpass`。 |
| `agione_app.topology.ssh_credentials` | map | 节点 SSH 配置不一致时填写 | 逐节点覆盖用户、端口和密码。 |

逐节点 SSH 示例：

```yaml
agione_app:
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
        user: ops
        port: 2222
        password: "Password_207"
```

### 3.3 必填中间件连接字段

这些字段同时用于自建和托管中间件。host-mode 自建中间件通常填写中间件节点私网 IP；托管中间件填写云服务或客户已有服务的内网端点。

| 字段 | 类型 | 什么时候必填 | 说明 |
| --- | --- | --- | --- |
| `agione_app.db.host` / `port` | string / integer | host-mode 或托管数据库 | 数据库地址和端口，默认端口 `3306`。 |
| `agione_app.db.root_username` | string | 托管数据库常用 | 初始化数据库的管理员账号，默认 `root`。 |
| `agione_app.db.root_password` | string | 所有场景必填 | 数据库管理员密码。 |
| `agione_app.redis.host` / `port` | string / integer | host-mode 或托管 Redis | Redis 地址和端口，默认端口 `6379`。 |
| `agione_app.redis.password` | string | 自建 Redis 必填；托管 Redis 按策略填写 | Redis AUTH 密码。 |
| `agione_app.nacos.host` / `port` | string / integer | host-mode 或托管 Nacos | Nacos API 地址和端口，默认 `8848`。 |
| `agione_app.nacos.namespace` | string | 所有场景必填 | 生产默认 `agione-prod`。 |
| `agione_app.nacos.username` / `password` | string | 所有场景必填 | 用于发布配置和运行时访问 Nacos。 |
| `agione_app.kafka.bootstrap_servers` | string | 所有场景必填 | Kafka broker 列表，自建默认 `<middleware-ip>:9092`。 |
| `agione_app.minio.endpoint` | string | 所有场景必填 | S3 兼容 API 端点。 |
| `agione_app.minio.access_key` / `secret_key` | string | 所有场景必填 | 对象存储凭据。 |

更多连接字段见 [5.2 中间件端点字段详情](#_5-2-中间件端点字段详情)。现场没有特殊要求时，保持示例值或安装器默认值即可。

## 4. 第二级：常用可选字段

第二级字段不改变基础拓扑，但会影响客户访问、默认账号、交付体验和运行路径。

### 4.1 前端访问入口

| 字段 | 类型 | 默认行为 | 说明 |
| --- | --- | --- | --- |
| `agione_app.frontend.domain` | string | 为空时使用 `http://<入口IP>:18090` | 对外域名。 |
| `agione_app.frontend.public_access_url` | string | 为空时由安装器生成 | 完整对外访问 URL；配置后安装结果优先输出。 |
| `agione_app.frontend.ssl_certificate_path` | string | 不启用 HTTPS | 安装发起机上的 Nginx PEM 证书路径。 |
| `agione_app.frontend.ssl_certificate_key_path` | string | 不启用 HTTPS | 未加密 PEM 私钥路径，必须和证书一起配置。 |
| `agione_app.frontend.frontend_root` | string | 使用交付包内置前端 | 自定义前端静态文件绝对路径。 |

配置证书路径时，安装器会校验并复制到 `/opt/hyperone/core/nginx/certs/`；host-mode 会同步到所有 Nginx 节点。

### 4.2 默认控制台账号

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `agione_app.default_access.generate_random_passwords` | boolean | `true` | 每次安装为面向客户交付的默认账号生成新密码。 |
| `agione_app.default_access.password_length` | integer | `20` | 生成密码长度，范围 6 到 32。 |
| `agione_app.default_access.credentials.operator` | string | 自动生成 | 固定 `operator` 密码；仅客户策略要求固定密码时填写。 |
| `agione_app.default_access.credentials.provider` | string | 自动生成 | 固定 `provider` 密码。 |

面向客户交付的账号：

| 账号 | 说明 |
| --- | --- |
| `operator` | 运维账号。 |
| `provider` | 提供方账号，授予 `Creator` 和 `cbdp_buyer` 角色。 |

### 4.3 全局基础字段

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `global_config.env_name` | string | `demo` | 环境名称，用于报告和生成产物名称。 |
| `global_config.language` | string | `en_US` | 安装器输出语言，支持 `en_US` 和 `zh_CN`。 |
| `global_config.fallback_language` | string | `zh_CN` | 翻译缺失时的兜底语言。 |
| `global_config.arch` | string | `x86_64` | 目标 CPU 架构，支持 `x86_64` 和 `arm64` / `aarch64`；必须与下载的安装包匹配。 |
| `global_config.timezone` | string | `Asia/Shanghai` | 运行时区。 |
| `global_config.offline_mode` | boolean | `true` | 是否使用离线交付资源，正式交付建议保持 `true`。 |
| `global_config.report_dir` | string | `./reports` | 安装报告目录。 |
| `global_config.log_dir` | string | `./reports/logs` | 安装器日志目录。 |
| `global_config.package_repository_url` | string | 空 | 预留在线软件包仓库地址，离线交付通常为空。 |
| `global_config.allow_internet_package_hint` | boolean | `true` | 离线 OS 包缺失时，报告是否允许提示在线安装建议。 |
| `global_config.auto_detect_language_from_timezone` | boolean | `true` | 是否可根据时区辅助判断交互语言；`quick` 默认仍输出英文。 |
| `agione_app.runtime_root` | string | `/opt/hyperone` | 运行数据根目录，保持默认值时安装器会优先选择合适数据盘。 |

## 5. 第三级：场景字段

这些字段只在当前交付场景需要时填写。

### 5.1 中间件部署模式

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `agione_app.middleware.mode` | string | `self-managed` | 支持 `self-managed`、`managed-middleware`、`hybrid`。 |
| `agione_app.middleware.provider` | string | `generic` | 用于报告和交付评审的提供方标识。 |
| `agione_app.middleware.endpoints_file` | string | 空 | 旧版独立端点文件兼容字段；新交付建议直接写入 `/root/agione-install.yml`。 |
| `agione_app.middleware.verify_connectivity` | boolean | `true` | 预检阶段是否检查托管中间件连通性。 |
| `agione_app.middleware.database.mode` | string | `self-managed` | `hybrid` 模式下数据库组件部署方式。 |
| `agione_app.middleware.redis.mode` | string | `self-managed` | `hybrid` 模式下 Redis 组件部署方式。 |
| `agione_app.middleware.nacos.mode` | string | `self-managed` | `hybrid` 模式下 Nacos 组件部署方式。 |
| `agione_app.middleware.kafka.mode` | string | `self-managed` | `hybrid` 模式下 Kafka 组件部署方式。 |
| `agione_app.middleware.object_storage.mode` | string | `self-managed` | `hybrid` 模式下对象存储组件部署方式。 |

混合模式示例：

```yaml
agione_app:
  middleware:
    mode: hybrid
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
```

### 5.2 中间件端点字段详情

最小模板已经包含启动安装所需字段。托管中间件、混合中间件、安全协议或客户命名规范需要额外配置时，再参考下面字段。

#### 5.2.1 数据库

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.db.host` / `port` | `db-mariadb` / `3306` | 单节点保持默认；host-mode 自建填写中间件私网 IP；托管数据库填写内网端点。 |
| `agione_app.db.root_username` | `root` | 托管数据库管理员账号；自建 MariaDB 使用内置 `root`。 |
| `agione_app.db.charset` / `collation` | `utf8mb4` / `utf8mb4_unicode_ci` | 业务库字符集和排序规则。 |
| `agione_app.db.ssl` | `false` | 托管数据库要求 SSL 时设置为 `true`。 |
| `agione_app.db.names.*` | 见 [6.2 数据库名称](#_6-2-数据库名称) | 业务数据库名称，通常保持默认。 |

#### 5.2.2 Redis

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.redis.host` / `port` | `md-redis` / `6379` | host-mode 自建填写中间件私网 IP；托管 Redis 填写内网端点。 |
| `agione_app.redis.database` | `2` | AGIOne 使用的 Redis 逻辑库。 |
| `agione_app.redis.mode` | `standalone` | Redis 运行模式；不要和 `agione_app.middleware.redis.mode` 混淆。 |
| `agione_app.redis.ssl` | `false` | 托管 Redis 要求 SSL 时设置为 `true`。 |

#### 5.2.3 Nacos

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.nacos.host` / `port` | `md-nacos` / `8848` | host-mode 自建填写中间件私网 IP；托管 Nacos 填写内网端点。 |
| `agione_app.nacos.namespace` | `agione-prod` | AGIOne 运行命名空间，不能为空。 |
| `agione_app.nacos.username` / `password` | `nacos` / 空 | 安装器发布配置和运行时服务访问使用的原生 Nacos 账号。 |
| `agione_app.nacos.auth_token` | 空 | 自建 Nacos 服务端鉴权 token，使用至少 32 字节随机值生成的 Base64 字符串。 |
| `agione_app.nacos.auth_identity_key` / `auth_identity_value` | `serverIdentity` / `security` | 自建 Nacos 鉴权身份字段，非必要不要改。 |
| `agione_app.nacos.console_url` | 空 | Nacos 控制台地址，仅用于报告和人工检查。 |
| `agione_app.nacos.assume_preimported_configs` | `false` | 仅当目标命名空间已有全部 AGIOne 配置时设置为 `true`。 |
| `agione_app.nacos.provider` / `region` / `project_id` / `engine_id` / `enterprise_project_id` | 空 | 托管 Nacos 元数据，用于资源追踪和交付评审。 |
| `agione_app.nacos.access_key` / `secret_key` | 空 | 云厂商辅助脚本需要时使用；安装器发布配置仍使用 Nacos 用户名和密码。 |

#### 5.2.4 Kafka

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.kafka.host` / `port` | `kafka` / `9092` | 自建 Kafka 地址和端口。 |
| `agione_app.kafka.bootstrap_servers` | `kafka:9092` | AGIOne 使用的 broker 列表；host-mode 自建填写 `<middleware-ip>:9092`。 |
| `agione_app.kafka.security_protocol` | `PLAINTEXT` | 托管 Kafka 使用 SASL / TLS 时按云厂商要求调整。 |
| `agione_app.kafka.sasl_mechanism` | `PLAIN` | SASL 机制，仅非 `PLAINTEXT` 协议时相关。 |
| `agione_app.kafka.username` / `password` | `admin` / 空 | Kafka 认证账号，非 `PLAINTEXT` 场景通常必填。 |
| `agione_app.kafka.vhost` | `agione-prod` | 兼容字段，通常保持默认。 |

#### 5.2.5 对象存储

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.minio.storage_type` | `minio` | 自建使用 `minio`；S3 / OSS 兼容托管服务使用 `s3`。 |
| `agione_app.minio.endpoint` | `http://minio:9000` | S3 兼容 API 端点；host-mode 自建填写 `http://<middleware-ip>:9000`。 |
| `agione_app.minio.api_direct_host` / `web_direct_host` | `oss.dev:9000` / `oss.dev:9001` | 自建对象存储 API / 控制台直连地址，用于运行配置和报告。 |
| `agione_app.minio.access_key` / `secret_key` | 空 | 对象存储凭据。 |
| `agione_app.minio.bucket_name` | `zguan` | AGIOne 使用的 bucket。 |
| `agione_app.minio.region` | 空 | 托管对象存储要求 region 时填写。 |
| `agione_app.minio.path_style_access` | `true` | 是否使用 path-style 访问，按托管服务兼容性调整。 |

### 5.3 可选应用服务组

`agione_app.start_optional_app_services` 是列表，不是简单布尔开关。旧配置中的 `true` 仍兼容，并映射为 `kubem`；新配置建议显式写组名。

| 组名 | 启用服务 | 约束 |
| --- | --- | --- |
| `kubem` | `core_kubem`、`core_codelab`、`core_iam` | 启用训练 / 作业、CodeLab、IAM 服务；安装器会自动追加 `wm` 初始化。 |
| `cloud` | `core_sgeneral`、`core_saws`、`core_saliyun`、`core_general`、`core_aliyun` | 启用云厂商集成服务。 |
| `core_isync` | `core_isync`、`influxdb3` | 仅支持自建 MariaDB 且有数据库备库节点；默认和 `db_mariadb_standby` 放在同一节点。 |

示例：

```yaml
agione_app:
  start_optional_app_services:
    - kubem
    - cloud
```

### 5.4 数据库主备初始化

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `agione_app.auto_initialize_db_replication` | boolean | `false` | host-mode 自建数据库模式下是否初始化 MariaDB 主备复制。 |
| `agione_app.accept_standby_rebuild_risk` | boolean | `false` | 确认备库数据可以重建；启用主备初始化时必须为 `true`。 |
| `agione_app.db_replication_user` | string | `repl` | 复制账号。 |
| `agione_app.db_replication_password` | string | 空 | 复制密码；为空时安装器使用 `db.root_password`。 |

### 5.5 NFS 后端 / 前端代码共享

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `agione_app.host_mode_shared_storage.enabled` | boolean | `false` | 是否启用 NFS 代码共享。 |
| `agione_app.host_mode_shared_storage.mode` | string | `copy` | `copy` 表示各节点本地文件；`nfs` 表示通过 NFS 共享。 |
| `agione_app.host_mode_shared_storage.server_node` | string | 空 | NFS 服务端节点；为空时使用第一个应用节点。 |
| `agione_app.host_mode_shared_storage.mount_options` | string | `rw,sync,hard,intr` | NFS 挂载参数，不要包含空格。 |

该设置只共享 `<runtime_root>/core/metis` 和 `<runtime_root>/core/mamba`，不共享数据库数据、MinStore 数据、日志、Docker 数据或 host-mode 渲染配置。

## 6. 第四级：高级字段

高级字段用于特殊交付、排障或非默认编排。标准交付不要主动填写。

### 6.1 host-mode 服务级编排

标准 4 到 8 台机器交付不需要 `host_mode_service_placements`；安装器会根据机器顺序推导默认编排。

支持编排的服务：

| 类型 | 服务 |
| --- | --- |
| 自建中间件 | `db_mariadb`、`db_mariadb_standby`、`md_redis`、`md_nacos`、`kafka`、`kafka-ui`、`minio` |
| 默认 App / Edge | `nginx`、`md_gateway`、`core_common`、`core_auth`、`core_upms`、`core_gnosis`、`core_xapi`、`core_coperation`、`core_financial`、`core_shop` |
| 可选应用服务 | `core_kubem`、`core_codelab`、`core_iam`、`core_sgeneral`、`core_saws`、`core_saliyun`、`core_general`、`core_aliyun`、`core_isync`、`influxdb3` |

约束：

- 必要服务必须至少分配到一台机器。
- `db_mariadb`、`db_mariadb_standby`、`md_redis`、`md_nacos`、`kafka`、`kafka-ui`、`minio`、`core_common`、`core_iam`、`core_isync`、`influxdb3` 是单实例服务。
- 使用托管中间件时，不要再把对应自建中间件服务分配到节点。
- `core_isync` 必须和 `db_mariadb_standby` 放在同一节点。
- `influxdb3` 必须和 `core_isync` 放在同一节点，且 `agione_app.influxdb.enabled` 不能为 `false`。

示例：

```yaml
agione_app:
  start_optional_app_services:
    - core_isync
  host_mode_service_placements:
    192.168.31.209:
      - db_mariadb_standby
      - core_isync
      - influxdb3
```

### 6.2 数据库名称

除非产品数据库命名计划发生变化，否则保持默认值。

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.db.names.nacos` | `nacosv3` | Nacos 配置数据库。 |
| `agione_app.db.names.common` | `hw-metis` | Metis common 业务库。 |
| `agione_app.db.names.upms` | `hw-upms` | UPMS 业务库。 |
| `agione_app.db.names.gnosis` / `knowledge` | `hw-gnosis` | Gnosis / knowledge 业务库。 |
| `agione_app.db.names.xapi` | `hw-xapi` | XAPI 业务库。 |
| `agione_app.db.names.cbdp` | `hw-cbdp` | CBDP 业务库。 |
| `agione_app.db.names.wanmore` | `hw-wanmore` | Wanmore 业务库。 |
| `agione_app.db.names.xcloud` | `hw-xcloud` | XCloud 业务库。 |
| `agione_app.db.names.hashrate` | `hw-hashrate` | Hashrate 业务库。 |
| `agione_app.db.names.influx_sync` | `hw-influx-sync` | `core_isync` 元数据库；启用 `core_isync` 时不能为空。 |

### 6.3 InfluxDB / ISync

`agione_app.influxdb` 只在启用 `core_isync` 服务组时需要关注。

| 字段 | 默认值 | 说明 |
| --- | --- | --- |
| `agione_app.influxdb.enabled` | `true` | 是否允许启用 `influxdb3`；如果编排中分配了 `influxdb3`，该字段不能为 `false`。 |
| `agione_app.influxdb.host` / `port` | `influxdb3` / `8181` | 容器内地址和 API 端口。 |
| `agione_app.influxdb.url` | `http://influxdb3:8181` | AGIOne 服务内部使用的 URL。 |
| `agione_app.influxdb.external_port` | `18181` | host-mode 暴露的 InfluxDB API 端口。 |
| `agione_app.influxdb.admin_external_port` | `18082` | host-mode 暴露的管理端口。 |
| `agione_app.influxdb.bucket` | `AGIOne` | 默认 bucket。 |
| `agione_app.influxdb.username` / `password` | `admin` / 交付包默认值 | 管理员账号和密码；自定义密码必须符合 [密码字段规范](#_7-密码字段规范)。 |
| `agione_app.influxdb.auth_token` | 交付包默认值 | API token。 |

### 6.4 其他高级字段

| 字段范围 | 说明 |
| --- | --- |
| `agione_app.compose_template_path` | 基础 Compose 模板路径，默认 `compose/agione-app.yaml`；新交付保持不变。 |
| `agione_app.auto_start` | 是否启动服务；`quick` 会自动设置为 `true`，只有只渲染产物时才保持 `false`。 |
| `agione_app.auto_run_host_mode_health_check` | 安装后是否执行 host-mode 健康检查，默认 `true`。 |
| `agione_app.use_default_resource_policy` | 是否使用 Docker 默认资源策略，默认 `true`；设置为 `false` 时必须完整配置 `service_resource_limits`。 |
| `agione_app.service_resource_limits` | 手动 CPU / 内存限制；一般交付使用默认资源策略。 |
| `agione_app.initialization_targets` | 默认 `metis`、`gnosis`、`financial`、`cbdp`；启用 `kubem` 时自动追加 `wm`。 |
| `agione_app.auto_import_nacos` | 是否自动导入 Nacos 配置，默认 `true`。 |
| `agione_app.auto_initialize_apps` | 是否调用应用初始化接口，默认 `true`。 |
| `agione_app.auto_check_registration` | 是否等待关键服务注册到 Nacos，默认 `true`。 |
| `agione_app.use_saas_middleware` | 历史兼容字段，新交付通过 `agione_app.middleware.mode` 表达中间件部署方式。 |
| `agione_app.harbor.*` | 镜像仓库地址、端口和管理员账号配置。 |
| `agione_app.gitea.*` | Gitea 地址、管理员账号和 webhook 回调地址。 |
| `agione_app.kubem.*` | `core_kubem` 服务端口、作业访问入口、调度和回调配置。 |
| `agione_app.iam.*` | `core_iam` URL、端口、上下文路径和签名检查。 |
| `agione_app.jupyter.*` | Job proxy Nginx 端口和 Jupyter 访问路径配置。 |

## 7. 密码字段规范

安装配置中的密码可能被写入 YAML、Docker Compose、环境变量、Nacos 配置、URL 参数或 shell 命令。为避免转义、截断、URL 编码和容器启动失败，手工创建或客户提供的密码建议遵循以下安全字符规范：

- 只使用大写字母、小写字母、数字和下划线：`A-Z`、`a-z`、`0-9`、`_`。
- 推荐长度 12 到 32 位，至少包含字母和数字。
- 即使只使用安全字符，也建议在 YAML 中给密码加引号。
- 避免空格、`@`、`:`、`/`、`?`、`#`、`&`、`=`、`%`、`+`、`$`、反引号、引号和反斜杠。
- 如果外部中间件已有密码包含保留字符，请先在云控制台或中间件服务中轮转密码，再写入 `/root/agione-install.yml`。

该规范适用于以下密码类字段，包括但不限于：

- `agione_app.topology.ssh_password`
- `agione_app.topology.ssh_credentials.*.password`
- `agione_app.db.root_password`
- `agione_app.db_replication_password`
- `agione_app.redis.password`
- `agione_app.nacos.password`
- `agione_app.kafka.password`
- `agione_app.minio.secret_key`
- `agione_app.harbor.admin_password`
- `agione_app.gitea.admin_password`
- `agione_app.influxdb.password`
- `agione_app.default_access.credentials.*`

安装器会在容器启动前校验 `agione_app.nacos.password`。如果 Nacos 密码包含不安全字符，安装会提前失败，必须修改密码后再重试。
