<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, withBase } from 'vitepress'

type Role = 'operator' | 'provider' | 'enduser'
type Subsystem = 'platform' | 'settings' | 'model-services' | 'billing' | 'on-prem' | 'on-cloud'
type Locale = 'zh' | 'en'

interface Scenario {
  id: number
  guideSlug: string
  title: Record<Locale, string>
  description: Record<Locale, string>
  roles: Role[]
  subsystems: Subsystem[]
  tasks: string[]
}

interface TaskStep {
  scenarioId: number
  stage: Record<Locale, string>
  description: Record<Locale, string>
}

interface CommonTask {
  id: string
  question: Record<Locale, string>
  keywords: Record<Locale, string>
  goal: Record<Locale, string>
  roles: Role[]
  steps: TaskStep[]
}

const route = useRoute()

const locale = computed<Locale>(() =>
  route.data.relativePath.startsWith('zh-CN/') || route.path.includes('/zh-CN/') ? 'zh' : 'en'
)

const uiText: Record<Locale, Record<string, string>> = {
  zh: {
    taskCloud: '常见任务',
    taskIntro: '选择与你的实际问题最相似的任务，查看建议按顺序阅读的场景。找不到对应任务时，可继续使用下方场景筛选。',
    taskSearch: '搜索任务',
    taskSearchPlaceholder: '例如：4 张 NPU 卡怎么管理？',
    taskEmpty: '没有找到相似任务，请尝试其他关键词或浏览全部使用场景。',
    selectedTask: '已选择的任务',
    recommendedPath: '推荐场景路径',
    recommendedIntro: '按顺序进入场景指南，避免遗漏前置配置和后续治理。',
    applicableRoles: '适用角色',
    pathCountSuffix: '个场景',
    scenarios: '使用场景',
    summaryPrefix: '当前显示',
    summarySuffix: '个场景。没有找到相似任务时，可按用户角色和子系统筛选。',
    filters: '场景筛选',
    role: '用户角色',
    subsystem: '子系统',
    all: '全部',
    cta: '进入指南',
    empty: '当前筛选条件下没有匹配的任务场景。',
    clear: '清除筛选',
  },
  en: {
    taskCloud: 'Common Tasks',
    taskIntro: 'Choose the task closest to your problem to see an ordered reading path. If no task matches, continue with the scenario filters below.',
    taskSearch: 'Search Tasks',
    taskSearchPlaceholder: 'For example: How do I manage four NPU cards?',
    taskEmpty: 'No similar tasks found. Try another keyword or browse all use scenarios.',
    selectedTask: 'Selected Task',
    recommendedPath: 'Recommended Scenario Path',
    recommendedIntro: 'Follow the scenario guides in order to cover prerequisites and ongoing governance.',
    applicableRoles: 'Applicable Roles',
    pathCountSuffix: 'scenarios',
    scenarios: 'Use Scenarios',
    summaryPrefix: 'Showing',
    summarySuffix: 'scenarios. If no task matches, filter by user role and subsystem.',
    filters: 'Scenario Filters',
    role: 'User Role',
    subsystem: 'Subsystem',
    all: 'All',
    cta: 'Open Guide',
    empty: 'No matching scenarios under the current filters.',
    clear: 'Clear Filters',
  },
}

const roleOptions = computed(() => {
  const labels: Record<Locale, Record<Role, string>> = {
    zh: { operator: '平台运营方', provider: '模型提供方', enduser: '平台用户' },
    en: { operator: 'Operator', provider: 'Provider', enduser: 'End User' },
  }

  return [
    { value: 'all', label: uiText[locale.value].all },
    { value: 'operator', label: labels[locale.value].operator },
    { value: 'provider', label: labels[locale.value].provider },
    { value: 'enduser', label: labels[locale.value].enduser },
  ]
})

const subsystemOptions = computed(() => {
  const labels: Record<Locale, Record<Subsystem, string>> = {
    zh: {
      platform: '平台',
      settings: '设置',
      'model-services': '模型及 AI 服务',
      billing: '账务',
      'on-prem': '本地算力平台',
      'on-cloud': '多云调度平台',
    },
    en: {
      platform: 'Platform',
      settings: 'Settings',
      'model-services': 'Model Services',
      billing: 'Billing',
      'on-prem': 'AI Infra-On Prem',
      'on-cloud': 'AI Infra-On Cloud',
    },
  }

  return [
    { value: 'all', label: uiText[locale.value].all },
    { value: 'on-prem', label: labels[locale.value]['on-prem'] },
    { value: 'on-cloud', label: labels[locale.value]['on-cloud'] },
    { value: 'model-services', label: labels[locale.value]['model-services'] },
    { value: 'billing', label: labels[locale.value].billing },
    { value: 'platform', label: labels[locale.value].platform },
    { value: 'settings', label: labels[locale.value].settings },
  ]
})

const roleLabels: Record<Locale, Record<Role, string>> = {
  zh: {
    operator: '平台运营方',
    provider: '模型提供方',
    enduser: '平台用户',
  },
  en: {
    operator: 'Operator',
    provider: 'Provider',
    enduser: 'End User',
  },
}

const subsystemLabels: Record<Locale, Record<Subsystem, string>> = {
  zh: {
    platform: '平台',
    settings: '设置',
    'model-services': '模型及 AI 服务',
    billing: '账务',
    'on-prem': '本地算力平台',
    'on-cloud': '多云调度平台',
  },
  en: {
    platform: 'Platform',
    settings: 'Settings',
    'model-services': 'Model Services',
    billing: 'Billing',
    'on-prem': 'On-Prem',
    'on-cloud': 'On Cloud',
  },
}

