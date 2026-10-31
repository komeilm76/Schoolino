import { describe, expect, it } from 'vitest'
import { useBilling } from '@/composables/useBilling'
import { plans } from '@/data/plans'

const plan = plans[1]!

describe('useBilling', () => {
  it('starts on the requested cycle', () => {
    expect(useBilling('monthly').isYearly.value).toBe(false)
    expect(useBilling('yearly').isYearly.value).toBe(true)
  })

  it('reports the yearly total and the monthly equivalent', () => {
    const billing = useBilling('yearly')
    const price = billing.priceFor(plan)

    expect(price.amount).toBe(plan.yearlyPrice)
    expect(price.perMonth).toBe(Math.round(plan.yearlyPrice / 12 / 1000) * 1000)
    expect(price.periodLabel).toBe('سالانه')
    expect(price.note).toContain('در ماه')
  })

  it('reports the monthly price without an equivalent note', () => {
    const billing = useBilling('monthly')
    const price = billing.priceFor(plan)

    expect(price.amount).toBe(plan.monthlyPrice)
    expect(price.note).toBe('بدون تعهد بلندمدت')
  })

  it('switches cycle on demand', () => {
    const billing = useBilling('monthly')
    expect(billing.isYearly.value).toBe(false)

    billing.setCycle('yearly')
    expect(billing.isYearly.value).toBe(true)

    billing.toggleCycle()
    expect(billing.isYearly.value).toBe(false)
  })

  it('computes a positive saving for every plan', () => {
    const billing = useBilling()
    for (const item of plans) {
      expect(billing.savingFor(item)).toBeGreaterThan(0)
      expect(billing.savingFor(item)).toBeLessThan(100)
    }
  })
})
