import type { Directive, DirectiveBinding } from 'vue'
import { prefersReducedMotion } from '@/utils/scroll'

/**
 * `v-reveal` — scroll-triggered reveal driven by CSS classes.
 *
 * Why a directive instead of a JS animation library?
 * - The browser only toggles one class; the transition itself runs on the
 *   compositor (opacity/transform) and stays cheap on mobile.
 * - Anything below the fold is still readable by crawlers and with JS disabled
 *   (a `<noscript>` fallback in index.html removes the initial hidden state).
 *
 * Options (`v-reveal="{ delay: 120, threshold: 0.25, mode: 'blur' }"`):
 * - `delay`     staggered delay in ms, capped at 240ms
 * - `threshold` intersection ratio that triggers the reveal (default 0.18)
 * - `mode`      `'fade'` (default) or `'blur'`
 */
interface RevealOptions {
  delay?: number
  threshold?: number
  mode?: 'fade' | 'blur'
}

type RevealElement = HTMLElement & { __revealObserver?: IntersectionObserver }

function parseOptions(
  binding: DirectiveBinding<RevealOptions | number | undefined>,
): RevealOptions {
  if (typeof binding.value === 'number') return { delay: binding.value }
  return binding.value ?? {}
}

function setup(
  el: RevealElement,
  binding: DirectiveBinding<RevealOptions | number | undefined>,
): void {
  const { delay = 0, threshold = 0.18, mode = 'fade' } = parseOptions(binding)

  el.classList.add(mode === 'blur' ? 'reveal-blur' : 'reveal')
  if (delay > 0) el.style.transitionDelay = `${Math.min(delay, 240)}ms`

  // Reduced motion (or no observer support): show the content immediately.
  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    el.classList.add('is-visible')
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        el.classList.add('is-visible')
        observer.unobserve(el)
      }
    },
    { threshold, rootMargin: '0px 0px -8% 0px' },
  )

  observer.observe(el)
  el.__revealObserver = observer
}

/**
 * Vue directive registration object (used by `app.directive('reveal', reveal)`).
 */
export const revealDirective: Directive<RevealElement, RevealOptions | number | undefined> = {
  mounted(el, binding) {
    setup(el, binding)
  },
  unmounted(el) {
    el.__revealObserver?.disconnect()
    delete el.__revealObserver
  },
}