const commonTasks: CommonTask[] = [
  {
    id: 'npu4',
    question: { zh: '我有 4 张 NPU 卡，如何管理？', en: 'How do I manage four NPU cards?' },
    keywords: { zh: '4 张 NPU 卡 算力 纳管 规格 配额 监控', en: 'four NPU cards compute onboarding specification quota monitoring' },
    goal: {
      zh: '完成卡型识别、集群接入、规格规划、配额分配和持续监控。',
      en: 'Identify the card type, onboard the cluster, plan specifications, allocate quotas, and monitor usage.',
    },
    roles: ['operator'],
    steps: [
      {
        scenarioId: 9,
        stage: { zh: '先完成', en: 'Start with' },
        description: {
          zh: '识别 NPU 卡型，接入集群并配置 1 卡、2 卡和 4 卡资源规格。',
          en: 'Identify the NPU type, onboard the cluster, and configure one-card, two-card, and four-card resource specifications.',
        },
      },
      {
        scenarioId: 10,
        stage: { zh: '然后配置', en: 'Configure' },
        description: {
          zh: '把卡型、卡数、框架和启动参数固化为可复用模板。',
          en: 'Turn the card type, card count, framework, and startup parameters into a reusable template.',
        },
      },
      {
        scenarioId: 11,
        stage: { zh: '验证部署', en: 'Validate' },
        description: {
          zh: '确认实例申请到预期卡数并进入运行状态。',
          en: 'Confirm that the instance receives the expected number of cards and reaches the running state.',
        },
      },
      {
        scenarioId: 13,
        stage: { zh: '持续运营', en: 'Operate' },
        description: {
          zh: '管理租户配额，并关联查看设备、节点和作业占用。',
          en: 'Manage tenant quotas and correlate device, node, and job utilization.',
        },
      },
    ],
  },
  {
    id: 'cluster',
    question: { zh: '我有一套本地集群，如何接入？', en: 'How do I onboard a local cluster?' },
    keywords: { zh: 'Kubernetes 集群 本地 IDC 接入 算力', en: 'Kubernetes cluster local IDC onboarding compute' },
    goal: {
      zh: '把 Kubernetes 集群接入 AGIOne，并验证节点、设备和可调度规格。',
      en: 'Onboard a Kubernetes cluster to AGIOne and validate nodes, devices, and schedulable specifications.',
    },
    roles: ['operator'],
    steps: [
      {
        scenarioId: 9,
        stage: { zh: '接入集群', en: 'Onboard' },
        description: {
          zh: '创建地域、注册集群、识别设备并配置资源规格。',
          en: 'Create a region, register the cluster, discover devices, and configure resource specifications.',
        },
      },
      {
        scenarioId: 13,
        stage: { zh: '验证资源', en: 'Validate' },
        description: {
          zh: '确认节点、设备和作业监控持续上报。',
          en: 'Confirm continuous reporting for node, device, and job monitoring.',
        },
      },
      {
        scenarioId: 10,
        stage: { zh: '准备服务', en: 'Prepare' },
        description: {
          zh: '为后续模型部署准备可选的推理模板。',
          en: 'Prepare inference templates for subsequent model deployments.',
        },
      },
    ],
  },
  {
    id: 'team-governance',
    question: { zh: '我部署了本地模型给团队使用，如何治理？', en: 'How do I govern a local model used by my team?' },
    keywords: { zh: '本地模型 团队 使用 治理 权限 Key 配额', en: 'local model team governance permission key quota' },
    goal: {
      zh: '完成模型部署、团队授权、调用限制和运行监控。',
      en: 'Complete model deployment, team authorization, calling controls, and operational monitoring.',
    },
    roles: ['operator', 'provider'],
    steps: [
      {
        scenarioId: 9,
        stage: { zh: '部署基础', en: 'Foundation' },
        description: {
          zh: '确保集群、加速卡和资源规格已经可用。',
          en: 'Ensure that the cluster, accelerator cards, and resource specifications are available.',
        },
      },
      {
        scenarioId: 10,
        stage: { zh: '配置部署', en: 'Configure' },
        description: {
          zh: '固定模型、框架、资源规格和启动参数。',
          en: 'Define the model, framework, resource specification, and startup parameters.',
        },
      },
      {
        scenarioId: 11,
        stage: { zh: '验证服务', en: 'Validate' },
        description: {
          zh: '确认实例运行、健康检查和访问入口正常。',
          en: 'Confirm that the instance, health checks, and access endpoint are working.',
        },
      },
      {
        scenarioId: 2,
        stage: { zh: '团队授权', en: 'Authorize' },
        description: {
          zh: '为团队成员分配组织、角色、菜单和操作权限。',
          en: 'Assign organizations, roles, menus, and operation permissions to team members.',
        },
      },
      {
        scenarioId: 22,
        stage: { zh: '调用治理', en: 'Govern' },
        description: {
          zh: '配置项目预算、Key、模型白名单和调用限额。',
          en: 'Configure project budgets, keys, model allowlists, and calling limits.',
        },
      },
      {
        scenarioId: 13,
        stage: { zh: '持续运营', en: 'Operate' },
        description: {
          zh: '查看设备、节点、作业、配额和资源占用。',
          en: 'Review devices, nodes, jobs, quotas, and resource utilization.',
        },
      },
    ],
  },
  {
    id: 'deployment-failure',
    question: { zh: '模型部署后一直创建中，如何排查？', en: 'How do I troubleshoot a model deployment stuck in creating?' },
    keywords: { zh: '模型部署 创建中 失败 排队 状态', en: 'model deployment creating failed pending status troubleshooting' },
    goal: {
      zh: '定位部署卡在资源、配额、镜像、启动参数还是设备健康。',
      en: 'Determine whether deployment is blocked by resources, quotas, images, startup parameters, or device health.',
    },
    roles: ['provider', 'operator'],
    steps: [
      {
        scenarioId: 11,
        stage: { zh: '先定位', en: 'Locate' },
        description: {
          zh: '查看实例状态、事件、镜像拉取和调度结果。',
          en: 'Review instance status, events, image pulls, and scheduling results.',
        },
      },
      {
        scenarioId: 10,
        stage: { zh: '检查配置', en: 'Check config' },
        description: {
          zh: '核对镜像、启动命令、端口和资源规格。',
          en: 'Check the image, startup command, port, and resource specification.',
        },
      },
      {
        scenarioId: 13,
        stage: { zh: '检查资源', en: 'Check resources' },
        description: {
          zh: '核对配额、空闲卡数、节点和设备健康。',
          en: 'Check quotas, available cards, nodes, and device health.',
        },
      },
      {
        scenarioId: 18,
        stage: { zh: '综合排查', en: 'Investigate' },
        description: {
          zh: '按时间范围汇总日志、事件和资源证据。',
          en: 'Correlate logs, events, and resource evidence over the same time range.',
        },
      },
    ],
  },
  {
    id: 'api-access',
    question: { zh: '模型发布后，团队成员如何调用？', en: 'How can team members call a published model?' },
    keywords: { zh: '模型发布 团队 API 调用 Key 授权', en: 'published model team API calling key authorization' },
    goal: {
      zh: '完成成员授权、个人 Key、模型体验、API 调用和记录核对。',
      en: 'Complete member authorization, personal keys, model experience, API calls, and usage review.',
    },
    roles: ['provider', 'enduser'],
    steps: [
      {
        scenarioId: 2,
        stage: { zh: '先授权', en: 'Authorize' },
        description: {
          zh: '确认成员属于正确组织并获得对应角色。',
          en: 'Confirm that members belong to the correct organization and have the required roles.',
        },
      },
      {
        scenarioId: 22,
        stage: { zh: '配置调用', en: 'Configure' },
        description: {
          zh: '准备项目、个人 Key、模型白名单和调用限额。',
          en: 'Prepare the project, personal key, model allowlist, and calling limits.',
        },
      },
      {
        scenarioId: 6,
        stage: { zh: '开始调用', en: 'Call' },
        description: {
          zh: '在 Playground 验证后完成 API 调用。',
          en: 'Validate in Playground before making API calls.',
        },
      },
      {
        scenarioId: 7,
        stage: { zh: '核对结果', en: 'Review' },
        description: {
          zh: '查看调用记录、用量和收益。',
          en: 'Review call records, usage, and revenue.',
        },
      },
    ],
  },
  {
    id: 'cost',
    question: { zh: '如何核对模型用量、消费和收益？', en: 'How do I reconcile model usage, spending, and revenue?' },
    keywords: { zh: '用量 消费 收益 账单 计费 配额', en: 'usage spending revenue bill billing quota' },
    goal: {
      zh: '让调用日志、模型用量、账户扣减和提供方收益可以互相验证。',
      en: 'Cross-check call logs, model usage, account deductions, and provider revenue.',
    },
    roles: ['provider', 'enduser'],
    steps: [
      {
        scenarioId: 6,
        stage: { zh: '确认调用', en: 'Confirm calls' },
        description: {
          zh: '从调用记录定位模型、时间和请求结果。',
          en: 'Locate the model, time range, and request results in call records.',
        },
      },
      {
        scenarioId: 7,
        stage: { zh: '核对用量', en: 'Check usage' },
        description: {
          zh: '按相同模型和账期核对用量与收益。',
          en: 'Compare usage and revenue for the same model and billing period.',
        },
      },
      {
        scenarioId: 8,
        stage: { zh: '核对扣减', en: 'Check charges' },
        description: {
          zh: '区分充值、配额、用量和账户额度。',
          en: 'Distinguish top-ups, quotas, usage, and account balance.',
        },
      },
      {
        scenarioId: 21,
        stage: { zh: '核对结算', en: 'Reconcile' },
        description: {
          zh: '按客户、模型和账期核对服务商收益与结算结果。',
          en: 'Reconcile provider revenue and settlement by customer, model, and billing cycle.',
        },
      },
    ],
  },
  {
    id: 'account-project-quota',
    question: { zh: '如何管理账号、项目、Key 与成员额度？', en: 'How do I manage accounts, projects, keys, and member quotas?' },
    keywords: { zh: '账号 组织 成员 角色 项目 Key 预算 额度 白名单', en: 'account organization member role project key budget quota allowlist' },
    goal: {
      zh: '建立组织与角色边界，用项目预算、调用 Key 和成员额度控制团队使用。',
      en: 'Establish organization and role boundaries and govern team use with project budgets, keys, and member quotas.',
    },
    roles: ['operator', 'provider', 'enduser'],
    steps: [
      {
        scenarioId: 2,
        stage: { zh: '先授权', en: 'Authorize' },
        description: {
          zh: '确认组织、成员、角色、菜单和资源范围。',
          en: 'Confirm organization, members, roles, menus, and resource scope.',
        },
      },
      {
        scenarioId: 22,
        stage: { zh: '配置项目', en: 'Configure project' },
        description: {
          zh: '设置项目预算、模型白名单和独立用途的 Key。',
          en: 'Set project budgets, model allowlists, and purpose-specific keys.',
        },
      },
      {
        scenarioId: 23,
        stage: { zh: '分配额度', en: 'Allocate quota' },
        description: {
          zh: '申请、调整并验证成员额度和调用限制。',
          en: 'Request, adjust, and validate member quota and calling limits.',
        },
      },
    ],
  },
  {
    id: 'billing-close',
    question: { zh: '运营方如何完成账期对账与结算？', en: 'How does an operator reconcile and settle a billing cycle?' },
    keywords: { zh: '账期 月结 对账 巡检 结算单 调账 收益', en: 'billing cycle monthly close reconciliation inspection settlement adjustment revenue' },
    goal: {
      zh: '从账户与账单核对到异常处理、结算确认和服务商到账形成闭环。',
      en: 'Close the loop from account and bill review through exceptions, settlement confirmation, and provider receipt.',
    },
    roles: ['operator', 'provider'],
    steps: [
      {
        scenarioId: 8,
        stage: { zh: '核对账务', en: 'Review billing' },
        description: {
          zh: '统一账期，核对账户、交易、用量和月度账单。',
          en: 'Align the billing cycle and reconcile accounts, transactions, usage, and monthly bills.',
        },
      },
      {
        scenarioId: 20,
        stage: { zh: '完成月结', en: 'Close the cycle' },
        description: {
          zh: '处理巡检异常，生成并复核运营结算单。',
          en: 'Resolve reconciliation exceptions and generate and review operator settlement statements.',
        },
      },
      {
        scenarioId: 21,
        stage: { zh: '确认到账', en: 'Confirm receipt' },
        description: {
          zh: '从服务商视角核对收益来源、应结算和实际到账。',
          en: 'Reconcile revenue sources, expected settlement, and actual receipt from the provider perspective.',
        },
      },
    ],
  },
  {
    id: 'application-review',
    question: { zh: '如何发布应用并完成审核？', en: 'How do I publish and approve an application?' },
    keywords: { zh: '应用 发布 审核 客户 可见 调用 参数映射', en: 'application publish review customer visibility calling parameter mapping' },
    goal: {
      zh: '核对应用绑定模型、调用入口和客户范围，完成审核及客户侧调用验证。',
      en: 'Review the bound model, calling entry, and customer scope, then validate approval and customer calls.',
    },
    roles: ['operator'],
    steps: [
      {
        scenarioId: 24,
        stage: { zh: '发布与审核', en: 'Publish and review' },
        description: {
          zh: '检查发布材料，记录审核意见，并验证目标客户可见和可调用。',
          en: 'Review publishing materials, record the decision, and validate intended-customer visibility and calls.',
        },
      },
    ],
  },
  {
    id: 'cloud-scheduling',
    question: { zh: '如何接入多云资源并配置调度策略？', en: 'How do I onboard multi-cloud resources and configure scheduling?' },
    keywords: { zh: '多云 云账号 资源池 授权 调度 策略 回退', en: 'multi-cloud cloud account resource pool authorization scheduling policy fallback' },
    goal: {
      zh: '完成云平台、账号、资源池和授权接入，并通过测试部署验证首选与回退策略。',
      en: 'Onboard platforms, accounts, pools, and authorization, then validate preferred and fallback scheduling with a test deployment.',
    },
    roles: ['operator'],
    steps: [
      {
        scenarioId: 14,
        stage: { zh: '完成接入', en: 'Onboard' },
        description: {
          zh: '接入云平台、账号和资源池，完成业务与租户授权。',
          en: 'Onboard cloud platforms, accounts, and pools and complete business and tenant authorization.',
        },
      },
      {
        scenarioId: 27,
        stage: { zh: '配置调度', en: 'Configure scheduling' },
        description: {
          zh: '设置首选资源池、容量阈值、优先级和回退约束。',
          en: 'Set preferred pools, capacity thresholds, priority, and fallback constraints.',
        },
      },
      {
        scenarioId: 16,
        stage: { zh: '验证部署', en: 'Validate deployment' },
        description: {
          zh: '执行测试部署并核对实际资源池、状态和事件。',
          en: 'Run a test deployment and review the selected pool, state, and events.',
        },
      },
    ],
  },
]

