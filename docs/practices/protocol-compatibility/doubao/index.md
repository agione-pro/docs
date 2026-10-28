# Doubao Compatible Proxy API

Doubao compatible proxy service. Provides external Doubao video generation task interfaces and Volcengine Ark-style asset management interfaces.

Default Server Address: `http://<agione-host>:<port>`  
Default Base Path: `/hyperone/xapi/api/compatible/v1`

Full URL format:

```text
{BASE_URL}{BASE_PATH}{path}
```

For example:

```text
http://<agione-host>:<port>/hyperone/xapi/api/compatible/v1/doubao/contents/generations/tasks
```

---

## 1. General Conventions

### 1.1 Authentication

| Header | Description |
|---|---|
| `Authorization` | Recommended. `Bearer <api_key>`, or pass the key directly |

### 1.2 Request Headers

| Header | Description |
|---|---|
| `Content-Type` | POST / PATCH requests are handled as `application/json` by default. If omitted, or set to `text/plain` or `application/x-www-form-urlencoded` (default for `curl -d`), it will be converted to JSON |

### 1.3 Error Handling

Proxy internal errors (configuration, tenant, protocol, timeout, etc.):

```json
{
  "error": {
    "type": "asset_error",
    "message": "Asset does not belong to this tenant"
  }
}
```

| type | Scenario |
|---|---|
| `asset_error` | Asset authentication, tenant, validation, storage, or vendor invocation failure |
| `upstream_error` | Upstream timeout or unreachable |
| `configuration_error` | Configuration error |
| `upstream_protocol_error` | Upstream response missing required fields such as task id |

Upstream business errors for video tasks preserve the HTTP status and `error.code`:

```json
{
  "error": {
    "code": "InvalidParameter",
    "message": "duration is invalid",
    "param": "duration"
  }
}
```

Even if the upstream returns HTTP 200, if `status >= 400` in the JSON response, it will be returned with that status code.

For asset uploads, when the vendor returns HTTP `>= 400`, the upstream body is passed through as-is without being wrapped in an `error` object.

### 1.4 Asset Ark Format

```json
{
  "ResponseMetadata": {
    "RequestId": "",
    "Action": "GetAsset",
    "Version": "2024-01-01",
    "Service": "ark",
    "Region": "cn-beijing"
  },
  "Result": {}
}
```

| Field | Value |
|---|---|
| `RequestId` | Fixed empty string |
| `Version` | `2024-01-01` |
| `Service` | `ark` |
| `Region` | `cn-beijing` |
| `Action` | upload=`CreateAsset`, detail=`GetAsset`, list=`ListAssets` |

---

## 2. API Overview

| Method | Path | Description |
|---|---|---|
| POST | `/doubao/contents/generations/tasks` | Create video generation task |
| GET | `/doubao/contents/generations/tasks/{taskId}` | Query video generation task |
| POST | `/doubao/assets` | Upload / create asset |
| GET | `/doubao/assets/{assetId}` | Get asset details |
| GET | `/doubao/assets` | List assets |

---

## 3. Video Generation
### 3.1 Create Task

`POST /doubao/contents/generations/tasks`

#### Request Body

Common fields (can be passed through, not limited to the table below):

| Field | Type | Required | Description |
|---|---|---|---|
| `model` | string | Recommended | e.g. `doubao-seedance-2-0-pro` |
| `content` | array | Recommended | Text / image / video references |
| `duration` | number | No | Duration (seconds) |
| `resolution` | string | No | Defaults to `480p` if omitted |
| `ratio` | string | No | Aspect ratio, passed through |
| `seed` | number | No | Random seed, passed through |
| `watermark` | boolean | No | Watermark flag, passed through |
| `camerafixed` | boolean | No | Fixed camera flag, passed through |

Example of `content` elements:

```json
[
  { "type": "text", "text": "a cat walking in the rain" },
  { "type": "image_url", "image_url": { "url": "https://example.com/ref.png" } }
]
```

#### Successful Response `200`

```json
{
  "id": "task-1",
  "status": "queued",
  "model": "doubao-seedance-2-0"
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Task ID |
| `status` | string | See status mapping table |
| `model` | string | Model specified in request or returned by upstream |
| `created_at` | number | Unix timestamp (seconds), returned if provided upstream |
| `updated_at` | number | Unix timestamp (seconds), returned if provided upstream |
| `content` | array | Contains video URL upon success |
| `usage` | object | Passed through as-is if provided upstream |
| `error` | object | May appear when `status=failed` |

#### curl Example

```bash
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "model": "doubao-seedance-2-0-pro",
    "content": [{"type": "text", "text": "a cat walking in the rain"}],
    "duration": 5
  }'
