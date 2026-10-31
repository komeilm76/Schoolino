import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * Schoolino Vite configuration.
 *
 * Notes:
 * - Tailwind is loaded through its official Vite plugin (v4, CSS-first config).
 * - Vuetify is loaded through its official Vite plugin so component styles are
 *   tree-shaken and injected per component. SASS settings live in
 *   `src/styles/vuetify-settings.scss` and put every Vuetify rule inside the
 *   `vuetify` CSS layer, which keeps Vuetify from fighting Tailwind utilities.
 * - `allowedHosts: true` is required so the app can be served behind the
 *   sandbox preview domain.
 */
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/styles/vuetify-settings.scss' },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    allowedHosts: true,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue'],
          vuetify: ['vuetify'],
        },
      },
    },
  },
})