const scenarios: Scenario[] = [
  {
    id: 1,
    guideSlug: 'register-login',
    title: { zh: '注册 & 登录', en: 'Register & Login' },
    description: {
      zh: '平台用户完成邮箱注册；平台运营方、平台用户和模型提供方登录平台并进入对应工作台。',
      en: 'End users complete email registration; Operator, End User, and Provider log in and enter their workspaces.',
    },
    roles: ['enduser', 'operator', 'provider'],
    subsystems: ['platform'],
    tasks: ['account'],
  },
  {
    id: 2,
    guideSlug: 'identity-authorization',
    title: { zh: '身份授权', en: 'Identity Authorization' },
    description: {
      zh: '平台运营方通过角色、菜单与按钮权限控制谁能看见、能操作什么。',
      en: 'Operators control who can see and operate features through roles, menus, and button permissions.',
    },
    roles: ['operator'],
    subsystems: ['settings'],
    tasks: ['account'],
  },
  {
    id: 3,
    guideSlug: 'publish-model',
    title: { zh: '发布模型', en: 'Publish Models' },
    description: {
      zh: '模型提供方把外部接口地址、自有或平台托管模型发布为公有或私有服务，并配置计费与限流。',
      en: 'Providers publish external endpoints, self-owned models, or platform-hosted models as public or private services with billing and throttling.',
    },
    roles: ['provider'],
    subsystems: ['model-services'],
    tasks: ['publish'],
  },
  {
    id: 4,
    guideSlug: 'publish-model-preconfiguration',
    title: { zh: '发布模型（预设置）', en: 'Publish Models Preconfiguration' },
    description: {
      zh: '为发布准备标准化的元模型、模型来源、模板和标签，降低模型提供方的重复配置。',
      en: 'Prepare standardized meta-models, model sources, templates, and tags to reduce repeated provider configuration.',
    },
    roles: ['operator'],
    subsystems: ['model-services'],
    tasks: ['publish'],
  },
  {
    id: 5,
    guideSlug: 'publish-aggregation-model',
    title: { zh: '发布聚合模型', en: 'Publish Aggregation Models' },
    description: {
      zh: '把多个已发布模型包装成统一入口，按策略（成功率/成本/均衡/随机/轮询）路由。',
      en: 'Wrap multiple published models behind one entry point and route requests by success rate, cost, balance, random, or round-robin policies.',
    },
    roles: ['provider'],
    subsystems: ['model-services'],
    tasks: ['publish'],
  },
  {
    id: 6,
    guideSlug: 'model-experience-api-calling',
    title: { zh: '模型的体验与调用', en: 'Model Experience & API Calling' },
    description: {
      zh: '平台用户发现、体验、接入 API 并回看调用；模型提供方查看客户维度的调用情况。',
      en: 'End users discover, try, integrate, and review calls; providers monitor customer-level calling activity.',
    },
    roles: ['enduser', 'provider'],
    subsystems: ['model-services'],
    tasks: ['call'],
  },
  {
    id: 7,
    guideSlug: 'model-usage-revenue',
    title: { zh: '模型的消费与收益', en: 'Model Usage & Revenue' },
    description: {
      zh: '将调用产生的 Token、时长或次数转成平台用户消耗与模型提供方收益，并跟踪账期。',
      en: 'Convert tokens, duration, and request counts into end-user usage and provider revenue across billing periods.',
    },
    roles: ['enduser', 'provider'],
    subsystems: ['model-services'],
    tasks: ['bill', 'call'],
  },
  {
    id: 8,
    guideSlug: 'recharge-billing',
    title: { zh: '充值 & 计费', en: 'Recharge & Billing' },
    description: {
      zh: '获得可消费额度，记录模型与卡时消耗，生成消费、收益和账期数据。',
      en: 'Obtain spendable balance, record model and card-hour usage, and generate usage, revenue, and billing-period data.',
    },
    roles: ['enduser', 'provider'],
    subsystems: ['billing'],
    tasks: ['bill'],
  },
  {
    id: 9,
    guideSlug: 'on-prem-compute-onboarding',
    title: { zh: '本地算力纳管', en: 'On-Prem Compute Onboarding' },
    description: {
      zh: '把私有 IDC / 本地 GPU / NPU / XPU 接入 AGIOne，成为可调度、可计量、可监控的资源池。',
      en: 'Connect private IDC, local GPU, NPU, or XPU resources to AGIOne as schedulable, metered, and observable resource pools.',
    },
    roles: ['operator'],
    subsystems: ['on-prem'],
    tasks: ['gpu', 'npu4'],
  },
  {
    id: 10,
    guideSlug: 'on-prem-inference-template',
    title: { zh: '本地推理模板构建', en: 'On-Prem Inference Template Building' },
    description: {
      zh: '把推理参数沉淀为模板，让用户基于模板快速完成在线推理部署。',
      en: 'Turn inference parameters into templates so users can quickly deploy online inference services.',
    },
    roles: ['operator'],
    subsystems: ['on-prem'],
    tasks: ['gpu', 'npu4'],
  },
  {
    id: 11,
    guideSlug: 'on-prem-model-deployment-status',
    title: { zh: '本地模型部署与状态检查', en: 'On-Prem Model Deployment & Status Check' },
    description: {
      zh: '在本地资源池上部署在线推理服务，确认可运行、可访问、可排障。',
      en: 'Deploy online inference services on local resource pools and confirm they are runnable, accessible, and diagnosable.',
    },
    roles: ['provider', 'enduser'],
    subsystems: ['on-prem'],
    tasks: ['gpu', 'call', 'npu4'],
  },
  {
    id: 12,
    guideSlug: 'on-prem-dev-training-assets',
    title: { zh: '本地开发训练与资产沉淀', en: 'On-Prem Development, Training & Assets' },
    description: {
      zh: '支持开发、训练与数据管理，沉淀模型、镜像、数据集等资产。',
      en: 'Support development, training, and data management while accumulating models, images, datasets, and other assets.',
    },
    roles: ['enduser', 'operator'],
    subsystems: ['on-prem'],
    tasks: ['gpu'],
  },
  {
    id: 13,
    guideSlug: 'on-prem-resource-metering-monitoring',
    title: { zh: '本地资源计量与监控', en: 'On-Prem Resource Metering & Monitoring' },
    description: {
      zh: '控制额度，对资源池运行、水位、用量、账期计量做运营监控。',
      en: 'Control quotas and monitor resource pool runtime status, capacity, usage, and billing-period metering.',
    },
    roles: ['operator', 'provider', 'enduser'],
    subsystems: ['on-prem'],
    tasks: ['gpu', 'bill', 'npu4'],
  },
  {
    id: 14,
    guideSlug: 'on-cloud-resource-access',
    title: { zh: '多云资源接入', en: 'On Cloud Resource Access' },
    description: {
      zh: '把云厂商、云账号、地域、资源池接入平台，并授权给租户或业务类型使用。',
      en: 'Connect cloud providers, cloud accounts, regions, and resource pools, then authorize tenants or business types to use them.',
    },
    roles: ['operator'],
    subsystems: ['on-cloud'],
    tasks: ['gpu'],
  },
  {
    id: 15,
    guideSlug: 'on-cloud-model-asset-publishing',
    title: { zh: '多云模型资产上架', en: 'On Cloud Model Asset Publishing' },
    description: {
      zh: '把云上模型需要的运行环境、框架、分类、模型信息与输出 API 配成可部署资产。',
      en: 'Configure runtime environments, frameworks, categories, model information, and output APIs as deployable cloud model assets.',
    },
    roles: ['operator'],
    subsystems: ['on-cloud'],
    tasks: ['publish'],
  },
  {
    id: 16,
    guideSlug: 'on-cloud-model-deployment-calling',
    title: { zh: '多云模型部署与调用', en: 'On Cloud Model Deployment & Calling' },
    description: {
      zh: '从云上模型广场选模型，完成部署并获得 API 调用能力。',
      en: 'Select models from the cloud model marketplace, deploy them, and obtain API calling capability.',
    },
    roles: ['provider', 'enduser'],
    subsystems: ['on-cloud'],
    tasks: ['gpu', 'call'],
  },
  {
    id: 17,
    guideSlug: 'model-publishing-approval',
    title: { zh: '模型发布审批', en: 'Model Publishing Approval' },
    description: {
      zh: '对模型提供方的发布申请做模型信息、协议、计费、限流的治理审批。',
      en: 'Review provider publishing requests for model information, agreements, billing, and throttling governance.',
    },
    roles: ['operator'],
    subsystems: ['model-services'],
    tasks: ['publish', 'account'],
  },
  {
    id: 18,
    guideSlug: 'observability-troubleshooting',
    title: { zh: '可观测与问题排查', en: 'Observability & Troubleshooting' },
    description: {
      zh: '从模型、Org、资源三个视角定位吞吐、时延、状态、失败和资源问题。',
      en: 'Locate throughput, latency, status, failure, and resource issues from model, organization, and resource perspectives.',
    },
    roles: ['operator', 'provider', 'enduser'],
    subsystems: ['model-services', 'on-prem', 'on-cloud'],
    tasks: ['call', 'gpu'],
  },
  {
    id: 19,
    guideSlug: 'platform-governance-access-control',
    title: { zh: '平台治理与访问控制', en: 'Platform Governance & Access Control' },
    description: {
      zh: '控制谁能访问什么、能调用多少、能使用哪些 Key / Project / 模型 / 额度。',
      en: 'Control who can access what, how much they can call, and which keys, projects, models, and quotas they can use.',
    },
    roles: ['operator', 'provider', 'enduser'],
    subsystems: ['platform', 'settings', 'model-services'],
    tasks: ['account'],
  },
  {
    id: 20,
    guideSlug: 'billing-cycle-reconciliation-settlement',
    title: { zh: '运营账期对账与结算', en: 'Billing-Cycle Reconciliation & Settlement' },
    description: {
      zh: '按账期核对月结、财务账户和巡检异常，在阻塞事项处理后生成并复核结算单。',
      en: 'Reconcile monthly close, financial accounts, and exceptions before generating and reviewing settlement statements.',
    },
    roles: ['operator'],
    subsystems: ['billing'],
    tasks: ['bill'],
  },
  {
    id: 21,
    guideSlug: 'provider-revenue-settlement',
    title: { zh: '服务商收益与结算', en: 'Provider Revenue & Settlement' },
    description: {
      zh: '按客户、模型和账期解释服务商收益，并核对应结算、实际到账和转入条件。',
      en: 'Explain provider revenue by customer, model, and cycle and reconcile expected settlement, receipt, and transfer.',
    },
    roles: ['provider'],
    subsystems: ['billing'],
    tasks: ['bill'],
  },
  {
    id: 22,
    guideSlug: 'project-key-budget-governance',
    title: { zh: '项目、Key 与预算治理', en: 'Project, Key & Budget Governance' },
    description: {
      zh: '用项目预算、模型白名单和独立用途的 Key 控制调用范围、成本和凭据生命周期。',
      en: 'Control calling scope, cost, and credential lifecycle with project budgets, model allowlists, and purpose-specific keys.',
    },
    roles: ['provider', 'enduser'],
    subsystems: ['settings', 'model-services'],
    tasks: ['account', 'call', 'bill'],
  },
  {
    id: 23,
    guideSlug: 'member-quota-application-allocation',
    title: { zh: '成员额度申请与分配', en: 'Member Quota Request & Allocation' },
    description: {
      zh: '为成员申请、调整和限制额度，并协调成员、项目、Key 和模型白名单的多层边界。',
      en: 'Request, adjust, and limit member quota while coordinating member, project, key, and model-allowlist boundaries.',
    },
    roles: ['provider', 'enduser'],
    subsystems: ['settings'],
    tasks: ['account', 'call', 'bill'],
  },
  {
    id: 24,
    guideSlug: 'application-publishing-approval',
    title: { zh: '应用发布与审核', en: 'Application Publishing & Approval' },
    description: {
      zh: '核对应用绑定模型、调用入口和客户范围，完成审核并验证客户可见性与调用。',
      en: 'Review bound models, calling entries, and customer scope, then validate approval, visibility, and calls.',
    },
    roles: ['operator'],
    subsystems: ['model-services'],
    tasks: ['publish'],
  },
  {
    id: 25,
    guideSlug: 'on-prem-runtime-storage-foundation',
    title: { zh: '本地运行镜像与存储底座', en: 'On-Prem Runtime Images & Storage' },
    description: {
      zh: '接入镜像仓库、运行镜像和块/文件/对象存储，并用测试工作负载验证完整运行底座。',
      en: 'Connect image services, runtime images, and block, file, or object storage and validate them with a test workload.',
    },
    roles: ['operator'],
    subsystems: ['on-prem'],
    tasks: ['gpu'],
  },
  {
    id: 26,
    guideSlug: 'api-rate-control-release-audit',
    title: { zh: 'API 流控发布与审计', en: 'API Rate-Control Release & Audit' },
    description: {
      zh: '从流量基线设计和发布流控规则，并核对节点版本、规则命中和审计明细。',
      en: 'Design and release rate-control rules from a traffic baseline and verify node versions, hits, and audit details.',
    },
    roles: ['operator'],
    subsystems: ['settings'],
    tasks: ['account', 'call'],
  },
  {
    id: 27,
    guideSlug: 'on-cloud-scheduling-policy',
    title: { zh: '多云调度策略', en: 'On-Cloud Scheduling Policies' },
    description: {
      zh: '配置首选资源池、容量阈值和故障回退，并用测试部署验证实际调度结果。',
      en: 'Configure preferred pools, capacity thresholds, and failure fallback and validate actual scheduling with a test deployment.',
    },
    roles: ['operator'],
    subsystems: ['on-cloud'],
    tasks: ['gpu'],
  },
  {
    id: 28,
    guideSlug: 'license-lifecycle-management',
    title: { zh: 'License 生命周期管理', en: 'License Lifecycle Management' },
    description: {
      zh: '检查激活状态、有效期、授权构成和纳管对象，提前安排续期或扩容。',
      en: 'Review activation state, validity, authorization composition, and managed objects and prepare renewal or expansion.',
    },
    roles: ['operator'],
    subsystems: ['billing', 'platform'],
    tasks: ['account', 'bill'],
  },
]

