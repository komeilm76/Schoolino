import { describe, expect, it } from 'vitest'
import PlansSection from '@/components/sections/PlansSection.vue'
import { mountWithApp } from '../utils/mount'
import { plans } from '@/data/plans'
import { formatNumber } from '@/utils/format'
import { useDemoNotice } from '@/composables/useDemoNotice'

describe('PlansSection', () => {
  it('renders every plan with its yearly price by default', () => {
    const wrapper = mountWithApp(PlansSection)

    for (const plan of plans) {
      expect(wrapper.text()).toContain(plan.name)
      expect(wrapper.text()).toContain(formatNumber(plan.yearlyPrice))
    }
  })

  it('marks exactly one plan as recommended', () => {
    const wrapper = mountWithApp(PlansSection)
    const featured = wrapper.findAll('.plan-card--featured')

    expect(featured).toHaveLength(1)
    expect(featured[0]!.text()).toContain('پیشنهاد اسکولینو')
  })

  it('switches every card to monthly pricing', async () => {
    const wrapper = mountWithApp(PlansSection)
    const monthly = wrapper.findAll('button').find((button) => button.text().startsWith('ماهانه'))

    await monthly!.trigger('click')

    expect(monthly!.attributes('aria-pressed')).toBe('true')
    for (const plan of plans) {
      expect(wrapper.text()).toContain(formatNumber(plan.monthlyPrice))
    }
  })

  it('renders all features of every plan', () => {
    const wrapper = mountWithApp(PlansSection)
    for (const plan of plans) {
      for (const feature of plan.features) {
        expect(wrapper.text()).toContain(feature)
      }
    }
  })

  it('surfaces an honest demo notice instead of checkout', async () => {
    const wrapper = mountWithApp(PlansSection)
    const cta = wrapper
      .findAll('button')
      .find((button) => button.text().includes('انتخاب پلن کامل'))

    await cta!.trigger('click')

    const { visible, notice, closeNotice } = useDemoNotice()
    expect(visible.value).toBe(true)
    expect(notice.value.title).toContain('کامل')
    closeNotice()
  })
})
