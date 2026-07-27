import type { UserConfig } from 'vitepress'

const googleAnalyticsId = 'G-H60V3SBCER'
const enableGoogleAnalytics = process.env.NODE_ENV === 'production'

export const baseConfig: UserConfig = {
  title: 'AGIOne Docs',
  description: 'AI Gateway Platform Documentation',
  head: enableGoogleAnalytics ? [
    [
      'script',
      {
        async: '',
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
      },
    ],
    [
      'script',
      {},
      `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `,
    ],
  ] : [],
}
