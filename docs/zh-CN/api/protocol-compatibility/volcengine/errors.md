# 错误处理与排查

按“请求是否到达 → 认证是否通过 → 资产归属是否满足 → 上游处理结果”定位。分别记录 HTTP 状态与响应错误；HTTP 200 不能覆盖素材或任务的失败状态。

## 资产代理错误

| HTTP | 错误码 | 处理 |
| --- | --- | --- |
| 403 | PORTRAIT_ASSET_SOURCE_ACCESS_DENIED | 核对资产服务短 ID、PUBLIC 可用范围及 Platform API 凭据身份。 |
| 403 | PORTRAIT_ASSET_OWNERSHIP_DENIED | 核对同一用户、租户、资产服务及资源归属。 |
| 400 | PORTRAIT_ASSET_ACTION_UNSUPPORTED / PORTRAIT_ASSET_VERSION_UNSUPPORTED | 核对 Action 与版本。 |
| 400 | PORTRAIT_ASSET_REQUEST_INVALID / PORTRAIT_ASSET_PROJECT_NOT_ALLOWED | 发送 JSON 对象；请求体不超过 1 MiB；ProjectName 省略或 default。 |
| 502 | PORTRAIT_ASSET_UPSTREAM_UNAVAILABLE / PORTRAIT_ASSET_RESPONSE_TOO_LARGE | 记录追踪信息并联系实例管理员核对上游连通性及响应限制。 |
| 500 | PORTRAIT_ASSET_OPERATION_FAILED | 记录请求时间和追踪信息后排查。 |

平台资产错误形态为 `error.code`、`error.message`；上游返回的方舟错误可能位于 `ResponseMetadata.Error`。网关认证和路由错误由网关返回，不能假设所有失败都使用同一种 JSON 结构。

## 签名与凭据

核对 AGIOne AK/SK、UTC 当前时间、完整路径、Action/Version、Host、Content-Type 与最终 JSON 字节。不要把火山上游账号 AK/SK、Model API Key 或平台 API 的另一套签名算法用于本专区资产入口。网关默认时间偏差窗口为 300 秒，实际以实例配置为准。

## 异步结果

素材：Processing 时等待，Active 才可使用，Failed 时检查 Error。视频：queued/running 时有界轮询，succeeded 后保存结果，failed/expired 时处理错误。平台任务查询自身也可能返回 HTTP 200 的任务不存在或无权访问结果，应检查响应内的错误及业务状态。

## 重试与排障资料

创建、更新和删除不能因网络超时就自动重放；先核对实际结果。查询重试使用新的签名并采用退避与超时。排障资料只保留请求时间、接口名称、HTTP 状态、错误码和 RequestId；移除真实凭据、BytedToken、H5Link、带签名媒体 URL 与认证请求头。
