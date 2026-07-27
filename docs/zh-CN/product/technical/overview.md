# 概述

:::: info 文档信息
版本：v1.0
更新日期：2026-07-13
功能事实基线：2026-07-10 更新的用户手册
::::

## 产品定位

AGIOne 是面向企业级场景的 AI 智算平台，围绕算力统一纳管、多源模型管理、财务运营、平台设置与企业级治理，连接算力准备、模型部署与发布、模型体验与调用、账务结算、访问控制以及用量运营等任务。

平台由 AI Infra On-Prem、AI Infra On-Cloud、Model Services、财务和设置五个产品模块组成：On-Prem 管理本地集群与算力资源，On-Cloud 管理受支持云平台的账号、授权和部署资源，Model Services 管理模型发布、审核、体验、调用与收益，财务管理用户账务、客户财务、结算、对账、收益和 License 状态，设置管理账号、成员、角色、组织、审计日志、登录策略、平台配置和 API 流控。具体能力取决于部署版本、账号角色、授权范围、商业配置和已准备资源。

![AGIOne 总体架构](./images/01-overall-architecture.svg)

## 产品价值

### 1. 算力即插即用

平台可以管理已配置并完成验证的云上资源，以及 NVIDIA、Huawei Ascend、Enflame、Biren、Hygon 等清单内本地加速卡资源。华为昇腾加速卡纳管属于 On-Prem 兼容性范围，不代表支持接入华为云；华为云接入当前暂不支持。实际部署仍需验证芯片、驱动、运行时、镜像、推理引擎和模型组合。

### 2. 多源模型汇聚

平台支持发布单模型、BYOK Endpoint 和聚合模型。模型提供方可以使用符合条件的成员模型创建聚合模型，并按当前版本提供的路由策略配置统一入口；普通用户负责发现、体验和调用已授权模型。具体 API 字段、协议和模型能力以目标模型页面与部署版本为准。

### 3. 企业级治理管控

平台通过租户、角色、资源授权范围、账务范围和设置权限区分管理员、运营方、模型提供方、财务运营、安全管理员与普通用户的职责，并提供配额、额度、审核、调用记录、财务记录、操作日志和 API 流控规则等治理入口。实际可见菜单和数据范围取决于账号权限与当前环境配置。

### 4. 全链路可观测

平台提供集群、节点、设备、作业、部署状态、调用日志、调用分析、用量、计量、账务记录、巡检对账、License 状态、操作日志和 API 流控观测等页面，为结果校验和排障提供依据。具体指标、财务范围、审计范围和同步时效因产品模块、角色与部署版本而异。

## 目标客户与典型场景

::: warning 场景范围说明
下表用于描述目标客户的业务需求，不表示表中每个业务方案都已作为 AGIOne 内置功能交付。RAG 和 Function Calling 当前均为规划中能力；涉及知识库、检索或工具调用的项目，应先完成产品范围确认和方案评估。
:::

| 客户分类 | 客户类型 | 核心诉求 | 典型场景 |
| --- | --- | --- | --- |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">政企客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">数据本地化、私有化部署、合规审计、历史档案治理</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">政务知识库智能问答、政策法规检索、办事材料智能审核、历史档案整理、热线工单归因分析</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">金融客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">高可用、配额管控、操作可追溯、敏感数据保护</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">智能客服、投研资料分析、风险评估辅助、合同与尽调材料审核、历史交易与客户服务记录分析</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">制造客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">产线集成、异构算力调度、知识沉淀、生产数据治理</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">工业质检、设备预测性维护、工艺知识库、生产报表分析、故障记录归因、售后维修知识沉淀</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">能源与交通客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">多源历史数据整合、运行安全、调度决策辅助</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">巡检记录分析、设备运维知识库、调度预案生成、安全事件复盘、历史运行数据总结</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">医疗客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">隐私保护、专业知识沉淀、辅助诊疗合规</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">医学文献检索、病历资料辅助分析、院内制度问答、科研资料总结、质控文档处理</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">行业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">教育与科研客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">教学资源沉淀、科研资料管理、内容合规</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">教学资源知识库、论文与课题资料检索、实验记录总结、学生服务问答</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">企业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">集团型企业客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">跨部门知识共享、权限隔离、统一模型治理</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">企业制度问答、经营分析助手、项目资料归档、内外部知识统一检索、会议纪要与报告自动整理</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">企业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">专业服务客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">文档密集处理、知识复用、交付效率提升</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">法务合同审查、咨询项目资料分析、审计底稿整理、投标文件生成、案例知识库建设</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">企业客户</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">零售与服务客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">客户运营数据沉淀、服务质量提升、门店知识统一</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">客服记录分析、会员运营洞察、商品知识库、门店培训问答、投诉原因归纳</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">安全敏感组织</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">数据安全敏感客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">私有化部署、数据不出域、审计追溯</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">涉密知识库问答、本地文档智能处理、内网模型服务统一纳管、敏感数据访问审计</span> |
| <span style="display:inline-block;width:96px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">安全敏感组织</span> | <span style="display:inline-block;width:128px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">有强监管要求客户</span> | <span style="display:inline-block;width:180px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">合规留痕、权限分级、模型调用可控</span> | <span style="display:inline-block;width:260px;white-space:normal;overflow-wrap:anywhere;word-break:break-word">模型调用审计、合规文档检查、监管报送材料辅助生成、内部风险排查</span> |

**典型场景示例：**

- **企业知识库问答需求**：RAG 当前规划中，可先调研知识来源、权限、切分、检索和评测要求，不按现有内置能力承诺交付
- **多模型统一接入与路由**：模型提供方发布单模型或聚合模型，并使用当前版本可选的路由策略
- **AI 应用监控与运维治理**：结合监控、调用日志、调用分析、配额、计量、财务、操作日志和 API 流控页面完成运行检查
- **模型部署与发布**：按 On-Prem、On-Cloud 或 Model Services 用户手册完成资源准备、部署、发布和审核

## 交付价值

- **降低 AI 平台建设复杂度**：通过统一文档路径连接算力、部署、发布、调用和运营任务，减少重复梳理流程的成本
- **支持从 PoC 到生产的分阶段验证**：使用调研模板、安装预检、操作场景和用户手册逐步确认前提与验收结果
- **统一模型管理与运维入口**：集中查看模型配置、审核、部署状态、调用记录、用量、收益、账务状态、License 状态和审计记录等对象
- **在权限边界内管理资源使用**：通过租户、角色、授权、配额、计量、账务范围和设置权限控制不同账号的可见范围和使用边界

当前需特别确认的产品状态：**华为云接入暂不支持；RAG 和 Function Calling 规划中**。其他能力及项目约束请查看[支持矩阵](../limitations/support-matrix)和[其他限制](../limitations/limitations)。具体操作请从[场景操作指南](../../userguide/scenarios)进入，并结合[用户手册](../../usermanual/)完成。
