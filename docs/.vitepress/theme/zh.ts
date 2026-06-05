import type { DefaultTheme } from 'vitepress'
import { zhNavbar } from './navbar/zh'
import { zhSidebar } from './sidebar/zh'

export const zhTheme: DefaultTheme.Config = {
  nav: zhNavbar,
  sidebar: zhSidebar,
  outline: {
    level: [2, 3],
  },
}
