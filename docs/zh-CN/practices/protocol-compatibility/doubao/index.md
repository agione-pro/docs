# Doubao（豆包）协议兼容代理 API

Doubao 兼容代理。对外提供豆包视频生成任务接口，以及火山方舟（Ark）形态的资产接口。

默认服务地址：`http://<agione-host>:<port>`  
默认 Base Path：`/hyperone/xapi/api/compatible/v1`

完整 URL 形如：

```text
{BASE_URL}{BASE_PATH}{path}
```

例如：

```text
http://<agione-host>:<port>/hyperone/xapi/api/compatible/v1/doubao/contents/generations/tasks
```

---

## 1. 通用约定

### 1.1 鉴权

| Header | 说明 |
|---|---|
| `Authorization` | 推荐。`Bearer <api_key>`，或直接传 key |

### 1.2 请求头

| Header | 说明 |
|---|---|
| `Content-Type` | POST / PATCH 默认按 `application/json` 处理。未传、`text/plain` 或 `application/x-www-form-urlencoded`（`curl -d` 默认）都会被改成 JSON |

### 1.3 错误说明

代理自身错误（配置、租户、协议、超时等）：

```json
{
  "error": {
    "type": "asset_error",
    "message": "Asset does not belong to this tenant"
  }
}
```

| type | 场景 |
|---|---|
| `asset_error` | 资产鉴权、租户、校验、存储、供应商调用失败 |
| `upstream_error` | 上游超时、不可达 |
| `configuration_error` | 配置错误 |
| `upstream_protocol_error` | 上游响应缺少 task id 等必要字段 |

视频任务的上游业务错误会保留 HTTP 状态和 `error.code`：

```json
{
  "error": {
    "code": "InvalidParameter",
    "message": "duration is invalid",
    "param": "duration"
  }
}
```

上游即使 HTTP 200，只要 JSON 里 `status >= 400`，也会按该状态码返回。

资产 upload 在供应商 HTTP `>= 400` 时原样透传上游 body，不再包一层 `error`。

### 1.4 资产 Ark 格式

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

| 字段 | 值 |
|---|---|
| `RequestId` | 固定空字符串 |
| `Version` | `2024-01-01` |
| `Service` | `ark` |
| `Region` | `cn-beijing` |
| `Action` | upload=`CreateAsset`，detail=`GetAsset`，list=`ListAssets` |

---

