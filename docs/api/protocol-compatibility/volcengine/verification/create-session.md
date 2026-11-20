# Start Real-Person Verification H5

Obtain an H5 link for the person who owns the portrait to complete real-time biometric verification.

## Endpoint Overview

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/ark_asset/{shortId}?Action=CreateVisualValidateSession</span>
    <span class="api-auth-pill">🔐 System API AK/SK</span>
  </div>
</div>

| Specification | Details |
| :--- | :--- |
| **Protocol** | `HTTPS` (recommended) / `HTTP` |
| **Service ID** | `shortId` is the 4-digit asset service identifier provisioned by your administrator |
| **Authentication** | AGIOne System API AK/SK with Ark-compatible HMAC-SHA256 signing (see [Authentication and signing](../authentication)) |

## Request parameters

### Headers

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | HMAC-SHA256 signature computed with AGIOne AK/SK. |
| Host | Yes | Actual API host, matching the signed host. |
| X-Date | Yes | UTC time, YYYYMMDDTHHMMSSZ. |
| X-Content-Sha256 | Used by the example | Lowercase SHA-256 hex digest of the actual UTF-8 body. |
| Content-Type | Required for POST | application/json |
| Accept | Recommended | application/json |
| Accept-Language | No | zh-CN / en-US |

If the deployment requires a routing header, use the name and value supplied by its administrator. Attribution headers cannot change the caller’s user, tenant or project.

### Query parameters

| Parameter | Required | Value |
| --- | --- | --- |
| Action | Yes | `CreateVisualValidateSession` |
| Version | Recommended | `2024-01-01` |

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| CallbackURL | String | Yes | Destination after verification. |

`ProjectName` can be omitted. If provided, it must be `default` (case-sensitive). It is the upstream resource project, not an AGIOne business project.

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "CallbackURL": "https://app.example.com/portrait/verification-result"
}
```

## Response parameters

Read successful data from `Result`; use `ResponseMetadata.RequestId` for tracing. Depend on the documented fields and ignore additional fields. This differs from the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| BytedToken | String | Verification reference for retrieving the group ID. |
| H5Link | String | Verification URL for the person. |
| CallbackURL | String | Post-verification destination. |

### Example success shape

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "CreateVisualValidateSession",
    "Version": "2024-01-01"
  },
  "Result": {
    "BytedToken": "verification-token-example",
    "H5Link": "https://verification.example.com/session",
    "CallbackURL": "https://app.example.com/portrait/verification-result"
  }
}
```

## Request Examples

::: code-group

```json [Request Body JSON (Structure Only)]
{
  "CallbackURL": "https://app.example.com/portrait/callback"
}
```

:::

::: tip Signing Helper Reference
Download and documentation for the Python signing helper is available in [Authentication and signing helper script](../authentication#signing-helper).
:::

## Access scope and error handling

Access follows the System AK/SK owner’s user and tenant. A personal system credential does not grant access to project assets or another user’s assets. Keep the same `shortId` and user throughout the flow.

Keep the verification reference and complete the flow promptly; the current upstream reference specifies 30 minutes. Treat the link and reference as sensitive. `CallbackURL` is a browser redirect, not a Webhook. Redirect parameters do not replace a server-side result query.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Start real-person verification H5](https://docs.volcengine.com/docs/ark/h5-create-visual-validate-session-api?lang=zh).
