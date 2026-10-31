/**
 * Extracts the Lucide icons used by Schoolino from @iconify-json/lucide into a
 * small, typed, offline icon subset (src/assets/icons/lucide-subset.json).
 *
 * Usage: node scripts/build-icon-subset.mjs
 * Re-run this after adding a new icon name to ICON_NAMES below.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const ICON_NAMES = [
  'arrow-left', 'arrow-right', 'arrow-down', 'chevron-left', 'chevron-right',
  'play', 'star', 'check', 'circle-check', 'circle-check-big', 'sparkles', 'clock',
  'users', 'graduation-cap', 'book-open', 'video', 'list-checks', 'target',
  'chart-line', 'chart-column', 'calendar-check', 'calendar-days', 'shield-check',
  'message-circle', 'message-circle-question-mark', 'headphones', 'menu', 'x', 'sun', 'moon',
  'instagram', 'send', 'youtube', 'phone', 'mail', 'zap', 'pen-line', 'layers',
  'award', 'compass', 'rocket', 'flask-conical', 'calculator', 'globe', 'heart-handshake',
  'user-round', 'plus', 'minus', 'lock-keyhole', 'wifi', 'file-text', 'badge-check',
  'refresh-cw', 'lightbulb', 'bookmark', 'timer', 'repeat', 'school', 'library',
]

const source = JSON.parse(
  await readFile(resolve(root, 'node_modules/@iconify-json/lucide/icons.json'), 'utf8'),
)

const icons = {}
const missing = []
for (const name of ICON_NAMES) {
  if (source.icons[name]) icons[name] = source.icons[name]
  else missing.push(name)
}

const subset = {
  prefix: 'lucide',
  info: source.info,
  ...(source.aliases ? { aliases: {} } : {}),
  width: source.width,
  height: source.height,
  icons,
}

await writeFile(
  resolve(root, 'src/assets/icons/lucide-subset.json'),
  `${JSON.stringify(subset, null, 2)}\n`,
  'utf8',
)

console.log(`wrote ${Object.keys(icons).length} icons`)
if (missing.length) console.warn('missing icons:', missing.join(', '))
