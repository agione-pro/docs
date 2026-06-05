import type { DefaultTheme } from 'vitepress'

export const zhSidebar: DefaultTheme.Sidebar = {
  '/zh/product/': [
    {
      text: '产品概述',
      collapsed: false,
      items: [
        { text: '概述', link: '/zh/product/technical/overview' },
        { text: '功能与能力', link: '/zh/product/technical/features' },
        { text: '网络规划', link: '/zh/product/technical/network' },
        { text: '技术亮点', link: '/zh/product/technical/tech-highlights' },
      ],
    },
    {
      text: '账号与权限模型',
      collapsed: false,
      items: [
        { text: '用户、租户与角色设计逻辑', link: '/zh/product/identity-access-model' },
        { text: '角色对比总览', link: '/zh/product/role-comparison' },
      ],
    },
    {
      text: '兼容性与限制',
      collapsed: false,
      items: [
        { text: '纳管芯片', link: '/zh/product/limitations/chips' },
        { text: '支持矩阵', link: '/zh/product/limitations/support-matrix' },
        { text: '其他限制', link: '/zh/product/limitations/limitations' },
      ],
    },
    {
      text: '调研',
      collapsed: false,
      items: [
        { text: '需求快速调研', link: '/zh/product/investigation/quick-requirement-investigation' },
        { text: '环境快速调研', link: '/zh/product/investigation/quick-env-investigation' },
      ],
    },
  ],
  '/zh/installation/': [
    {
      text: '安装部署',
      collapsed: false,
      items: [
        { text: '部署综述', link: '/zh/installation/agione-deployment-requirements' },
        { text: '安装前环境预检', link: '/zh/installation/agione-precheck-environment-check' },
        { text: '环境安装部署指南', link: '/zh/installation/agione-quick-install' },
        { text: '多节点环境安装部署', link: '/zh/installation/agione-multi-node-install' },
        { text: '安装配置文件字段说明', link: '/zh/installation/agione-install-config-reference' },
        { text: '节点纳管-部署配置要求', link: '/zh/installation/deployment-requirements-for-managing-compute-nodes' },
        { text: '节点纳管-快速安装指南', link: '/zh/installation/quick-install-for-managing-compute-nodes' },
      ],
    },
  ],

  '/zh/license/': [
    {
      text: '购买与激活',
      collapsed: false,
      items: [
        { text: '在线支付与激活', link: '/zh/license/online-payment-activation' },
        { text: '激活码与激活', link: '/zh/license/activation-code-activation' },
      ],
    },
  ],

  '/zh/userguide/': [
    {
      text: '用户指南',
      collapsed: false,
      items: [
        {
          text: '算力资源接入',
          collapsed: false,
          items: [
            { text: '公共算力接入', link: '/zh/userguide/public-ai-integration' },
          ],
        },
        {
          text: '算力资源管理',
          collapsed: false,
          items: [
            { text: 'A100 管理', link: '/zh/userguide/a100-management' },
          ],
        },
        {
          text: '模型管理',
          collapsed: false,
          items: [
            { text: '模型部署', link: '/zh/userguide/mode-deployment' },
          ],
        },
      ],
    },
  ],

  '/zh/usermanual/': [
    {
      text: '用户手册',
      collapsed: false,
      items: [
        { text: '用户快速指引', link: '/zh/usermanual/user-quick-guide' },
        { text: '供应商快速指引', link: '/zh/usermanual/provider-quick-guide' },
        {
          text: '模型及AI服务',
          collapsed: false,
          items: [
            {
              text: '模型提供方&用户',
              collapsed: false,
              items: [
                {
                  text: '发现',
                  collapsed: false,
                  items: [
                    { text: '模型市场', link: '/zh/usermanual/model-services/user/discover/models/' },
                  ]
                },
                {
                  text: '体验中心',
                  collapsed: false,
                  items: [
                    { text: '文本对话', link: '/zh/usermanual/model-services/user/playground/text/' },
                    { text: '图像生成', link: '/zh/usermanual/model-services/user/playground/images/' },
                    { text: '视频', link: '/zh/usermanual/model-services/user/playground/video/' },
                    { text: '语音生成', link: '/zh/usermanual/model-services/user/playground/audio/' },
                  ]
                },
                {
                  text: '创作空间',
                  collapsed: false,
                  items: [
                    { text: '我的模型', link: '/zh/usermanual/model-services/user/studio/my-models/' },
                  ]
                },
                {
                  text: '用量与收益',
                  collapsed: false,
                  items: [
                    { text: '我的收益', link: '/zh/usermanual/model-services/user/usage-revenue/revenue/' },
                    { text: '消耗明细', link: '/zh/usermanual/model-services/user/usage-revenue/usage/' },
                  ]
                },
                {
                  text: '我的调用',
                  collapsed: false,
                  items: [
                    { text: '概览', link: '/zh/usermanual/model-services/user/my-calls/overview/' },
                    { text: '调用统计', link: '/zh/usermanual/model-services/user/my-calls/call-analytics/' },
                    { text: '调用日志', link: '/zh/usermanual/model-services/user/my-calls/call-logs/' },
                  ]
                },
                {
                  text: '客户调用',
                  collapsed: false,
                  items: [
                    { text: '概览', link: '/zh/usermanual/model-services/user/customer-calls/overview/' },
                    { text: '调用统计', link: '/zh/usermanual/model-services/user/customer-calls/call-analytics/' },
                    { text: '调用日志', link: '/zh/usermanual/model-services/user/customer-calls/call-logs/' },
                  ]
                },
              ]
            },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '设置',
                  collapsed: false,
                  items: [
                    { text: '元模型', link: '/zh/usermanual/model-services/operator/settings/meta-models/' },
                    { text: '模型来源', link: '/zh/usermanual/model-services/operator/settings/model-source/' },
                    { text: '模板', link: '/zh/usermanual/model-services/operator/settings/model-templates/' },
                    { text: '标签', link: '/zh/usermanual/model-services/operator/settings/tags/' },
                    { text: '币种设置', link: '/zh/usermanual/model-services/operator/settings/currency-settings/' },
                  ]
                },
                {
                  text: '发布',
                  collapsed: false,
                  items: [
                    { text: '应用列表', link: '/zh/usermanual/model-services/operator/publishing/apps/' },
                  ]
                },
                {
                  text: '审批',
                  collapsed: false,
                  items: [
                    { text: '模型审核', link: '/zh/usermanual/model-services/operator/approvals/model-reviews/' },
                    { text: '应用审核', link: '/zh/usermanual/model-services/operator/approvals/app-reviews/' },
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
            {
              text: '用户',
              collapsed: false,
              items: [
                {
                  text: '模型服务',
                  collapsed: false,
                  items: [
                    { text: '快速部署', link: '/zh/usermanual/ai-infra-on-cloud/user/model-services/quick-start/' },
                    { text: '我的部署', link: '/zh/usermanual/ai-infra-on-cloud/user/model-services/my-deployments/' },
                  ]
                },
                {
                  text: '访问管理',
                  collapsed: false,
                  items: [
                    { text: '接入管理', link: '/zh/usermanual/ai-infra-on-cloud/user/access-management/access-accounts/' },
                  ]
                },
              ]
            },
            {
              text: '运营管理员',
              collapsed: false,
              items: [
                {
                  text: '接入管理',
                  collapsed: false,
                  items: [
                    { text: '快速开始', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/quick-start/' },
                    { text: '接入云平台', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/access-cloudtype/' },
                    { text: '云平台授权', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/cloudtype-auth/' },
                    { text: '接入资源池', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/resource-pools/' },
                    { text: '资源池授权', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/cloud-region-auth/' },
                    { text: '接入账号', link: '/zh/usermanual/ai-infra-on-cloud/operator/cloud-access/cloud-accounts/' },
                  ]
                },
                {
                  text: '模型管理',
                  collapsed: false,
                  items: [
                    { text: '发布向导', link: '/zh/usermanual/ai-infra-on-cloud/operator/models/publish-guide/' },
                    { text: '模型库', link: '/zh/usermanual/ai-infra-on-cloud/operator/models/models/' },
                    { text: '模型分类', link: '/zh/usermanual/ai-infra-on-cloud/operator/models/categories/' },
                    { text: '推理框架', link: '/zh/usermanual/ai-infra-on-cloud/operator/models/frameworks/' },
                    { text: '推理镜像', link: '/zh/usermanual/ai-infra-on-cloud/operator/models/runtime-images/' },
                  ]
                },
              ]
            },
          ]
        },
        { text: '异构卡纳管', link: '/zh/usermanual/ai-infra-on-prem/' },
      ],
    },
  ],

  '/zh/practices/': [
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
                { text: 'CherryStudio', link: '/zh/practices/technical/cherry-studio/' },
                { text: 'claudeCode', link: '/zh/practices/technical/claude-code/' },
                { text: 'ClaudeCode-plugin', link: '/zh/practices/technical/claude-code-plugin/' },
                { text: 'Cline', link: '/zh/practices/technical/cline/' },
                { text: 'Codex', link: '/zh/practices/technical/codex/' },
                { text: 'Crush', link: '/zh/practices/technical/crush/' },
                { text: 'Cursor', link: '/zh/practices/technical/cursor/' },
                { text: 'dify', link: '/zh/practices/technical/dify/' },
                { text: 'KiloCode', link: '/zh/practices/technical/kilo-code/' },
                { text: 'n8n', link: '/zh/practices/technical/n8n/' },
                { text: 'open-webui', link: '/zh/practices/technical/open-webui/' },
                { text: 'openclaw', link: '/zh/practices/technical/openclaw/' },
                { text: 'OpenCode', link: '/zh/practices/technical/open-code/' },
                { text: 'RooCode', link: '/zh/practices/technical/roo-code/' },
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
              link: '/zh/practices/project/multi-compute-pool-heterogeneous-inference-scheduling',
            },
          ],
        },
      ],
    },
  ],
  '/zh/operations/admin-portal-manual/': [
    {
      text: '管理门户手册',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh/operations/admin-portal-manual/user' },
      ],
    },
  ],
  '/zh/operations/om-guide/': [
    {
      text: '运维指南',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh/operations/om-guide/user' },
      ],
    },
  ],
  '/zh/others/faq/': [
    {
      text: '常见问题（FAQ）',
      collapsed: false,
      items: [
        { text: '通用问题', link: '/zh/others/faq/general' },
        { text: '平台能力', link: '/zh/others/faq/platform' },
        { text: '算力调度', link: '/zh/others/faq/compute' },
        { text: '模型管理', link: '/zh/others/faq/model' },
        { text: '推理集成', link: '/zh/others/faq/inference' },
        { text: '运维安全', link: '/zh/others/faq/ops' },
      ],
    },
  ],
  '/zh/others/release-notes/': [
    {
      text: '更新说明',
      link: '/zh/others/release-notes/',
      collapsed: false,
    },
  ],
}
