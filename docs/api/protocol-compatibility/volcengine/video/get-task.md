# Get a Video Generation Task

Query a video task accessible to the authenticated caller.

## Endpoint Overview

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge get">GET</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/v3/contents/generations/tasks/{taskId}</span>
    <span class="api-auth-pill">⚡ Model API Key</span>
  </div>
</div>

| Specification | Details |
| :--- | :--- |
| **Protocol** | `HTTPS` (recommended) / `HTTP` |
| **Authentication** | AGIOne Model API Key (`Authorization: Bearer <KEY>`) |
| **Polling Policy** | Poll with backoff (e.g. 3–5 seconds) while status is `queued` or `running` until `succeeded` or `failed` |

## Request parameters

### Headers

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | Optional; no request body | application/json |
| Accept | Recommended | application/json |
| Accept-Language | No | zh-CN / en-US |

If the deployment requires a routing header, use the name and value supplied by its administrator. Attribution headers cannot change the caller’s user, tenant or project.

### Path parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| taskId | String | Yes | The id returned by task creation, inserted into the path. |

## Response parameters

Successful responses retain the video protocol shape rather than the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| id | String | Task ID. |
| status | String | queued, running, succeeded, failed, expired, or another supported upstream terminal state. |
| content.video_url | String | Video URL after success; save the result promptly. |
| error.code / error.message | String | Failure details. |
| created_at / updated_at | Integer | Unix timestamps in seconds when returned upstream. |
| usage | Object | Usage when returned; does not prove successful AGIOne accounting. |

### Example success shape

```json
{
  "id": "video-task-example",
  "status": "succeeded",
  "content": {
    "video_url": "https://media.example.com/generated-video.mp4"
  }
}
```

## Usage Notes

This endpoint has no request body. See the complete path, path parameters and headers above.

::: tip Operational Notice
Replace `<AGIONE_HOST>` with your instance gateway and `<TASK_ID>` with your task ID. See [Authentication and signing](../authentication).
:::

## Access scope and error handling

Use a published AGIOne model identifier and an authorized Model API Key. Model access and quota checks still apply.

Use the exact ID returned by AGIOne task creation, not an ID created separately in the upstream console. A missing task, protocol mismatch or denied owner check can produce a platform task error with HTTP 200. Inspect error and business status as well as HTTP status.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Get a video generation task](https://docs.volcengine.com/docs/ark/get-video-generation-task-api?lang=zh).
