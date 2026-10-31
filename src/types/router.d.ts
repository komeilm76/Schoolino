import 'vue-router'
import type { Panel } from '../data/content'
declare module 'vue-router' {
  interface RouteMeta {
    panel?: Panel
    title?: string
  }
}
