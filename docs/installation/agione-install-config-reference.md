---
prev: false
next: true
---

# AGIOne Installation Configuration Reference

This document explains the main fields used in `/root/agione-install.yml`. The file is used by both single-node and host-mode multi-node installation:

```bash
./agione quick --file /root/agione-install.yml
```

For repeated reinstall tests where existing AGIOne runtime data can be overwritten, use:

```bash
./agione quick -f --file /root/agione-install.yml
```

Keep customer-specific node topology, SSH credentials, middleware endpoints, business presets, and default account policy in this one file. Legacy options such as `--host-mode-ips`, `--host-mode-nodes-file`, and `--middleware-endpoints-file` remain available for compatibility, but new deliveries should prefer `/root/agione-install.yml`.

## 1. Top-Level Structure

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `global_config` | object | Yes | Global installer behavior, language, architecture, and offline mode. |
| `selected_modules` | list | Yes | Modules to execute. For AGIOne application installation, use `agione-app`. |
| `agione_app` | object | Yes | AGIOne application deployment, middleware, topology, business presets, and startup behavior. |

## 2. `global_config`

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `env_name` | string | `demo` | Environment name used in reports and generated output. |
| `deploy_mode` | string | `single` | Deployment mode. Use `single` for all-in-one and `host-mode` for multi-node host-mode. |
| `language` | string | `en_US` | Installer output language. Supported values are `en_US` and `zh_CN`. |
| `fallback_language` | string | `zh_CN` | Fallback language for missing translations. |
| `arch` | string | `x86_64` | Target CPU architecture. Common value: `x86_64`. |
| `timezone` | string | `Asia/Shanghai` | Runtime timezone written into generated configuration where applicable. |
| `offline_mode` | boolean | `true` | Whether to use offline delivery assets. Current production delivery should keep this enabled. |
| `log_dir` | string | `./reports/logs` | Installer log directory. |
| `report_dir` | string | `./reports` | Installer report directory. |
| `package_repository_url` | string | empty | Reserved package repository URL. Empty means no online package source is configured. |

## 3. `selected_modules`

For standard AGIOne application installation:

```yaml
selected_modules:
  - agione-app
```

The current installation guide only covers the `agione-app` module. Do not add other modules to `selected_modules` for standard delivery.

## 4. `agione_app` Core Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | boolean | `true` | Whether to enable the AGIOne application module. |
| `node_mode` | string | `all-in-one` | Application node mode. Use `all-in-one` for single-node and `host-mode` for multi-node. |
| `runtime_root` | string | `/opt/hyperone` | Runtime data directory. Keep the default to let the installer prefer a suitable data disk automatically; set an explicit path only when the delivery environment requires a fixed runtime directory. |
| `compose_template_path` | string | installer default | Compose template path. Usually keep the packaged default. |
| `auto_start` | boolean | `false` | Whether to start services during installation. Quick installation sets this automatically. |
| `auto_import_nacos` | boolean | `true` | Import Nacos configuration automatically after Nacos is ready. |
| `auto_initialize_apps` | boolean | `true` | Run application initialization APIs after services start. |
| `initialization_targets` | list | `metis`, `gnosis`, `wm`, `financial`, `cbdp` | Application initialization targets. |
| `auto_check_registration` | boolean | `true` | Wait for critical service registration in Nacos. |
| `start_optional_app_services` | boolean | `false` | Whether to start optional application services in host-mode. |
| `auto_initialize_db_replication` | boolean | `false` | Whether to initialize MariaDB primary/standby replication in host-mode. Requires self-managed database and a standby node. |
| `accept_standby_rebuild_risk` | boolean | `false` | Confirms that the standby database can be rebuilt. Must be true before automatic standby rebuild. |
| `auto_run_host_mode_health_check` | boolean | `true` | Run host-mode health checks at the end of multi-node installation. |
| `db_replication_user` | string | `repl` | MariaDB replication user for self-managed primary/standby replication. |
| `db_replication_password` | string | empty | MariaDB replication password. Required when automatic replication initialization is enabled. |

## 5. `agione_app.topology`

### Single-Node

Single-node installation usually does not need manual topology settings. The installer can use local defaults.

### Host-Mode Multi-Node

