import { onScopeDispose, readonly, ref } from 'vue'

/**
 * Tracks which page section is currently in view.
 *
 * A single IntersectionObserver is used for all sections (no scroll listeners),
 * with a narrow root margin around the middle of the viewport so the "active"
 * section changes where the reader's attention is.
 *
 * @param sectionIds - Ordered list of section ids (without `#`).
 * @returns The active section id (read-only) and a helper to set it manually.
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')

  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    return { activeId: readonly(activeId), setActive: (id: string) => (activeId.value = id) }
  }

  const visible = new Map<string, number>()
  let observer: IntersectionObserver | undefined

  const recompute = (): void => {
    let bestId = activeId.value
    let bestRatio = 0
    for (const [id, ratio] of visible) {
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = id
      }
    }
    if (bestRatio > 0) activeId.value = bestId
  }

  // Wait one frame so the sections exist in the DOM.
  const start = (): void => {
    observer?.disconnect()
    visible.clear()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (!id) continue
          if (entry.isIntersecting) visible.set(id, entry.intersectionRatio)
          else visible.delete(id)
        }
        recompute()
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0, 0.15, 0.4, 0.7, 1],
      },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  }

  const frame = requestAnimationFrame(start)

  onScopeDispose(() => {
    cancelAnimationFrame(frame)
    observer?.disconnect()
    observer = undefined
  })

  return {
    activeId: readonly(activeId),
    setActive: (id: string) => (activeId.value = id),
  }
}
