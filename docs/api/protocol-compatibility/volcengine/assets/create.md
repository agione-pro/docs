# Create an Asset

Create an asset from an accessible media URL. Preprocessing runs asynchronously; poll status until active before use.

## Endpoint Overview

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/ark_asset/{shortId}?Action=CreateAsset</span>
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
| Action | Yes | `CreateAsset` |
| Version | Recommended | `2024-01-01` |

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| GroupId | String | Required for this portrait flow | Owned, verified portrait group ID. |
| AssetType | String | Required in this example | Image, Video or Audio. |
| URL | String | Required in this example | Media URL reachable by the upstream service; asset upload does not use Base64 or multipart. |
| Name | String | No | Up to 64 characters, for management and search. |

`ProjectName` can be omitted. If provided, it must be `default` (case-sensitive). It is the upstream resource project, not an AGIOne business project.

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "GroupId": "group-example",
  "AssetType": "Image",
  "URL": "https://media.example.com/portrait.jpg",
  "Name": "portrait-example"
}
```

## Response parameters

Read successful data from `Result`; use `ResponseMetadata.RequestId` for tracing. Depend on the documented fields and ignore additional fields. This differs from the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| Id | String | Created asset ID; preprocessing may still be pending. |

### Example success shape

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "CreateAsset",
    "Version": "2024-01-01"
  },
  "Result": {
    "Id": "asset-example"
  }
}
```

## Request Examples

::: code-group

```json [Request Body JSON (Structure Only)]
{
  "GroupId": "<GROUP_ID>",
  "Name": "portrait-sample",
  "AssetType": "Image",
  "URL": "https://media.example.com/portraits/sample.jpg"
}
```

:::

::: tip Signing Helper Reference
Download and documentation for the Python signing helper is available in [Authentication and signing helper script](../authentication#signing-helper).
:::

## Access scope and error handling

Access follows the System AK/SK owner’s user and tenant. A personal system credential does not grant access to project assets or another user’s assets. Keep the same `shortId` and user throughout the flow.

Query `Status` with GetAsset. Use the asset for video generation only when `Active`; wait while `Processing` and inspect `Error` when `Failed`. Media and model input limits depend on the selected model and upstream asset constraints.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Create an asset](https://docs.volcengine.com/docs/ark/create-asset-api?lang=zh).
