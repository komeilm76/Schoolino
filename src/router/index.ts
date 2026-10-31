import { createRouter, createWebHistory, type RouterHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import { panelTitles, type Panel } from '../data/content'
const panelPaths: Record<Panel, string> = {
  about: 'about',
  solutions: 'solutions',
  services: 'services',
  contact: 'contact',
  cooperate: 'cooperate',
  it: 'services/it',
  ai: 'services/ai',
  education: 'services/education',
}
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
    children: (Object.keys(panelPaths) as Panel[]).map((panel) => ({
      path: panelPaths[panel],
      name: panel,
      component: () => import('../views/PanelPage.vue'),
      meta: { panel, title: panelTitles[panel] },
    })),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundPage.vue'),
    meta: { title: 'صفحه پیدا نشد' },
  },
]
/** Browser history in production; injectable memory history for isolated tests. */
export function createAppRouter(
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, saved) {
      // Dialog URLs retain the background scroll position; Back restores native history.
      if (saved) return saved
      if (to.hash) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        return { el: to.hash, behavior: reduceMotion ? 'instant' : 'smooth' }
      }
      if (to.meta.panel || from.meta.panel) return false
      return { top: 0 }
    },
  })
}
