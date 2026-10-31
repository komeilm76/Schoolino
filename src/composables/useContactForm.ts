import { ref } from 'vue'
export interface ContactFields {
  name: string
  email: string
  message: string
}
/** Pure validation boundary; a future API adapter can accept the same fields. */
export function validateContact(fields: ContactFields): string {
  return !fields.name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()) ||
    !fields.message.trim()
    ? 'لطفاً نام، ایمیل معتبر و پیام خود را وارد کنید.'
    : ''
}
/** Isolated demo form state. No request, persistence or simulated backend success. */
export function useContactForm() {
  const name = ref(''),
    email = ref(''),
    message = ref('')
  const submitted = ref(false),
    error = ref('')
  function submit() {
    error.value = validateContact({ name: name.value, email: email.value, message: message.value })
    submitted.value = !error.value
  }
  return { name, email, message, submitted, error, submit }
}
