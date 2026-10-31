import type { Stat } from '@/types/content'

/**
 * Demo platform statistics. They are illustrative figures for this showcase and
 * are labelled as such in the UI.
 */
export const stats: Stat[] = [
  { id: 'students', label: 'دانش‌آموز فعال', value: 12400, suffix: '+', icon: 'users' },
  { id: 'lessons', label: 'درس ویدیویی', value: 2850, suffix: '+', icon: 'video' },
  { id: 'teachers', label: 'استاد متخصص', value: 45, suffix: '+', icon: 'graduation-cap' },
  { id: 'hours', label: 'ساعت یادگیری', value: 96000, suffix: '+', icon: 'clock' },
]
