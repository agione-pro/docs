# Get an asset

Read an owned asset and its preprocessing state.

## Basic information

| Item | Value |
| --- | --- |
| Method | POST |
| Path | `/hyperone/xapi/api/ark_asset/{shortId}` |
| Authentication | AGIOne System API AK/SK + HMAC-SHA256 |

`shortId` is the four-digit asset service identifier supplied by the instance administrator, not an asset, group or model ID.

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
| Action | Yes | `GetAsset` |
| Version | Recommended | `2024-01-01` |

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Id | String | Yes | Asset ID owned by this user in this service. |

`ProjectName` can be omitted. If provided, it must be `default` (case-sensitive). It is the upstream resource project, not an AGIOne business project.

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "Id": "asset-example"
}
```

## Response parameters

Read successful data from `Result`; use `ResponseMetadata.RequestId` for tracing. Depend on the documented fields and ignore additional fields. This differs from the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| Id | String | Asset ID. |
| GroupId | String | Parent group ID. |
| AssetType | String | Image, Video or Audio. |
| Name | String | Asset name. |
| Status | String | Processing, Active or Failed. |
| Error.Code / Error.Message | String | Failure details when preprocessing fails. |
| URL | String | Asset URL; may expire and is not a stable identifier. |
| CreateTime / UpdateTime | String | Creation and update times. |

### Example success shape

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "GetAsset",
    "Version": "2024-01-01"
  },
  "Result": {
    "Id": "asset-example",
    "GroupId": "group-example",
    "AssetType": "Image",
    "Name": "portrait-example",
    "Status": "Active"
  }
}
```

## Access scope and error handling

Access follows the System AK/SK owner’s user and tenant. A personal system credential does not grant access to project assets or another user’s assets. Keep the same `shortId` and user throughout the flow.

HTTP 200 does not mean the asset is usable: inspect `Result.Status`. A successful query can report a preprocessing failure.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Get an asset](https://docs.volcengine.com/docs/ark/get-asset-api?lang=zh).
