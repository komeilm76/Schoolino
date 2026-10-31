import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.setItem('schoolino:theme', 'light')
    document.documentElement.dataset.theme = 'light'
  })

  afterEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('resolves the stored preference', () => {
    const { theme, isDark, syncTheme } = useTheme()

    syncTheme()
    expect(theme.value).toBe('light')
    expect(isDark.value).toBe(false)
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('switches to dark and applies it to the document', () => {
    const { toggleTheme, syncTheme, theme, isDark } = useTheme()

    toggleTheme()
    syncTheme()

    expect(theme.value).toBe('dark')
    expect(isDark.value).toBe(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('persists the preference for the next visit', async () => {
    const { theme, setTheme } = useTheme()
    // The composable keeps module-level state between tests, so toggle away
    // from whatever the current value is instead of assuming a starting point.
    const target = theme.value === 'dark' ? 'light' : 'dark'
    setTheme(target)
    // VueUse writes the storage entry from a (pre-flush) watcher.
    await nextTick()

    expect(localStorage.getItem('schoolino:theme')).toBe(target)
  })
})