Machine addresses must be private IPv4 addresses. Do not use public IPs or public DNS names. The same private IP is used for SSH, Nacos registration / discovery, Nginx upstreams, database / Redis / Kafka / MinIO connections, and Docker port binding.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `app_nodes` | list | Yes for host-mode | Application nodes. The first node is the primary App / Edge node; the second is the secondary App / Edge node. Nodes 5 to 8 are additional App / Edge nodes in the default layout. |
| `middleware_node` | string | Required for self-managed middleware | Middleware node. In the default layout, the third machine runs self-managed MariaDB, Redis, Nacos, Kafka, and MinIO / MinStore. |
| `edge_nodes` | list | Optional, legacy-compatible | Override Nginx / entry nodes. Standard quick installation does not need this field; the installer uses `app_nodes` as entry nodes by default. |
| `backup_nodes` | list | Required when self-managed DB replication is enabled | Standby database node list. Current host-mode supports one standby DB node. |
| `ssh_user` | string | No | Global SSH user. Default is `root`. |
| `ssh_port` | integer | No | Global SSH port. Default is `22`. |
| `ssh_password` | string | No | Global SSH password. Prefer passwordless SSH in production. Password authentication requires `sshpass` on the initiating machine. |
| `ssh_credentials` | map | No | Per-node SSH credentials. Use this when nodes have different users, ports, or passwords. |

Per-node SSH example:

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

This section controls whether middleware is deployed by the installer or provided by external managed services.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | string | `self-managed` | Overall middleware deployment mode. Supported values: `self-managed`, `managed-middleware`, `hybrid`. |
| `provider` | string | `generic` | Provider label for external middleware. Informational unless provider-specific logic is added. |
| `endpoints_file` | string | empty | Compatibility field for legacy endpoint YAML. New deliveries should configure endpoints directly in `/root/agione-install.yml`. |
| `verify_connectivity` | boolean | `true` | Whether to verify external middleware endpoint reachability during preflight. |
| `database.mode` | string | `self-managed` | Database component mode in `hybrid` mode. |
| `redis.mode` | string | `self-managed` | Redis component mode in `hybrid` mode. |
| `nacos.mode` | string | `self-managed` | Nacos component mode in `hybrid` mode. |
| `kafka.mode` | string | `self-managed` | Kafka component mode in `hybrid` mode. |
| `object_storage.mode` | string | `self-managed` | Object storage component mode in `hybrid` mode. |

Mode behavior:

| Mode | Meaning | Minimum host-mode machines |
| --- | --- | --- |
| `self-managed` | Installer deploys MariaDB, Redis, Nacos, Kafka, and MinIO / MinStore. | 4 |
| `managed-middleware` | All middleware uses external endpoints; target nodes run App / Edge services only. | 2 |
| `hybrid` | Each middleware component can be self-managed or managed. | 3 when database is managed; 4 when database is self-managed |

Hybrid example:

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

Managed middleware quick installation reads endpoint values from the same main YAML. A separate endpoint YAML is not required:

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

Run `./agione quick --file /root/agione-install.yml`. Use `--middleware-mode` only when you need a temporary command-line override for testing.

### Cloud Helper Generated Fields

Provider-specific helper scripts, such as the Huawei Cloud managed middleware helper, can generate the same main installer YAML after cloud resources are created or reused. Treat those generated values as standard installer input:

| Field area | Installer usage |
| --- | --- |
| `agione_app.db`, `agione_app.redis`, `agione_app.nacos`, `agione_app.kafka`, `agione_app.minio` | Runtime connection endpoints and credentials consumed by AGIOne services. |
| `agione_app.middleware.provider` | Informational provider label used in reports and delivery review. |
| `agione_app.nacos.region`, `project_id`, `engine_id`, `enterprise_project_id` | Optional managed Nacos metadata for traceability. These fields do not grant Nacos publish permission by themselves. |
| `agione_app.nacos.username`, `password` | Nacos native account used by the installer to create namespaces and publish configs when `assume_preimported_configs` is `false`. |
| `agione_app.nacos.assume_preimported_configs` | Set to `true` only when all required AGIOne configs already exist in the target namespace. The installer then skips namespace creation and config publishing. |
| `agione_app.minio.access_key`, `secret_key` | Object storage credentials used by AGIOne file services. These are storage credentials, not cloud resource provisioning credentials. |

Cloud account AK/SK should not be required in `/root/agione-install.yml` for AGIOne installation. Use AK/SK only in provider helper scripts when they need to create, query, or delete cloud resources. Nacos config publishing must rely on the configured Nacos username / password and the provider's Nacos RBAC policy.

## 7. Middleware Endpoint Fields

These fields are used both by self-managed middleware and managed middleware. For self-managed host-mode, use the middleware node private IP. For managed middleware, use the external service endpoint.

### `agione_app.db`

