# Protocol Compatibility

AGIOne protocol compatibility proxy services enable engineering teams to reuse existing upstream client SDKs, automation workflows, and codebases. By providing protocol translation and security gateway enforcement at the edge, client applications connect seamlessly to on-premise and private cloud AI instances without refactoring.

<div class="api-portal-grid">
  <a href="./volcengine/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">🌋</span>
    </div>
    <div class="api-card-title">
      Volcengine Ark Compatible API
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      Aligned with the Volcengine Ark digital avatar and media ecosystem, covering real-person biometric verification H5, asset groups (AIGC), portrait asset hosting, and asynchronous video generation.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Version 2024-01-01</span>
      <span class="api-tag">12 Asset Actions</span>
      <span class="api-tag">Video Task Creation</span>
    </div>
  </a>

  <a href="./doubao/" class="api-card">
    <div class="api-card-header">
      <span class="api-card-icon">📦</span>
      <span class="api-card-badge">Migrated</span>
    </div>
    <div class="api-card-title">
      Legacy Doubao Entry
      <span class="api-card-arrow">→</span>
    </div>
    <p class="api-card-desc">
      The original monolithic Doubao proxy documentation has been upgraded and merged into the Volcengine Ark Compatibility Hub. This route is preserved for legacy bookmark compatibility.
    </p>
    <div class="api-card-footer">
      <span class="api-tag">Legacy Redirect</span>
      <span class="api-tag">Reference Merged</span>
    </div>
  </a>
</div>

## Architectural Principles and Boundaries

1. **Dual-Track Credential System**:
   - Asset management and real-person verification govern tenant-level assets and strictly require **AGIOne System API AK/SK** with Ark-compatible HMAC-SHA256 signing.
   - Video task submission and querying govern model inference workloads and directly accept standard **Model API Key** Bearer tokens.
2. **Upstream Boundaries**:
   - Asset operations are consolidated under `POST /hyperone/xapi/api/ark_asset/{shortId}` with a strict 1 MiB JSON payload ceiling.
   - Compatibility covers the operations and parameters documented in this section.
3. **Security and Isolation**:
   - Signatures must always be computed in trusted backend environments; SK transmission is strictly prohibited.
   - Custom deployment routing headers are used exclusively for network gateway routing and never bypass tenant RBAC ownership.
