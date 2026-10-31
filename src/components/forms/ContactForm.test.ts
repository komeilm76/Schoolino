import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ContactForm from './ContactForm.vue'
import { createAppVuetify } from '../../plugins/vuetify'
describe('ContactForm', () => {
  it('validates fields, displays honest demo status and returns to editing', async () => {
    const wrapper = mount(ContactForm, {
      global: { plugins: [createAppVuetify()], directives: { motion: {} } },
    })
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('.form-error').text()).toContain('ایمیل معتبر')
    await wrapper.get('input[autocomplete="name"]').setValue('آوین')
    await wrapper.get('input[type="email"]').setValue('hello@example.com')
    await wrapper.get('textarea').setValue('درخواست همکاری')
    await wrapper.get('form').trigger('submit')
    expect(wrapper.find('form').exists()).toBe(false)
    expect(wrapper.get('[role="status"]').text()).toContain('ارسال یا ذخیره نشده')
    await wrapper.get('button').trigger('click')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.get<HTMLInputElement>('input[type="email"]').element.value).toBe(
      'hello@example.com',
    )
    wrapper.unmount()
  })
})
