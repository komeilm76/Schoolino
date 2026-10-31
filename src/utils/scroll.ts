/** Scroll helpers shared by the header, hero and footer links. */

/**
 * True when the user asked the operating system to minimise motion.
 * Guarded so it also works during SSR / unit tests.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smoothly scrolls to a section by id, respecting reduced-motion preferences.
 *
 * The sticky-header offset is handled by `scroll-padding-block-start` on `html`,
 * so no magic numbers are needed here.
 *
 * @param id - Target element id, with or without a leading `#`.
 * @param options.focus - Move focus to the section (keyboard/SR friendly).
 */
export function scrollToSection(id: string, options: { focus?: boolean } = {}): void {
  if (typeof document === 'undefined') return

  const targetId = id.startsWith('#') ? id.slice(1) : id
  const element = document.getElementById(targetId)
  if (!element) return

  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  if (options.focus) {
    // Make the destination reachable for screen readers without a hard jump.
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
    element.focus({ preventScroll: true })
  }
}
