import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AGIOne',
  description: 'AI Gateway Platform Documentation',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'AGIOne',
      description: 'AI Gateway Platform Documentation',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Pre-Sales', link: '/presales/' },
          { text: 'Solution', link: '/solution/' },
          { text: 'Deployment', link: '/deployment/' },
          { text: 'Operations', link: '/operations/' },
          { text: 'Troubleshooting', link: '/troubleshooting/' },
        ],
        sidebar: true,
        socialLinks: [
          { icon: 'github', link: 'https://github.com/agione-pro/agione-docs' }
        ]
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'AGIOne',
      description: 'AI 网关平台文档',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '售前资料', link: '/zh/presales/' },
          { text: '方案设计', link: '/zh/solution/' },
          { text: '交付部署', link: '/zh/deployment/' },
          { text: '运维运营', link: '/zh/operations/' },
          { text: '排错支持', link: '/zh/troubleshooting/' },
        ],
        sidebar: true,
        socialLinks: [
          { icon: 'github', link: 'https://github.com/agione-pro/agione-docs' }
        ]
      }
    }
  }
})
