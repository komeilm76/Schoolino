import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import 'vuetify/styles'
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/700.css'
import './style.css'
import App from './App.vue'
import { createAppRouter } from './router'
import { createAppVuetify } from './plugins/vuetify'
const router = createAppRouter()
const app = createApp(App).use(router).use(createAppVuetify()).use(MotionPlugin)
// Resolve direct URLs before mounting to avoid a flash of the wrong route.
void router.isReady().then(() => app.mount('#app'))
