import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: { configFile: 'src/styles/vuetify-settings.scss' },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    setupFiles: ['./tests/setup.ts'],
    // Vuetify ships CSS side-effect imports; inline the package so Vite handles
    // them instead of Node's ESM loader.
    server: { deps: { inline: ['vuetify'] } },
    include: ['tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['src/composables/**/*.ts', 'src/utils/**/*.ts', 'src/data/**/*.ts'],
    },
  },
})
