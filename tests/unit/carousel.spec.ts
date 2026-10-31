import { describe, expect, it } from 'vitest'
import { effectScope, ref, type EffectScope } from 'vue'
import { useCarousel } from '@/composables/useCarousel'

/** Runs the composable inside a scope so its cleanup hooks are registered. */
function setup(total: Parameters<typeof useCarousel>[0], options?: { interval?: number }) {
  const scope: EffectScope = effectScope()
  const carousel = scope.run(() => useCarousel(total, options))!
  return { carousel, scope }
}

describe('useCarousel', () => {
  it('moves forward and wraps around', () => {
    const { carousel } = setup(ref(3))

    carousel.next()
    expect(carousel.index.value).toBe(1)

    carousel.next()
    carousel.next()
    expect(carousel.index.value).toBe(0)
  })

  it('moves backwards and wraps around', () => {
    const { carousel } = setup(ref(3))

    carousel.previous()
    expect(carousel.index.value).toBe(2)
  })

  it('clamps direct navigation to the available slides', () => {
    const { carousel } = setup(ref(4))

    carousel.goTo(9)
    expect(carousel.index.value).toBe(1)

    carousel.goTo(-1)
    expect(carousel.index.value).toBe(3)
  })

  it('resets to the first slide when the list shrinks', async () => {
    const total = ref(5)
    const { carousel } = setup(total)

    carousel.goTo(4)
    total.value = 2
    await Promise.resolve()

    expect(carousel.index.value).toBe(0)
  })

  it('never autoplays when the interval is disabled', () => {
    const { carousel, scope } = setup(ref(3), { interval: 0 })
    expect(carousel.isAutoplaying.value).toBe(false)
    scope.stop()
  })
})
