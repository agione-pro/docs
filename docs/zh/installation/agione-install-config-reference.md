---
prev: false
next: true
---

# AGIOne 安装配置文件字段说明

本文档说明 `/root/agione-install.yml` 中常用字段的含义。该文件同时适用于单机部署和 host-mode 多节点部署：

```bash
./agione quick --file /root/agione-install.yml
```

如果是反复重装测试，并且确认可以覆盖已有 AGIOne 运行数据，使用：

```bash
./agione quick -f --file /root/agione-install.yml
```

建议把客户现场的节点拓扑、SSH 凭据、中间件端点、业务预配置和默认账号策略统一维护在这一份文件中。`--host-mode-ips`、`--host-mode-nodes-file`、`--middleware-endpoints-file` 等旧参数仍保留兼容，但新交付推荐优先使用 `/root/agione-install.yml`。

## 1. 顶层结构

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `global_config` | object | 是 | 安装器全局行为、语言、架构和离线模式。 |
| `selected_modules` | list | 是 | 本次执行的模块。安装 AGIOne 应用时使用 `agione-app`。 |
| `agione_app` | object | 是 | AGIOne 应用部署、中间件、节点拓扑、业务预配置和启动行为。 |

## 2. `global_config`

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `env_name` | string | `demo` | 环境名称，用于报告和生成产物。 |
| `deploy_mode` | string | `single` | 部署模式。单机使用 `single`，多节点 host 模式使用 `host-mode`。 |
| `language` | string | `en_US` | 安装器输出语言。支持 `en_US` 和 `zh_CN`。 |
| `fallback_language` | string | `zh_CN` | 翻译缺失时的兜底语言。 |
| `arch` | string | `x86_64` | 目标机器 CPU 架构，常用值为 `x86_64`。 |
| `timezone` | string | `Asia/Shanghai` | 运行时区，部分生成配置会使用该值。 |
| `offline_mode` | boolean | `true` | 是否使用离线交付资源。正式离线交付建议保持开启。 |
| `log_dir` | string | `./reports/logs` | 安装器日志目录。 |
| `report_dir` | string | `./reports` | 安装器报告目录。 |
| `package_repository_url` | string | 空 | 预留的软件包仓库地址。为空表示未配置在线软件包源。 |

## 3. `selected_modules`

标准 AGIOne 应用安装使用：

```yaml
selected_modules:
  - agione-app
```

当前安装文档只覆盖 `agione-app` 模块。标准交付不要在 `selected_modules` 中增加其他模块。

## 4. `agione_app` 核心字段

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | boolean | `true` | 是否启用 AGIOne 应用模块。 |
| `node_mode` | string | `all-in-one` | 应用节点模式。单机使用 `all-in-one`，多节点使用 `host-mode`。 |
| `runtime_root` | string | `/opt/hyperone` | 运行数据目录。保持默认值时，安装器会自动优先选择合适的数据盘；只有交付环境要求固定运行目录时才显式配置该路径。 |
| `compose_template_path` | string | 安装包默认值 | Compose 模板路径，通常保持安装包默认值。 |
| `auto_start` | boolean | `false` | 安装过程中是否启动服务。quick 安装会自动设置。 |
| `auto_import_nacos` | boolean | `true` | Nacos 就绪后是否自动导入配置。 |
| `auto_initialize_apps` | boolean | `true` | 服务启动后是否执行应用初始化接口。 |
| `initialization_targets` | list | `metis`、`gnosis`、`wm`、`financial`、`cbdp` | 应用初始化目标。 |
| `auto_check_registration` | boolean | `true` | 是否等待关键服务注册到 Nacos。 |
| `start_optional_app_services` | boolean | `false` | host-mode 下是否启动可选应用服务。 |
| `auto_initialize_db_replication` | boolean | `false` | host-mode 下是否初始化 MariaDB 主备复制。要求数据库为自建，并配置备库节点。 |
| `accept_standby_rebuild_risk` | boolean | `false` | 确认备库数据可被重建。自动重建备库前必须设置为 `true`。 |
| `auto_run_host_mode_health_check` | boolean | `true` | 多节点安装结束时是否运行 host-mode 健康检查。 |
| `db_replication_user` | string | `repl` | 自建 MariaDB 主备复制使用的复制账号。 |
| `db_replication_password` | string | 空 | 自建 MariaDB 主备复制密码。启用自动主备初始化时需要配置。 |

## 5. `agione_app.topology`

### 单机部署

单机部署通常不需要手动配置节点拓扑，安装器会使用本机默认值。

### Host-Mode 多节点

