# 删除素材资产组合

删除自己拥有的素材资产组合。

## 基本信息

| 项目 | 值 |
| --- | --- |
| 请求方法 | POST |
| 完整路径 | `/hyperone/xapi/api/ark_asset/{shortId}` |
| 认证方式 | AGIOne System API AK/SK + HMAC-SHA256 |

`shortId` 为实例管理员提供的四位资产服务短 ID，不是素材 ID、素材组合 ID 或模型 ID。

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
| Action | 是 | `DeleteAssetGroup` |
| Version | 建议显式传入 | `2024-01-01` |

### 请求体

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| Id | String | 是 | 待删除的组合 ID。 |

`ProjectName` 可省略；若传入，只能为 `default`（区分大小写）。它指上游资源项目，不是 AGIOne 业务项目。

### 请求体示例

以下为字段结构示例，资源标识与地址需替换为当前调用身份可用的实际值。

```json
{
  "Id": "group-example"
}
```

## 响应参数

成功响应读取 `Result`；`ResponseMetadata.RequestId` 可用于追踪。下表只列出对接所需字段，其他字段应忽略。响应格式与平台 API 的 `status/result` 不同。

成功时 `Result` 为 `{}`；不要将空对象误判为失败。

### 成功响应结构示例

```json
{
  "ResponseMetadata": {
    "RequestId": "request-example",
    "Action": "DeleteAssetGroup",
    "Version": "2024-01-01"
  },
  "Result": {}
}
```

## 访问范围与异常处理

仅按系统 AK/SK 所属用户与租户访问本人资产；不因持有个人 AK/SK 获得项目资产或其他用户资产权限。同一流程保持同一个 `shortId` 与同一用户。

删除会影响组合内的素材资产，且上游删除不可恢复。先确认素材已不再使用；真人组合还可能受上游授权状态限制。请求超时后先核对实际状态，避免直接重复删除。

[错误处理与排查](../errors)

## 参考

官方字段参考：[删除素材资产组合](https://docs.volcengine.com/docs/ark/delete-asset-group-api?lang=zh)。
