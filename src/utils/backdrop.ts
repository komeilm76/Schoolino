/** Reference-inspired wave surface in a fixed SVG coordinate space.
 * Shared coordinates keep its longitudinal and transverse mesh lines connected.
 */
export function wavePoint(x: number, depth: number): [number, number] {
  const crest = 130 + 44 * Math.cos(x / 157 + 0.12) + 15 * Math.sin(x / 83)
  const spread = 18 + 33 * (0.5 + 0.5 * Math.sin(x / 230))
  return [x, crest + (depth - 0.5) * spread + depth * depth * 32]
}

/** Precompute static SVG geometry once, without animation loops or canvas work. */
export function createWaveMesh() {
  const line = (points: [number, number][]) =>
    points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const rows = Array.from({ length: 35 }, (_, row) =>
    line(Array.from({ length: 100 }, (_, step) => wavePoint(step * 16, row / 34))),
  )
  const columns = Array.from({ length: 100 }, (_, column) =>
    line(Array.from({ length: 16 }, (_, step) => wavePoint(column * 16, step / 15))),
  )
  const particles = Array.from({ length: 44 }, (_, i) => {
    const x = (i * 173.7 + 23) % 1568
    const [, y] = wavePoint(x, (i % 9) / 8)
    return { x, y: y - (i % 4) * 19, radius: i % 7 === 0 ? 2.3 : 1, opacity: 0.25 + (i % 5) * 0.12 }
  })
  return { rows, columns, particles }
}