机器地址必须填写私网 IPv4 地址，不能填写公网 IP 或公网 DNS。安装器会使用同一个私网 IP 进行 SSH、Nacos 注册 / 发现、Nginx upstream、数据库 / Redis / Kafka / MinIO 连接和 Docker 端口绑定。

| 字段 | 类型 | 是否必填 | 说明 |
| --- | --- | --- | --- |
| `app_nodes` | list | host-mode 必填 | 应用节点。第 1 台为应用 / 入口主节点，第 2 台为应用 / 入口副节点。默认布局中第 5 到第 8 台继续作为应用 / 入口扩展节点。 |
| `middleware_node` | string | 自建中间件时必填 | 中间件节点。默认布局中第 3 台机器运行 MariaDB、Redis、Nacos、Kafka、MinIO / MinStore 等自建中间件。 |
| `edge_nodes` | list | 可选，兼容旧配置 | Nginx / 入口节点覆盖值。标准 quick 安装无需填写，安装器会默认使用 `app_nodes` 作为入口节点。 |
| `backup_nodes` | list | 启用自建数据库主备时必填 | 数据库备库节点。当前 host-mode 支持 1 台备库节点。 |
| `ssh_user` | string | 否 | 全局 SSH 用户，默认 `root`。 |
| `ssh_port` | integer | 否 | 全局 SSH 端口，默认 `22`。 |
| `ssh_password` | string | 否 | 全局 SSH 密码。生产交付推荐 SSH 免密；密码认证要求安装发起机安装 `sshpass`。 |
| `ssh_credentials` | map | 否 | 每台机器独立 SSH 凭据。不同机器使用不同用户名、端口或密码时使用。 |

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
        password: "password-for-204"
      192.168.31.207:
        user: ops
        port: 2222
        password: "password,with,safe,yaml"
      192.168.31.208:
        user: root
        port: 22
      192.168.31.209:
        user: root
        port: 22
```

## 6. `agione_app.middleware`

该部分控制中间件由安装器自建，还是使用外部托管服务。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `mode` | string | `self-managed` | 总体中间件部署模式。支持 `self-managed`、`managed-middleware`、`hybrid`。 |
| `provider` | string | `generic` | 外部中间件提供方标识。除非后续增加云厂商特定逻辑，否则主要作为信息字段。 |
| `endpoints_file` | string | 空 | 旧版独立端点 YAML 兼容字段。新交付建议直接在 `/root/agione-install.yml` 中配置端点。 |
| `verify_connectivity` | boolean | `true` | 预检阶段是否检查外部中间件端点连通性。 |
| `database.mode` | string | `self-managed` | `hybrid` 模式下数据库组件部署方式。 |
| `redis.mode` | string | `self-managed` | `hybrid` 模式下 Redis 组件部署方式。 |
| `nacos.mode` | string | `self-managed` | `hybrid` 模式下 Nacos 组件部署方式。 |
| `kafka.mode` | string | `self-managed` | `hybrid` 模式下 Kafka 组件部署方式。 |
| `object_storage.mode` | string | `self-managed` | `hybrid` 模式下对象存储组件部署方式。 |

模式含义：

| 模式 | 含义 | host-mode 最少机器数 |
| --- | --- | --- |
| `self-managed` | 安装器自建 MariaDB、Redis、Nacos、Kafka、MinIO / MinStore。 | 4 台 |
| `managed-middleware` | 全部中间件使用外部端点，目标节点只运行应用 / 入口服务。 | 2 台 |
| `hybrid` | 每个中间件组件可单独选择自建或外部托管。 | 数据库托管时 3 台；数据库自建时 4 台 |

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

云原生 / 外部托管中间件 quick 安装直接从同一份主 YAML 读取端点值，不需要单独准备端点 YAML：

```yaml
agione_app:
  middleware:
    mode: managed-middleware
    provider: generic
    verify_connectivity: true
  db:
    host: rds-mariadb.internal.example.com
    port: 3306
    root_username: root
    root_password: "<database-root-password>"
    ssl: false
  redis:
    host: redis.internal.example.com
    port: 6379
    password: "<redis-password>"
    ssl: false
  nacos:
    host: nacos.internal.example.com
    port: 8848
    namespace: agione-prod
    username: nacos
    password: "<nacos-password>"
    assume_preimported_configs: false
  kafka:
    bootstrap_servers: kafka-1.internal.example.com:9092
    security_protocol: PLAINTEXT
  minio:
    endpoint: https://oss.internal.example.com
    access_key: "<object-storage-access-key>"
    secret_key: "<object-storage-secret-key>"
    bucket_name: agione
    path_style_access: true
