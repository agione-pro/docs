# Get an asset group

Read an asset group owned by the current user.

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
| Action | Yes | `GetAssetGroup` |
| Version | Recommended | `2024-01-01` |

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Id | String | Yes | Group ID owned by this user in this service. |

`ProjectName` can be omitted. If provided, it must be `default` (case-sensitive). It is the upstream resource project, not an AGIOne business project.

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "Id": "group-example"
}
```

## Response parameters

Read successful data from `Result`; use `ResponseMetadata.RequestId` for tracing. Depend on the documented fields and ignore additional fields. This differs from the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| Id | String | Group ID. |
| Name | String | Name. |
| Description | String | Description. |
| GroupType | String | AIGC, LivenessFace or Public. |
| CreateTime / UpdateTime | String | Creation and update times. |

### Example success shape

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "GetAssetGroup",
    "Version": "2024-01-01"
  },
  "Result": {
    "Id": "group-example",
    "Name": "documentation-example",
    "GroupType": "AIGC"
  }
}
```

## Access scope and error handling

Access follows the System AK/SK owner’s user and tenant. A personal system credential does not grant access to project assets or another user’s assets. Keep the same `shortId` and user throughout the flow.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Get an asset group](https://docs.volcengine.com/docs/ark/get-asset-group-api?lang=zh).