const currentRole = ref('all')
const currentSubsystem = ref('all')
const currentTask = ref('all')
const taskSearch = ref('')

const taskOptions = computed(() => {
  const query = taskSearch.value.trim().toLocaleLowerCase()

  return commonTasks
    .filter((task) => {
      if (!query) return true

      const searchableText = `${task.question[locale.value]} ${task.keywords[locale.value]}`.toLocaleLowerCase()
      return searchableText.includes(query)
    })
    .map((task) => ({
      value: task.id,
      label: task.question[locale.value],
    }))
})

const selectedTask = computed(() => commonTasks.find((task) => task.id === currentTask.value) ?? null)

const selectedTaskPath = computed(() => {
  if (!selectedTask.value) return []

  return selectedTask.value.steps.map((step) => {
    const scenario = scenarios.find((item) => item.id === step.scenarioId)!

    return {
      ...scenario,
      guideLink: guidePath(scenario.guideSlug),
      titleText: scenario.title[locale.value],
      stageText: step.stage[locale.value],
      descriptionText: step.description[locale.value],
    }
  })
})

const filteredScenarios = computed(() => {
  return scenarios.filter((scenario) => {
    const roleMatched = currentRole.value === 'all' || scenario.roles.includes(currentRole.value as Role)
    const subsystemMatched =
      currentSubsystem.value === 'all' || scenario.subsystems.includes(currentSubsystem.value as Subsystem)

    return roleMatched && subsystemMatched
  })
})

