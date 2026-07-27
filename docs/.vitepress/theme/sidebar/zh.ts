import type { DefaultTheme } from 'vitepress'

export const zhSidebar: DefaultTheme.Sidebar = {
  '/zh-CN/product/': [
    {
      text: '产品概述',
      collapsed: false,
      items: [
        { text: '产品概览', link: '/zh-CN/product/' },
        { text: '技术总览', link: '/zh-CN/product/technical/overview' },
        { text: '功能与能力', link: '/zh-CN/product/technical/features' },
        { text: '网络规划', link: '/zh-CN/product/technical/network' },
        { text: '技术亮点', link: '/zh-CN/product/technical/tech-highlights' },
      ],
    },
    {
      text: '账号与权限模型',
      collapsed: false,
      items: [
        { text: '用户、组织与角色设计逻辑', link: '/zh-CN/product/identity-access-model' },
        { text: '角色对比总览', link: '/zh-CN/product/role-comparison' },
      ],
    },
    {
      text: '兼容性与限制',
      collapsed: false,
      items: [
        { text: '纳管芯片', link: '/zh-CN/product/limitations/chips' },
        { text: '支持矩阵', link: '/zh-CN/product/limitations/support-matrix' },
        { text: '其他限制', link: '/zh-CN/product/limitations/limitations' },
      ],
    },
    {
      text: '售前调研',
      collapsed: false,
      items: [
        { text: '需求快速调研', link: '/zh-CN/product/investigation/quick-requirement-investigation' },
        { text: '环境快速调研', link: '/zh-CN/product/investigation/quick-env-investigation' },
      ],
    },
  ],
  '/zh-CN/installation/': [
    {
      text: '安装部署',
      collapsed: false,
      items: [
        { text: '部署综述', link: '/zh-CN/installation/agione-deployment-requirements' },
        { text: '安装前环境预检', link: '/zh-CN/installation/agione-precheck-environment-check' },
        { text: '环境安装部署指南', link: '/zh-CN/installation/agione-quick-install' },
        { text: '多节点环境安装部署', link: '/zh-CN/installation/agione-multi-node-install' },
        { text: '安装配置文件字段说明', link: '/zh-CN/installation/agione-install-config-reference' },
        { text: '节点纳管-部署配置要求', link: '/zh-CN/installation/deployment-requirements-for-managing-compute-nodes' },
        { text: '节点纳管-快速安装指南', link: '/zh-CN/installation/quick-install-for-managing-compute-nodes' },
      ],
    },
  ],

  '/zh-CN/license/': [
    {
      text: '购买与激活',
      collapsed: false,
      items: [
        { text: '在线支付激活', link: '/zh-CN/license/online-payment-activation' },
        { text: 'License激活', link: '/zh-CN/license/activation-code-activation' },
      ],
    },
  ],

  '/zh-CN/userguide/': [
    {
      text: '用户指南',
      collapsed: false,
      items: [
        { text: '场景导航', link: '/zh-CN/userguide/scenarios' },
        {
          text: '场景操作指南',
          collapsed: false,
          items: [
            {
              text: '注册 & 登录',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/register-login/' },
                { text: '注册、登录与找回密码', link: '/zh-CN/userguide/scenarios/register-login/account-access' },
              ],
            },
            {
              text: '身份授权',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/identity-authorization/' },
                { text: '身份授权操作流程', link: '/zh-CN/userguide/scenarios/identity-authorization/authorization-workflow' },
              ],
            },
            {
              text: '发布模型',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/publish-model/' },
                { text: '发布公有模型', link: '/zh-CN/userguide/scenarios/publish-model/provider-quick-guide' },
                { text: '发布文本 / 对话模型', link: '/zh-CN/userguide/scenarios/publish-model/Text/' },
                { text: '发布多模态（对话）模型', link: '/zh-CN/userguide/scenarios/publish-model/Multimodal/' },
                { text: '发布嵌入模型', link: '/zh-CN/userguide/scenarios/publish-model/Embedding/' },
                { text: '发布图片模型', link: '/zh-CN/userguide/scenarios/publish-model/Image/' },
                { text: '发布语音模型', link: '/zh-CN/userguide/scenarios/publish-model/Speech/' },
                { text: '发布视频模型', link: '/zh-CN/userguide/scenarios/publish-model/Video/' },
              ],
            },
            {
              text: '发布模型（预设置）',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/publish-model-preconfiguration/' },
                { text: '模型发布：预配置说明', link: '/zh-CN/userguide/scenarios/publish-model-preconfiguration/model-publishing-preconfiguration' },
                { text: '元模型', link: '/zh-CN/userguide/scenarios/publish-model-preconfiguration/Meta-models/' },
                { text: '模型来源', link: '/zh-CN/userguide/scenarios/publish-model-preconfiguration/Model-Source/' },
                { text: '模型模板', link: '/zh-CN/userguide/scenarios/publish-model-preconfiguration/Model-Templates/' },
              ],
            },
            {
              text: '发布聚合模型',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/publish-aggregation-model/' },
                { text: '添加聚合模型', link: '/zh-CN/userguide/scenarios/publish-aggregation-model/create-aggregation-model' },
              ],
            },
            {
              text: '模型的体验与调用',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/model-experience-api-calling/' },
                { text: '用户快速指引', link: '/zh-CN/userguide/scenarios/model-experience-api-calling/user-quick-guide' },
              ],
            },
            {
              text: '模型的消费与收益',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/model-usage-revenue/' },
                { text: '消费与收益核对流程', link: '/zh-CN/userguide/scenarios/model-usage-revenue/usage-revenue-workflow' },
              ],
            },
            {
              text: '充值 & 计费',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/recharge-billing/' },
                { text: '充值与计费核对流程', link: '/zh-CN/userguide/scenarios/recharge-billing/billing-workflow' },
              ],
            },
            {
              text: '本地算力纳管',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-compute-onboarding/' },
                { text: '维护加速卡型号', link: '/zh-CN/userguide/scenarios/on-prem-compute-onboarding/accelerator-management/' },
                { text: '接入集群并核对设备', link: '/zh-CN/userguide/scenarios/on-prem-compute-onboarding/cluster-onboarding/' },
                { text: '规格指标与资源规格', link: '/zh-CN/userguide/scenarios/on-prem-compute-onboarding/resource-specifications/' },
              ],
            },
            {
              text: '本地推理模板构建',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-inference-template/' },
                { text: '构建 NPU 推理模板', link: '/zh-CN/userguide/scenarios/on-prem-inference-template/build-inference-template/' },
              ],
            },
            {
              text: '本地模型部署与状态检查',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-model-deployment-status/' },
                { text: '部署模型并检查状态', link: '/zh-CN/userguide/scenarios/on-prem-model-deployment-status/deploy-and-check/' },
              ],
            },
            {
              text: '本地开发训练与资产沉淀',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-dev-training-assets/' },
                { text: '开发训练与资产流程', link: '/zh-CN/userguide/scenarios/on-prem-dev-training-assets/development-training-workflow' },
              ],
            },
            {
              text: '本地资源计量与监控',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-resource-metering-monitoring/' },
                { text: '配置租户 NPU 配额', link: '/zh-CN/userguide/scenarios/on-prem-resource-metering-monitoring/tenant-quotas/' },
                { text: '监控设备、节点与作业', link: '/zh-CN/userguide/scenarios/on-prem-resource-metering-monitoring/resource-monitoring/' },
                { text: '核对月度计量与明细', link: '/zh-CN/userguide/scenarios/on-prem-resource-metering-monitoring/metering-reconciliation/' },
              ],
            },
            {
              text: '多云资源接入',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/' },
                { text: '快速接入与接入总览', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/quick-access-overview/' },
                { text: '接入云平台', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/Access-CloudType/' },
                { text: '接入账号', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/Cloud-Accounts/' },
                { text: '接入资源池', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/Resource-Pools/' },
                { text: '业务地域授权', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/Business-Region-Auth/' },
                { text: '租户云授权', link: '/zh-CN/userguide/scenarios/on-cloud-resource-access/Tenant-Cloud-Auth/' },
              ],
            },
            {
              text: '多云模型资产上架',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-cloud-model-asset-publishing/' },
                { text: '运行镜像', link: '/zh-CN/userguide/scenarios/on-cloud-model-asset-publishing/Runtime-Images/' },
                { text: '推理框架', link: '/zh-CN/userguide/scenarios/on-cloud-model-asset-publishing/Frameworks/' },
                { text: '模型库', link: '/zh-CN/userguide/scenarios/on-cloud-model-asset-publishing/Models/' },
              ],
            },
            {
              text: '多云模型部署与调用',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-cloud-model-deployment-calling/' },
                { text: '接入账号', link: '/zh-CN/userguide/scenarios/on-cloud-model-deployment-calling/Access-Accounts/' },
                { text: '快速部署', link: '/zh-CN/userguide/scenarios/on-cloud-model-deployment-calling/Quick-Deployment/' },
                { text: '我的部署', link: '/zh-CN/userguide/scenarios/on-cloud-model-deployment-calling/My-Deployments/' },
              ],
            },
            {
              text: '模型发布审批',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/model-publishing-approval/' },
                { text: '模型审核操作流程', link: '/zh-CN/userguide/scenarios/model-publishing-approval/review-workflow' },
              ],
            },
            {
              text: '可观测与问题排查',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/observability-troubleshooting/' },
                { text: '问题排查流程', link: '/zh-CN/userguide/scenarios/observability-troubleshooting/troubleshooting-workflow' },
              ],
            },
            {
              text: '平台治理与访问控制',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/platform-governance-access-control/' },
                { text: '平台治理检查流程', link: '/zh-CN/userguide/scenarios/platform-governance-access-control/governance-workflow' },
              ],
            },
            {
              text: '运营账期对账与结算',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/billing-cycle-reconciliation-settlement/' },
                { text: '账期对账与结算流程', link: '/zh-CN/userguide/scenarios/billing-cycle-reconciliation-settlement/reconciliation-settlement-workflow' },
              ],
            },
            {
              text: '服务商收益与结算',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/provider-revenue-settlement/' },
                { text: '收益与结算核对流程', link: '/zh-CN/userguide/scenarios/provider-revenue-settlement/revenue-settlement-workflow' },
              ],
            },
            {
              text: '项目、Key 与预算治理',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/project-key-budget-governance/' },
                { text: '项目与 Key 配置流程', link: '/zh-CN/userguide/scenarios/project-key-budget-governance/project-key-workflow' },
              ],
            },
            {
              text: '成员额度申请与分配',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/member-quota-application-allocation/' },
                { text: '成员额度申请与分配流程', link: '/zh-CN/userguide/scenarios/member-quota-application-allocation/quota-workflow' },
              ],
            },
            {
              text: '应用发布与审核',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/application-publishing-approval/' },
                { text: '应用发布与审核流程', link: '/zh-CN/userguide/scenarios/application-publishing-approval/application-review-workflow' },
              ],
            },
            {
              text: '本地运行镜像与存储底座',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-prem-runtime-storage-foundation/' },
                { text: '运行镜像与存储配置流程', link: '/zh-CN/userguide/scenarios/on-prem-runtime-storage-foundation/runtime-storage-workflow' },
              ],
            },
            {
              text: 'API 流控发布与审计',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/api-rate-control-release-audit/' },
                { text: '流控发布与审计流程', link: '/zh-CN/userguide/scenarios/api-rate-control-release-audit/rate-control-workflow' },
              ],
            },
            {
              text: '多云调度策略',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/on-cloud-scheduling-policy/' },
                { text: '调度策略配置与验证', link: '/zh-CN/userguide/scenarios/on-cloud-scheduling-policy/scheduling-policy-workflow' },
              ],
            },
            {
              text: 'License 生命周期管理',
              collapsed: true,
              items: [
                { text: '场景概览', link: '/zh-CN/userguide/scenarios/license-lifecycle-management/' },
                { text: 'License 生命周期检查流程', link: '/zh-CN/userguide/scenarios/license-lifecycle-management/license-lifecycle-workflow' },
              ],
            },
          ],
        },
      ],
    },
  ],

  '/zh-CN/usermanual/': [
    {
      text: '用户手册',
      collapsed: false,
      items: [
        { text: '手册总览', link: '/zh-CN/usermanual/' },
        {
          text: '模型及AI服务',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh-CN/usermanual/model-services/' },
            { text: '快速入门', link: '/zh-CN/usermanual/model-services/getting-started/' },
            { text: '从发布到调用模型', link: '/zh-CN/usermanual/model-services/end-to-end/publish-and-call-model/' },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '设置',
                  collapsed: false,
                  items: [
                    { text: '元模型', link: '/zh-CN/usermanual/model-services/operator/settings/meta-models/' },
                    { text: '模型来源', link: '/zh-CN/usermanual/model-services/operator/settings/model-source/' },
                    { text: '模板', link: '/zh-CN/usermanual/model-services/operator/settings/model-templates/' },
                    { text: '标签', link: '/zh-CN/usermanual/model-services/operator/settings/tags/' },
                  ]
                },
                {
                  text: '发布',
                  collapsed: false,
                  items: [
                    { text: '应用列表', link: '/zh-CN/usermanual/model-services/operator/publishing/apps/' },
                  ]
                },
                {
                  text: '审批',
                  collapsed: false,
                  items: [
                    { text: '模型审核', link: '/zh-CN/usermanual/model-services/operator/approvals/model-reviews/' },
                    { text: '应用审核', link: '/zh-CN/usermanual/model-services/operator/approvals/app-reviews/' },
                  ]
                },
              ]
            },
            {
              text: '模型提供方&用户',
              collapsed: false,
              items: [
                {
                  text: '发现',
                  collapsed: false,
                  items: [
                    { text: '模型市场', link: '/zh-CN/usermanual/model-services/user/discover/models/' },
                  ]
                },
                {
                  text: '体验中心',
                  collapsed: false,
                  items: [
                    { text: '文本对话', link: '/zh-CN/usermanual/model-services/user/playground/text/' },
                    { text: '图像生成', link: '/zh-CN/usermanual/model-services/user/playground/images/' },
                    { text: '视频生成', link: '/zh-CN/usermanual/model-services/user/playground/video/' },
                    { text: '语音生成', link: '/zh-CN/usermanual/model-services/user/playground/audio/' },
                  ]
                },
                {
                  text: '创作空间',
                  collapsed: false,
                  items: [
                    { text: '我的模型', link: '/zh-CN/usermanual/model-services/user/studio/my-models/' },
                    { text: '我的部署', link: '/zh-CN/usermanual/model-services/user/studio/my-deployments/' },
                  ]
                },
                {
                  text: '用量与收益',
                  collapsed: false,
                  items: [
                    { text: '模型收益', link: '/zh-CN/usermanual/model-services/user/usage-earnings/model-earnings/' },
                    { text: '用量明细', link: '/zh-CN/usermanual/model-services/user/usage-earnings/model-usage/' },
                  ]
                },
                {
                  text: '我的调用',
                  collapsed: false,
                  items: [
                    { text: '概览', link: '/zh-CN/usermanual/model-services/user/my-calls/overview/' },
                    { text: '调用统计', link: '/zh-CN/usermanual/model-services/user/my-calls/call-analytics/' },
                    { text: '调用日志', link: '/zh-CN/usermanual/model-services/user/my-calls/call-logs/' },
                  ]
                },
                {
                  text: '客户调用',
                  collapsed: false,
                  items: [
                    { text: '概览', link: '/zh-CN/usermanual/model-services/user/customer-calls/overview/' },
                    { text: '调用统计', link: '/zh-CN/usermanual/model-services/user/customer-calls/call-analytics/' },
                    { text: '调用日志', link: '/zh-CN/usermanual/model-services/user/customer-calls/call-logs/' },
                  ]
                },
              ]
            },
          ]
        },
        {
          text: '多云调度平台',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh-CN/usermanual/ai-infra-on-cloud/' },
            { text: '快速入门', link: '/zh-CN/usermanual/ai-infra-on-cloud/getting-started/' },
            { text: '从零开始部署云上模型服务', link: '/zh-CN/usermanual/ai-infra-on-cloud/end-to-end/deploy-cloud-model-service/' },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '接入工作台',
                  collapsed: false,
                  items: [
                    { text: '接入总览', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/access-workbench/access-overview/' },
                    { text: '快速接入', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/access-workbench/quick-start/' },
                  ]
                },
                {
                  text: '接入管理',
                  collapsed: false,
                  items: [
                    { text: '接入云平台', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/access-management/cloud-platforms/' },
                    { text: '接入资源池', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/access-management/resource-pools/' },
                    { text: '接入账号', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/access-management/cloud-accounts/' },
                  ]
                },
                {
                  text: '授权管理',
                  collapsed: false,
                  items: [
                    { text: '租户-云平台授权', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/auth-management/tenant-cloud-auth/' },
                    { text: '业务-资源池授权', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/auth-management/business-region-auth/' },
                  ]
                },
                {
                  text: '部署资产',
                  collapsed: false,
                  items: [
                    { text: '模型库', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/deploy-assets/models/' },
                    { text: '推理框架', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/deploy-assets/frameworks/' },
                    { text: '推理镜像', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/deploy-assets/runtime-images/' },
                  ]
                },
                {
                  text: '调度治理',
                  collapsed: false,
                  items: [
                    { text: '策略管理', link: '/zh-CN/usermanual/ai-infra-on-cloud/operator/scheduling-governance/policies/' },
                  ]
                },
              ]
            },
            {
              text: '用户',
              collapsed: false,
              items: [
                {
                  text: '模型服务',
                  collapsed: false,
                  items: [
                    { text: '快速部署', link: '/zh-CN/usermanual/ai-infra-on-cloud/user/model-services/quick-deployment/' },
                    { text: '我的部署', link: '/zh-CN/usermanual/ai-infra-on-cloud/user/model-services/my-deployments/' },
                  ]
                },
                {
                  text: '接入管理',
                  collapsed: false,
                  items: [
                    { text: '接入管理', link: '/zh-CN/usermanual/ai-infra-on-cloud/user/access-management/access-accounts/' },
                  ]
                },
              ]
            },
          ]
        },
        {
          text: '异构卡纳管',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh-CN/usermanual/ai-infra-on-prem/' },
            { text: '快速入门', link: '/zh-CN/usermanual/ai-infra-on-prem/getting-started/' },
            { text: '从零开始部署模型服务', link: '/zh-CN/usermanual/ai-infra-on-prem/end-to-end/deploy-model-service/' },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '资源池',
                  collapsed: false,
                  items: [
                    { text: '地域/可用区', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/regions-zones/' },
                    { text: '集群管理', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/clusters/' },
                    { text: '加速卡管理', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/accelerators/' },
                    { text: '规格指标', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/spec-metrics/' },
                    { text: '资源规格', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/resource-specs/' },
                    { text: '镜像管理', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/images/' },
                    { text: '镜像组件', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/image-services/' },
                    { text: '对象存储组件', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/object-storage/' },
                    { text: '块存储组件', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/block-storage/' },
                    { text: '文件存储组件', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/resource-pools/file-storage/' },
                  ],
                },
                {
                  text: '模板',
                  collapsed: false,
                  items: [
                    { text: '模型配置', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/templates/models/' },
                    { text: '框架配置', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/templates/frames/' },
                    { text: '推理模板', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/templates/inference-templates/' },
                    { text: '显存计算', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/templates/vram-config/' },
                  ],
                },
                {
                  text: '配额&计量',
                  collapsed: false,
                  items: [
                    { text: '用量限制', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/quotas-metering/usage-limits/' },
                    { text: '月度计量', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/quotas-metering/monthly-usage/' },
                    { text: '计量明细', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/quotas-metering/metering-details/' },
                  ],
                },
                {
                  text: '监控',
                  collapsed: false,
                  items: [
                    { text: '统计概览', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/monitoring/overview/' },
                    { text: '集群统计', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/monitoring/clusters/' },
                    { text: '节点统计', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/monitoring/nodes/' },
                    { text: '设备监控', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/monitoring/devices/' },
                    { text: '作业监控', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/monitoring/jobs/' },
                  ],
                },
                {
                  text: '系统',
                  collapsed: false,
                  items: [
                    { text: '系统设置', link: '/zh-CN/usermanual/ai-infra-on-prem/operator/system/system-setting/' },
                  ],
                },
              ],
            },
            {
              text: '用户',
              collapsed: false,
              items: [
                { text: '概览', link: '/zh-CN/usermanual/ai-infra-on-prem/user/overview/' },
                {
                  text: '模型部署',
                  collapsed: false,
                  items: [
                    { text: '部署模板', link: '/zh-CN/usermanual/ai-infra-on-prem/user/model-deployment/templates/' },
                    { text: '模型实例', link: '/zh-CN/usermanual/ai-infra-on-prem/user/model-deployment/instances/' },
                  ],
                },
                {
                  text: '开发资源',
                  collapsed: false,
                  items: [
                    { text: '在线IDE', link: '/zh-CN/usermanual/ai-infra-on-prem/user/dev-resources/online-ide/' },
                    { text: '运行实例', link: '/zh-CN/usermanual/ai-infra-on-prem/user/dev-resources/runtime-instances/' },
                  ],
                },
                {
                  text: '存储服务',
                  collapsed: false,
                  items: [
                    { text: '对象存储', link: '/zh-CN/usermanual/ai-infra-on-prem/user/storage/object-storage/' },
                    { text: '块存储', link: '/zh-CN/usermanual/ai-infra-on-prem/user/storage/block-storage/' },
                    { text: '文件存储', link: '/zh-CN/usermanual/ai-infra-on-prem/user/storage/file-storage/' },
                  ],
                },
                {
                  text: '扩展服务',
                  collapsed: false,
                  items: [
                    { text: '镜像服务', link: '/zh-CN/usermanual/ai-infra-on-prem/user/extensions/images/' },
                  ],
                },
                {
                  text: '配额&用量',
                  collapsed: false,
                  items: [
                    { text: '资源用量', link: '/zh-CN/usermanual/ai-infra-on-prem/user/quotas-usage/usage/' },
                    { text: '资源配额', link: '/zh-CN/usermanual/ai-infra-on-prem/user/quotas-usage/quotas/' },
                    { text: '充值记录', link: '/zh-CN/usermanual/ai-infra-on-prem/user/quotas-usage/top-up-records/' },
                  ],
                },
                {
                  text: '监控',
                  collapsed: false,
                  items: [
                    { text: '统计概览', link: '/zh-CN/usermanual/ai-infra-on-prem/user/monitoring/overview/' },
                    { text: '集群统计', link: '/zh-CN/usermanual/ai-infra-on-prem/user/monitoring/clusters/' },
                    { text: '节点统计', link: '/zh-CN/usermanual/ai-infra-on-prem/user/monitoring/nodes/' },
                    { text: '设备监控', link: '/zh-CN/usermanual/ai-infra-on-prem/user/monitoring/devices/' },
                    { text: '作业监控', link: '/zh-CN/usermanual/ai-infra-on-prem/user/monitoring/jobs/' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: '账务',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh-CN/usermanual/billing/' },
            { text: '快速入门', link: '/zh-CN/usermanual/billing/getting-started/' },
            { text: '完成一次账期对账与结算', link: '/zh-CN/usermanual/billing/end-to-end/reconcile-billing-cycle/' },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '运营账务',
                  collapsed: false,
                  items: [
                    { text: '今日任务', link: '/zh-CN/usermanual/billing/operator/finance-operations/today-tasks/' },
                    { text: '月结总览', link: '/zh-CN/usermanual/billing/operator/finance-operations/monthly-overview/' },
                    { text: '结算单列表', link: '/zh-CN/usermanual/billing/operator/finance-operations/settlement-list/' },
                    { text: '财务账户', link: '/zh-CN/usermanual/billing/operator/finance-operations/financial-accounts/' },
                    { text: '巡检中心', link: '/zh-CN/usermanual/billing/operator/finance-operations/reconciliation-center/' },
                    { text: '调账处理', link: '/zh-CN/usermanual/billing/operator/finance-operations/account-adjustment/' },
                  ],
                },
                {
                  text: '客户账务',
                  collapsed: false,
                  items: [
                    { text: '业务线', link: '/zh-CN/usermanual/billing/operator/customer-billing/business-units/' },
                    { text: '客户概览', link: '/zh-CN/usermanual/billing/operator/customer-billing/customer-overview/' },
                    { text: '客户充值单', link: '/zh-CN/usermanual/billing/operator/customer-billing/top-up-orders/' },
                  ],
                },
                {
                  text: 'License',
                  collapsed: false,
                  items: [
                    { text: 'License', link: '/zh-CN/usermanual/billing/operator/license/license/' },
                  ],
                },
              ],
            },
            {
              text: '用户',
              collapsed: false,
              items: [
                {
                  text: 'Provider 收益',
                  collapsed: false,
                  items: [
                    { text: '收益总览', link: '/zh-CN/usermanual/billing/user/earnings/revenue/' },
                    { text: '月度结算单', link: '/zh-CN/usermanual/billing/user/earnings/settlements/' },
                    { text: '客户总览', link: '/zh-CN/usermanual/billing/user/earnings/customers/' },
                  ],
                },
                {
                  text: '我的账务',
                  collapsed: false,
                  items: [
                    { text: '账户概览', link: '/zh-CN/usermanual/billing/user/billing/overview/' },
                    { text: '额度治理', link: '/zh-CN/usermanual/billing/user/billing/quota-governance/' },
                    { text: '流水明细', link: '/zh-CN/usermanual/billing/user/billing/transactions/' },
                    { text: '充值订单', link: '/zh-CN/usermanual/billing/user/billing/top-up-orders/' },
                    { text: '月度账单', link: '/zh-CN/usermanual/billing/user/billing/monthly-bill/' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: '设置',
          collapsed: false,
          items: [
            { text: '概览', link: '/zh-CN/usermanual/settings/' },
            { text: '快速入门', link: '/zh-CN/usermanual/settings/getting-started/' },
            { text: '配置账号与权限闭环', link: '/zh-CN/usermanual/settings/end-to-end/configure-account-and-permissions/' },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '个人',
                  collapsed: false,
                  items: [
                    { text: '我的 Keys', link: '/zh-CN/usermanual/settings/operator/personal/my-keys/' },
                    { text: '账号信息', link: '/zh-CN/usermanual/settings/operator/personal/profile/' },
                  ],
                },
                {
                  text: '成员与角色',
                  collapsed: false,
                  items: [
                    { text: '成员', link: '/zh-CN/usermanual/settings/operator/members-roles/members/' },
                    { text: '角色', link: '/zh-CN/usermanual/settings/operator/members-roles/roles/' },
                  ],
                },
                {
                  text: '租户&设置',
                  collapsed: false,
                  items: [
                    { text: '租户', link: '/zh-CN/usermanual/settings/operator/tenants/tenants/' },
                  ],
                },
                {
                  text: '消息与日志',
                  collapsed: false,
                  items: [
                    { text: '操作日志', link: '/zh-CN/usermanual/settings/operator/activity-notifications/operation-logs/' },
                  ],
                },
                {
                  text: '系统配置',
                  collapsed: false,
                  items: [
                    { text: '平台设置', link: '/zh-CN/usermanual/settings/operator/system-settings/platform-settings/' },
                    { text: '登录配置', link: '/zh-CN/usermanual/settings/operator/system-settings/login-properties/' },
                  ],
                },
                {
                  text: 'API 流控',
                  collapsed: false,
                  items: [
                    { text: 'Overview', link: '/zh-CN/usermanual/settings/operator/api-rate-control/overview/' },
                    { text: '规则管理', link: '/zh-CN/usermanual/settings/operator/api-rate-control/rule-management/' },
                    { text: '观测审计', link: '/zh-CN/usermanual/settings/operator/api-rate-control/observability-audit/' },
                    { text: '节点缓存', link: '/zh-CN/usermanual/settings/operator/api-rate-control/node-cache/' },
                    { text: '发布中心', link: '/zh-CN/usermanual/settings/operator/api-rate-control/publish-center/' },
                  ],
                },
              ],
            },
            {
              text: '用户',
              collapsed: false,
              items: [
                {
                  text: '个人',
                  collapsed: false,
                  items: [
                    { text: '概览', link: '/zh-CN/usermanual/settings/user/personal/dashboard/' },
                    { text: '项目', link: '/zh-CN/usermanual/settings/user/personal/projects/' },
                    { text: '我的 Keys', link: '/zh-CN/usermanual/settings/user/personal/my-keys/' },
                    { text: '账号信息', link: '/zh-CN/usermanual/settings/user/personal/profile/' },
                  ],
                },
                {
                  text: '成员与角色',
                  collapsed: false,
                  items: [
                    { text: '成员', link: '/zh-CN/usermanual/settings/user/members-roles/team-members/' },
                    { text: '角色', link: '/zh-CN/usermanual/settings/user/members-roles/roles/' },
                    { text: '成员额度', link: '/zh-CN/usermanual/settings/user/members-roles/member-quotas/' },
                    { text: '额度申请', link: '/zh-CN/usermanual/settings/user/members-roles/quota-requests/' },
                  ],
                },
                {
                  text: '租户&设置',
                  collapsed: false,
                  items: [
                    { text: '组织设置', link: '/zh-CN/usermanual/settings/user/organizations/org-settings/' },
                  ],
                },
                {
                  text: '消息与日志',
                  collapsed: false,
                  items: [
                    { text: '操作日志', link: '/zh-CN/usermanual/settings/user/activity-notifications/operation-logs/' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  '/zh-CN/practices/': [
    {
      text: '最佳实践',
      items: [
        {
          text: '技术实践',
          collapsed: false,
          items: [
            {
              text: 'AI 编码集成',
              collapsed: false,
              items: [
                { text: 'Cherry Studio', link: '/zh-CN/practices/technical/cherry-studio/' },
                { text: 'Claude Code', link: '/zh-CN/practices/technical/claude-code/' },
                { text: 'Claude Code Plugin', link: '/zh-CN/practices/technical/claude-code-plugin/' },
                { text: 'Cline', link: '/zh-CN/practices/technical/cline/' },
                { text: 'Codex', link: '/zh-CN/practices/technical/codex/' },
                { text: 'Crush', link: '/zh-CN/practices/technical/crush/' },
                { text: 'Cursor', link: '/zh-CN/practices/technical/cursor/' },
                { text: 'Dify', link: '/zh-CN/practices/technical/dify/' },
                { text: 'Kilo Code', link: '/zh-CN/practices/technical/kilo-code/' },
                { text: 'n8n', link: '/zh-CN/practices/technical/n8n/' },
                { text: 'Open WebUI', link: '/zh-CN/practices/technical/open-webui/' },
                { text: 'OpenClaw', link: '/zh-CN/practices/technical/openclaw/' },
                { text: 'Open Code', link: '/zh-CN/practices/technical/open-code/' },
                { text: 'Roo Code', link: '/zh-CN/practices/technical/roo-code/' },
              ],
            },
          ],
        },
        {
          text: '项目实践',
          collapsed: false,
          items: [
            {
              text: '多算力池异构推理调度最佳实践',
              link: '/zh-CN/practices/project/multi-compute-pool-heterogeneous-inference-scheduling',
            },
            {
              text: '单节点多卡多模型部署最佳实践',
              link: '/zh-CN/practices/project/single-node-multi-card-multi-model-deployment',
            },
          ],
        },
      ],
    },
  ],
  '/zh-CN/operations/admin-portal-manual/': [
    {
      text: '管理门户手册',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh-CN/operations/admin-portal-manual/user' },
      ],
    },
  ],
  '/zh-CN/operations/om-guide/': [
    {
      text: '运维指南',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh-CN/operations/om-guide/user' },
      ],
    },
  ],
  '/zh-CN/others/faq/': [
    {
      text: '常见问题（FAQ）',
      collapsed: false,
      items: [
        { text: '通用问题', link: '/zh-CN/others/faq/general' },
        { text: '平台能力', link: '/zh-CN/others/faq/platform' },
        { text: '算力调度', link: '/zh-CN/others/faq/compute' },
        { text: '模型管理', link: '/zh-CN/others/faq/model' },
        { text: '推理集成', link: '/zh-CN/others/faq/inference' },
        { text: '运维安全', link: '/zh-CN/others/faq/ops' },
      ],
    },
  ],
  '/zh-CN/others/release-notes/': [
    {
      text: '版本发布说明',
      link: '/zh-CN/others/release-notes/',
      collapsed: false,
    },
  ],
}
