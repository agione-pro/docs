import type { DefaultTheme } from 'vitepress'
import { enNavbar } from './navbar/en'
import { enSidebar } from './sidebar/en'

export const enTheme: DefaultTheme.Config = {
  nav: enNavbar,
  sidebar: enSidebar,
  outline: {
    level: [2, 3],
  },
}
