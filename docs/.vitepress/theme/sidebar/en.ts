import type { DefaultTheme } from 'vitepress'

export const enSidebar: DefaultTheme.Sidebar = {
  "/product/": [
    {
      text: "Product Overview",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/product/technical/overview"
        },
        {
          text: "Features & Ability",
          link: "/product/technical/features"
        },
        {
          text: "Network Planning",
          link: "/product/technical/network"
        },
        {
          text: "Technical Highlights",
          link: "/product/technical/tech-highlights"
        }
      ]
    },
    {
      text: "Identity and Access Model",
      collapsed: false,
      items: [
        { text: "User, Tenant, and Role Design Logic", link: "/product/identity-access-model" },
        { text: "Role Comparison", link: "/product/role-comparison" },
      ],
    },
    {
      text: "Compatibility & Limitations",
      collapsed: false,
      items: [
        {
          text: "Managed Chips",
          link: "/product/limitations/chips"
        },
        {
          text: "Support Matrix",
          link: "/product/limitations/support-matrix"
        },
        {
          text: "Other Limitations",
          link: "/product/limitations/limitations"
        },
      ]
    },
    {
      text: "Investigation",
      link: "/product/investigation/",
      items: [
        {
          text: "Quick Requirements Investigation",
          link: "/product/investigation/quick-requirement-investigation"
        },
        {
          text: "Quick Environmental Investigation",
          link: "/product/investigation/quick-env-investigation"
        },
      ]
    },
  ],
  "/installation/": [
    {
      text: "Installation",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/installation/agione-deployment-requirements"
        },
        {
          text: "Pre-install Environment Check",
          link: "/installation/agione-precheck-environment-check"
        },
        {
          text: "Installation & Deployment",
          link: "/installation/agione-quick-install"
        },
        {
          text: "Multi-Node Installation",
          link: "/installation/agione-multi-node-install"
        },
        {
          text: "Installation Configuration Reference",
          link: "/installation/agione-install-config-reference"
        },
        {
          text: "Compute Nodes-Requirements",
          link: "/installation/deployment-requirements-for-managing-compute-nodes"
        },
        {
          text: "Compute Nodes-Installation",
          link: "/installation/quick-install-for-managing-compute-nodes"
        },
      ],
    }
  ],
  "/license/": [
    {
      text: "Purchase & Activation",
      collapsed: false,
      items: [
        { text: "Online Payment & Activation", link: "/license/online-payment-activation" },
        {
          text: "Activation Code & Activation",
          link: "/license/activation-code-activation"
        }
      ]
    }
  ],
  "/userguide/": [
    {
      text: "User Guide",
      collapsed: false,
      items: [
        {
          text: "Compute Resource Integration",
          collapsed: false,
          items: [
            { text: "Public Integration", link: "/userguide/public-ai-integration" },
          ]
        },
        {
          text: "Compute Resource Management",
          collapsed: false,
          items: [
            { text: "A100 Management", link: "/userguide/a100-management" }
          ]
        },
        {
          text: "Model Management",
          collapsed: false,
          items: [
            { text: "Model Deployment", link: "/userguide/mode-deployment" },
          ]
        }
      ]
    }
  ],
  "/usermanual/": [
    {
      text: "User Manual",
      collapsed: false,
      items: [
        {
          text: "User Quick Guide",
          link: "/usermanual/user-quick-guide"
        },
        {
          text: "Provider Quick Guide",
          link: "/usermanual/provider-quick-guide"
        },
        {
          text: "Model Services",
          collapsed: false,
          items: [
            {
              text: "Provider",
              collapsed: false,
              items: [
                {
                  text: "Discover",
                  collapsed: false,
                  items: [
                    { text: "Model Marketplace", link: "/usermanual/model-services/user/discover/models/" },
                  ]
                },
                {
                  text: "Playground",
                  collapsed: false,
                  items: [
                    { text: "Text", link: "/usermanual/model-services/user/playground/text/" },
                    { text: "Images", link: "/usermanual/model-services/user/playground/images/" },
                    { text: "Video", link: "/usermanual/model-services/user/playground/video/" },
                    { text: "Audio", link: "/usermanual/model-services/user/playground/audio/" },
                  ]
                },
                {
                  text: "Studio",
                  collapsed: false,
                  items: [
                    { text: "My Models", link: "/usermanual/model-services/user/studio/my-models/" },
                  ]
                },
                {
                  text: "Usage & Revenue",
                  collapsed: false,
                  items: [
                    { text: "Revenue", link: "/usermanual/model-services/user/usage-revenue/revenue/" },
                    { text: "Usage", link: "/usermanual/model-services/user/usage-revenue/usage/" },
                  ]
                },
                {
                  text: "My Calls",
                  collapsed: false,
                  items: [
                    { text: "Overview", link: "/usermanual/model-services/user/my-calls/overview/" },
                    { text: "Call Analytics", link: "/usermanual/model-services/user/my-calls/call-analytics/" },
                    { text: "Call Logs", link: "/usermanual/model-services/user/my-calls/call-logs/" },
                  ]
                },
                {
                  text: "Customer Calls",
                  collapsed: false,
                  items: [
                    { text: "Overview", link: "/usermanual/model-services/user/customer-calls/overview/" },
                    { text: "Call Analytics", link: "/usermanual/model-services/user/customer-calls/call-analytics/" },
                    { text: "Call Logs", link: "/usermanual/model-services/user/customer-calls/call-logs/" },
                  ]
                },
              ]
            },
            {
              text: "Operator",
              collapsed: false,
              items: [
                {
                  text: "Settings",
                  collapsed: false,
                  items: [
                    { text: "Meta-models", link: "/usermanual/model-services/operator/settings/meta-models/" },
                    { text: "Model Source", link: "/usermanual/model-services/operator/settings/model-source/" },
                    { text: "Model Templates", link: "/usermanual/model-services/operator/settings/model-templates/" },
                    { text: "Tags", link: "/usermanual/model-services/operator/settings/tags/" },
                    { text: "Currency Settings", link: "/usermanual/model-services/operator/settings/currency-settings/" },
                  ]
                },
                {
                  text: "Publishing",
                  collapsed: false,
                  items: [
                    { text: "Apps", link: "/usermanual/model-services/operator/publishing/apps/" },
                  ]
                },
                {
                  text: "Approvals",
                  collapsed: false,
                  items: [
                    { text: "Model Reviews", link: "/usermanual/model-services/operator/approvals/model-reviews/" },
                    { text: "App Reviews", link: "/usermanual/model-services/operator/approvals/app-reviews/" },
                  ]
                },
              ]
            },
          ]
        },
        {
          text: "AI Infra on Cloud",
          collapsed: false,
          items: [
            {
              text: "Provider",
              collapsed: false,
              items: [
                {
                  text: "Model Services",
                  collapsed: false,
                  items: [
                    { text: "Quick Deploy", link: "/usermanual/ai-infra-on-cloud/user/model-services/quick-start/" },
                    { text: "My Deployments", link: "/usermanual/ai-infra-on-cloud/user/model-services/my-deployments/" },
                  ]
                },
                {
                  text: "Access Management",
                  collapsed: false,
                  items: [
                    { text: "Access Management", link: "/usermanual/ai-infra-on-cloud/user/access-management/access-accounts/" },
                  ]
                },
              ]
            },
            {
              text: "Operator",
              collapsed: false,
              items: [
                {
                  text: "Cloud Access",
                  collapsed: false,
                  items: [
                    { text: "Quick Start", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/quick-start/" },
                    { text: "Access CloudType", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/access-cloudtype/" },
                    { text: "CloudType Auth", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/cloudtype-auth/" },
                    { text: "Resource Pools", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/resource-pools/" },
                    { text: "Cloud Region Auth", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/cloud-region-auth/" },
                    { text: "Cloud Accounts", link: "/usermanual/ai-infra-on-cloud/operator/cloud-access/cloud-accounts/" },
                  ]
                },
                {
                  text: "Models",
                  collapsed: false,
                  items: [
                    { text: "Publish Guide", link: "/usermanual/ai-infra-on-cloud/operator/models/publish-guide/" },
                    { text: "Models", link: "/usermanual/ai-infra-on-cloud/operator/models/models/" },
                    { text: "Categories", link: "/usermanual/ai-infra-on-cloud/operator/models/categories/" },
                    { text: "Frameworks", link: "/usermanual/ai-infra-on-cloud/operator/models/frameworks/" },
                    { text: "Runtime Images", link: "/usermanual/ai-infra-on-cloud/operator/models/runtime-images/" },
                  ]
                },
              ]
            },
          ]
        },
        {
          text: "AI Infra on Prem",
          link: "/usermanual/ai-infra-on-prem/"
        }
      ]
    }
  ],
  "/practices/technical/": [
    {
      text: "Technical Practices",
      collapsed: false,
      items: [
        {
          text: "AI Coding Integration",
          collapsed: false,
          items: [
            { text: "CherryStudio", link: "/practices/technical/CherryStudio/" },
            { text: "claudeCode", link: "/practices/technical/claudeCode/" },
            { text: "ClaudeCode-plugin", link: "/practices/technical/ClaudeCode-plugin/" },
            { text: "Cline", link: "/practices/technical/Cline/" },
            { text: "Codex", link: "/practices/technical/Codex/" },
            { text: "Crush", link: "/practices/technical/Crush/" },
            { text: "Cursor", link: "/practices/technical/Cursor/" },
            { text: "dify", link: "/practices/technical/dify/" },
            { text: "KiloCode", link: "/practices/technical/KiloCode/" },
            { text: "n8n", link: "/practices/technical/n8n/" },
            { text: "open-webui", link: "/practices/technical/open-webui/" },
            { text: "openclaw", link: "/practices/technical/openclaw/" },
            { text: "OpenCode", link: "/practices/technical/OpenCode/" },
            { text: "RooCode", link: "/practices/technical/RooCode/" },
          ]
        },
      ]
    }
  ],
  "/practices/project/": [
    {
      text: "Project Practices",
      collapsed: false,
      items: [
        { text: "Multi-Compute Pool Heterogeneous Inference Scheduling Best Practice", link: "/practices/project/multi-compute-pool-heterogeneous-inference-scheduling" }
      ]
    }
  ],
  "/operations/admin-portal-manual/": [
    {
      text: "Admin Portal Manual",
      collapsed: false,
      items: [
        {
          text: "User", link: "/operations/admin-portal-manual/user",
        }
      ]
    }
  ],
  "/operations/om-guide/": [
    {
      text: "O&M Guide",
      collapsed: false,
      items: [
        {
          text: "User", link: "/operations/om-guide/user",
        }
      ]
    }
  ],
  "/others/faq/": [
    {
      text: "FAQ",
      collapsed: false,
      items: [
          { text: "General", link: "/others/faq/general" },
          { text: "Platform", link: "/others/faq/platform" },
          { text: "Compute", link: "/others/faq/compute" },
          { text: "Models", link: "/others/faq/model" },
          { text: "Inference", link: "/others/faq/inference" },
          { text: "Ops & Security", link: "/others/faq/ops" },
      ]
    }
  ],
  "/others/release-notes/": [
    {
      text: "Update Notes",
      link: "/others/release-notes/",
      collapsed: false,
    }
  ],
}
