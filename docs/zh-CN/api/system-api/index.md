# 平台 API

平台 API（Platform API）指 AGIOne 的平台管理与查询接口。本栏目当前收录“查询当前身份角色”，仅查询当前凭据所属身份持有的角色。

::: info 凭据隔离与安全准则
* **平台管理专属**：本栏目接口采用 **System API AK/SK** 对称凭据，基于本地计算的 HMAC-SHA256 请求签名鉴权，详见[认证与签名规范](./authentication)。
* **模型调用隔离**：大模型推理调用使用独立的 **Model API Key**（Bearer Token 形式），详见[模型 API（OpenAPI）](../openapi/)。两套凭据在鉴权网关与权限空间上严格隔离。
:::

<div class="api-portal-grid">
  <a href="./authentication" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔑</span>
      <span class="api-card-badge green">鉴权规范</span>
    </div>
    <div class="api-card-title">
      认证与签名机制
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      详解待签名串（StringToSign）构造规则、查询参数字典序排序、HMAC-SHA256 算法以及 curl 请求头规范。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">x-request-*</span>
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">时间窗口防重放</span>
    </div>
  </a>

  <a href="./endpoints" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">👤</span>
      <span class="api-card-badge brand">核心端点</span>
    </div>
    <div class="api-card-title">
      查询当前身份角色
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      只读查询当前 System API Key 实际绑定的身份角色列表（支持 Operator、Provider 与 End User 身份）。
    </p>
    <div class="api-card-footer">
      <span class="api-tag">GET</span>
      <span class="api-tag">/admin/user/roles</span>
      <span class="api-tag">只读鉴权</span>
    </div>
  </a>
</div>

## 接口索引

当前平台 API 开放以下核心接口：

| 接口名称 | HTTP 方法 | 完整路由路径 | 适用角色 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| [查询当前身份角色](./endpoints) | `GET` | `/hyperone/admin/user/roles` | Operator / Provider / End User | 查询当前凭据所属身份持有的有效角色集合 |

## 快速接入流程

1. **创建凭据**：登录 AGIOne 控制台，在“个人设置 → 我的 Keys”中选择“System API AK/SK Pairs”创建凭据。请在弹窗展示时立即复制并妥善保存 SK（Secret Key），后续系统不再支持明文查看。
2. **获取服务地址**：向实例管理员获取 AGIOne 实例的 API Base URL（形如 `https://<agione-host>:<port>`，不包含 `/hyperone` 后缀）。
3. **计算签名并发起请求**：参考[认证与签名规范](./authentication)编写代码或使用 SDK 生成签名头，发送请求。
