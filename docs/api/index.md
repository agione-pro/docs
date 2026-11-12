# API Reference Portal

AGIOne provides enterprise-grade AI model inference, compute platform management, and protocol-compatibility proxies for mainstream ecosystems. The API ecosystem is partitioned into three specialized domains based on operational boundary and security level:

<div class="api-portal-grid">
  <a href="./openapi/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">⚡</span>
      <span class="api-card-badge brand">Model API</span>
    </div>
    <div class="api-card-title">
      Model API (OpenAPI)
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Standard model inference, chat completions, and streaming interfaces following OpenAPI specifications. Built for high-concurrency and low-latency application delivery.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Bearer Token</span>
      <span class="api-tag">SSE Streaming</span>
      <span class="api-tag">Multimodal</span>
    </div>
  </a>

  <a href="./system-api/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔐</span>
      <span class="api-card-badge green">Platform API</span>
    </div>
    <div class="api-card-title">
      Platform API
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      AGIOne platform management and query APIs. This section currently documents Get caller roles and uses System API AK/SK request signatures; keep SK in a trusted backend.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">AK/SK Signing</span>
      <span class="api-tag">Read-Only Roles</span>
    </div>
  </a>

  <a href="./protocol-compatibility/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔄</span>
      <span class="api-card-badge amber">Compatibility</span>
    </div>
    <div class="api-card-title">
      Protocol Compatibility
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Drop-in compatible proxy endpoints for mainstream cloud protocols (such as Volcengine Ark video generation and portrait asset management) without rewriting business applications.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Volcengine Ark</span>
      <span class="api-tag">Portrait Verification</span>
      <span class="api-tag">Asset Groups</span>
    </div>
  </a>
</div>

## Credential Matrix and Architecture

Before making requests, ensure you have provisioned the appropriate credential for your operational scope:

| API Domain | Applicable Scope | Credential Type | Authentication Scheme | Sample Header |
| :--- | :--- | :--- | :--- | :--- |
| **Model API (OpenAPI)** | Text generation, vector embeddings, multimodal generation | **Model API Key** | Bearer Token | `Authorization: Bearer <KEY>` |
| **Platform API** | Query roles held by the current credential owner | **System API AK/SK** | Locally computed HMAC-SHA256 signature | `x-request-sign: <HEX_SIGN>` |
| **Protocol Compatibility (Ark)** | Real-person portrait assets, verification H5, video pipelines | **System AK/SK + Model Key** | Dual-track (Ark signature for assets, Bearer for video) | `Authorization: HMAC-SHA256 ...` |

## Quick Navigation

- **Model Application Developers**: Read the [Model API (OpenAPI) Overview](./openapi/) for endpoint URLs, error conventions, and rate limits.
- **System Integrators & Administrators**: Review [Authentication & Signing](./system-api/authentication) to understand StringToSign rules and HMAC verification; then explore [Get Caller Roles](./system-api/endpoints).
- **Digital Avatar & Video Teams**: Jump to the [Volcengine Ark Compatibility Hub](./protocol-compatibility/volcengine/) and the [Private Portrait Asset Workflow Guide](./protocol-compatibility/volcengine/guide).