const localizedScenarios = computed(() =>
  filteredScenarios.value.map((scenario) => ({
    ...scenario,
    guideLink: guidePath(scenario.guideSlug),
    titleText: scenario.title[locale.value],
    descriptionText: scenario.description[locale.value],
  }))
)

function selectRole(role: string) {
  currentRole.value = role
}

function selectSubsystem(subsystem: string) {
  currentSubsystem.value = subsystem
}

function selectTask(task: string) {
  currentTask.value = currentTask.value === task ? 'all' : task
}

function clearFilters() {
  currentRole.value = 'all'
  currentSubsystem.value = 'all'
}

function scenarioNumber(id: number) {
  return String(id).padStart(2, '0')
}

function guidePath(slug: string) {
  const prefix = locale.value === 'zh' ? '/zh-CN/userguide/scenarios' : '/userguide/scenarios'
  return withBase(`${prefix}/${slug}/`)
}
</script>

<template>
  <section class="agp-scenario-guide">
    <div class="agp-task-cloud" :aria-label="uiText[locale].taskCloud">
      <p class="agp-task-cloud-title">{{ uiText[locale].taskCloud }}</p>
      <p class="agp-task-cloud-intro">{{ uiText[locale].taskIntro }}</p>

      <label class="agp-task-search-label" for="agp-task-search">{{ uiText[locale].taskSearch }}</label>
      <input
        id="agp-task-search"
        v-model="taskSearch"
        class="agp-task-search"
        type="search"
        :placeholder="uiText[locale].taskSearchPlaceholder"
        autocomplete="off"
      >

      <div v-if="taskOptions.length" class="agp-task-bubbles">
        <button
          v-for="task in taskOptions"
          :key="task.value"
          type="button"
          :class="{ 'is-active': currentTask === task.value }"
          :aria-pressed="currentTask === task.value"
          @click="selectTask(task.value)"
        >
          {{ task.label }}
        </button>
      </div>
      <p v-else class="agp-task-empty">{{ uiText[locale].taskEmpty }}</p>
    </div>

    <section v-if="selectedTask" class="agp-recommended" :aria-label="uiText[locale].recommendedPath">
      <div class="agp-section-head agp-recommended-head">
        <span class="agp-section-kicker">{{ uiText[locale].selectedTask }}</span>
        <h2>{{ selectedTask.question[locale] }}</h2>
        <p>{{ selectedTask.goal[locale] }}</p>
      </div>

      <div class="agp-recommended-meta">
        <div>
          <span class="agp-filter-label">{{ uiText[locale].applicableRoles }}</span>
          <div class="agp-pill-row">
            <span
              v-for="role in selectedTask.roles"
              :key="role"
              class="agp-pill"
              :class="`agp-pill-${role === 'enduser' ? 'eu' : role}`"
            >
              {{ roleLabels[locale][role] }}
            </span>
          </div>
        </div>
        <span class="agp-path-count">{{ selectedTaskPath.length }} {{ uiText[locale].pathCountSuffix }}</span>
      </div>

      <div class="agp-section-head agp-path-heading">
        <h2>{{ uiText[locale].recommendedPath }}</h2>
        <p>{{ uiText[locale].recommendedIntro }}</p>
      </div>

      <ol class="agp-path-list">
        <li v-for="(scenario, index) in selectedTaskPath" :key="scenario.id" class="agp-path-item">
          <span class="agp-card-index">{{ scenarioNumber(index + 1) }}</span>
          <div class="agp-path-copy">
            <span class="agp-path-stage">{{ scenario.stageText }}</span>
            <h3>{{ scenario.titleText }}</h3>
            <p>{{ scenario.descriptionText }}</p>
          </div>
          <a class="agp-path-cta" :href="scenario.guideLink">{{ uiText[locale].cta }}</a>
        </li>
      </ol>
    </section>

    <div class="agp-section-head">
      <h2>{{ uiText[locale].scenarios }}</h2>
      <p>
        {{ uiText[locale].summaryPrefix }} {{ localizedScenarios.length }} {{ uiText[locale].summarySuffix }}
      </p>
    </div>

    <div class="agp-filter-bar" :aria-label="uiText[locale].filters">
      <div class="agp-filter-row">
        <span class="agp-filter-label">{{ uiText[locale].role }}</span>
        <div class="agp-chip-group">
          <button
            v-for="role in roleOptions"
            :key="role.value"
            type="button"
            :class="{ 'is-active': currentRole === role.value }"
            @click="selectRole(role.value)"
          >
            {{ role.label }}
          </button>
        </div>
      </div>

      <div class="agp-filter-row">
        <span class="agp-filter-label">{{ uiText[locale].subsystem }}</span>
        <div class="agp-chip-group">
          <button
            v-for="subsystem in subsystemOptions"
            :key="subsystem.value"
            type="button"
            :class="{ 'is-active': currentSubsystem === subsystem.value }"
            @click="selectSubsystem(subsystem.value)"
          >
            {{ subsystem.label }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="localizedScenarios.length" class="agp-card-grid">
      <article
        v-for="scenario in localizedScenarios"
        :id="`sc-${scenario.id}`"
        :key="scenario.id"
        class="agp-card"
      >
        <div class="agp-card-head">
          <div>
            <h3>{{ scenario.titleText }}</h3>
            <p>{{ scenario.descriptionText }}</p>
          </div>
          <span class="agp-card-index">{{ scenarioNumber(scenario.id) }}</span>
        </div>

        <div class="agp-card-tags">
          <div class="agp-pill-row">
            <span
              v-for="subsystem in scenario.subsystems"
              :key="subsystem"
              class="agp-pill"
              :class="`agp-pill-${subsystem}`"
            >
              {{ subsystemLabels[locale][subsystem] }}
            </span>
          </div>
          <div class="agp-pill-row">
            <span
              v-for="role in scenario.roles"
              :key="role"
              class="agp-pill"
              :class="`agp-pill-${role === 'enduser' ? 'eu' : role}`"
            >
              {{ roleLabels[locale][role] }}
            </span>
          </div>
        </div>

        <a class="agp-card-cta" :href="scenario.guideLink">{{ uiText[locale].cta }}</a>
      </article>
    </div>

    <div v-else class="agp-empty">
      <p>{{ uiText[locale].empty }}</p>
      <button type="button" @click="clearFilters">{{ uiText[locale].clear }}</button>
    </div>
  </section>
</template>

<style scoped>
.agp-scenario-guide {
  --agp-card-bg: var(--vp-c-bg-soft);
  --agp-card-elevated: var(--vp-c-bg);
  --agp-border: var(--vp-c-divider);
  --agp-muted: var(--vp-c-text-2);
  --agp-text: var(--vp-c-text-1);
  --agp-primary: var(--vp-c-brand-1);
  --agp-primary-strong: #2748a8;
  --agp-primary-soft: var(--vp-c-brand-soft);
  margin-top: 24px;
}

.agp-task-cloud,
.agp-filter-bar,
.agp-empty {
  border: 1px solid var(--agp-border);
  border-radius: 14px;
  background: var(--agp-card-bg);
}

.agp-task-cloud {
  padding: 16px 18px 18px;
  margin-bottom: 28px;
}

.agp-task-cloud-title {
  margin: 0 0 6px;
  color: var(--agp-text);
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
}

.agp-task-cloud-intro,
.agp-task-empty {
  margin: 0;
  color: var(--agp-muted);
}

.agp-task-search-label {
  display: block;
  margin-top: 16px;
  color: var(--agp-muted);
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
}

.agp-task-search {
  box-sizing: border-box;
  width: 100%;
  margin: 6px 0 14px;
  padding: 9px 12px;
  border: 1px solid var(--agp-border);
  border-radius: 7px;
  outline: none;
  background: var(--agp-card-elevated);
  color: var(--agp-text);
  font: inherit;
  line-height: 1.4;
  transition: border-color 0.16s ease, box-shadow 0.16s ease;
}

.agp-task-search:focus {
  border-color: var(--agp-primary);
  box-shadow: 0 0 0 3px var(--agp-primary-soft);
}

.agp-task-empty {
  padding: 8px 0 2px;
}

.agp-task-bubbles,
.agp-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.agp-task-bubbles button,
.agp-chip-group button,
.agp-empty button {
  appearance: none;
  border: 1px solid var(--agp-border);
  border-radius: 999px;
  background: var(--agp-card-elevated);
  color: var(--agp-muted);
  cursor: pointer;
  font: inherit;
  transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease;
}

.agp-task-bubbles button {
  min-width: 148px;
  padding: 9px 16px;
}

.agp-chip-group button {
  min-height: 32px;
  padding: 6px 12px;
}

.agp-task-bubbles button:hover,
.agp-task-bubbles button.is-active,
.agp-chip-group button:hover,
.agp-chip-group button.is-active {
  border-color: var(--agp-primary);
  background: var(--agp-primary-soft);
  color: var(--agp-primary);
}

.agp-section-head {
  margin: 0 0 14px;
}

.agp-section-head h2 {
  margin: 0 0 8px;
  padding-top: 0;
  border-top: 0;
}

.agp-section-head p {
  margin: 0;
  color: var(--agp-muted);
}

.agp-recommended {
  margin-bottom: 36px;
}

.agp-recommended-head {
  margin-bottom: 16px;
}

.agp-section-kicker {
  display: block;
  margin-bottom: 6px;
  color: var(--agp-primary);
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
}

.agp-recommended-meta {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--agp-border);
}

