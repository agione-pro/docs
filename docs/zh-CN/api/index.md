# API 参考中心

AGIOne 为开发者提供工业级的大模型推理、智算平台运维管控以及主流生态协议兼容能力。整个 API 体系按业务边界与安全等级划分为三个核心专区：

<div class="api-portal-grid">
  <a href="./openapi/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">⚡</span>
      <span class="api-card-badge brand">Model API</span>
    </div>
    <div class="api-card-title">
      模型 API（OpenAPI）
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      标准模型推理、对话与流式调用接口。遵循行业通用 OpenAPI 规范，面向应用开发者提供高并发、低延迟的模型调用体验。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Bearer Token</span>
      <span class="api-tag">SSE 流式输出</span>
      <span class="api-tag">多模态</span>
    </div>
  </a>

  <a href="./system-api/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔐</span>
      <span class="api-card-badge green">Platform API</span>
    </div>
    <div class="api-card-title">
      平台 API
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      AGIOne 平台管理与查询接口。本栏目当前收录“查询当前身份角色”，使用 System API AK/SK 计算请求签名；SK 保留在可信服务端。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">AK/SK 签名</span>
      <span class="api-tag">只读角色查询</span>
    </div>
  </a>

  <a href="./protocol-compatibility/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔄</span>
      <span class="api-card-badge amber">Compatibility</span>
    </div>
    <div class="api-card-title">
      协议兼容代理
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      兼容主流公有云与开源生态协议（如火山方舟 Ark 视频生成与素材资产代理）。业务系统无需重构即可无缝桥接 AGIOne 私有化实例。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">火山方舟 Ark</span>
      <span class="api-tag">数字人/真人认证</span>
      <span class="api-tag">素材组合</span>
    </div>
  </a>
</div>

## 凭据体系与接入矩阵

在发起接口请求前，请先根据调用场景准备对应的身份凭据：

| 接口专区 | 适用场景 | 认证凭据 | 鉴权方式 | 请求示例头 |
| :--- | :--- | :--- | :--- | :--- |
| **模型 API（OpenAPI）** | 文本生成、向量 Embedding、视频生图等大模型应用 | **Model API Key** | Bearer Token 鉴权 | `Authorization: Bearer <KEY>` |
| **平台 API** | 查询当前凭据所属身份持有的角色 | **System API AK/SK** | 本地计算 HMAC-SHA256 签名 | `x-request-sign: <HEX_SIGN>` |
| **协议兼容（火山方舟）** | 私域真人素材组合、认证 H5 与异步视频任务 | **System AK/SK + Model Key** | 双轨凭据（资产签名 + 视频 Bearer） | `Authorization: HMAC-SHA256 ...` |

## 快速导航

- **模型开发者**：查阅[模型 API（OpenAPI）概述](./openapi/)，快速了解接入 Base URL 与错误码治理。
- **系统集成商**：查阅[平台 API 认证与签名](./system-api/authentication)，获取待签名串构造规则与 HMAC 计算示例；接着查看[查询当前身份角色](./system-api/endpoints)。
- **数字人与视频业务**：查阅[火山方舟兼容专区](./protocol-compatibility/volcengine/)与[真人素材资产全流程指南](./protocol-compatibility/volcengine/guide)。
