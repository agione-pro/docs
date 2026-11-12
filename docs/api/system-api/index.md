# Platform API

Platform API covers AGIOne platform management and queries. This section currently documents Get caller roles, a read-only query for roles held by the current credential owner.

::: info Credential Isolation & Security
* **Platform Management Scope**: Endpoints in this section require symmetric **System API AK/SK** credentials and authenticate via locally calculated HMAC-SHA256 request signatures. See [Authentication and Signing](./authentication).
* **Model Inference Isolation**: Model completions and chat inferences use an independent **Model API Key** with standard Bearer authentication. See [Model API (OpenAPI)](../openapi/).
:::

<div class="api-portal-grid">
  <a href="./authentication" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔑</span>
      <span class="api-card-badge green">Auth Spec</span>
    </div>
    <div class="api-card-title">
      Authentication & Signing
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      StringToSign construction rules, lexicographical query parameter sorting, HMAC-SHA256 hashing, and header conventions.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">x-request-*</span>
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">Replay Defense</span>
    </div>
  </a>

  <a href="./endpoints" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">👤</span>
      <span class="api-card-badge brand">Core Endpoint</span>
    </div>
    <div class="api-card-title">
      Get Caller Roles
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Inspect roles associated with the authenticated System API Key (supports Operator, Provider, and End User caller identities).
    </p>
    <div class="api-card-footer">
      <span class="api-tag">GET</span>
      <span class="api-tag">/admin/user/roles</span>
      <span class="api-tag">Read-Only</span>
    </div>
  </a>
</div>

## Available Endpoints

The Platform API exposes the following core endpoints:

| Operation | HTTP Method | Complete Route Path | Applicable Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| [Get caller roles](./endpoints) | `GET` | `/hyperone/admin/user/roles` | Operator / Provider / End User | Returns active roles assigned to the current caller identity |

## Quickstart Steps

1. **Provision Credentials**: Navigate to "Personal Settings → My Keys" in the AGIOne console and generate a "System API AK/SK Pair". Store the Secret Key (SK) securely upon creation, as it cannot be retrieved later in plain text.
2. **Obtain Base URL**: Request the API Base URL from your instance administrator (e.g. `https://<agione-host>:<port>`, excluding `/hyperone`).
3. **Compute Signature & Request**: Calculate the HMAC-SHA256 signature following the [Authentication and Signing Specification](./authentication) and send the signed request.
