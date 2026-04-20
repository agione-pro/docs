import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "agione-docs",
  description: "A VitePress Site Of Agione Docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: true,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/agione-pro/agione-docs' }
    ]
  }
})
