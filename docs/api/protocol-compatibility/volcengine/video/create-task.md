# Create a Video Generation Task

Submit an asynchronous video generation request, then query its result using the returned task ID.

## Endpoint Overview

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/v3/contents/generations/tasks</span>
    <span class="api-auth-pill">⚡ Model API Key</span>
  </div>
</div>

| Specification | Details |
| :--- | :--- |
| **Protocol** | `HTTPS` (recommended) / `HTTP` |
| **Authentication** | AGIOne Model API Key (`Authorization: Bearer <KEY>`) |
| **Timeout & Retry** | Asynchronous endpoint; HTTP 200 confirms submission only. Do not auto-retry timed-out requests |

## Request parameters

### Headers

| Header | Required | Description |
| --- | --- | --- |
| Authorization | Yes | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | Required for POST | application/json |
| Accept | Recommended | application/json |
| Accept-Language | No | zh-CN / en-US |

If the deployment requires a routing header, use the name and value supplied by its administrator. Attribution headers cannot change the caller’s user, tenant or project.

### Body

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| model | String | Yes | Published AGIOne video model identifier accessible to this Key. |
| content | Object[] | Yes | Input content; see the asset reference below. |
| content[].type | String | By input type | text for text, image_url for images. |
| content[].text | String | Required for text | Prompt. |
| content[].image_url.url | String | Required for images | Use `asset://<ASSET_ID>` for a ready asset. |
| content[].role | String | Model-dependent | Use reference_image for a reference image. |

### Example body

This illustrates the field structure. Replace resource identifiers and URLs with values available to the caller.

```json
{
  "model": "<AGIONE_MODEL_ID>",
  "content": [
    {
      "type": "text",
      "text": "The person in image 1 waves to the camera."
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "asset://asset-example"
      },
      "role": "reference_image"
    }
  ]
}
```

## Response parameters

Successful responses retain the video protocol shape rather than the Platform API `status/result` envelope.

| Field | Type | Description |
| --- | --- | --- |
| id | String | Task identifier; use it unchanged when querying. |

### Example success shape

```json
{
  "id": "video-task-example"
}
```

## Request Examples

::: code-group

```json [Request Body JSON (Structure Only)]
{
  "model": "<AGIONE_MODEL_ID>",
  "content": [
    {
      "type": "text",
      "text": "The person in image 1 waves to the camera."
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "asset://asset-example"
      },
      "role": "reference_image"
    }
  ]
}
```

:::

::: tip Operational Notice
Replace `<AGIONE_HOST>` with your instance gateway, `<AGIONE_MODEL_ID>` with an authorized model identifier, and `<ASSET_ID>` with an active portrait asset ID. See [Authentication and signing](../authentication).
:::

## Access scope and error handling

Use a published AGIOne model identifier and an authorized Model API Key. Model access and quota checks still apply.

Optional video parameters depend on the selected model. This page covers text and asset image references. Upstream additions do not establish support in this instance. An accepted request is not a completed video; do not automatically replay a timed-out submission.

[Error handling and troubleshooting](../errors)

## Reference

Upstream field reference: [Create a video generation task](https://docs.volcengine.com/docs/ark/create-video-generation-task-api?lang=zh).
