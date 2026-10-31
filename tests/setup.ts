/**
 * Vitest environment setup.
 *
 * jsdom lacks a few browser APIs that both VueUse and Vuetify expect, so they
 * are stubbed here once for every test file.
 */
import { afterEach, vi } from 'vitest'

// --- matchMedia --------------------------------------------------------------
// Always installed (jsdom's implementation is partial and VueUse relies on the
// full MediaQueryList contract).
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as unknown as MediaQueryList,
})

// --- IntersectionObserver ----------------------------------------------------
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
vi.stubGlobal(
  'ResizeObserver',
  class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  },
)

// --- scrollIntoView ----------------------------------------------------------
Element.prototype.scrollIntoView = vi.fn()

afterEach(() => {
  document.body.innerHTML = ''
})
