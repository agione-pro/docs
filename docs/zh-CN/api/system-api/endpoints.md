# 查询当前身份角色

该接口用于查询当前发起请求的 System API Key 所属身份实际持有的角色列表。

Operator、Provider 与 End User 三类身份均可使用自身的 System API AK/SK 调用该接口，返回内容取决于 Key 所有者实际持有的角色。本接口为只读接口，不授予或变更任何角色权限。

## 基本信息

| 项目 | 说明 |
| --- | --- |
| 请求方法 | `GET` |
| 完整路径 | `/hyperone/admin/user/roles` |
| 支持协议 | `HTTPS` / `HTTP` |
| 鉴权方式 | System API AK/SK 签名鉴权（详见[认证与签名](./authentication)） |

## 请求参数

### 请求头（Headers）

| 请求头 | 类型 | 必选 | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| `x-request-verify-type` | String | 是 | `HmacSHA256` | 本页示例使用的签名算法 |
| `x-request-access-key` | String | 是 | `ak_live_xxxxxxxxxxxx` | 本人的 System API Access Key (AK) |
| `x-request-timestamp` | String | 是 | `1731312345678` | 当前 Unix 毫秒时间戳 |
| `x-request-sign` | String | 是 | `a1b2c3d4e5f6...` | 用 SK 计算的小写十六进制 HMAC-SHA256 签名 |
| `Accept` | String | 建议 | `application/json` | 指定客户端接收的数据格式 |
| `Content-Type` | String | 建议 | `application/json` | 示例携带此头，但本接口不发送请求体 |

### 查询参数（Query Parameters）

无

### 请求体（Request Body）

无

## 响应参数

### 顶层通用响应结构

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| `status` | Integer | 业务状态码。成功时返回 `200`，失败时返回对应非 200 错误状态码 |
| `message` | String | 错误消息；本接口成功时不设置该值，字段可能省略或为空 |
| `result` | Array of Object | 角色信息列表（详见下方角色对象字段说明） |
| `timestamp` | String | 服务端 Unix 毫秒时间戳，以十进制字符串返回 |
| `requestId` | String | 请求跟踪标识；由运行时上下文提供，可能为空或省略 |

::: tip 业务状态校验
读取 `result` 前必须显式确认响应体中的 `status` 为 `200`；仅有 HTTP 200 不足以判断业务处理成功。`result` 为数组，不应依赖其中的元素顺序。
:::

### 角色对象结构（`result` 元素）

调用方仅应依赖本文列出的字段，解析响应时应忽略其他字段。

| 字段名 | 类型 | 说明 | 示例值 |
| --- | --- | --- | --- |
| `roleId` | String | 角色唯一标识 ID | `"role_example_001"` |
| `roleName` | String | 角色显示名称 | `"System - Member"` |
| `roleDesc` | String | 角色描述信息 | 见下方响应示例 |

## 响应示例

以下示例以普通租户管理员为调用方，展示其持有的一个 `System - Member` 角色。实际角色列表因账号授权而异。角色 ID、时间戳与请求标识为示意值；示例仅包含本文说明的字段，空值字段可能省略。

### 成功响应示例（HTTP 200）

```json
{
  "status": 200,
  "result": [
    {
      "roleId": "role_example_001",
      "roleName": "System - Member",
      "roleDesc": "Built-in ModelOne member role for workspace self-service, project access, API key management, quota requests, and model exploration."
    }
  ],
  "timestamp": "1731312345678",
  "requestId": "req_6731a8f901bc4"
}
```

### 失败响应示例（认证失败）

下例对应当前网关的签名不正确分支，业务 `status` 为 `500`，HTTP 状态应单独读取。错误消息随请求语言变化，下面使用默认英文消息。

```json
{
  "status": 500,
  "message": "The request signature is invalid. Check the signing key and request headers.",
  "result": null,
  "timestamp": "1731312345678",
  "requestId": "req_6731a8f902cd5"
}
```

## 异常排查指引

调用发生异常时，分别记录 HTTP 状态与响应体业务状态，并依据实际错误消息判断原因：

- **签名、签名头或时间戳错误**：当前网关这些分支返回业务 `status: 500`。结合消息检查 SK、必需签名头、待签文本及客户端时间，不要只按状态码判断原因。
- **权限或访问范围错误**：根据实际消息核对调用身份与访问条件；非 200 业务状态不一定代表认证失败。
- **路由或接入错误**：核对实例 API Base URL 和包含 `/hyperone` 的完整路径。此类错误可能由网关或代理返回，不能假定其 HTTP 状态与业务状态相同，也不能假定响应一定是上述 JSON 结构。

遇无法定位的异常时，请记录请求时间、HTTP 状态及响应中可取得的 `requestId`、`timestamp`，联系部署管理员协同排查。不要附上真实 AK/SK 或签名请求头。
