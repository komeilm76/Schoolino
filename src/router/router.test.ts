import { createMemoryHistory } from 'vue-router'
import { describe, expect, it } from 'vitest'
import { createAppRouter } from './index'
import { panelTitles } from '../data/content'
describe('SPA routing', () => {
  it('resolves all named panels and nested direct links', async () => {
    const router = createAppRouter(createMemoryHistory())
    for (const [name, title] of Object.entries(panelTitles)) {
      const resolved = router.resolve({ name })
      expect(resolved.meta.panel).toBe(name)
      expect(resolved.meta.title).toBe(title)
      expect(resolved.matched).toHaveLength(2)
    }
    await router.push('/services/ai')
    expect(router.currentRoute.value.name).toBe('ai')
    await router.push('/')
    expect(router.currentRoute.value.meta.panel).toBeUndefined()
  })
  it('handles unknown pages and service IDs explicitly', () => {
    const router = createAppRouter(createMemoryHistory())
    expect(router.resolve('/missing-page').name).toBe('not-found')
    expect(router.resolve('/services/unknown').name).toBe('not-found')
  })
})
