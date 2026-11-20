# 火山方舟兼容 API

通过 AGIOne 协议兼容网关，开发者可无缝接入火山方舟（Volcengine Ark）标准的素材资产管理、真人活体认证 H5 及异步视频生成大模型。接口名及数据协议与火山方舟保持兼容，接入地址与访问凭据由 AGIOne 实例统一供给。

<div class="api-portal-grid">
  <a href="./guide" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🚀</span>
      <span class="api-card-badge brand">核心指南</span>
    </div>
    <div class="api-card-title">
      私域真人素材全流程接入
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      从拉起真人 H5 活体认证、获取组合 ID、录入图片视频资产到发起异步视频渲染的端到端调用时序与最佳实践。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">全流程串联</span>
      <span class="api-tag">端到端时序</span>
    </div>
  </a>

  <a href="./authentication" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔑</span>
      <span class="api-card-badge green">安全认证</span>
    </div>
    <div class="api-card-title">
      认证与火山签名规范
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      深入掌握 AGIOne AK/SK 的火山兼容 HMAC-SHA256 签名机制与请求头组装规则，附带本地签名辅助脚本。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">ark-sign.py</span>
    </div>
  </a>

  <a href="./errors" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🛡️</span>
      <span class="api-card-badge amber">故障排查</span>
    </div>
    <div class="api-card-title">
      错误码与排障手册
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      资产代理错误码映射、签名时钟偏差排查、任务轮询异常处理及安全的排障工单抓包脱敏规范。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">状态码映射</span>
      <span class="api-tag">重试与幂等</span>
    </div>
  </a>
</div>

## 接入前准备

1. **环境与网络端点**：从实例管理员取得 API Base URL（形如 `https://<agione-host>:<port>`，不包含 `/hyperone` 后缀）以及四位资产服务短 ID（`shortId`）。
2. **凭据准备**：准备当前租户用户的 **AGIOne System API AK/SK**（用于资产和认证接口）；视频生成另需该用户授权持有的 **Model API Key**。
3. **资源授权确认**：确认所选视频模型、资产服务和素材类型在平台管控策略中已被授予当前身份。拥有凭据不等于拥有所有模型或跨租户资产的访问权限。

## 双轨鉴权规范

| 业务范围 | 鉴权凭据 | 认证方式 | 说明 |
| :--- | :--- | :--- | :--- |
| **真人认证、素材组合、素材资产** | AGIOne System API AK/SK | 火山兼容 HMAC-SHA256 签名 | 凭据置于 `Authorization` 签名串，SK 本地保管严禁明文传输 |
| **视频生成任务与单任务查询** | AGIOne Model API Key | `Authorization: Bearer <KEY>` | 标准 Bearer Token 形式，与原生 OpenAPI 模型接口一致 |

## 接口索引

### 1. 真人活体认证
| 接口能力 | Action 标识 | 请求方式 | 接口文档 |
| :--- | :--- | :--- | :--- |
| 拉起真人认证 H5 链接 | `CreateVisualValidateSession` | `POST` | [查看接口说明](./verification/create-session) |
| 获取已认证真人组合 ID | `GetVisualValidateResult` | `POST` | [查看接口说明](./verification/get-result) |

### 2. 素材资产组合管理
| 接口能力 | Action 标识 | 请求方式 | 接口文档 |
| :--- | :--- | :--- | :--- |
| 创建素材资产组合 | `CreateAssetGroup` | `POST` | [查看接口说明](./asset-groups/create) |
| 查询素材资产组合详情 | `GetAssetGroup` | `POST` | [查看接口说明](./asset-groups/get) |
| 查询素材资产组合列表 | `ListAssetGroups` | `POST` | [查看接口说明](./asset-groups/list) |
| 更新素材资产组合信息 | `UpdateAssetGroup` | `POST` | [查看接口说明](./asset-groups/update) |
| 删除素材资产组合 | `DeleteAssetGroup` | `POST` | [查看接口说明](./asset-groups/delete) |

### 3. 单素材资产管理
| 接口能力 | Action 标识 | 请求方式 | 接口文档 |
| :--- | :--- | :--- | :--- |
| 创建素材资产（媒体录入） | `CreateAsset` | `POST` | [查看接口说明](./assets/create) |
| 查询素材资产详情与状态 | `GetAsset` | `POST` | [查看接口说明](./assets/get) |
| 查询素材资产列表 | `ListAssets` | `POST` | [查看接口说明](./assets/list) |
| 更新素材资产信息 | `UpdateAsset` | `POST` | [查看接口说明](./assets/update) |
| 删除素材资产 | `DeleteAsset` | `POST` | [查看接口说明](./assets/delete) |

### 4. 视频模型推理任务
| 接口能力 | 路由路径 | 请求方式 | 接口文档 |
| :--- | :--- | :--- | :--- |
| 提交视频生成异步任务 | `/hyperone/xapi/api/v3/contents/generations/tasks` | `POST` | [查看接口说明](./video/create-task) |
| 查询视频生成任务详情 | `/hyperone/xapi/api/v3/contents/generations/tasks/{id}` | `GET` | [查看接口说明](./video/get-task) |

## 兼容范围与平台限制

* **网关寻址与请求载荷**：全部 12 个资产操作统一复用 `POST /hyperone/xapi/api/ark_asset/{shortId}`，由 Query 参数 `Action` 与 `Version=2024-01-01` 派发。JSON 请求体原文上限为 **1 MiB**。
* **项目隔离约束**：请求体中的 `ProjectName` 仅允许传 `default` 或省略（代表上游缺省资源池），它不是 AGIOne 业务租户或项目选择器。资产列表默认按发起请求的当前用户自动过滤。
* **功能边界**：视频专区当前覆盖任务创建与按 ID 单任务查询；批量任务列表、取消/删除任务及 Webhook 回调暂不纳入首批支持范围。