| Field | Type | Description |
| --- | --- | --- |
| `host` | string | Database host. Use middleware node IP for self-managed host-mode, or managed DB endpoint for external database. |
| `port` | integer | Database port, usually `3306`. |
| `root_username` | string | Database administrative user used for schema initialization. |
| `root_password` | string | Database administrative password. |
| `charset` | string | Database charset. Default `utf8mb4`. |
| `collation` | string | Database collation. Default `utf8mb4_unicode_ci`. |
| `ssl` | boolean | Whether database connection uses SSL. |
| `names` | object | Business database names. Usually keep defaults unless the product database naming plan changes. |

### `agione_app.redis`

| Field | Type | Description |
| --- | --- | --- |
| `host` | string | Redis host. |
| `port` | integer | Redis port, usually `6379`. |
| `password` | string | Redis password. |
| `database` | integer | Redis logical database index used by AGIOne. |
| `mode` | string | Redis runtime mode, for example `standalone`. This is not the same as `agione_app.middleware.redis.mode`. |
| `ssl` | boolean | Whether Redis connection uses SSL. |

### `agione_app.nacos`

| Field | Type | Description |
| --- | --- | --- |
| `host` | string | Nacos host. |
| `port` | integer | Nacos API port, usually `8848`. |
| `namespace` | string | Nacos namespace. AGIOne production default is `agione-prod`. |
| `username` | string | Nacos username. |
| `password` | string | Nacos password. |
| `auth_token` | string | Nacos server authentication token for self-managed Nacos. |
| `auth_identity_key` | string | Nacos server identity key. |
| `auth_identity_value` | string | Nacos server identity value. |
| `console_url` | string | Optional Nacos console URL override. |
| `assume_preimported_configs` | boolean | Set to `true` only when all AGIOne configuration items already exist in the target namespace and installation should skip namespace creation and config publishing. |
| `provider` | string | Optional provider label, for example `huaweicloud`. Config publishing still uses the native Nacos OpenAPI with `username` and `password`. |
| `region` / `project_id` / `engine_id` / `enterprise_project_id` | string | Optional managed Nacos metadata generated by cloud-native middleware helper scripts. The AGIOne installer does not require cloud account AK/SK to publish Nacos configs. |

### `agione_app.kafka`

| Field | Type | Description |
| --- | --- | --- |
| `host` | string | Kafka host. |
| `port` | integer | Kafka broker port, usually `9092`. |
| `bootstrap_servers` | string | Kafka bootstrap server list. |
| `username` | string | Kafka username when authentication is enabled. |
| `password` | string | Kafka password when authentication is enabled. |
| `vhost` | string | Logical environment label. AGIOne default is `agione-prod`. |
| `security_protocol` | string | Kafka security protocol, for example `PLAINTEXT` or `SASL_PLAINTEXT`. |
| `sasl_mechanism` | string | Kafka SASL mechanism, for example `PLAIN`. |

### `agione_app.minio`

| Field | Type | Description |
| --- | --- | --- |
| `storage_type` | string | Object storage type. Default `minio`. |
| `api_direct_host` | string | Host and port for API direct access, for example `192.168.31.208:9000`. |
| `web_direct_host` | string | Host and port for console direct access, for example `192.168.31.208:9001`. |
| `endpoint` | string | S3-compatible API endpoint, for example `http://192.168.31.208:9000`. |
| `access_key` | string | Object storage access key. |
| `secret_key` | string | Object storage secret key. |
| `bucket_name` | string | Default bucket name. |
| `region` | string | Region for S3-compatible storage. Can be empty for MinIO. |
| `path_style_access` | boolean | Whether to use path-style S3 access. Keep `true` for MinIO unless the provider requires virtual-host style. |

## 8. `agione_app.host_mode_shared_storage`

This section controls optional NFS shared configuration for host-mode.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | boolean | `false` | Whether to enable shared configuration mount. |
| `mode` | string | `copy` | Use `copy` for SSH copy distribution, or `nfs` for NFS shared configuration. |
| `server_node` | string | empty | NFS server node. If empty, the installer uses the middleware node when NFS is enabled. |
| `export_path` | string | `/opt/hyperone/host-mode` | NFS export path on the server node. |
| `mount_path` | string | `/opt/hyperone/host-mode` | NFS mount path on client nodes. |
| `mount_options` | string | `rw,sync,hard,intr` | NFS mount options. Do not include spaces. |

Only rendered host-mode configuration is shared. Database data, MinStore data, logs, and Docker data are not shared through this setting.

## 9. `agione_app.host_mode_service_placements`

This is an advanced service-level placement matrix for host-mode.

For standard 4 to 8 machine delivery, you do not need to configure it. The installer can derive default placement from machine order:

| Machine order | Default role |
| --- | --- |
| 1 | Primary App / Edge |
| 2 | Secondary App / Edge |
| 3 | Middleware |
| 4 | Standby database |
| 5-8 | Additional App / Edge |

Use `host_mode_service_placements` only when advanced placement is required.

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

Do not assign `db_mariadb` and `db_mariadb_standby` to the same node. Some services are single-instance in the current host-mode engine.

## 10. `agione_app.business`

Business presets are imported into Nacos during installation. Replace demo values before production delivery.
For overseas deliveries, the examples default to English UI output and USD. Change `payment_currency` and `payment_units` only when the customer requires another billing currency.

| Field | Type | Description |
| --- | --- | --- |
| `payment_currency.name` | string | Default system currency display name. Written to `metis.sys.currency` in Nacos. |
| `payment_currency.code` | string | Default system currency code. Use `USD` for standard overseas delivery, or another currency such as `CNY` when required by the business. |
| `payment_currency.sign` | string | Default system currency symbol. |
| `payment_units` | map | CBDP account units. Written to `account.units` in `metis-cbdp.yml`. Supports multiple categories such as `CASH` and `POINTS`. Configured categories replace the same category in the Nacos baseline; unconfigured categories keep the baseline value. |
| `payment_units.<category>[].code` | string | Account unit code. `CASH` codes are also written to `stripe.supportCurrency` in lowercase. |
| `payment_units.<category>[].name` | string | Account unit display name. |
| `payment_units.<category>[].symbol` | string | Account unit symbol. |
| `approval.tenant_apply_auto_auth` | boolean | Whether tenant application approval is automatic. |
| `approval.tenant_apply_auth` | boolean | Whether tenant application approval is required. |
| `registration.email_enabled` | boolean | Whether email registration / verification is enabled. |
| `registration.phone_enabled` | boolean | Whether phone verification is enabled. |
| `registration.email_code_expire_minutes` | integer | Email verification code expiration time in minutes. |
| `registration.phone_code_expire_minutes` | integer | Phone verification code expiration time in minutes. |
| `mail.provider` | string | Mail provider. Supported configuration sections include `smtp`, `sendgrid`, and `aliyun`. |
| `mail.smtp.*` | object | SMTP host, port, username, password, sender, encoding, authentication, SSL, and timeout settings. |
| `mail.sendgrid.*` | object | SendGrid API key and sender settings. |
| `mail.aliyun.*` | object | Aliyun DirectMail access key, sender, and region settings. |
| `frontend.domain` | string | Public domain name. Leave empty to use the default `http://<entry-ip>:18090` style access URL. |
| `frontend.public_access_url` | string | Full public access URL override. |
| `frontend.ssl_certificate_path` | string | Nginx-compatible X.509 PEM certificate file path on the installation host. Required when HTTPS domain access is configured. The installer validates it and copies it to `/opt/hyperone/core/nginx/certs/agione.frontend.pem` before rendering Nginx. Do not provide Tomcat / Java keystore files such as `.jks`, `.p12`, `.pfx`, or `.keystore`. |
| `frontend.ssl_certificate_key_path` | string | Unencrypted Nginx-compatible PEM private key file path on the installation host. Required together with `frontend.ssl_certificate_path`. The installer validates it and copies it to `/opt/hyperone/core/nginx/certs/agione.frontend.key` before rendering Nginx. |
| `frontend.frontend_root` | string | Custom frontend static file path. Leave empty to use packaged frontend resources. |

When certificate paths are configured, Nginx never reads the original host paths directly. Both single-node and host-mode installation use the runtime paths under `/opt/hyperone/core/nginx/certs/`; host-mode installation also synchronizes the staged certificate files to every Nginx node.

## 11. `agione_app.default_access`

This section controls the default console accounts generated during installation.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `generate_random_passwords` | boolean | `true` | Generate new passwords for default accounts during each installation. |
| `password_length` | integer | `20` | Generated password length. Valid range is 6 to 32. |
| `credentials` | map | empty | Optional fixed passwords by account name. Use only when customer policy requires fixed passwords. |

Default accounts:

| Account | Notes |
| --- | --- |
| `admin` | Platform administrator. |
| `operator` | Operations account. |
| `provider` | Provider account. Receives `Creator` and `cbdp_buyer` roles. |

Generated passwords follow these rules:

- 6 to 32 characters.
- May include letters, numbers, and special symbols: `!@#$%^&*()-_=+{}[]|:;"'<>,.?/~`.
- Must include at least three of uppercase letters, lowercase letters, numbers, and special symbols.

## 12. Single-Node Example

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

## 13. Host-Mode Multi-Node Example

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