```

### 3.2 Query Task

`GET /doubao/contents/generations/tasks/{taskId}`

#### Successful Response `200`

In progress:

```json
{
  "id": "task-1",
  "status": "running",
  "model": "doubao-seedance-2-0"
}
```

Completed:

```json
{
  "id": "task-1",
  "status": "succeeded",
  "model": "doubao-seedance-2-0",
  "content": [
    {
      "type": "video_url",
      "video_url": {
        "url": "https://cdn.example/video.mp4"
      }
    }
  ]
}
```

When failed, `status` is `failed` and may contain:

```json
{
  "error": {
    "message": "...",
    "type": "upstream_error"
  }
}
```

#### curl Example

```bash
curl -sS "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks/${TASK_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```

### 3.3 Task Status

| External status | Common Upstream Values |
|---|---|
| `queued` | `PENDING`, `WAITING`, `QUEUED` |
| `running` | `RUNNING`, `PROCESSING`, `IN_PROGRESS` |
| `succeeded` | `SUCCEEDED`, `SUCCESS`, `COMPLETED` |
| `failed` | `FAILED`, `FAILURE`, `ERROR` |
| `cancelled` | `CANCELED`, `CANCELLED`, `CANCELLING` |

If not matched in the mapping table, the original value is converted to lowercase and returned as-is. Defaults to `queued` on creation and `running` on query.

### 3.4 Video API Errors

| HTTP Status | Description |
|---|---|
| 400 / 401 / 429 etc. | Upstream business error, preserves `error.code` |
| 502 | Upstream unreachable, or response cannot be parsed as a task |
| 503 | Create / query URL not configured |
| 504 | Upstream timeout |

---

## 4. Asset Management
### 4.1 Asset Object (`Result`)

| Field | Type | Description |
|---|---|---|
| `Id` | string | Asset ID |
| `Name` | string | Asset name |
| `URL` | string | Accessible URL |
| `AssetType` | string | e.g. `Image` |
| `GroupId` | string | Asset group ID |
| `Status` | string | `Processing` / `Active` / `Failed` |
| `CreateTime` | string | Vendor creation time |
| `UpdateTime` | string | Vendor update time |
| `ProjectName` | string | Project name; omitted if empty |
| `Error` | object | When failed: `{ "Code", "Message" }` |
| `Moderation` | object | Moderation information, returned if available |
| `LastInferenceTime` | string | Most recent inference time, returned if available |

### 4.2 Create Asset

`POST /doubao/assets`

#### Request Body

| Field | Alias | Required | Description |
|---|---|---|---|
| `URL` | `url` | Required in Ark mode | Source file URL |
| `AssetType` | `asset_type`, `assetType` | Required in Ark mode | Asset type, defaults to `Image` in storage |
| `Name` | `name` | No | Asset name |
| `GroupId` | `group_id`, `groupId` | Optional in Ark mode | Automatically creates group by tenant if omitted |
| `ProjectName` | `project_name`, `projectName` | No | In Ark mode, defaults to configuration `ASSET_PROJECT_NAME` (default: `default`) |

#### Successful Response `200`

```json
{
  "ResponseMetadata": {
    "RequestId": "",
    "Action": "CreateAsset",
    "Version": "2024-01-01",
    "Service": "ark",
    "Region": "cn-beijing"
  },
  "Result": {
    "Id": "asset-1"
  }
}
```

Only `Id` is returned upon successful creation. Call GET for full details.

#### curl Example

```bash
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "URL": "https://example.test/sample.png",
    "AssetType": "Image",
    "Name": "sample"
  }'
```

### 4.3 Asset Details

`GET /doubao/assets/{assetId}`

Returns `404` if the asset does not belong to the current tenant or has been deleted.  
When in `Processing` status or when the URL has expired, the proxy refreshes from the upstream vendor before returning.

#### Successful Response `200`

```json
{
  "ResponseMetadata": {
    "RequestId": "",
    "Action": "GetAsset",
    "Version": "2024-01-01",
    "Service": "ark",
    "Region": "cn-beijing"
  },
  "Result": {
    "Id": "asset-1",
    "Name": "portrait",
    "URL": "https://cdn.example/a.png",
    "AssetType": "Image",
    "GroupId": "group-1",
    "Status": "Active",
    "CreateTime": "2024-05-14T21:27:50Z",
    "UpdateTime": "2024-05-14T21:30:00Z",
    "ProjectName": "default"
  }
}
```

