import { describe, expect, it } from 'vitest'
import FaqSection from '@/components/sections/FaqSection.vue'
import { faqs } from '@/data/faqs'
import { mountWithApp } from '../utils/mount'

describe('FaqSection', () => {
  it('renders every question', () => {
    const wrapper = mountWithApp(FaqSection)
    for (const item of faqs) {
      expect(wrapper.text()).toContain(item.question)
    }
  })

  it('opens the first answer by default and keeps others collapsed', () => {
    const wrapper = mountWithApp(FaqSection)
    const titles = wrapper.findAll('.v-expansion-panel-title')

    expect(titles).toHaveLength(faqs.length)
    expect(titles[0]!.attributes('aria-expanded')).toBe('true')
    expect(titles[1]!.attributes('aria-expanded')).toBe('false')
  })

  it('expands a panel when its title is activated', async () => {
    const wrapper = mountWithApp(FaqSection)
    const titles = wrapper.findAll('.v-expansion-panel-title')

    await titles[1]!.trigger('click')

    expect(titles[1]!.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain(faqs[1]!.answer)
  })

  it('exposes every header as a keyboard-reachable button', () => {
    const wrapper = mountWithApp(FaqSection)
    const headings = wrapper.findAll('button.v-expansion-panel-title')

    expect(headings).toHaveLength(faqs.length)
    for (const heading of headings) {
      expect(heading.element.tagName).toBe('BUTTON')
      expect(heading.attributes('aria-expanded')).toBeDefined()
      expect(heading.attributes('type')).toBe('button')
    }
  })
})
