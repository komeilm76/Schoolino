import { onScopeDispose, readonly, ref, watch, type Ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

/** Cubic ease-out, the same curve used by the CSS motion tokens. */
function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

export interface CountUpOptions {
  /** Animation duration in ms. */
  duration?: number
  /** Delay before counting starts, in ms. */
  delay?: number
}

/**
 * Animates a number from 0 to `target` with requestAnimationFrame.
 *
 * The animation only starts when `start()` is called (i.e. when the counter
 * scrolls into view) and jumps straight to the final value when the user
 * prefers reduced motion.
 *
 * @param target - Final value, reactive.
 * @param options - Duration / delay overrides.
 * @returns The displayed value and `start()`.
 */
export function useCountUp(target: Ref<number>, options: CountUpOptions = {}) {
  const { duration = 1600, delay = 0 } = options
  const reducedMotion = usePreferredReducedMotion()
  const current = ref(0)

  let frame = 0
  let timeout: ReturnType<typeof setTimeout> | undefined
  let started = false

  const stop = (): void => {
    if (frame) cancelAnimationFrame(frame)
    if (timeout) clearTimeout(timeout)
    frame = 0
  }

  const run = (): void => {
    if (reducedMotion.value === 'reduce') {
      current.value = target.value
      return
    }

    const from = current.value
    const delta = target.value - from
    const startedAt = performance.now()

    const tick = (now: number): void => {
      const progress = Math.min((now - startedAt) / duration, 1)
      current.value = Math.round(from + delta * easeOutCubic(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else current.value = target.value
    }

    frame = requestAnimationFrame(tick)
  }

  /** Starts the animation once (idempotent). */
  function start(): void {
    if (started) return
    started = true
    timeout = setTimeout(run, delay)
  }

  // If the target changes after the animation, keep the display in sync.
  watch(target, (value) => {
    if (started) current.value = value
  })

  onScopeDispose(stop)

  return { value: readonly(current), start }
}
