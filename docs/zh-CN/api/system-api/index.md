# 系统 API

系统 API 面向需要使用 **System API AK/SK** 调用本栏目明确列出的 AGIOne 接口的开发者。模型推理调用使用 **Model API Key**，详见[模型 API（OpenAPI）](../openapi/)。两类凭据具有不同的适用场景与鉴权机制，不能混用。

::: info 凭据隔离说明
- **System API AK/SK**：面向系统管理与查询类接口，采用对称密钥计算 HMAC-SHA256 签名进行鉴权。
- **Model API Key**：面向原生大模型推理接口，采用标准 HTTP `Authorization: Bearer <key>` 请求头鉴权。
:::

## 可用接口

当前系统 API 开放以下只读查询接口：

| 接口名称 | 请求方法 | 完整路径 | 返回内容 |
| --- | --- | --- | --- |
| [查询当前身份角色](./endpoints) | `GET` | `/hyperone/admin/user/roles` | 当前凭据所属身份实际持有的角色列表 |

Operator、Provider 与 End User 三类身份均可使用自身的 System API AK/SK 调用该接口，返回内容取决于 Key 所有者实际持有的角色。调用成功不代表该身份可以访问其他管理接口。

## 开始调用

1. **创建凭据**：在控制台“我的 Keys”中选择“System API AK/SK Pairs”，为调用身份创建 Key。Operator 视角仅展示此类凭据；Provider 与 End User 视角还展示 Model API Keys。分别参见[运营方手册](../../usermanual/settings/operator/personal/my-keys/)和[用户手册](../../usermanual/settings/user/personal/my-keys/)。请在创建成功弹窗中妥善保存返回的 SK（Secret Key），后续凭据列表将不再明文展示。
2. **获取接入地址**：从实例管理员处取得该 AGIOne 实例的 API Base URL，包含 `https://` 等协议部分，不包含 `/hyperone` 根路径；各接口的完整路径已包含该根路径。
3. **完成签名并请求**：按照[认证与签名](./authentication)规范计算 HMAC-SHA256 签名并发送请求，完整请求格式与响应字段参见[查询当前身份角色](./endpoints)。
