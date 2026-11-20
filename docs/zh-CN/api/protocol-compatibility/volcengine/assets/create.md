# 创建素材资产

通过可公开拉取的媒体 URL 录入素材资产。媒体入库预处理为异步进行，录入后需轮询状态直至就绪。

## 接口端点

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/ark_asset/{shortId}?Action=CreateAsset</span>
    <span class="api-auth-pill">🔐 System API AK/SK</span>
  </div>
</div>

| 配置项 | 规范说明 |
| :--- | :--- |
| **请求协议** | `HTTPS`（推荐）/ `HTTP` |
| **路由短 ID** | `shortId` 为管理员提供的 4 位资产服务短 ID（非素材 ID、非组合 ID） |
| **认证方式** | AGIOne System API AK/SK 配合火山兼容 HMAC-SHA256 签名（详见[认证与签名](../authentication)） |

## 请求参数

### 请求头

| 请求头 | 必选 | 说明 |
| --- | --- | --- |
| Authorization | 是 | AGIOne AK/SK 计算的 HMAC-SHA256 签名。 |
| Host | 是 | 实际 API 主机，与签名使用的主机相同。 |
| X-Date | 是 | UTC 时间，格式 YYYYMMDDTHHMMSSZ。 |
| X-Content-Sha256 | 示例必填 | 实际 UTF-8 请求体的 SHA-256 小写十六进制摘要。 |
| Content-Type | POST 必填 | application/json |
| Accept | 建议 | application/json |
| Accept-Language | 否 | zh-CN / en-US |

部署若要求额外的路由请求头，应使用实例管理员提供的名称和值；不能用身份归因头改变用户、租户或项目。

### 查询参数

| 参数 | 必选 | 值 |
| --- | --- | --- |
| Action | 是 | `CreateAsset` |
| Version | 建议显式传入 | `2024-01-01` |

### 请求体

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| GroupId | String | 真人流程必填 | 当前用户拥有的真人组合 ID。 |
| AssetType | String | 本示例必填 | Image、Video 或 Audio。 |
| URL | String | 本示例必填 | 上游能够访问的媒体 URL；本资产上传操作不接收 Base64 或 multipart 文件。 |
| Name | String | 否 | 最多 64 个字符，仅用于管理和搜索。 |

`ProjectName` 可省略；若传入，只能为 `default`（区分大小写）。它指上游资源项目，不是 AGIOne 业务项目。

### 请求体示例

以下为字段结构示例，资源标识与地址需替换为当前调用身份可用的实际值。

```json
{
  "GroupId": "group-example",
  "AssetType": "Image",
  "URL": "https://media.example.com/portrait.jpg",
  "Name": "portrait-example"
}
```

## 响应参数

成功响应读取 `Result`；`ResponseMetadata.RequestId` 可用于追踪。下表只列出对接所需字段，其他字段应忽略。响应格式与平台 API 的 `status/result` 不同。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| Id | String | 新建素材 ID，不代表预处理已完成。 |

### 成功响应结构示例

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

## 调用示例

::: code-group

```json [请求体 JSON（结构示例）]
{
  "GroupId": "<GROUP_ID>",
  "Name": "portrait-sample",
  "AssetType": "Image",
  "URL": "https://media.example.com/portraits/sample.jpg"
}
```

:::

::: tip 签名脚本说明
签名辅助脚本下载及详细参数说明参见[认证与签名辅助脚本](../authentication#签名辅助脚本)。
:::

## 访问范围与异常处理

仅按系统 AK/SK 所属用户与租户访问本人资产；不因持有个人 AK/SK 获得项目资产或其他用户资产权限。同一流程保持同一个 `shortId` 与同一用户。

使用 GetAsset 查询 `Status`，仅在 `Active` 后用于视频生成；`Processing` 时继续等待，`Failed` 时读取 `Error`。媒体格式、大小及模型输入限制以所用模型和官方素材约束为准。

[错误处理与排查](../errors)

## 参考

官方字段参考：[创建素材资产](https://docs.volcengine.com/docs/ark/create-asset-api?lang=zh)。
