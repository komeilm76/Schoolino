import { useRouter } from 'vue-router'
import { usePreferredReducedMotion } from '@vueuse/core'
import type { Panel } from '../data/content'
/** Route-backed actions shared by header, hero and cards, with native anchor scrolling. */
export function useNavigation() {
  const router = useRouter()
  const reducedMotion = usePreferredReducedMotion()
  const behavior = () =>
    reducedMotion.value === 'reduce' ? ('instant' as const) : ('smooth' as const)
  function openPanel(panel: Panel) {
    return router.push({ name: panel })
  }
  async function goHome() {
    await router.push({ name: 'home' })
    window.scrollTo({ top: 0, behavior: behavior() })
  }
  async function showServices() {
    await router.push({ name: 'home', hash: '#services' })
  }
  return { openPanel, goHome, showServices }
}