.agp-recommended-meta .agp-filter-label {
  display: block;
  padding: 0 0 7px;
}

.agp-path-count {
  flex: 0 0 auto;
  color: var(--agp-muted);
  font-size: 13px;
  font-weight: 700;
}

.agp-path-heading {
  margin-top: 20px;
}

.agp-path-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.agp-path-item {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
  padding: 18px;
  border: 1px solid var(--agp-border);
  border-radius: 14px;
  background: var(--agp-card-bg);
}

.agp-path-copy h3 {
  margin: 6px 0 0;
  color: var(--agp-text);
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
}

.agp-path-copy p {
  margin: 6px 0 0;
  color: var(--agp-muted);
  line-height: 1.65;
}

.agp-path-stage {
  display: inline-flex;
  padding: 3px 8px;
  border: 1px solid var(--agp-primary);
  border-radius: 4px;
  background: var(--agp-primary-soft);
  color: var(--agp-primary);
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
}

.agp-filter-bar {
  display: grid;
  gap: 14px;
  padding: 16px;
  margin-bottom: 18px;
}

.agp-filter-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.agp-filter-label {
  padding-top: 7px;
  color: var(--agp-muted);
  font-size: 13px;
  line-height: 20px;
  font-weight: 700;
}

.agp-card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.agp-card {
  display: flex;
  flex-direction: column;
  min-height: 360px;
  padding: 24px;
  border: 1px solid var(--agp-border);
  border-radius: 14px;
  background: var(--agp-card-bg);
}

