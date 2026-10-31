import { describe, expect, it } from 'vitest'
import { useContactForm, validateContact } from './useContactForm'
describe('contact validation', () => {
  it.each([
    { name: '', email: 'a@b.com', message: 'test' },
    { name: '   ', email: 'a@b.com', message: 'test' },
    { name: 'آوین', email: 'not-an-email', message: 'test' },
    { name: 'آوین', email: 'a@b.com', message: '   ' },
  ])('rejects incomplete or invalid fields: %j', (fields) => {
    expect(validateContact(fields)).not.toBe('')
  })
  it('accepts valid Persian text and trims surrounding email whitespace', () => {
    expect(validateContact({ name: 'آوین', email: ' hello@example.com ', message: 'همکاری' })).toBe(
      '',
    )
  })
  it('isolates state and clears validation error after correction', () => {
    const first = useContactForm(),
      second = useContactForm()
    first.submit()
    expect(first.error.value).not.toBe('')
    expect(first.submitted.value).toBe(false)
    first.name.value = 'آوین'
    first.email.value = 'hello@example.com'
    first.message.value = 'درخواست همکاری'
    first.submit()
    expect(first.error.value).toBe('')
    expect(first.submitted.value).toBe(true)
    expect(second.name.value).toBe('')
    expect(second.submitted.value).toBe(false)
  })
})
