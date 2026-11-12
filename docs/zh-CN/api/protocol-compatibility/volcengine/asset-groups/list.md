# 查询素材资产组合列表

按类型及筛选条件查询当前用户拥有的素材资产组合。

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
| Action | 是 | `ListAssetGroups` |
| Version | 建议显式传入 | `2024-01-01` |

### 请求体

| 参数 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| Filter | Object | 是 | 筛选对象。 |
| Filter.GroupType | String | 是 | AIGC、LivenessFace 或 Public。 |
| Filter.GroupIds | String[] | 否 | 组合 ID 列表。 |
| Filter.Name | String | 否 | 按名称搜索。 |
| NextToken | String | 否 | 下一页凭证，原样使用；与页码分页互斥。 |
| MaxResults | Integer | 否 | 游标分页每页数量，1–100，默认 10。 |
| PageNumber / PageSize | Integer | 否 | 成对使用；PageNumber 从 1 开始，PageSize 为 1–100；不要同时传 NextToken 或 MaxResults。 |
| SortBy | String | 否 | CreateTime 或 UpdateTime。 |
| SortOrder | String | 否 | Desc（默认）或 Asc。 |

`ProjectName` 可省略；若传入，只能为 `default`（区分大小写）。它指上游资源项目，不是 AGIOne 业务项目。

### 请求体示例

以下为字段结构示例，资源标识与地址需替换为当前调用身份可用的实际值。

```json
{
  "Filter": {
    "GroupType": "AIGC"
  },
  "MaxResults": 10
}
```

## 响应参数

成功响应读取 `Result`；`ResponseMetadata.RequestId` 可用于追踪。下表只列出对接所需字段，其他字段应忽略。响应格式与平台 API 的 `status/result` 不同。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| Items | Array | 仅包含当前用户有权访问的本页记录。 |
| NextToken | String | 上游返回的下一页凭证，若存在。 |
| TotalCount | Integer | 若返回，AGIOne 将其改为本页可见数量，不是全部记录总数。 |
| PageNumber / PageSize | Integer | 采用页码分页时的分页信息。 |

### 成功响应结构示例

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

## 访问范围与异常处理

仅按系统 AK/SK 所属用户与租户访问本人资产；不因持有个人 AK/SK 获得项目资产或其他用户资产权限。同一流程保持同一个 `shortId` 与同一用户。

AGIOne 在上游分页之后按本地资产归属过滤。空 `Items` 不一定代表已到最后一页；若存在 `NextToken`，继续使用该凭证翻页。分页凭证不能跨用户、资产服务或接口复用。

[错误处理与排查](../errors)

## 参考

官方字段参考：[查询素材资产组合列表](https://docs.volcengine.com/docs/ark/list-asset-groups-api?lang=zh)。
