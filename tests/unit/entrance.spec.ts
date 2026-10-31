import { describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'

/**
 * `usePreferredReducedMotion` reads `matchMedia('(prefers-reduced-motion: reduce)')`.
 * The suite therefore mocks matchMedia per test to flip the preference.
 */
function mockReducedMotion(reduced: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduced && query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

async function variantsFor(reduced: boolean) {
  vi.resetModules()
  mockReducedMotion(reduced)
  const { useEntranceMotion } = await import('@/composables/useEntrance')
  const scope = effectScope()
  const motion = scope.run(() => useEntranceMotion({ delay: 120, offset: 24 }))!
  await Promise.resolve()
  return { motion, scope }
}

describe('useEntranceMotion', () => {
  it('animates from an offset when motion is allowed', async () => {
    const { motion, scope } = await variantsFor(false)

    expect(motion.value.initial.opacity).toBe(0)
    expect(motion.value.initial.y).toBe(24)
    expect(motion.value.enter.y).toBe(0)
    expect(motion.value.enter.opacity).toBe(1)
    scope.stop()
  })

  it('renders the final state immediately when motion is reduced', async () => {
    const { motion, scope } = await variantsFor(true)

    expect(motion.value.initial.opacity).toBe(1)
    expect(motion.value.initial.y).toBe(0)
    expect(motion.value.enter.opacity).toBe(1)
    scope.stop()
  })
})
