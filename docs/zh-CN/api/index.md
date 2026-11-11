# API 参考

本章节面向开发者，按调用凭据和用途组织 AGIOne 接口。

## 系统 API

使用 System API AK/SK 调用本栏目明确列出的 AGIOne 系统与管理接口。详见[系统 API](./system-api/)。

| 文档 | 内容 |
|------|------|
| [系统 API](./system-api/) | 适用范围、凭据类型与可用接口 |
| [认证与签名](./system-api/authentication) | AK/SK 请求头规范、HMAC-SHA256 签名算法与调用示例 |
| [查询当前身份角色](./system-api/endpoints) | 查询当前凭据所有者持有的角色列表 |

## 协议兼容

协议兼容代理服务与集成规范。详见 [协议兼容](./protocol-compatibility/)。

| 协议 / 平台 | 说明 |
|------|------|
| [Doubao（豆包）协议兼容代理 API](./protocol-compatibility/doubao/) | 提供兼容豆包视频生成任务与火山方舟（Ark）形态资产管理接口的代理服务 |

## 模型 API（OpenAPI）

AGIOne 使用 Model API Key 的原生模型调用接口规范。详见[模型 API（OpenAPI）](./openapi/)。

| 文档 | 说明 |
|------|------|
| [模型 API（OpenAPI）](./openapi/) | 认证方式、Base URL 规则、错误码与限流约定 |