.agp-card-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.agp-card h3 {
  margin: 0;
  color: var(--agp-text);
  font-size: 22px;
  line-height: 30px;
  font-weight: 760;
}

.agp-card p {
  margin: 18px 0 0;
  color: var(--agp-text);
  line-height: 1.85;
}

.agp-card-index {
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: rgba(46, 52, 100, 0.92);
  color: #dce4ff;
  font-size: 15px;
  line-height: 1;
  font-weight: 800;
}

.agp-card-tags {
  margin-top: auto;
  padding-top: 28px;
}

.agp-pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.agp-pill-row + .agp-pill-row {
  margin-top: 8px;
}

.agp-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 32px;
  gap: 6px;
  padding: 3px 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  white-space: nowrap;
  font-size: 13px;
  line-height: 1;
  font-weight: 700;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.agp-pill-operator {
  color: #aeb8ff;
  background: rgba(46, 52, 100, 0.84);
  border-color: rgba(125, 139, 255, 0.48);
}

.agp-pill-provider {
  color: #64d994;
  background: rgba(25, 79, 55, 0.78);
  border-color: rgba(91, 198, 133, 0.44);
}

.agp-pill-eu {
  color: #c7a6ff;
  background: rgba(75, 42, 122, 0.78);
  border-color: rgba(169, 123, 255, 0.44);
}