```

执行 `./agione quick --file /root/agione-install.yml` 即可。`--middleware-mode` 只建议在临时测试需要覆盖主 YAML 配置时使用。

### 云资源辅助脚本生成字段

华为云托管中间件辅助脚本等云厂商专用脚本，可以在创建或复用云资源后生成同一份主安装 YAML。生成值按标准安装器输入处理：

| 字段范围 | 安装器用途 |
| --- | --- |
| `agione_app.db`、`agione_app.redis`、`agione_app.nacos`、`agione_app.kafka`、`agione_app.minio` | AGIOne 服务运行时使用的连接端点和凭据。 |
| `agione_app.middleware.provider` | 云厂商标识，主要用于报告和交付评审。 |
| `agione_app.nacos.region`、`project_id`、`engine_id`、`enterprise_project_id` | 可选的托管 Nacos 元数据，用于追踪来源；这些字段本身不代表拥有 Nacos 配置发布权限。 |
| `agione_app.nacos.username`、`password` | 安装器在 `assume_preimported_configs` 为 `false` 时创建命名空间和发布配置使用的原生 Nacos 账号。 |
| `agione_app.nacos.assume_preimported_configs` | 仅当目标命名空间已存在全部 AGIOne 配置时设置为 `true`；安装器会跳过命名空间创建和配置发布。 |
| `agione_app.minio.access_key`、`secret_key` | AGIOne 文件服务使用的对象存储凭据，不是云资源创建凭据。 |

AGIOne 安装使用的 `/root/agione-install.yml` 不应要求填写云账号 AK/SK。AK/SK 只在云厂商辅助脚本需要创建、查询或删除云资源时使用。Nacos 配置发布应依赖配置的 Nacos 用户名 / 密码，以及云厂商侧的 Nacos RBAC 授权策略。

## 7. 中间件端点字段

这些字段同时服务于自建中间件和外部托管中间件。自建 host-mode 场景填写中间件节点私网 IP；外部托管场景填写对应服务端点。

### `agione_app.db`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `host` | string | 数据库地址。自建 host-mode 填中间件节点 IP；外部数据库填托管数据库端点。 |
| `port` | integer | 数据库端口，通常为 `3306`。 |
| `root_username` | string | 用于初始化 schema 的数据库管理员账号。 |
| `root_password` | string | 数据库管理员密码。 |
| `charset` | string | 数据库字符集，默认 `utf8mb4`。 |
| `collation` | string | 数据库排序规则，默认 `utf8mb4_unicode_ci`。 |
| `ssl` | boolean | 数据库连接是否启用 SSL。 |
| `names` | object | 各业务数据库名称。除非产品数据库命名方案变化，否则保持默认值。 |

### `agione_app.redis`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `host` | string | Redis 地址。 |
| `port` | integer | Redis 端口，通常为 `6379`。 |
| `password` | string | Redis 密码。 |
| `database` | integer | AGIOne 使用的 Redis 逻辑库编号。 |
| `mode` | string | Redis 运行模式，例如 `standalone`。注意它不是 `agione_app.middleware.redis.mode`。 |
| `ssl` | boolean | Redis 连接是否启用 SSL。 |

### `agione_app.nacos`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `host` | string | Nacos 地址。 |
| `port` | integer | Nacos API 端口，通常为 `8848`。 |
| `namespace` | string | Nacos 命名空间。AGIOne 生产默认使用 `agione-prod`。 |
| `username` | string | Nacos 用户名。 |
| `password` | string | Nacos 密码。 |
| `auth_token` | string | 自建 Nacos 服务端认证 token。 |
| `auth_identity_key` | string | Nacos 服务端身份 key。 |
| `auth_identity_value` | string | Nacos 服务端身份 value。 |
| `console_url` | string | 可选的 Nacos 控制台访问地址覆盖值。 |
| `assume_preimported_configs` | boolean | 仅当目标命名空间已经提前导入全部 AGIOne 配置项，并且安装时需要跳过命名空间创建和配置发布时，才设置为 `true`。 |
| `provider` | string | 可选云厂商标识，例如 `huaweicloud`。配置发布仍使用原生 Nacos OpenAPI 和 `username` / `password`。 |
| `region` / `project_id` / `engine_id` / `enterprise_project_id` | string | 云原生中间件创建脚本生成的可选托管 Nacos 元数据。AGIOne 安装器发布 Nacos 配置不要求填写云账号 AK/SK。 |

### `agione_app.kafka`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `host` | string | Kafka 地址。 |
| `port` | integer | Kafka broker 端口，通常为 `9092`。 |
| `bootstrap_servers` | string | Kafka 引导服务器列表。 |
| `username` | string | Kafka 启用认证时的用户名。 |
| `password` | string | Kafka 启用认证时的密码。 |
| `vhost` | string | 逻辑环境标识，AGIOne 默认使用 `agione-prod`。 |
| `security_protocol` | string | Kafka 安全协议，例如 `PLAINTEXT` 或 `SASL_PLAINTEXT`。 |
| `sasl_mechanism` | string | Kafka SASL 机制，例如 `PLAIN`。 |

### `agione_app.minio`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `storage_type` | string | 对象存储类型，默认 `minio`。 |
| `api_direct_host` | string | API 直连地址和端口，例如 `192.168.31.208:9000`。 |
| `web_direct_host` | string | 控制台直连地址和端口，例如 `192.168.31.208:9001`。 |
| `endpoint` | string | S3 兼容 API 端点，例如 `http://192.168.31.208:9000`。 |
| `access_key` | string | 对象存储 access key。 |
| `secret_key` | string | 对象存储 secret key。 |
| `bucket_name` | string | 默认 bucket 名称。 |
| `region` | string | S3 兼容存储区域。MinIO 可为空。 |
| `path_style_access` | boolean | 是否使用 path-style S3 访问。MinIO 通常保持 `true`，除非云厂商要求 virtual-host style。 |

