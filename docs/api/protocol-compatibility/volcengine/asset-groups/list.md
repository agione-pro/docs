# List asset groups

List the current user’s asset groups by type and filters.

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
| Action | Yes | `ListAssetGroups` |
| Version | Recommended | `2024-01-01` |

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| Filter | Object | Yes | Filter object. |
| Filter.GroupType | String | Yes | AIGC, LivenessFace or Public. |
| Filter.GroupIds | String[] | No | Group ID filter. |
| Filter.Name | String | No | Name search. |
| NextToken | String | No | Opaque cursor; do not combine with page-number pagination. |
| MaxResults | Integer | No | Cursor page size, 1–100; default 10. |
| PageNumber / PageSize | Integer | No | Use together: PageNumber starts at 1 and PageSize is 1–100. Do not combine with NextToken or MaxResults. |
| SortBy | String | No | CreateTime or UpdateTime. |
| SortOrder | String | No | Desc (default) or Asc. |

`ProjectName` can be omitted. If provided, it must be `default` (case-sensitive). It is the upstream resource project, not an AGIOne business project.

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "Filter": {
    "GroupType": "AIGC"
  },
  "MaxResults": 10
}
```

## Response parameters

Read successful data from `Result`; use `ResponseMetadata.RequestId` for tracing. Depend on the documented fields and ignore additional fields. This differs from the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| Items | Array | Visible records from the current upstream page. |
| NextToken | String | Upstream continuation cursor, when present. |
| TotalCount | Integer | When present, AGIOne replaces it with the visible count on this page, not an overall total. |
| PageNumber / PageSize | Integer | Page information when using page-number pagination. |

### Example success shape

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "ListAssetGroups",
    "Version": "2024-01-01"
  },
  "Result": {
    "Items": []
  }
}
```

## Access scope and error handling

Access follows the System AK/SK owner’s user and tenant. A personal system credential does not grant access to project assets or another user’s assets. Keep the same `shortId` and user throughout the flow.

AGIOne filters each upstream page by local ownership. Empty `Items` does not necessarily mean the last page: continue when `NextToken` is present. Do not reuse a cursor across users, asset services or operations.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [List asset groups](https://docs.volcengine.com/docs/ark/list-asset-groups-api?lang=zh).
