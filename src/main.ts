import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import { registerIcons } from './plugins/icons'
import { revealDirective } from './plugins/reveal'

// Fonts are bundled locally (woff2, subset per script) — no Google Fonts request.
import '@fontsource-variable/vazirmatn'
import '@fontsource-variable/estedad'
import '@fontsource-variable/plus-jakarta-sans'

import './styles/main.css'

registerIcons()

const app = createApp(App)

app.use(vuetify)
app.use(MotionPlugin)
app.directive('reveal', revealDirective)

app.mount('#app')
