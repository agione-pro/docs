import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import ScenarioGuide from './components/ScenarioGuide.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ScenarioGuide', ScenarioGuide)
  },
  setup() {
    if (typeof window === 'undefined') return
    const route = useRoute()

    const init = async () => {
      const { default: mediumZoom } = await import('medium-zoom')
      const zoom = mediumZoom({ background: 'var(--vp-c-bg)' })

      const updateZoom = () => {
        zoom.detach()
        zoom.attach('.main img')
        document.querySelectorAll<HTMLElement>('.main img').forEach((el) => {
          el.style.setProperty('transition-duration', '0.3s', 'important')
        })
      }

      updateZoom()
      watch(
        () => route.path,
        () => nextTick(() => updateZoom())
      )
    }

    const updateApiPageClass = () => {
      const isApi = route.path.includes('/api/')
      const layoutEl = document.querySelector('.Layout')
      if (layoutEl) {
        layoutEl.classList.toggle('api-page', isApi)
      }
    }

    onMounted(() => {
      init()
      updateApiPageClass()
    })

    watch(
      () => route.path,
      () => nextTick(() => updateApiPageClass())
    )
  },
}
