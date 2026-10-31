import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

/** Motion variants understood by `@vueuse/motion`'s `v-motion` directive. */
export interface MotionVariants {
  initial: Record<string, number | string>
  enter: Record<string, unknown>
}

export interface EntranceOptions {
  /** Delay in ms before the entrance starts. */
  delay?: number
  /** Vertical offset in px used for the entrance. */
  offset?: number
  /** Duration in ms. */
  duration?: number
  /** Additional properties to animate in (e.g. `scale`). */
  from?: Record<string, number>
  /** Additional properties at rest (e.g. `scale: 1`). */
  to?: Record<string, number>
}

/**
 * Declarative entrance variants that respect `prefers-reduced-motion`.
 *
 * `@vueuse/motion` does not read the user's motion preference itself, so the
 * variants collapse to their final state when motion is reduced — the content
 * still appears, it just never moves.
 *
 * @example
 * const hero = useEntranceMotion({ delay: 120 })
 * // <h1 v-motion="hero">
 */
export function useEntranceMotion(options: EntranceOptions = {}) {
  const { delay = 0, offset = 20, duration = 600, from = {}, to = {} } = options
  const reducedMotion = usePreferredReducedMotion()

  return computed<MotionVariants>(() => {
    if (reducedMotion.value === 'reduce') {
      return { initial: { opacity: 1, y: 0 }, enter: { opacity: 1, y: 0 } }
    }

    return {
      initial: { opacity: 0, y: offset, ...from },
      enter: { opacity: 1, y: 0, ...to, transition: { duration, delay } },
    }
  })
}
