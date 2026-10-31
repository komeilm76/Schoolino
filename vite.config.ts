import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
export default defineConfig(({ mode }) => ({
  plugins: [vue(), tailwindcss(), ...(mode === 'inspect' ? [vueDevTools()] : [])],
  server: { host: '0.0.0.0', allowedHosts: true },
}))
