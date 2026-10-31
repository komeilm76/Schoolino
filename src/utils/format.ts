/**
 * Formatting helpers.
 *
 * All user-facing numbers are Persian. The Intl formatters are created once at
 * module scope because `Intl.NumberFormat` construction is relatively costly.
 */

const persianNumber = new Intl.NumberFormat('fa-IR')
const persianDecimal = new Intl.NumberFormat('fa-IR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const

/**
 * Converts every ASCII digit of a string or number to its Persian counterpart.
 *
 * @example toPersianDigits('1405') // «۱۴۰۵»
 */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

/**
 * Formats an integer with Persian digit grouping.
 *
 * @example formatNumber(12400) // «۱۲٬۴۰۰»
 */
export function formatNumber(value: number): string {
  return persianNumber.format(value)
}

/** Formats a rating to one Persian decimal, e.g. 4.9 → «۴٫۹». */
export function formatRating(value: number): string {
  return persianDecimal.format(value)
}

/**
 * Formats a Toman amount.
 *
 * @example formatToman(349000) // «۳۴۹٬۰۰۰ تومان»
 */
export function formatToman(value: number): string {
  return `${formatNumber(Math.round(value))} تومان`
}

/** Monthly equivalent of a yearly price (rounded to the nearest 1,000 Toman). */
export function monthlyEquivalent(yearlyPrice: number): number {
  return Math.round(yearlyPrice / 12 / 1000) * 1000
}

/**
 * Saving percentage of a yearly subscription versus 12 monthly payments.
 * Returns a rounded integer between 0 and 100.
 */
export function yearlySavingPercent(monthlyPrice: number, yearlyPrice: number): number {
  if (monthlyPrice <= 0 || yearlyPrice <= 0) return 0
  const fullPrice = monthlyPrice * 12
  if (yearlyPrice >= fullPrice) return 0
  return Math.round(((fullPrice - yearlyPrice) / fullPrice) * 100)
}

/** Formats a percentage for display, e.g. 30 → «۳۰٪». */
export function formatPercent(value: number): string {
  return `${formatNumber(Math.round(value))}٪`
}
