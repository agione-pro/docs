export const enNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Product Overview', link: '/product/' },
  {
    text: 'Documentation',
    items: [
      { text: "Deployment & Configuration", link: '/installation/' },
      { text: "Purchase & Activation", link: "/license/" },
      { text: "User Guide", link: "/userguide/scenarios" },
      { text: "User Manual", link: "/usermanual/" },
      {
        text: "Best Practices",
        items: [
          { text: "Technical Practices", link: "/practices/technical/" },
          { text: "Project Practices", link: "/practices/project/" },
        ]
      },
      {
        text: "API Reference",
        items: [
          { text: "Model API (OpenAPI)", link: "/api/openapi/" },
          { text: "Platform API", link: "/api/system-api/" },
          { text: "Protocol Compatibility", link: "/api/protocol-compatibility/" },
        ]
      },
      {
        text: "Operations Center",
        items: [
          { text: "Monitor Matrix", link: "/operations/monitor-matrix/" },
        ]
      },
      // { text: "Tools", link: "/tools/" },
      {
        text: "Others",
        items: [
          { text: "FAQ", link: "/others/faq/" },
          { text: "Upgrade Notes", link: "/others/upgrade/model-business-upgrade-2026-11/" },
          { text: "Release Notes", link: "/others/release-notes/" }
        ]
      },
    ],
  },
  { text: 'AGIOne', link: 'https://agione.pro/' },
  { text: 'AI Support', link: 'https://sourcelens.oneprocloud.com/lens/assistants/AI_AGIOne/chat' },
  // { text: 'Get Support', link: 'https://support.oneprocloud.com/' },
  // { text: 'FAQ', link: 'https://qa.oneprocloud.com/' },
  { text: 'OneProCloud', link: 'https://oneprocloud.com/' },
]
