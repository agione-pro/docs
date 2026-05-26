import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
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

    onMounted(init)
  },
}
