# 认证与签名

资产与真人认证使用 AGIOne 签发的 System API AK/SK，按火山兼容规则签名。视频生成与查询使用 AGIOne Model API Key。上游火山账号凭据由平台内部管理，不交给接入方。

运营方租户凭据不允许访问此资产代理入口。控制台登录凭证及 Model API Key 不能替代这里的系统 AK/SK。

## 资产请求头

| 请求头 | 必选 | 说明 |
| --- | --- | --- |
| Authorization | 是 | AGIOne AK/SK 计算的 HMAC-SHA256 签名。 |
| Host | 是 | 实际 API 主机，与签名使用的主机相同。 |
| X-Date | 是 | UTC 时间，格式 YYYYMMDDTHHMMSSZ。 |
| X-Content-Sha256 | 示例必填 | 实际 UTF-8 请求体的 SHA-256 小写十六进制摘要。 |
| Content-Type | POST 必填 | application/json |
| Accept | 建议 | application/json |
| Accept-Language | 否 | zh-CN / en-US |

## 火山兼容签名

签名算法标识为 `HMAC-SHA256`。本例使用 `cn-beijing`、服务名 `ark`，终止段为 `request`。

```text
Authorization: HMAC-SHA256 Credential=<AGIONE_AK>/<YYYYMMDD>/cn-beijing/ark/request, SignedHeaders=content-type;host;x-content-sha256;x-date, Signature=<LOWERCASE_HEX_SIGNATURE>
```

1. 固定最终发送的 UTF-8 JSON 字节，计算 `SHA256(body)`，写入 `X-Content-Sha256`。
2. 将实际方法、规范路径、规范查询串、规范请求头、已签名头名列表和正文摘要按顺序用换行连接。路径包括 `/hyperone` 全部前缀；查询参数包括 `Action`、`Version`。
3. 路径按 UTF-8 解码后编码一次，保留 `/`；查询参数按解码后的名称 UTF-8 顺序排序并进行 RFC 3986 编码，以 `&` 连接。参数名不要重复。
4. 已签名头名小写、排序；本例签入 `content-type;host;x-content-sha256;x-date`。每个规范头为 `name:trimmed-value` 并以换行结尾。默认端口 `:80`、`:443` 不计入规范 Host。
5. 待签名串依次为算法名、UTC 时间、`日期/地域/服务/request`、规范请求的 SHA-256 摘要，以换行连接。
6. 以 SK 字节为初始密钥，依次对日期、地域、服务、`request` 做 HMAC-SHA256；最后对待签名串做 HMAC，输出小写十六进制。

签名后不得改变路径、查询参数、已签名头或 JSON 字节。使用 UTC 当前时间；网关默认允许 300 秒时间偏差，实际以实例配置为准。每次重试重新签名；业务重试还需考虑是否会重复创建。不要与[平台 API 原签名](../../system-api/authentication)的 `x-request-*` 算法混用。

## 签名辅助脚本

[下载 ark-sign.py](/examples/volcengine/ark-sign.py)。需要 Python 3 和支持 `--fail-with-body` 的 curl 7.76.0+。脚本从交互终端隐藏读取凭据，输出供 curl 从标准输入读取的配置；SK 不进入请求头、URL、命令参数或输出配置。

## 视频请求

| 请求头 | 必选 | 说明 |
| --- | --- | --- |
| Authorization | 是 | `Bearer <AGIONE_MODEL_API_KEY>` |
| Content-Type | POST 必填 | application/json |
| Accept | 建议 | application/json |
| Accept-Language | 否 | zh-CN / en-US |

视频使用 `Authorization: Bearer <AGIONE_MODEL_API_KEY>`；无需同时提交 AK/SK 签名。模型标识使用 AGIOne 发布标识。

## 凭据保护

不要将真实 AK/SK、Model API Key、认证 H5 链接或临时媒体签名 URL 写入源码、日志或工单。前端应用应由可信服务端完成签名。部署路由头由实例管理员提供，不承担资产归属授权。
