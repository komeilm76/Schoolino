import { describe, expect, it } from 'vitest'
import { createWaveMesh, wavePoint } from './utils/backdrop'
describe('hero background geometry', () => {
  it('generates stable, finite geometry without runtime animation', () => {
    const mesh = createWaveMesh()
    expect(mesh).toEqual(createWaveMesh())
    expect(mesh.rows).toHaveLength(35)
    expect(mesh.columns).toHaveLength(100)
    expect(mesh.rows.every((path) => !path.includes('NaN'))).toBe(true)
  })
  it('spans the hero and keeps particles within the design canvas', () => {
    expect(wavePoint(0, 0)[0]).toBe(0)
    expect(wavePoint(1568, 1)[0]).toBe(1568)
    createWaveMesh().particles.forEach((p) => {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThan(1568)
      expect(Number.isFinite(p.y)).toBe(true)
    })
  })
})
