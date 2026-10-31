import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { prefersReducedMotion, scrollToSection } from '@/utils/scroll'

describe('scroll helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="grades"><h2>پایه‌ها</h2></section>'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('prefersReducedMotion is false without a media query match', () => {
    expect(prefersReducedMotion()).toBe(false)
  })

  it('scrolls to an element by id', () => {
    const target = document.getElementById('grades')!
    const spy = vi.spyOn(target, 'scrollIntoView')

    scrollToSection('grades')
    expect(spy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })

  it('accepts a leading hash', () => {
    const target = document.getElementById('grades')!
    const spy = vi.spyOn(target, 'scrollIntoView')

    scrollToSection('#grades')
    expect(spy).toHaveBeenCalledOnce()
  })

  it('focuses the target when requested, adding a tabindex only once', () => {
    scrollToSection('grades', { focus: true })
    const target = document.getElementById('grades')!

    expect(target.getAttribute('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(target)

    scrollToSection('grades', { focus: true })
    expect(document.querySelectorAll('[tabindex="-1"]')).toHaveLength(1)
  })

  it('does nothing for an unknown id', () => {
    expect(() => scrollToSection('does-not-exist')).not.toThrow()
  })
})
