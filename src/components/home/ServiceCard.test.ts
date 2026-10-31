import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ServiceCard from './ServiceCard.vue'
import { services } from '../../data/content'
describe('ServiceCard', () => {
  it.each(services)('renders $id content and emits its own selection', (service) => {
    const wrapper = mount(ServiceCard, { props: { service } })
    expect(wrapper.get('h3').text()).toBe(service.title)
    expect(wrapper.get('p').text()).toBe(service.description)
    expect(wrapper.get('img').attributes('src')).toBe(`/assets/${service.id}.webp`)
    wrapper.get('button').element.click()
    expect(wrapper.emitted('select')).toEqual([[service.id]])
    wrapper.unmount()
  })
})
