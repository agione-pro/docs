export const zhNavbar = [
  { text: '首页', link: '/zh-CN/' },
  { text: '产品概述', link: '/zh-CN/product/' },
  {
    text: '文档中心',
    items: [
      { text: '安装部署', link: '/zh-CN/installation/' },
      { text: '购买与激活', link: '/zh-CN/license/' },
      { text: '用户指南', link: '/zh-CN/userguide/scenarios' },
      { text: '用户手册', link: '/zh-CN/usermanual/' },
      {
        text: '最佳实践',
        items: [
          { text: '技术实践', link: '/zh-CN/practices/technical/' },
          { text: '项目实践', link: '/zh-CN/practices/project/' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'FAQ', link: '/zh-CN/others/faq/' },
          { text: '版本说明', link: '/zh-CN/others/release-notes/' },
        ]
      },
    ]
  },
  { text: 'AGIOne', link: 'https://agione.cc/' },
  { text: 'AI助手', link: 'https://sourcelens.oneprocloud.com/lens/assistants/AI_AGIOne/chat' },
  // { text: '技术支持', link: 'https://support.oneprocloud.com/' },
  // { text: '常见问题', link: 'https://qa.oneprocloud.com/' },
  { text: 'OneProCloud', link: 'https://oneprocloud.com/' },
]