.agp-pill-platform {
  color: #86b7ff;
  background: rgba(28, 53, 105, 0.82);
  border-color: rgba(86, 145, 255, 0.5);
}

.agp-pill-settings {
  color: #c89bff;
  background: rgba(70, 42, 109, 0.82);
  border-color: rgba(169, 99, 255, 0.48);
}

.agp-pill-model-services,
.agp-pill-on-prem {
  color: #ffb36a;
  background: rgba(75, 54, 44, 0.86);
  border-color: rgba(201, 126, 73, 0.44);
}

.agp-pill-billing {
  color: #ff8fb9;
  background: rgba(91, 35, 59, 0.8);
  border-color: rgba(225, 83, 137, 0.46);
}

.agp-pill-on-cloud {
  color: #65d6ee;
  background: rgba(27, 74, 86, 0.82);
  border-color: rgba(61, 184, 211, 0.46);
}

.agp-card-cta,
.agp-path-cta {
  display: block;
  margin-top: 22px;
  padding: 10px 12px;
  border-radius: 7px;
  background: var(--vp-c-brand-3);
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  transition: background 0.15s ease;
}

.agp-card-cta:hover,
.agp-path-cta:hover {
  background: var(--agp-primary-strong);
  color: #ffffff;
}

.agp-path-cta {
  min-width: 96px;
  margin-top: 0;
  align-self: center;
}

.agp-empty {
  padding: 24px;
  text-align: center;
  color: var(--agp-muted);
}

.agp-empty p {
  margin: 0 0 12px;
}

.agp-empty button {
  padding: 8px 14px;
}

:global(html:not(.dark) .agp-card),
:global(html:not(.dark) .agp-path-item) {
  background: #ffffff;
  border-color: #e5e7eb;
}

:global(html:not(.dark) .agp-card-index) {
  background: #eef2ff;
  color: #334155;
  border: 1px solid #c7d2fe;
}

:global(html:not(.dark) .agp-pill) {
  box-shadow: none;
}

:global(html:not(.dark) .agp-pill-platform) {
  color: #1d4ed8;
  background: #dbeafe;
  border-color: #93c5fd;
}

:global(html:not(.dark) .agp-pill-settings),
:global(html:not(.dark) .agp-pill-eu) {
  color: #6d28d9;
  background: #ede9fe;
  border-color: #c4b5fd;
}

:global(html:not(.dark) .agp-pill-operator) {
  color: #3730a3;
  background: #e0e7ff;
  border-color: #a5b4fc;
}

:global(html:not(.dark) .agp-pill-provider) {
  color: #047857;
  background: #d1fae5;
  border-color: #86efac;
}

:global(html:not(.dark) .agp-pill-model-services),
:global(html:not(.dark) .agp-pill-on-prem) {
  color: #b45309;
  background: #ffedd5;
  border-color: #fdba74;
}

:global(html:not(.dark) .agp-pill-billing) {
  color: #be185d;
  background: #fce7f3;
  border-color: #f9a8d4;
}

:global(html:not(.dark) .agp-pill-on-cloud) {
  color: #0e7490;
  background: #cffafe;
  border-color: #67e8f9;
}

@media (max-width: 960px) {
  .agp-card-grid {
    grid-template-columns: 1fr;
  }

  .agp-filter-row {
    grid-template-columns: 1fr;
  }

  .agp-filter-label {
    padding-top: 0;
  }

  .agp-path-item {
    grid-template-columns: 46px minmax(0, 1fr);
  }

  .agp-path-cta {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 640px) {
  .agp-task-bubbles button {
    width: 100%;
  }

  .agp-recommended-meta {
    align-items: start;
    flex-direction: column;
  }

  .agp-path-item {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 12px;
    padding: 14px;
  }

  .agp-path-item .agp-card-index {
    width: 40px;
    height: 40px;
    border-radius: 11px;
  }

  .agp-path-cta {
    grid-column: 1 / -1;
    width: 100%;
  }
}
</style>
