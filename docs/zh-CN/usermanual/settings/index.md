# 设置模块总览

设置模块覆盖账号、成员与角色、租户、通知、系统配置和 API 流控。运营管理员与用户看到的菜单和页面范围不同，进入具体页面前先确认当前角色。

## 适用角色

| 角色 | 可见范围 |
| --- | --- |
| 运营管理员 | 个人、成员与角色、租户&设置、消息与日志、系统配置、API 流控 |
| 模型提供方&用户 | 个人、成员与角色、租户&设置、消息与日志 |

## 运营管理员页面

| 分组 | 页面 |
| --- | --- |
| 个人 | [我的 Keys](./operator/personal/my-keys/)、[账号信息](./operator/personal/profile/) |
| 成员与角色 | [成员](./operator/members-roles/members/)、[角色](./operator/members-roles/roles/) |
| 租户&设置 | [租户](./operator/tenants/tenants/)、[租户设置](./operator/tenants/tenant-settings/) |
| 消息与日志 | [操作日志](./operator/activity-notifications/operation-logs/)、[通知偏好](./operator/activity-notifications/notification-settings/)、[联系人](./operator/activity-notifications/contacts/)、[我的通知](./operator/activity-notifications/inbox/) |
| 系统配置 | [平台设置](./operator/system-settings/platform-settings/)、[登录配置](./operator/system-settings/login-properties/)、[通知审计](./operator/system-settings/notification-center/)、[通知治理](./operator/system-settings/notification-config/) |
| API 流控 | [Overview](./operator/api-rate-control/overview/)、[规则管理](./operator/api-rate-control/rule-management/)、[观测审计](./operator/api-rate-control/observability-audit/)、[节点缓存](./operator/api-rate-control/node-cache/)、[发布中心](./operator/api-rate-control/publish-center/) |

## 用户页面

| 分组 | 页面 |
| --- | --- |
| 个人 | [概览](./user/personal/dashboard/)、[我的额度](./user/personal/my-quota/)、[项目](./user/personal/projects/)、[我的 Keys](./user/personal/my-keys/)、[账号信息](./user/personal/profile/) |
| 成员与角色 | [成员](./user/members-roles/team-members/)、[角色](./user/members-roles/roles/)、[成员额度](./user/members-roles/member-quotas/)、[额度审批](./user/members-roles/quota-requests/) |
| 租户&设置 | [用量审计](./user/organizations/usage-log/)、[租户设置](./user/organizations/org-settings/) |
| 消息与日志 | [操作日志](./user/activity-notifications/operation-logs/) |

## 常见任务

| 目标 | 建议入口 |
| --- | --- |
| 修改个人资料或密码 | [账号信息](./user/personal/profile/) |
| 创建或管理调用凭据 | [我的 Keys](./user/personal/my-keys/) |
| 查看个人额度或申请额度 | [我的额度](./user/personal/my-quota/) |
| 管理成员和角色 | [成员](./user/members-roles/team-members/)、[角色](./user/members-roles/roles/) |
| 查看或配置通知 | [通知偏好](./operator/activity-notifications/notification-settings/)、[通知治理](./operator/system-settings/notification-config/) |
| 排查操作记录 | [操作日志](./operator/activity-notifications/operation-logs/)、[通知审计](./operator/system-settings/notification-center/) |
| 配置 API 流控 | [规则管理](./operator/api-rate-control/rule-management/)、[发布中心](./operator/api-rate-control/publish-center/) |

## 命名说明

侧边栏和导航路径使用菜单名，页面 H1 使用当前页面标题；两者不一致时，在页面说明首句注明。

| 菜单名 | 页面标题 |
| --- | --- |
| 平台设置 | 平台配置 |
| Overview | Global API Rate Control |

额度审批页面可能通过“申请额度”快捷入口进入；快捷入口是动作名，左侧菜单和页面标题使用“额度审批”。

## 术语与显示约定

| 场景 | 约定 |
| --- | --- |
| 界面英文原词 | `Overview`、`Model API Keys`、`System API AK/SK Pairs`、`STOP`、`UNPUBLISHED`、`PENDING`、`Credits` 等按界面原文保留，首次出现时用中文说明 |
| 状态词 | 文档统一使用“启用 / 停用”；界面若显示 `Active`、`Enabled`，指同一状态 |
| 日期 | 文档示例统一使用 `YYYY-MM-DD`；界面可能显示 `YYYY/MM/DD` 或 ISO 时间，均按本地时区理解 |
| 额度 | `Credits` 与“额度”按页面语境使用，不互相替换字段名 |

## 维护信息

| 项目 | 内容 |
| --- | --- |
| 最后更新 | 2026-10-30 |
| 覆盖范围 | 31 页/语言，含 operator 19 页、user 12 页 |
| 不在本版本范围 | 在线支付渠道（Stripe / Alipay）配置；当前环境未启用在线支付 |
| 维护方式 | 发版前按受影响页面核对界面、章节、配图和双语一致性 |

## 使用建议

1. 先确认当前角色，再按左侧菜单进入对应分组。
2. 涉及权限、通知范围、额度或 API 流控的变更，先确认影响范围。
3. 页面标题与菜单名不一致时，以当前界面和本页“命名说明”为准。
4. 需要核对历史变更时，结合操作日志、通知审计和对应配置页。
