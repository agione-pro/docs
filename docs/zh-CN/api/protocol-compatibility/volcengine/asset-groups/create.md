# 创建素材资产组合

创建用于虚拟人像素材的 AIGC 素材资产组合。

## 接口端点

<div class="api-endpoint-card">
  <div class="api-endpoint-header">
    <span class="api-method-badge post">POST</span>
    <span class="api-endpoint-url">/hyperone/xapi/api/ark_asset/{shortId}?Action=CreateAssetGroup</span>
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
| Action | 是 | `CreateAssetGroup` |
| Version | 建议显式传入 | `2024-01-01` |

### 请求体

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| Name | String | 是 | 名称，最多 64 个字符。 |
| Description | String | 否 | 描述，最多 300 个字符。 |
| GroupType | String | 否 | 本操作当前只支持 AIGC。 |

`ProjectName` 可省略；若传入，只能为 `default`（区分大小写）。它指上游资源项目，不是 AGIOne 业务项目。

### 请求体示例

以下为字段结构示例，资源标识与地址需替换为当前调用身份可用的实际值。

```json
{
  "Name": "documentation-example",
  "GroupType": "AIGC",
  "Description": "Integration example"
}
```

## 响应参数

成功响应读取 `Result`；`ResponseMetadata.RequestId` 可用于追踪。下表只列出对接所需字段，其他字段应忽略。响应格式与平台 API 的 `status/result` 不同。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| Id | String | 新建组合 ID。 |

### 成功响应结构示例

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "CreateAssetGroup",
    "Version": "2024-01-01"
  },
  "Result": {
    "Id": "group-example"
  }
}
```

## 调用示例

::: code-group

```json [请求体 JSON（结构示例）]
{
  "Name": "documentation-example",
  "GroupType": "AIGC",
  "Description": "Integration example"
}
```

:::

::: tip 签名脚本说明
签名辅助脚本下载及详细参数说明参见[认证与签名辅助脚本](../authentication#签名辅助脚本)。
:::

## 访问范围与异常处理

仅按系统 AK/SK 所属用户与租户访问本人资产；不因持有个人 AK/SK 获得项目资产或其他用户资产权限。同一流程保持同一个 `shortId` 与同一用户。

真人素材组合须通过“拉起真人认证 H5 → 获取真人 Asset Group ID”创建；不能用本操作替代真人认证。

[错误处理与排查](../errors)

## 参考

官方字段参考：[创建素材资产组合](https://docs.volcengine.com/docs/ark/create-asset-group-api?lang=zh)。