## 8. `agione_app.host_mode_shared_storage`

该部分控制 host-mode 可选的 NFS 共享配置。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | 是否启用共享配置挂载。 |
| `mode` | string | `copy` | `copy` 表示 SSH 复制分发；`nfs` 表示使用 NFS 共享配置。 |
| `server_node` | string | 空 | NFS 服务端节点。为空时，启用 NFS 后安装器默认使用中间件节点。 |
| `export_path` | string | `/opt/hyperone/host-mode` | NFS 服务端导出目录。 |
| `mount_path` | string | `/opt/hyperone/host-mode` | 客户端挂载目录。 |
| `mount_options` | string | `rw,sync,hard,intr` | NFS 挂载参数，不能包含空格。 |

该配置只共享已渲染的 host-mode 配置目录，不共享数据库数据、MinStore 数据、日志或 Docker 数据。

## 9. `agione_app.host_mode_service_placements`

这是 host-mode 高级服务级编排矩阵。

标准 4 到 8 台机器交付不需要填写该字段。安装器会按机器顺序自动生成默认服务编排：

| 机器顺序 | 默认角色 |
| --- | --- |
| 第 1 台 | 应用 / 入口主节点 |
| 第 2 台 | 应用 / 入口副节点 |
| 第 3 台 | 中间件节点 |
| 第 4 台 | 数据库备库节点 |
| 第 5-8 台 | 扩展应用 / 入口节点 |

只有需要高级编排时才配置 `host_mode_service_placements`。

```yaml
agione_app:
  host_mode_service_placements:
    192.168.31.208:
      - db_mariadb
      - md_redis
      - md_nacos
      - kafka
      - kafka-ui
      - minio
    192.168.31.204:
      - nginx
      - md_gateway
      - core_common
      - core_auth
      - core_upms
    192.168.31.209:
      - db_mariadb_standby
```

不要把 `db_mariadb` 和 `db_mariadb_standby` 分配到同一节点。当前 host-mode 执行引擎中部分服务仍是单实例。

## 10. `agione_app.business`

