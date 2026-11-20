# 查询视频生成任务

查询本次调用身份有权访问的视频任务状态与生成结果。

## 接口端点

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge get">GET</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/v3/contents/generations/tasks/{taskId}</span>
    <span class="api-auth-pill">⚡ Model API Key</span>
  </div>
</div>

| 配置项 | 规范说明 |
| :--- | :--- |
| **请求协议** | `HTTPS`（推荐）/ `HTTP` |
| **认证方式** | AGIOne Model API Key（`Authorization: Bearer <KEY>`） |
| **轮询建议** | 处于 `queued` 或 `running` 时带退避轮询（如 3~5 秒间隔），直到 `succeeded` 或 `failed` |

## 请求参数

### 请求头

| 请求头 | 必选 | 说明 |
| --- | --- | --- |
| Authorization | 是 | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | 否，本接口无请求体 | application/json |
| Accept | 建议 | application/json |
| Accept-Language | 否 | zh-CN / en-US |

部署若要求额外的路由请求头，应使用实例管理员提供的名称和值；不能用身份归因头改变用户、租户或项目。

### 路径参数

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| taskId | String | 是 | 创建任务响应中的 id，放入路径。 |

## 响应参数

成功时保留视频协议响应；不套用平台 API 的 `status/result` 外层结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | String | 任务 ID。 |
| status | String | queued、running、succeeded、failed、expired，或上游支持的其他终态。 |
| content.video_url | String | 成功时的视频地址，及时保存。 |
| error.code / error.message | String | 任务失败时的错误。 |
| created_at / updated_at | Integer | 上游返回时，为 Unix 秒时间戳。 |
| usage | Object | 用量信息，若返回；不是 AGIOne 扣费成功证明。 |

### 成功响应结构示例

```json
{
  "id": "video-task-example",
  "status": "succeeded",
  "content": {
    "video_url": "https://media.example.com/generated-video.mp4"
  }
}
```

## 调用说明

本接口不发送请求体；完整路径、路径参数和请求头见上文。

::: tip 接入指引
替换 `<AGIONE_HOST>` 为实际 Base URL，`<TASK_ID>` 为创建任务时获得的 ID。凭据要求见[认证与签名](../authentication)。
:::

## 访问范围与异常处理

使用 AGIOne 发布模型的标识及有访问权限的 Model API Key；视频请求还需通过平台额度与模型访问检查。

使用创建接口原样返回的任务 ID，不将火山控制台创建的任务 ID 直接拿来查询。平台任务不存在、协议不匹配或无权访问时，可能返回 HTTP 200 的平台任务错误结构；仍需检查错误及业务状态，不能仅判断 HTTP 状态。

[错误处理与排查](../errors)

## 参考

官方字段参考：[查询视频生成任务](https://docs.volcengine.com/docs/ark/get-video-generation-task-api?lang=zh)。
