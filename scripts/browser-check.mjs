import { chromium as playwright } from '@playwright/test'
import chromium from '@sparticuz/chromium'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'
import { execFileSync } from 'node:child_process'
// The packaged NSS libraries also support minimal Linux preview containers.
const libs = fs.mkdtempSync(path.join(os.tmpdir(), 'avin-browser-'))
const archive = path.join(libs, 'libraries.tar')
fs.writeFileSync(
  archive,
  zlib.brotliDecompressSync(fs.readFileSync('node_modules/@sparticuz/chromium/bin/al2023.tar.br')),
)
execFileSync('tar', ['xf', archive, '-C', libs])
process.env.LD_LIBRARY_PATH = `${libs}/lib:${process.env.LD_LIBRARY_PATH || ''}`
fs.mkdirSync('test-results', { recursive: true })
const browser = await playwright.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
})
const page = await browser.newPage({
  viewport: { width: 1568, height: 882 },
  reducedMotion: 'reduce',
})
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
const requests = []
page.on('request', (request) => requests.push(request.url()))
const baseUrl = process.env.PREVIEW_URL || 'http://localhost:5173'
await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: '/home/user/Schoolino/test-results/desktop.png', fullPage: true })
assert.equal(await page.locator('h1').count(), 1)
assert.equal(await page.locator('.service-card').count(), 3)
assert.equal(
  requests.some((url) => url.includes('avin-reference')),
  false,
)
await page.getByRole('button', { name: 'مشاهده بیشتر' }).first().click()
await page.getByRole('dialog').waitFor()
assert.ok(await page.getByRole('dialog').getByText('طراحی و مدیریت شبکه و زیرساخت').isVisible())
assert.equal(new URL(page.url()).pathname, '/services/it')
await page.getByRole('button', { name: 'بستن', exact: true }).click()
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.waitForTimeout(350)
await page.getByRole('button', { name: 'ارتباط با ما', exact: true }).click()
await page.getByRole('button', { name: 'بررسی پیام' }).click()
assert.ok(await page.locator('.form-error').isVisible())
await page.getByLabel('نام و نام خانوادگی').fill('تست آوین')
await page.getByLabel('ایمیل', { exact: true }).fill('hello@example.com')
await page.getByLabel('پیام شما').fill('درخواست همکاری در زمینه آموزش')
await page.getByRole('button', { name: 'بررسی پیام' }).click()
assert.ok(await page.getByRole('status').isVisible())
await page.getByRole('button', { name: 'بستن', exact: true }).click()
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.waitForTimeout(350)
for (const width of [320, 360, 390, 768, 800, 801, 1024, 1100, 1440, 1568, 1920]) {
  await page.setViewportSize({ width, height: 844 })
  await page.screenshot({
    path: `/home/user/Schoolino/test-results/viewport-${width}.png`,
    fullPage: true,
  })
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    `Overflow at ${width}`,
  )
  const geometry = await page.evaluate(() => {
    const stage = document.querySelector('.ecosystem-stage').getBoundingClientRect()
    return [...document.querySelectorAll('.orbit-label')].map((label) => {
      const rect = label.getBoundingClientRect()
      return {
        name: label.classList[1],
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        y: (rect.top + rect.height / 2 - stage.top) / stage.height,
      }
    })
  })
  const anchors = { education: 0.135, ai: 0.34, it: 0.68, vod: 0.68, career: 0.34 }
  for (const rect of geometry) {
    assert.ok(
      rect.left >= 0 && rect.right <= width,
      `${rect.name} clipped at ${width}: ${JSON.stringify(rect)}`,
    )
    assert.ok(
      Math.abs(rect.y - anchors[rect.name]) < 0.005,
      `${rect.name} detached from orb at ${width}`,
    )
  }
  for (let i = 0; i < geometry.length; i++)
    for (let j = i + 1; j < geometry.length; j++) {
      const a = geometry[i],
        b = geometry[j]
      assert.ok(
        a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top,
        `Label collision at ${width}`,
      )
    }
}
await page.setViewportSize({ width: 390, height: 844 })
await page.getByRole('button', { name: 'باز کردن فهرست' }).click()
assert.ok(await page.locator('#mobile-nav').isVisible())
await page.locator('#mobile-nav').getByRole('button', { name: 'درباره آوین' }).click()
await page.getByRole('dialog').waitFor({ state: 'visible' })
// Direct entry, route reload, native browser history, fallback and focus restoration.
await page.getByRole('button', { name: 'بستن', exact: true }).click()
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.setViewportSize({ width: 1568, height: 882 })
await page.getByRole('button', { name: 'تماس با ما', exact: true }).click()
await page.getByRole('dialog').waitFor()
assert.equal(new URL(page.url()).pathname, '/contact')
await page.reload({ waitUntil: 'networkidle' })
await page.getByRole('dialog').waitFor()
assert.ok(await page.getByLabel('ایمیل', { exact: true }).isVisible())
await page.goBack()
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.waitForTimeout(350)
await page.goForward()
await page.getByRole('dialog').waitFor()
await page.keyboard.press('Escape')
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
assert.equal(new URL(page.url()).pathname, '/')
await page.getByRole('button', { name: 'ارتباط با ما', exact: true }).click()
await page.getByRole('dialog').waitFor()
await page.keyboard.press('Escape')
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.waitForTimeout(350)
assert.ok(
  await page
    .getByRole('button', { name: 'ارتباط با ما', exact: true })
    .evaluate((el) => el === document.activeElement),
)
for (const path of [
  '/about',
  '/solutions',
  '/services',
  '/cooperate',
  '/services/ai',
  '/services/education',
]) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })
  await page.getByRole('dialog').waitFor()
}
await page.goto(`${baseUrl}/services/unknown`, { waitUntil: 'networkidle' })
assert.ok(await page.getByRole('heading', { name: 'صفحه پیدا نشد' }).isVisible())
await page.getByRole('link', { name: 'بازگشت به خانه' }).click()
await page.locator('.hero').waitFor()
// No full-document navigation when moving between SPA views.
await page.evaluate(() => {
  window.__spaMarker = 'preserved'
})
await page.getByRole('button', { name: 'درباره آوین', exact: true }).click()
await page.getByRole('dialog').waitFor()
assert.equal(await page.evaluate(() => window.__spaMarker), 'preserved')
// Exercise the mandatory Motion integration outside the reduced-motion path.
await page.getByRole('button', { name: 'بستن', exact: true }).click()
await page.locator('.v-overlay--active').waitFor({ state: 'detached' })
await page.emulateMedia({ reducedMotion: 'no-preference' })
await page.getByRole('button', { name: 'ارتباط با ما', exact: true }).click()
await page.getByRole('dialog').waitFor()
await page.getByLabel('نام و نام خانوادگی').fill('آوین')
await page.getByLabel('ایمیل', { exact: true }).fill('motion@example.com')
await page.getByLabel('پیام شما').fill('آزمایش فرم نمایشی')
await page.getByRole('button', { name: 'بررسی پیام' }).click()
await page.waitForFunction(() => {
  const status = document.querySelector('.confirmation')
  return status && Number(window.getComputedStyle(status).opacity) >= 0.99
})

assert.deepEqual(errors, [])
console.log(
  'PASS: desktop services, form validation and submission state, mobile menu, 11 responsive widths with label anchoring, clipping and collision checks, direct routes/reload/history/Escape/focus/404/client-side navigation, no original PNG requests, no browser errors',
)
await browser.close()
