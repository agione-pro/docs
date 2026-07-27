---
prev: false
next: true
---

# 购买与激活

::: info 文档信息
版本：v1.0
更新日期：2026-07-15
:::

## 功能概述

本章节用于说明 AGIOne 购买、充值和 License 激活相关流程，覆盖在线支付激活和激活码激活两类操作。

在线支付激活侧重验证支付通道、终端用户 credits 充值和运营方客户充值单核对是否形成闭环；激活码激活侧重通过注册码获取 `Activation Code`，并在 `License 管理` 页面激活 `AI 基础设施授权`。

## 适用场景

- 首次启用 Stripe 或 Alipay 在线充值能力。
- 需要验证终端用户 credits 充值链路。
- License 在线激活不可用，需要使用激活码方式完成授权。
- 授权到期、扩容或重新授权时，需要重新获取激活码。
- 需要核对支付记录、充值到账、授权状态、有效期和授权额度。

## 文档清单

| 文档 | 适用场景 | 核心流程 |
| --- | --- | --- |
| [在线支付激活](./online-payment-activation) | 配置 Stripe 或 Alipay，并验证 enduser credits 充值链路。 | 配置支付通道、测试连接、保存配置、enduser 充值、operator 核对客户充值单。 |
| [激活码激活 License](./activation-code-activation) | 通过注册码获取激活码，并激活 AI 基础设施授权。 | 进入 License 管理、复制注册码、获取 Activation Code、激活 License、核对授权结果。 |

## 阅读建议

1. 需要验证在线充值和客户充值单记录时，阅读 [在线支付激活](./online-payment-activation)。
2. 需要通过注册码完成 License 授权时，阅读 [激活码激活 License](./activation-code-activation)。
3. 如果同时涉及支付和授权，先完成支付通道与充值链路验证，再执行 License 激活和授权结果核对。

::: warning 安全提醒
不要在文档、截图、工单或聊天中写入登录凭据、支付密钥、注册码、激活码或支付凭证。涉及 `保存`、`充值`、`激活` 的操作都会影响配置、账务或授权状态，执行前必须确认当前环境、账号、金额和目标实例。
:::
