import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { useScrollSpy } from '@/composables/useScrollSpy'

/** Minimal IntersectionObserver double that lets the test emit entries. */
class ControlledObserver {
  static instances: ControlledObserver[] = []

  callback: IntersectionObserverCallback
  observed: Element[] = []
  disconnected = false

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    ControlledObserver.instances.push(this)
  }

  observe(el: Element) {
    this.observed.push(el)
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true
  }
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  emit(entries: Array<{ target: Element; isIntersecting: boolean; intersectionRatio: number }>) {
    this.callback(entries as unknown as IntersectionObserverEntry[], this as never)
  }
}

function entry(id: string, ratio: number) {
  const target = document.createElement('section')
  target.id = id
  return { target, isIntersecting: ratio > 0, intersectionRatio: ratio }
}

describe('useScrollSpy', () => {
  beforeEach(() => {
    ControlledObserver.instances = []
    vi.stubGlobal('IntersectionObserver', ControlledObserver)
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => undefined)
    document.body.innerHTML = '<section id="grades"></section><section id="plans"></section>'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts on the first section', () => {
    const scope = effectScope()
    const { activeId } = scope.run(() => useScrollSpy(['grades', 'plans']))!

    expect(activeId.value).toBe('grades')
    scope.stop()
  })

  it('observes every existing section', () => {
    const scope = effectScope()
    scope.run(() => useScrollSpy(['grades', 'plans']))

    expect(ControlledObserver.instances[0]!.observed.map((el) => el.id)).toEqual([
      'grades',
      'plans',
    ])
    scope.stop()
  })

  it('activates the section with the largest visible ratio', () => {
    const scope = effectScope()
    const { activeId } = scope.run(() => useScrollSpy(['grades', 'plans']))!
    const observer = ControlledObserver.instances[0]!

    observer.emit([entry('grades', 0.2), entry('plans', 0.8)])
    expect(activeId.value).toBe('plans')

    observer.emit([entry('plans', 0.1), entry('grades', 0.6)])
    expect(activeId.value).toBe('grades')
    scope.stop()
  })

  it('keeps the previous section when nothing is visible', () => {
    const scope = effectScope()
    const { activeId } = scope.run(() => useScrollSpy(['grades', 'plans']))!
    const observer = ControlledObserver.instances[0]!

    observer.emit([entry('plans', 0.5)])
    expect(activeId.value).toBe('plans')

    observer.emit([entry('plans', 0)])
    expect(activeId.value).toBe('plans')
    scope.stop()
  })

  it('disconnects the observer when the scope is disposed', () => {
    const scope = effectScope()
    scope.run(() => useScrollSpy(['grades', 'plans']))
    const observer = ControlledObserver.instances[0]!

    scope.stop()
    expect(observer.disconnected).toBe(true)
  })
})
