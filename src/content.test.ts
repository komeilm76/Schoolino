import { describe, expect, it } from 'vitest'
import { services } from './data/content'
describe('dynamic service content', () => {
  it('provides three unique service paths', () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(3)
  })
  it('provides text and detail content for every card', () => {
    services.forEach((service) => {
      expect(service.title.length).toBeGreaterThan(5)
      expect(service.description.length).toBeGreaterThan(40)
      expect(service.details.length).toBe(3)
    })
  })
})
