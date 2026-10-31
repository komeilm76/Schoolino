import { describe, expect, it, vi } from 'vitest'
import { useDemoNotice } from '@/composables/useDemoNotice'

describe('useDemoNotice', () => {
  it('opens with the default message', () => {
    const { visible, notice, openNotice, closeNotice } = useDemoNotice()
    closeNotice()
    expect(visible.value).toBe(false)

    openNotice()
    expect(visible.value).toBe(true)
    expect(notice.value.title).toBe('نسخه نمایشی')
  })

  it('accepts a custom title and message', () => {
    const { notice, openNotice } = useDemoNotice()
    openNotice({ title: 'پلن کامل', message: 'پیام سفارشی' })

    expect(notice.value.title).toBe('پلن کامل')
    expect(notice.value.message).toBe('پیام سفارشی')
  })

  it('exposes an announcement string only while visible', () => {
    const { announcement, openNotice, closeNotice } = useDemoNotice()
    closeNotice()
    expect(announcement.value).toBe('')

    openNotice({ title: 'عنوان', message: 'متن' })
    expect(announcement.value).toBe('عنوان: متن')
  })

  it('auto-dismisses after the given duration', () => {
    vi.useFakeTimers()
    const { visible, openNotice } = useDemoNotice()

    openNotice(undefined, 1000)
    expect(visible.value).toBe(true)

    vi.advanceTimersByTime(1100)
    expect(visible.value).toBe(false)
    vi.useRealTimers()
  })
})
