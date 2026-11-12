# Private Portrait Asset Workflow Guide

This guide details the complete end-to-end integration lifecycle for **real-person biometric verification**, **private portrait asset ingestion**, and **video generation model invocation** via the AGIOne protocol compatibility gateway.

## Workflow Sequence Overview

Biometric verification and asset operations use the **System API AK/SK** with Ark-compatible signing. When submitting the final video rendering task, the client seamlessly switches to the **Model API Key** with standard Bearer authentication:

<div class="api-visual-flow">
  <svg viewBox="0 0 860 390" width="100%" height="100%" style="max-width: 860px; display: block; margin: 0 auto; font-family: var(--vp-font-family-base);">
    <defs>
      <marker id="arrow-en" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--vp-c-brand-1)" />
      </marker>
      <marker id="arrow-green-en" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
      </marker>
    </defs>
    <!-- Swimlanes -->
    <!-- 1. Client App -->
    <rect x="20" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="1.5" />
    <text x="100" y="45" text-anchor="middle" font-size="13" font-weight="600" fill="var(--vp-c-text-1)">Client Application</text>
    <line x1="100" y1="60" x2="100" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 2. System Gateway -->
    <rect x="240" y="20" width="180" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="#10b981" stroke-width="1.5" />
    <text x="330" y="45" text-anchor="middle" font-size="13" font-weight="600" fill="#10b981">System Gateway (AK/SK)</text>
    <line x1="330" y1="60" x2="330" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 3. Biometric H5 -->
    <rect x="480" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-border)" stroke-width="1.5" />
    <text x="560" y="45" text-anchor="middle" font-size="13" font-weight="600" fill="var(--vp-c-text-1)">Verification H5</text>
    <line x1="560" y1="60" x2="560" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- 4. Video Model -->
    <rect x="680" y="20" width="160" height="40" rx="8" fill="var(--vp-c-bg-soft)" stroke="var(--vp-c-brand-1)" stroke-width="1.5" />
    <text x="760" y="36" text-anchor="middle" font-size="13" font-weight="600" fill="var(--vp-c-brand-1)"><tspan x="760">Video Engine</tspan><tspan x="760" dy="15" font-size="11.5">Model API Key</tspan></text>
    <line x1="760" y1="60" x2="760" y2="370" stroke="var(--vp-c-divider)" stroke-dasharray="4 4" stroke-width="1.5" />
    <!-- Step 1 -->
    <line x1="100" y1="95" x2="322" y2="95" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green-en)" />
    <text x="210" y="88" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-1)">① CreateVisualValidateSession (Get H5Link & Token)</text>
    <!-- Step 2 -->
    <line x1="100" y1="135" x2="552" y2="135" stroke="var(--vp-c-text-2)" stroke-width="1.5" marker-end="url(#arrow-en)" />
    <text x="310" y="128" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-2)">② Deliver H5Link to user for biometric validation</text>
    <!-- Step 3 -->
    <line x1="100" y1="175" x2="322" y2="175" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green-en)" />
    <text x="210" y="168" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-1)">③ GetVisualValidateResult (Resolve GroupId with Token)</text>
    <!-- Step 4 -->
    <line x1="100" y1="215" x2="322" y2="215" stroke="#10b981" stroke-width="1.5" marker-end="url(#arrow-green-en)" />
    <text x="210" y="208" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-1)">④ CreateAsset (Submit media URL -> Asset ID)</text>
    <!-- Step 5 -->
    <path d="M 100 245 L 322 245" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" marker-end="url(#arrow-green-en)" />
    <text x="210" y="240" text-anchor="middle" font-size="11" fill="var(--vp-c-text-2)">⑤ Poll GetAsset until Status=Active</text>
    <!-- Step 6 -->
    <line x1="100" y1="285" x2="752" y2="285" stroke="var(--vp-c-brand-1)" stroke-width="1.5" marker-end="url(#arrow-en)" />
    <text x="430" y="278" text-anchor="middle" font-size="11.5" font-weight="500" fill="var(--vp-c-brand-1)">⑥ CreateVideoTask (Reference asset://{ID} with Model Key)</text>
    <!-- Step 7 -->
    <line x1="100" y1="330" x2="752" y2="330" stroke="var(--vp-c-brand-1)" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow-en)" />
    <text x="430" y="323" text-anchor="middle" font-size="11.5" fill="var(--vp-c-text-2)">⑦ Poll GetVideoTask until succeeded; consume output URL</text>
  </svg>
</div>

## Six-Step Implementation Pipeline

<div class="api-steps-flow">
  <div class="api-step-card">
    <div class="api-step-num">1</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Prepare Environment & Credentials
        <span class="api-card-badge brand">Prerequisites</span>
      </div>
      <p class="api-step-desc">
        Obtain the <strong>API Base URL</strong>, <strong>4-digit Asset Service ID</strong>, <strong>System API AK/SK</strong>, <strong>Model API Key</strong>, and the target <strong>Video Model ID</strong> from your instance administrator. Confirm that the caller can access the asset service and video model, and that the model’s upstream configuration can access assets created through that service. AGIOne access authorization does not replace checks that the upstream account and resource project match.
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">2</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Initiate Biometric Verification H5 Session
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        Call <a href="./verification/create-session">Start Real-Person Verification H5 (CreateVisualValidateSession)</a>. The gateway returns a temporary <code>BytedToken</code> and a client-facing <code>H5Link</code>. Provide this link to the actual person to complete real-time face verification in their browser or mobile device. Never bypass this step programmatically.
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">3</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Extract Verified Asset Group ID
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        Once the person completes verification, call <a href="./verification/get-result">Get Verified Asset Group ID (GetVisualValidateResult)</a> with the <code>BytedToken</code>. On success, retrieve the verified <code>GroupId</code>. Frontend callback parameters are informational only; always rely on the authoritative server-side response.
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">4</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Ingest Media Asset and Poll for Active Status
        <span class="api-card-badge green">System AK/SK</span>
      </div>
      <p class="api-step-desc">
        Call <a href="./assets/create">Create Asset (CreateAsset)</a> with the <code>GroupId</code>, asset type, and an upstream-accessible media URL. Record the returned asset <code>Id</code>. Poll <a href="./assets/get">Get Asset Details (GetAsset)</a> until the <code>Status</code> turns <code>Active</code>. If the status becomes <code>Failed</code>, inspect the error details.
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">5</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Switch Credentials & Submit Video Generation Task
        <span class="api-card-badge brand">Model API Key</span>
      </div>
      <p class="api-step-desc">
        Using your <strong>AGIOne Model API Key</strong> (Bearer token), call <a href="./video/create-task">Create Video Task (CreateVideoTask)</a>. Reference the active asset in the <code>content</code> image array using the URI scheme: <code>asset://&lt;ASSET_ID&gt;</code>. Describe reference images sequentially in prompts. Record the returned task <code>id</code>.
      </p>
    </div>
  </div>

  <div class="api-step-card">
    <div class="api-step-num">6</div>
    <div class="api-step-content">
      <div class="api-step-title">
        Poll Task Status & Consume Video Output
        <span class="api-card-badge brand">Model API Key</span>
      </div>
      <p class="api-step-desc">
        Periodically poll <a href="./video/get-task">Get Video Task (GetVideoTask)</a> with exponential backoff while in <code>queued</code> or <code>running</code> states. When the task reaches <code>succeeded</code>, persist the generated video CDN URL. Terminate polling immediately if the task enters <code>failed</code> or <code>expired</code> states.
      </p>
    </div>
  </div>
</div>

## Error Recovery & Operational Boundaries

* **Session Expiration**: If the verification link expires before completion, initiate a new session via Step 2. Expired <code>BytedToken</code> values cannot be renewed.
* **Asset Creation Retries**: Fix media resolution, download accessibility, or face mismatch errors before retrying. Do not automatically retry timed-out POST requests without verifying if the asset was already registered.
* **Virtual Avatar Workflows**: For non-biometric synthetic avatars, skip the H5 step and call <a href="./asset-groups/create">Create Asset Group (CreateAssetGroup)</a> directly with <code>GroupType="AIGC"</code>.
* **Project Boundary**: <code>ProjectName=default</code> is an upstream cloud isolation rule and does not grant cross-tenant access in AGIOne.