业务预配置会在安装过程中导入 Nacos。生产交付前必须替换示例值。
面向海外用户的交付默认使用 `en_US` 和 `USD`；如客户现场需要 `CNY` 或其他币种，再按实际业务要求调整 `payment_currency` 和 `payment_units`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `payment_currency.name` | string | 默认系统币种显示名称，写入 Nacos 的 `metis.sys.currency`。 |
| `payment_currency.code` | string | 默认系统币种代码。海外交付建议使用 `USD`，也可按业务要求改为 `CNY` 或其他币种。 |
| `payment_currency.sign` | string | 默认系统币种符号。 |
| `payment_units` | map | CBDP 账户单位，写入 `metis-cbdp.yml` 的 `account.units`，支持 `CASH`、`POINTS` 等多个分类。已配置的分类会替换 Nacos 基线中同名分类，未配置的分类保留基线值。 |
| `payment_units.<category>[].code` | string | 账户单位编码。`CASH` 分类下的编码会转为小写写入 `stripe.supportCurrency`。 |
| `payment_units.<category>[].name` | string | 账户单位显示名称。 |
| `payment_units.<category>[].symbol` | string | 账户单位符号。 |
| `approval.tenant_apply_auto_auth` | boolean | 租户申请是否自动审批。 |
| `approval.tenant_apply_auth` | boolean | 租户申请是否需要审批。 |
| `registration.email_enabled` | boolean | 是否启用邮箱注册 / 验证。 |
| `registration.phone_enabled` | boolean | 是否启用手机验证。 |
| `registration.email_code_expire_minutes` | integer | 邮箱验证码过期时间，单位分钟。 |
| `registration.phone_code_expire_minutes` | integer | 手机验证码过期时间，单位分钟。 |
| `mail.provider` | string | 邮件服务提供方式。可配置 `smtp`、`sendgrid`、`aliyun`。 |
| `mail.smtp.*` | object | SMTP 地址、端口、用户名、密码、发件人、编码、认证、SSL 和超时配置。 |
| `mail.sendgrid.*` | object | SendGrid API key 与发件人配置。 |
| `mail.aliyun.*` | object | 阿里云邮件 access key、发件人和区域配置。 |
| `frontend.domain` | string | 对外访问域名。为空时使用默认 `http://<入口IP>:18090` 形式。 |
| `frontend.public_access_url` | string | 完整公网访问地址覆盖值。 |
| `frontend.ssl_certificate_path` | string | 安装发起机上的 Nginx 可用 X.509 PEM 证书文件路径。配置 HTTPS 域名访问时需要。安装器会先校验并复制到 `/opt/hyperone/core/nginx/certs/agione.frontend.pem`，再渲染 Nginx。不要填写 Tomcat / Java keystore 文件，例如 `.jks`、`.p12`、`.pfx` 或 `.keystore`。 |
| `frontend.ssl_certificate_key_path` | string | 安装发起机上的未加密 Nginx 可用 PEM 私钥路径，需要与 `frontend.ssl_certificate_path` 成对配置。安装器会先校验并复制到 `/opt/hyperone/core/nginx/certs/agione.frontend.key`，再渲染 Nginx。 |
| `frontend.frontend_root` | string | 自定义前端静态文件路径。为空时使用安装包内置前端资源。 |

配置证书路径后，Nginx 不会直接读取用户填写的原始宿主机路径。单机和 `host-mode` 安装都会使用 `/opt/hyperone/core/nginx/certs/` 下的运行时固定路径；`host-mode` 安装还会把暂存后的证书同步到每个 Nginx 节点。

## 11. `agione_app.default_access`

该部分控制安装时生成的默认控制台账号。

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `generate_random_passwords` | boolean | `true` | 每次安装为默认账号生成新密码。 |
| `password_length` | integer | `20` | 生成密码长度。有效范围为 6 到 32。 |
| `credentials` | map | 空 | 可选的固定账号密码。仅在客户制度要求固定密码时使用。 |

默认账号：

| 账号 | 说明 |
| --- | --- |
| `admin` | 平台管理员。 |
| `operator` | 运营账号。 |
| `provider` | 服务商账号，授予 `Creator` 和 `cbdp_buyer` 角色。 |

生成密码规则：

- 长度 6 到 32 位。
- 可包含字母、数字和特殊符号：`!@#$%^&*()-_=+{}[]|:;"'<>,.?/~`。
- 至少包含大写字母、小写字母、数字、特殊符号中的三类。

## 12. 单机配置示例

```yaml
global_config:
  deploy_mode: single
  language: en_US
  offline_mode: true

selected_modules:
  - agione-app

agione_app:
  node_mode: all-in-one
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

## 13. Host-Mode 多节点配置示例

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
    ssh_credentials:
      192.168.31.204:
        user: root
        port: 22
      192.168.31.207:
        user: root
        port: 22
      192.168.31.208:
        user: root
        port: 22
      192.168.31.209:
        user: root
        port: 22
  db:
    host: 192.168.31.208
    port: 3306
    root_username: root
    root_password: "<database-root-password>"
  redis:
    host: 192.168.31.208
    port: 6379
    password: "<redis-password>"
  nacos:
    host: 192.168.31.208
    port: 8848
    namespace: agione-prod
    username: nacos
    password: "<nacos-password>"
    auth_token: "<nacos-auth-token>"
  kafka:
    host: 192.168.31.208
    port: 9092
    bootstrap_servers: 192.168.31.208:9092
    password: "<kafka-password>"
  minio:
    endpoint: http://192.168.31.208:9000
    api_direct_host: 192.168.31.208:9000
    web_direct_host: 192.168.31.208:9001
    access_key: "<minio-access-key>"
    secret_key: "<minio-secret-key>"
  auto_initialize_db_replication: true
  accept_standby_rebuild_risk: true
  default_access:
    generate_random_passwords: true
    password_length: 20
```
