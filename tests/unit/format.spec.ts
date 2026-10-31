import { describe, expect, it } from 'vitest'
import {
  formatNumber,
  formatPercent,
  formatRating,
  formatToman,
  monthlyEquivalent,
  toPersianDigits,
  yearlySavingPercent,
} from '@/utils/format'

describe('toPersianDigits', () => {
  it('replaces ASCII digits with Persian ones', () => {
    expect(toPersianDigits('1405')).toBe('۱۴۰۵')
    expect(toPersianDigits(42)).toBe('۴۲')
  })

  it('leaves non-digit characters untouched', () => {
    expect(toPersianDigits('پایه 9-ب')).toBe('پایه ۹-ب')
  })
})

describe('formatNumber', () => {
  it('groups Persian numbers', () => {
    // Persian (fa-IR) uses the Arabic thousands separator «٬».
    expect(formatNumber(12400)).toBe('۱۲٬۴۰۰')
    expect(formatNumber(96000)).toBe('۹۶٬۰۰۰')
  })
})

describe('formatToman', () => {
  it('appends the currency label', () => {
    expect(formatToman(349000)).toBe('۳۴۹٬۰۰۰ تومان')
  })

  it('rounds fractional amounts', () => {
    expect(formatToman(1999.6)).toBe('۲٬۰۰۰ تومان')
  })
})

describe('formatRating / formatPercent', () => {
  it('formats ratings with one decimal', () => {
    expect(formatRating(4.85)).toBe('۴٫۹')
  })

  it('formats percentages with the Persian percent sign', () => {
    expect(formatPercent(30)).toBe('۳۰٪')
  })
})

describe('monthlyEquivalent', () => {
  it('spreads a yearly price over 12 months and rounds to 1,000 Toman', () => {
    expect(monthlyEquivalent(2980000)).toBe(248000)
  })

  it('never returns a fractional number', () => {
    expect(Number.isInteger(monthlyEquivalent(1680000))).toBe(true)
  })
})

describe('yearlySavingPercent', () => {
  it('computes the discount versus 12 monthly payments', () => {
    expect(yearlySavingPercent(198000, 1680000)).toBe(29)
  })

  it('is zero when the yearly price is not cheaper', () => {
    expect(yearlySavingPercent(100000, 1200000)).toBe(0)
    expect(yearlySavingPercent(100000, 1500000)).toBe(0)
  })

  it('guards against invalid input', () => {
    expect(yearlySavingPercent(0, 1000)).toBe(0)
    expect(yearlySavingPercent(-5, 1000)).toBe(0)
  })
})
