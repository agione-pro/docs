---
prev: false
next: true
---

# 项目、Key 与预算配置

本任务用于建立一个具备预算、模型范围和独立调用凭据的项目。

## 适用角色

- 模型提供方、平台用户、服务商管理员

## 开始前准备

- 确认在目标组织内具备项目和 Key 创建权限。
- 明确项目负责人、成员、预算周期、模型范围和超预算策略。
- 确认使用 Model API Key 还是 System API AK/SK。

## 操作流程

### 1. 创建项目

进入[项目](../../../usermanual/settings/user/personal/projects/)，点击创建项目，填写名称、描述、重置周期、周期预算、预警阈值、超预算策略和模型白名单。

![创建项目并设置预算与模型范围](../../../usermanual/settings/user/personal/projects/images/create-project.png)

### 2. 核对项目详情

在项目列表中进入详情，检查概览、成员、用量、API Keys、活动和设置页签，确认项目状态和预算规则已保存。

![项目列表与预算状态](../../../usermanual/settings/user/personal/projects/images/projects-list.png)

### 3. 创建独立用途的 Key

进入[我的 Keys](../../../usermanual/settings/user/personal/my-keys/)，选择 Model API Keys 或 System API AK/SK Pairs，填写名称、用途和过期时间。生产、测试和临时用途应使用不同 Key。

![创建具有明确用途和有效期的 Key](../../../usermanual/settings/user/personal/my-keys/images/create-key.png)

### 4. 设置 Key 限额并验证

根据项目预算设置重置周期、周期限额、预警阈值和触限策略。创建后使用受控请求验证模型白名单、项目预算和 Key 限额是否共同生效。

![设置 Key 的周期限额](../../../usermanual/settings/user/personal/my-keys/images/key-quota.png)

## 完成检查

> **用途：** 以下检查用于确认项目和凭据已经可以受控使用。任一项不满足时，不应把 Key 分发给业务调用方。

| 检查项 | 通过标准 |
| --- | --- |
| 项目规则 | 预算、预警、超预算策略和模型白名单已保存。 |
| Key 边界 | 用途、有效期、限额和责任人清晰。 |
| 调用验证 | 允许模型可调用，禁止模型或超限请求按规则受限。 |
| 审计记录 | 项目和 Key 变更能够在活动或操作日志中定位。 |

## 常见失败分支

| 现象 | 优先检查 |
| --- | --- |
| 项目达到预算后不能调用 | 预算已用、超预算策略和重置周期 |
| Key 调用失败 | Key 状态、过期时间、项目预算、成员额度和模型白名单 |
| 看不到项目或 Key | 账号角色、组织归属和菜单权限 |
| 轮换 Key 后业务失败 | 调用方配置是否已替换、旧 Key 是否过早停用 |
