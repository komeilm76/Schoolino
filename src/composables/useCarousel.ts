import { computed, onScopeDispose, readonly, ref, watch, type Ref } from 'vue'
import { useDocumentVisibility, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core'

export interface CarouselOptions {
  /** Autoplay interval in ms (0 disables autoplay). */
  interval?: number
}

/**
 * Accessible carousel state.
 *
 * Autoplay never runs when the user prefers reduced motion, when the tab is
 * hidden, or while the user is interacting (focus / hover) — the exact
 * behaviour WCAG asks for. Previous/next never wrap-fail: they always expose
 * every slide with a single click or keystroke.
 *
 * @param total - Reactive number of slides.
 * @param options - Autoplay interval.
 */
export function useCarousel(total: Ref<number>, options: CarouselOptions = {}) {
  const { interval = 7000 } = options
  const reducedMotion = usePreferredReducedMotion()
  const visibility = useDocumentVisibility()

  const index = ref(0)
  const isInteracting = ref(false)

  const clampedTotal = computed(() => Math.max(total.value, 1))

  /** Guards against an out-of-range index when the slide list shrinks. */
  watch(clampedTotal, (value) => {
    if (index.value > value - 1) index.value = 0
  })

  function goTo(next: number): void {
    index.value = ((next % clampedTotal.value) + clampedTotal.value) % clampedTotal.value
  }

  function next(): void {
    goTo(index.value + 1)
  }

  function previous(): void {
    goTo(index.value - 1)
  }

  const canAutoplay = computed(
    () =>
      interval > 0 &&
      reducedMotion.value !== 'reduce' &&
      visibility.value === 'visible' &&
      !isInteracting.value,
  )

  const { pause, resume, isActive } = useIntervalFn(next, interval, { immediate: false })

  watch(
    canAutoplay,
    (enabled) => {
      if (enabled) resume()
      else pause()
    },
    { immediate: true },
  )

  onScopeDispose(pause)

  /** Stop autoplay while the pointer or keyboard focus is inside the carousel. */
  function pauseOnInteract(): void {
    isInteracting.value = true
  }

  /** Resume autoplay once the pointer/focus leaves. */
  function resumeOnInteract(): void {
    isInteracting.value = false
  }

  return {
    index: readonly(index),
    total: clampedTotal,
    isAutoplaying: computed(() => isActive.value && canAutoplay.value),
    goTo,
    next,
    previous,
    pauseOnInteract,
    resumeOnInteract,
  }
}