## 2. 接口一览

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/doubao/contents/generations/tasks` | 创建视频生成任务 |
| GET | `/doubao/contents/generations/tasks/{taskId}` | 查询视频生成任务 |
| POST | `/doubao/assets` | 上传 / 创建资产 |
| GET | `/doubao/assets/{assetId}` | 资产详情 |
| GET | `/doubao/assets` | 资产列表 |

---

## 3. 视频生成
### 3.1 创建任务

`POST /doubao/contents/generations/tasks`

#### 请求体

常见字段（均可透传，不限于下表）：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `model` | string | 建议 | 如 `doubao-seedance-2-0-pro` |
| `content` | array | 建议 | 文本 / 图片 / 视频参考 |
| `duration` | number | 否 | 时长（秒） |
| `resolution` | string | 否 | 缺省补 `480p` |
| `ratio` | string | 否 | 画幅，透传 |
| `seed` | number | 否 | 透传 |
| `watermark` | boolean | 否 | 透传 |
| `camerafixed` | boolean | 否 | 透传 |

`content` 元素示例：

```json
[
  { "type": "text", "text": "一只猫在雨中走路" },
  { "type": "image_url", "image_url": { "url": "https://example.com/ref.png" } }
]
```

#### 成功响应 `200`

```json
{
  "id": "task-1",
  "status": "queued",
  "model": "doubao-seedance-2-0"
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 任务 ID |
| `status` | string | 见状态映射 |
| `model` | string | 请求中的 model，或上游返回值 |
| `created_at` | number | Unix 秒，上游有则返回 |
| `updated_at` | number | Unix 秒，上游有则返回 |
| `content` | array | 成功后含视频 URL |
| `usage` | object | 上游有则原样带回 |
| `error` | object | `status=failed` 时可能出现 |

#### curl

```bash
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "model": "doubao-seedance-2-0-pro",
    "content": [{"type": "text", "text": "a cat walking in the rain"}],
    "duration": 5
  }'
```

### 3.2 查询任务

`GET /doubao/contents/generations/tasks/{taskId}`

#### 成功响应 `200`

进行中：

```json
{
  "id": "task-1",
  "status": "running",
  "model": "doubao-seedance-2-0"
}
```

完成：

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

失败时 `status` 为 `failed`，并可能带：

```json
{
  "error": {
    "message": "...",
    "type": "upstream_error"
  }
}
```

#### curl

```bash
curl -sS "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks/${TASK_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```

### 3.3 任务状态

| 对外 status | 上游常见值 |
|---|---|
| `queued` | `PENDING`、`WAITING`、`QUEUED` |
| `running` | `RUNNING`、`PROCESSING`、`IN_PROGRESS` |
| `succeeded` | `SUCCEEDED`、`SUCCESS`、`COMPLETED` |
| `failed` | `FAILED`、`FAILURE`、`ERROR` |
| `cancelled` | `CANCELED`、`CANCELLED`、`CANCELLING` |

未命中映射时，原值转小写后原样返回。创建缺省 `queued`，查询缺省 `running`。

### 3.4 视频接口错误

| HTTP | 说明 |
|---|---|
| 400 / 401 / 429 等 | 上游业务错误，保留 `error.code` |
| 502 | 上游不可达，或响应无法解析为任务 |
| 503 | 未配置创建 / 查询 URL |
| 504 | 上游超时 |

---

## 4. 资产管理
### 4.1 资产对象（Result）

| 字段 | 类型 | 说明 |
|---|---|---|
| `Id` | string | 资产 ID |
| `Name` | string | 名称 |
| `URL` | string | 可访问地址 |
| `AssetType` | string | 如 `Image` |
| `GroupId` | string | 资产组 ID |
| `Status` | string | `Processing` / `Active` / `Failed` |
| `CreateTime` | string | 供应商创建时间 |
| `UpdateTime` | string | 供应商更新时间 |
| `ProjectName` | string | 项目名；空值不输出 |
| `Error` | object | 失败时：`{ "Code", "Message" }` |
| `Moderation` | object | 审核信息，有则返回 |
| `LastInferenceTime` | string | 最近推理时间，有则返回 |

### 4.2 创建资产

`POST /doubao/assets`

#### 请求体

| 字段 | 别名 | 必填 | 说明 |
|---|---|---|---|
| `URL` | `url` | Ark 模式必填 | 源文件地址 |
| `AssetType` | `asset_type`、`assetType` | Ark 模式必填 | 资产类型，缺省按 `Image` 落库 |
| `Name` | `name` | 否 | 名称 |
| `GroupId` | `group_id`、`groupId` | Ark 模式可省略 | 省略时按租户自动建组 |
| `ProjectName` | `project_name`、`projectName` | 否 | Ark 模式缺省用配置 `ASSET_PROJECT_NAME`（默认 `default`） |

#### 成功响应 `200`

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

创建成功只返回 `Id`。详情请再调 GET。

#### curl

```bash
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "URL": "https://example.test/sample.png",
    "AssetType": "Image",
    "Name": "sample"
  }'
```

### 4.3 资产详情

`GET /doubao/assets/{assetId}`

不属于当前租户，或已删除：`404`。  
`Processing` 或 URL 过期时会先向上游刷新再返回。

#### 成功响应 `200`

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

失败资产示例：

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

#### curl

```bash
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets/${ASSET_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```

### 4.4 资产列表

`GET /doubao/assets`

只读本地租户库，不打上游 list。

#### Query

| 参数 | 别名 | 说明 |
|---|---|---|
| `name` | | 名称模糊匹配 |
| `asset_type` | `assetType` | 精确匹配 |
| `group_id` | `groupId` | 精确匹配 |
| `project_name` | `projectName` | 精确匹配 |
| `status` | 可重复 | 状态过滤 |
| `statuses` | | 逗号分隔，如 `Active,Failed` |
| `page_size` | `pageSize`、`max_results` | 每页条数，默认 `10`，范围 1–100 |
| `page_number` | `pageNumber` | 从 1 开始；出现时覆盖 `next_token` |
| `next_token` | `nextToken` | 上一页返回的游标 |

`page_size` / `page_number` 不是整数时：`400`。

#### 成功响应 `200`

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

| 字段 | 说明 |
|---|---|
| `Items` | 当前页资产，元素形状同详情 `Result` |
| `TotalCount` | 过滤后的总数（不含已删除） |
| `PageNumber` | 当前页，从 1 开始 |
| `PageSize` | 本次请求的 page size |
| `NextToken` | 还有下一页时出现，用于 `next_token` |

空列表时 `Items` 为 `[]`，`TotalCount` 为 `0`。

#### curl

```bash
curl -sS -G "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  --data-urlencode "name=sample" \
  --data-urlencode "asset_type=Image" \
  --data-urlencode "status=Active" \
  --data-urlencode "page_size=10" \
  --data-urlencode "page_number=1"
```


### 4.5 资产接口错误

| HTTP | type / 行为 | 说明 |
|---|---|---|
| 400 | `asset_error` | 缺字段、name 非法、分页参数非法 |
| 401 | `asset_error` | 缺少或无效 API Key |
| 404 | `asset_error` | 资产不属于当前租户 |
| 500 | `asset_error` | 落库失败 |
| 501 | `asset_error` | legacy 模式不支持 update / delete |
| 502 | `asset_error` | 供应商失败或响应缺 ID |
| 503 | `asset_error` | 配置错误 |

租户 A 上传的资产，租户 B 查询详情为 `404`，列表为空，不会泄露存在性以外的信息。

---

## 5. 调用示例（完整）

```bash
# 替换为实际 AGIOne 服务地址与端口
BASE_URL="http://<agione-host>:<port>"
BASE_PATH="/hyperone/xapi/api/compatible/v1"
API_KEY="replace-with-upms-access-key"

# 上传资产
curl -sS -X POST "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d '{
    "URL": "https://example.test/portrait.png",
    "AssetType": "Image",
    "Name": "portrait"
  }'

# 资产详情
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets/${ASSET_ID}" \
  -H "Authorization: Bearer ${API_KEY}"

# 资产列表
curl -sS "${BASE_URL}${BASE_PATH}/doubao/assets" \
  -H "Authorization: Bearer ${API_KEY}"

# 创建视频任务
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

# 查询视频任务
curl -sS "${BASE_URL}${BASE_PATH}/doubao/contents/generations/tasks/${TASK_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```