Failed asset example:

```json
{
  "Result": {
    "Id": "asset-1",
    "Status": "Failed",
    "Error": {
      "Code": "InvalidURL",
      "Message": "unable to download"
    }
  }
}
```

#### curl Example

```bash
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets/${ASSET_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```

### 4.4 List Assets

`GET /doubao/assets`

Reads only the local tenant database; does not call the upstream list API.

#### Query Parameters

| Parameter | Alias | Description |
|---|---|---|
| `name` | | Fuzzy match on name |
| `asset_type` | `assetType` | Exact match |
| `group_id` | `groupId` | Exact match |
| `project_name` | `projectName` | Exact match |
| `status` | Repeatable | Status filter |
| `statuses` | | Comma-separated list, e.g. `Active,Failed` |
| `page_size` | `pageSize`, `max_results` | Number of items per page, default: `10`, range: 1–100 |
| `page_number` | `pageNumber` | Starting from 1; overrides `next_token` when present |
| `next_token` | `nextToken` | Cursor returned from the previous page |

Returns `400` if `page_size` / `page_number` is not an integer.

#### Successful Response `200`

```json
{
  "ResponseMetadata": {
    "RequestId": "",
    "Action": "ListAssets",
    "Version": "2024-01-01",
    "Service": "ark",
    "Region": "cn-beijing"
  },
  "Result": {
    "Items": [
      {
        "Id": "asset-1",
        "Name": "portrait",
        "URL": "https://cdn.example/a.png",
        "AssetType": "Image",
        "GroupId": "group-1",
        "Status": "Active",
        "CreateTime": "2024-05-14T21:27:50Z",
        "UpdateTime": "2024-05-14T21:30:00Z",
        "ProjectName": "default"
      }
    ],
    "TotalCount": 19,
    "PageNumber": 1,
    "PageSize": 10
  }
}
```

| Field | Description |
|---|---|
| `Items` | Current page assets, item structure matches detail `Result` |
| `TotalCount` | Filtered total count (excluding deleted items) |
| `PageNumber` | Current page number, starting from 1 |
| `PageSize` | Page size of the current request |
| `NextToken` | Cursor for the next page, present when more pages exist |

When the list is empty, `Items` is `[]` and `TotalCount` is `0`.

#### curl Example

```bash
curl -sS -G "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  --data-urlencode "name=sample" \
  --data-urlencode "asset_type=Image" \
  --data-urlencode "status=Active" \
  --data-urlencode "page_size=10" \
  --data-urlencode "page_number=1"
```

### 4.5 Asset API Errors

| HTTP Status | type / Behavior | Description |
|---|---|---|
| 400 | `asset_error` | Missing fields, invalid name, or invalid pagination parameters |
| 401 | `asset_error` | Missing or invalid API Key |
| 404 | `asset_error` | Asset does not belong to the current tenant |
| 500 | `asset_error` | Database write failure |
| 501 | `asset_error` | Legacy mode does not support update / delete |
| 502 | `asset_error` | Vendor failure or response missing ID |
| 503 | `asset_error` | Configuration error |

Assets uploaded by Tenant A return `404` when queried by Tenant B, and do not appear in Tenant B's list, leaking no information beyond existence.

---

## 5. Complete Invocation Examples

```bash
# Replace with actual AGIOne server address and port
BASE_URL="http://<agione-host>:<port>"
BASE_PATH="/hyperone/xapi/api/compatible/v1"
API_KEY="replace-with-upms-access-key"

# Upload asset
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "URL": "https://example.test/portrait.png",
    "AssetType": "Image",
    "Name": "portrait"
  }'

# Get asset details
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets/${ASSET_ID}" \
  -H "Authorization: Bearer ${API_KEY}"

# List assets
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}"

# Create video task
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "model": "doubao-seedance-2-0",
    "content": [{
      "type": "text",
      "text": "a cat walking in the rain"
    }, {
      "type": "image_url",
      "role": "reference_image",
      "image_url": {
          "url": "asset://35938271324......"
      }
    }],
    "duration": 5,
    "resolution": "720p"
  }'

# Query video task
curl -sS "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks/${TASK_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```
