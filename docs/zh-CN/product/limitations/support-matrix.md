# 支持矩阵

:::: info 文档信息
版本：v1.0
更新日期：2026-07-13
功能事实基线：2026-07-10 更新的用户手册
::::

## 状态定义

| 状态 | 含义 |
| --- | --- |
| **支持** | 当前用户手册或安装指南已有对应能力说明，实际使用仍受账号权限和前提条件限制。 |
| **条件支持** | 是否可用取决于版本、平台配置、交付包、基础设施组合或项目验证。 |
| **规划中** | 已进入产品规划，但当前不能作为生产交付能力。 |
| **暂不支持** | 当前版本不能围绕该能力设计交付方案。 |

本矩阵是产品级状态入口。具体项目以发布说明、实际交付包、运行环境和项目验证结论为准。

## 子系统能力矩阵

| 子系统 | 能力 | 状态 | 主要条件 | 手册入口 |
| --- | --- | --- | --- | --- |
| AI Infra On-Prem | 地域、可用区、集群、节点和加速卡管理 | 支持 | 兼容基础设施已准备并完成授权 | [On-Prem 平台入门](../../usermanual/ai-infra-on-prem/getting-started/) |
| AI Infra On-Prem | 规格、镜像、存储和模板 | 支持 | 所需后端资源和模板已配置 | [On-Prem 用户手册](../../usermanual/ai-infra-on-prem/) |
| AI Infra On-Prem | 开发环境、训练任务和在线推理 | 支持 | 配额、镜像、存储、加速卡和模板满足要求 | [从零部署模型服务](../../usermanual/ai-infra-on-prem/end-to-end/deploy-model-service/) |
| AI Infra On-Prem | 配额、额度、计量、用量和监控 | 支持 | 数据可见范围取决于角色、租户和采集状态 | [On-Prem 用户手册](../../usermanual/ai-infra-on-prem/) |
| AI Infra On-Cloud | 云平台、账号、资源池和授权管理 | 支持 | 仅能使用已配置并完成验证的平台类型 | [On-Cloud 平台入门](../../usermanual/ai-infra-on-cloud/getting-started/) |
| AI Infra On-Cloud | 框架、模型、运行镜像和调度策略 | 支持 | 资产和策略需匹配目标云平台与地域 | [从零部署云上模型服务](../../usermanual/ai-infra-on-cloud/end-to-end/deploy-cloud-model-service/) |
| AI Infra On-Cloud | 快速部署和部署跟踪 | 支持 | 账号、平台、地域、资产、算力方案和授权均可用 | [快速部署](../../usermanual/ai-infra-on-cloud/user/model-services/quick-deployment/) |
| Model Services | 元模型、来源、模板、标签和币种设置 | 支持 | 需要运营方权限和有效基础配置 | [Model Services 平台入门](../../usermanual/model-services/getting-started/) |
| Model Services | 单模型和 BYOK 发布 | 支持 | Endpoint 或部署信息、定价、可见范围和审核要求有效 | [我的模型](../../usermanual/model-services/user/studio/my-models/) |
| Model Services | 聚合模型发布和路由 | 支持 | 由模型提供方使用符合条件的成员模型和可用策略创建 | [从发布到调用模型](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | 模型与应用审核 | 支持 | 由运营方处理，发布状态会影响用户可见性 | [从发布到调用模型](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | 模型发现和 Playground | 支持 | 需要可见、已审核且可用的模型，模态取决于具体模型 | [Model Services 用户手册](../../usermanual/model-services/) |
| Model Services | 模型对应的 API 访问与调用记录 | 支持 | 访问权限、Endpoint、凭据、配额和模型可用 | [从发布到调用模型](../../usermanual/model-services/end-to-end/publish-and-call-model/) |
| Model Services | 用量、客户调用和模型收益 | 支持 | 范围和数据新鲜度取决于角色、计量与同步状态 | [Model Services 用户手册](../../usermanual/model-services/) |
| 财务 | 用户账务、交易流水、充值订单、月度账单和额度治理 | 支持 | 范围取决于账号、组织、账期和同步状态 | [财务用户手册](../../usermanual/billing/) |
| 财务 | 客户财务、运营财务、结算、巡检对账和调账 | 支持 | 需要运营方权限、统一账期和源记录同步 | [财务快速入门](../../usermanual/billing/getting-started/) |
| 财务 | License 额度、有效期、激活状态和模块授权 | 支持 | License 状态取决于交付包、激活状态和已配置额度 | [License](../../usermanual/billing/operator/license/license/) |
| 设置 | 个人 Key、账号信息、项目、成员、角色和组织 | 支持 | 可见范围取决于角色、组织范围和菜单授权 | [设置用户手册](../../usermanual/settings/) |
| 设置 | 平台设置、登录配置、操作日志和审计记录 | 支持 | 高风险变更需要平台或安全管理权限 | [设置快速入门](../../usermanual/settings/getting-started/) |
| 设置 | API 流控规则、观测审计、节点缓存和发布中心 | 支持 | 规则效果取决于发布状态、节点同步和当前流量范围 | [API 流控概览](../../usermanual/settings/operator/api-rate-control/overview/) |

## 云平台与加速卡状态

| 项目 | 状态 | 产品口径 |
| --- | --- | --- |
| 云平台类型和账号管理 | 支持 | AI Infra On-Cloud 可以管理已配置的平台类型、账号、资源池和授权；具体云厂商与接入方式需按环境验证。 |
| 华为云接入 | 暂不支持 | 当前不能将华为云作为 On-Cloud 交付目标。 |
| 清单内 NVIDIA、Huawei Ascend、Enflame、Biren、Hygon 加速卡 | 条件支持 | 清单型号可进入 On-Prem 纳管，完整软件与模型组合仍需验证，详见[纳管芯片](./chips)。 |
| 清单外加速卡 | 条件支持 | 交付承诺前需完成适配评估和 PoC。 |

## 模型能力状态

| 能力 | 状态 | 产品口径 |
| --- | --- | --- |
| 文本模型发现、体验、发布和调用 | 支持 | 实际效果取决于所选模型、Endpoint、配额和推理资源。 |
| 图片、音频和视频 Playground 入口 | 支持 | 对应模态需要配置兼容且对用户可见的模型。 |
| 单模型、BYOK 和聚合模型发布 | 支持 | 应区分模型提供方发布和运营方审核职责。 |
| 调用日志、分析、用量、计量、账务、结算和收益视图 | 支持 | 数据范围和同步状态因角色、模块、账期和源记录而异。 |
| RAG | 规划中 | 当前不能作为生产交付能力。 |
| Function Calling | 规划中 | 当前不能作为生产交付能力。 |

除非在交付版本中另行确认，本矩阵不对具体 API 协议、模型系列、上下文长度、量化方式或性能目标作支持承诺。

## 部署状态

| 部署范围 | 状态 | 来源与边界 |
| --- | --- | --- |
| AGIOne 应用单节点快速安装 | 支持 | 适用于[快速安装指南](../../installation/agione-quick-install)描述的范围，是否适合生产需另行评估。 |
| AGIOne 应用 host-mode 多节点安装 | 支持 | 需满足节点角色、SSH、私网 IP、离线资产、端口和数据安全要求，详见[多节点安装](../../installation/agione-multi-node-install)。 |
| 算力节点 Kubernetes 纳管 | 支持 | 需满足 OS、CPU 架构、Kubernetes、驱动、设备插件、网络和存储要求，详见[算力节点部署需求](../../installation/deployment-requirements-for-managing-compute-nodes)。 |
| 离线交付 | 条件支持 | 必须验证交付包完整性，以及镜像、运行时和校验文件是否齐全。 |

## 承诺前必确认

1. 确认部署的 AGIOne 版本和交付包。
2. 确认目标角色、租户和授权范围。
3. 确认云平台或加速卡兼容性。
4. 确认模型、Endpoint、镜像、驱动、运行环境、配额、存储和网络组合。
5. 确认容量、性能、可用性、恢复目标、计量和验收证据。

## 相关文档

- [功能与能力](../technical/features)
- [纳管芯片](./chips)
- [其他限制](./limitations)
- [安装指南](../../installation/)
- [用户手册](../../usermanual/)
