import { computed, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { vuetify } from '@/plugins/vuetify'

/** Theme values supported by Schoolino. */
export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'schoolino:theme'

// Module-level singletons: the header toggle and any other consumer share state.
const preferredDark = usePreferredDark()
const storedTheme = useStorage<ThemeName | 'system'>(STORAGE_KEY, 'system')

/** Applies the theme to <html> so CSS custom properties cascade everywhere. */
function applyTheme(theme: ThemeName): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = theme === 'dark' ? '#0b0b14' : '#faf7f1'

  // Keep Vuetify's internal theme in step with the design tokens so its
  // components (drawer scrim, expansion panels) inherit the same palette.
  const name = theme === 'dark' ? 'schoolinoDark' : 'schoolinoLight'
  if (vuetify.theme.global.name.value !== name) vuetify.theme.change(name)
}

const resolvedTheme = computed<ThemeName>(() => {
  if (storedTheme.value === 'system') return preferredDark.value ? 'dark' : 'light'
  return storedTheme.value
})

// Keep the document in sync with the resolved theme (also across tabs, because
// useStorage listens to the storage event).
watch(resolvedTheme, applyTheme, { immediate: false })

/**
 * Light/dark theming with a persisted preference and system fallback.
 *
 * @returns The resolved theme plus helpers to toggle or reset it.
 */
export function useTheme() {
  const isDark = computed(() => resolvedTheme.value === 'dark')

  function setTheme(theme: ThemeName | 'system'): void {
    storedTheme.value = theme
    applyTheme(theme === 'system' ? (preferredDark.value ? 'dark' : 'light') : theme)
  }

  function toggleTheme(): void {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark')
  }

  /** Called once on mount so the initial paint matches the stored preference. */
  function syncTheme(): void {
    applyTheme(resolvedTheme.value)
  }

  return {
    theme: resolvedTheme,
    preference: storedTheme,
    isDark,
    setTheme,
    toggleTheme,
    syncTheme,
  }
}
