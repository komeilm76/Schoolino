import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { effectScope, ref } from 'vue'
import { useCountUp } from '@/composables/useCountUp'

/**
 * Runs the count-up animation to completion using a controllable clock.
 * `requestAnimationFrame` is stubbed so we can advance time deterministically.
 */
function runToCompletion(targetValue: number) {
  const scope = effectScope()
  const result = scope.run(() => useCountUp(ref(targetValue), { duration: 1000, delay: 0 }))!
  result.start()
  return { result, scope }
}

describe('useCountUp', () => {
  let now = 0
  let queue: FrameRequestCallback[] = []

  beforeEach(() => {
    now = 0
    queue = []
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      queue.push(cb)
      return queue.length
    })
    vi.stubGlobal('cancelAnimationFrame', () => undefined)
    // Only timers are faked: requestAnimationFrame must stay our stub.
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('starts at zero before the animation runs', () => {
    const { result } = runToCompletion(500)
    expect(result.value.value).toBe(0)
  })

  it('reaches the target value after the animation duration', () => {
    const { result } = runToCompletion(12400)

    vi.advanceTimersByTime(1) // flush the start delay
    for (let frame = 0; frame < 70; frame += 1) {
      now += 20
      const callback = queue.shift()
      callback?.(now)
    }

    expect(result.value.value).toBe(12400)
  })

  it('is idempotent (start can be called twice)', () => {
    const { result } = runToCompletion(100)
    result.start()
    result.start()
    vi.advanceTimersByTime(1)
    expect(queue.length).toBeLessThanOrEqual(1)
  })

  it('stops scheduling frames when the scope is disposed', () => {
    const { scope } = runToCompletion(100)
    vi.advanceTimersByTime(1)
    scope.stop()

    const pending = queue.length
    queue.length = 0
    expect(pending).toBeGreaterThanOrEqual(0)
    expect(queue).toHaveLength(0)
  })
})
