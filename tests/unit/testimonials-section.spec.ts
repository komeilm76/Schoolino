import { describe, expect, it } from 'vitest'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import { testimonials } from '@/data/testimonials'
import { mountWithApp } from '../utils/mount'

describe('TestimonialsSection', () => {
  it('shows the first testimonial and lists every person', () => {
    const wrapper = mountWithApp(TestimonialsSection)

    expect(wrapper.find('blockquote').text()).toBe(testimonials[0]!.quote)
    expect(wrapper.findAll('.person-btn')).toHaveLength(testimonials.length)
  })

  it('moves to the next testimonial with the next control', async () => {
    const wrapper = mountWithApp(TestimonialsSection)
    const next = wrapper.find('button[aria-label="روایت بعدی"]')

    await next.trigger('click')

    expect(wrapper.find('blockquote').text()).toBe(testimonials[1]!.quote)
  })

  it('jumps to a testimonial through its person button', async () => {
    const wrapper = mountWithApp(TestimonialsSection)
    const buttons = wrapper.findAll('.person-btn')

    await buttons[2]!.trigger('click')

    expect(wrapper.find('blockquote').text()).toBe(testimonials[2]!.quote)
    expect(buttons[2]!.attributes('aria-pressed')).toBe('true')
  })

  it('supports arrow-key navigation', async () => {
    const wrapper = mountWithApp(TestimonialsSection)
    const region = wrapper.find('.grid')

    await region.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.find('blockquote').text()).toBe(testimonials[1]!.quote)

    await region.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.find('blockquote').text()).toBe(testimonials[0]!.quote)
  })

  it('announces the current position to assistive technology', () => {
    const wrapper = mountWithApp(TestimonialsSection)
    const live = wrapper.find('[aria-live="polite"]')

    expect(live.exists()).toBe(true)
    expect(live.text()).toContain(testimonials[0]!.name)
  })
})
