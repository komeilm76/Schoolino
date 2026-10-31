import { mount, type MountingOptions } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { revealDirective } from '@/plugins/reveal'
import type { Component } from 'vue'

/**
 * Mounts a component with the real Vuetify instance and the `v-reveal`
 * directive, so tests exercise the same wiring as the app.
 */
export function mountWithApp<T>(component: Component, options: MountingOptions<T> = {}) {
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify],
      directives: { reveal: revealDirective },
      ...options.global,
    },
  })
}
