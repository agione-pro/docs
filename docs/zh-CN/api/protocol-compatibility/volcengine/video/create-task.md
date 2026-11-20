# 创建视频生成任务

提交异步视频生成请求，后续按任务 ID 查询结果。

## 接口端点

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/v3/contents/generations/tasks</span>
    <span class="api-auth-pill">⚡ Model API Key</span>
  </div>
</div>

| 配置项 | 规范说明 |
| :--- | :--- |
| **请求协议** | `HTTPS`（推荐）/ `HTTP` |
| **认证方式** | AGIOne Model API Key（`Authorization: Bearer <KEY>`） |
| **超时与重试** | 异步创建接口；HTTP 200 仅代表请求已受理，创建超时勿自动重试 |

## 请求参数

### 请求头

| 请求头 | 必选 | 说明 |
| --- | --- | --- |
| Authorization | 是 | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | POST 必填 | application/json |
| Accept | 建议 | application/json |
| Accept-Language | 否 | zh-CN / en-US |

部署若要求额外的路由请求头，应使用实例管理员提供的名称和值；不能用身份归因头改变用户、租户或项目。

### 请求体

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| model | String | 是 | AGIOne 已发布且当前 Key 可访问的视频模型标识，不直接照填火山模型 ID。 |
| content | Object[] | 是 | 输入内容列表；素材引用形式见下方。 |
| content[].type | String | 按输入类型 | 文本为 text；图片为 image_url。 |
| content[].text | String | 文本项必填 | 提示词。 |
| content[].image_url.url | String | 图片项必填 | 已就绪素材使用 `asset://<ASSET_ID>`。 |
| content[].role | String | 按模型要求 | 参考图片使用 reference_image。 |

### 请求体示例

以下为字段结构示例，资源标识与地址需替换为当前调用身份可用的实际值。

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

## 响应参数

成功时保留视频协议响应；不套用平台 API 的 `status/result` 外层结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String | 任务标识，原样用于查询。 |

### 成功响应结构示例

```json
{
  "id": "video-task-example"
}
```

## 调用示例

::: code-group

```json [请求体 JSON（结构示例）]
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

::: tip 接入指引
调用时，将 `<AGIONE_HOST>` 替换为实例网关地址，`<AGIONE_MODEL_ID>` 替换为平台已发布且授权的模型 ID，`<ASSET_ID>` 替换为状态为 `Active` 的真人素材 ID。凭据要求详见[认证与签名](../authentication)。
:::

## 访问范围与异常处理

使用 AGIOne 发布模型的标识及有访问权限的 Model API Key；视频请求还需通过平台额度与模型访问检查。

可选视频参数依所选模型而异；本页先覆盖文本和素材图片引用。不要把官网新增参数或模型能力直接视为当前实例已支持。HTTP 受理成功不等于视频生成完成；提交超时后不要自动重放。

[错误处理与排查](../errors)

## 参考

官方字段参考：[创建视频生成任务](https://docs.volcengine.com/docs/ark/create-video-generation-task-api?lang=zh)。
