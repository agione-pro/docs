# Volcengine Ark Compatible API

The AGIOne protocol compatibility gateway provides drop-in compatibility with Volcengine Ark digital avatar assets, real-person biometric verification H5, and asynchronous video generation models. Operation names and payload contracts match Volcengine Ark, while endpoints and credentials are provisioned by AGIOne.

<div class="api-portal-grid">
  <a href="./guide" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🚀</span>
      <span class="api-card-badge brand">Core Guide</span>
    </div>
    <div class="api-card-title">
      Private Portrait Asset Pipeline
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      End-to-end integration walkthrough connecting H5 biometric verification, asset grouping, media onboarding, and video generation.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">End-to-End Flow</span>
      <span class="api-tag">Sequence Diagram</span>
    </div>
  </a>

  <a href="./authentication" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🔑</span>
      <span class="api-card-badge green">Security</span>
    </div>
    <div class="api-card-title">
      Authentication & Ark Signing
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Master the Ark-compatible HMAC-SHA256 signature scheme using AGIOne AK/SK credentials, complete with an offline helper script.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">HMAC-SHA256</span>
      <span class="api-tag">ark-sign.py</span>
    </div>
  </a>

  <a href="./errors" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🛡️</span>
      <span class="api-card-badge amber">Troubleshooting</span>
    </div>
    <div class="api-card-title">
      Error Codes & Diagnostics
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Error code mapping tables, timestamp drift windows, async polling failure modes, and sanitized ticketing guidelines.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Error Codes</span>
      <span class="api-tag">Retry Policy</span>
    </div>
  </a>
</div>

## Before You Start

1. **Environment and Endpoints**: Obtain the API Base URL (e.g. `https://<agione-host>:<port>`, excluding the `/hyperone` prefix) and the 4-digit Asset Service ID (`shortId`) from your administrator.
2. **Credential Provisioning**: Obtain a **System API AK/SK** pair for asset and verification operations. Prepare an authorized **Model API Key** for video generation.
3. **Authorization Check**: Confirm that your account has been granted access to the target video model, asset service, and media types in the platform console.

## Dual-Track Authentication

| Operational Scope | Credential Type | Authentication Scheme | Description |
| :--- | :--- | :--- | :--- |
| **Verification, Asset Groups & Assets** | AGIOne System API AK/SK | Ark-compatible HMAC-SHA256 | Credentials passed in `Authorization` header; SK never leaves client |
| **Video Task Creation & Single Queries** | AGIOne Model API Key | `Authorization: Bearer <KEY>` | Standard Bearer token authentication matching native OpenAPI endpoints |

## Operation Index

### 1. Real-Person Biometric Verification
| Operation | Action Identifier | Method | Documentation |
| :--- | :--- | :--- | :--- |
| Create verification H5 session | `CreateVisualValidateSession` | `POST` | [View Endpoint Spec](./verification/create-session) |
| Retrieve verified person's group ID | `GetVisualValidateResult` | `POST` | [View Endpoint Spec](./verification/get-result) |

### 2. Asset Group Management
| Operation | Action Identifier | Method | Documentation |
| :--- | :--- | :--- | :--- |
| Create an asset group | `CreateAssetGroup` | `POST` | [View Endpoint Spec](./asset-groups/create) |
| Get asset group details | `GetAssetGroup` | `POST` | [View Endpoint Spec](./asset-groups/get) |
| List asset groups | `ListAssetGroups` | `POST` | [View Endpoint Spec](./asset-groups/list) |
| Update an asset group | `UpdateAssetGroup` | `POST` | [View Endpoint Spec](./asset-groups/update) |
| Delete an asset group | `DeleteAssetGroup` | `POST` | [View Endpoint Spec](./asset-groups/delete) |

### 3. Individual Asset Management
| Operation | Action Identifier | Method | Documentation |
| :--- | :--- | :--- | :--- |
| Create an asset (media upload) | `CreateAsset` | `POST` | [View Endpoint Spec](./assets/create) |
| Get asset details and status | `GetAsset` | `POST` | [View Endpoint Spec](./assets/get) |
| List assets | `ListAssets` | `POST` | [View Endpoint Spec](./assets/list) |
| Update an asset | `UpdateAsset` | `POST` | [View Endpoint Spec](./assets/update) |
| Delete an asset | `DeleteAsset` | `POST` | [View Endpoint Spec](./assets/delete) |

### 4. Video Model Inference Tasks
| Operation | Route Path | Method | Documentation |
| :--- | :--- | :--- | :--- |
| Create video generation task | `/hyperone/xapi/api/v3/contents/generations/tasks` | `POST` | [View Endpoint Spec](./video/create-task) |
| Get video task details | `/hyperone/xapi/api/v3/contents/generations/tasks/{id}` | `GET` | [View Endpoint Spec](./video/get-task) |

## Compatibility Boundaries & Constraints

* **Gateway Routing & Payloads**: All 12 asset actions share the `POST /hyperone/xapi/api/ark_asset/{shortId}` endpoint and dispatch via `Action` and `Version=2024-01-01`. Maximum request body size is **1 MiB**.
* **Project Isolation**: `ProjectName` must be `default` or omitted. It refers to upstream cloud resource pools, not AGIOne tenant projects.
* **Scope Boundaries**: Video generation covers task creation and single-task status polling. Bulk task listing, task cancellation/deletion, and Webhooks are currently not in scope.
