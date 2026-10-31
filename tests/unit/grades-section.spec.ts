import { describe, expect, it } from 'vitest'
import GradesSection from '@/components/sections/GradesSection.vue'
import { mountWithApp } from '../utils/mount'

describe('GradesSection', () => {
  it('renders the three education levels', () => {
    const wrapper = mountWithApp(GradesSection)

    expect(wrapper.text()).toContain('ابتدایی')
    expect(wrapper.text()).toContain('متوسطه اول')
    expect(wrapper.text()).toContain('متوسطه دوم')
  })

  it('renders every grade as a toggle button', () => {
    const wrapper = mountWithApp(GradesSection)
    const chips = wrapper.findAll('button.grade-chip')

    expect(chips).toHaveLength(12)
    expect(chips[0]!.attributes('aria-pressed')).toBeDefined()
  })

  it('updates the detail panel when another grade is selected', async () => {
    const wrapper = mountWithApp(GradesSection)
    const seventh = wrapper.findAll('button.grade-chip').find((chip) => chip.text() === 'هفتم')

    expect(seventh).toBeTruthy()
    await seventh!.trigger('click')

    const panel = wrapper.find('.selection-panel')
    expect(panel.text()).toContain('پایه هفتم')
    expect(seventh!.attributes('aria-pressed')).toBe('true')
  })

  it('switches level when a level call-to-action is used', async () => {
    const wrapper = mountWithApp(GradesSection)
    const levelCta = wrapper
      .findAll('button')
      .find((button) => button.text().includes('انتخاب دوره ابتدایی'))

    await levelCta!.trigger('click')

    expect(wrapper.find('.selection-panel').text()).toContain('ابتدایی')
  })
})
