import type { LearningStep } from '@/types/content'

/** The four-step learning journey shown in «مسیر یادگیری». */
export const learningSteps: LearningStep[] = [
  {
    id: 'start',
    title: 'پایه‌ات را انتخاب کن',
    description: 'پایه تحصیلی و رشته‌ات را مشخص کن تا مسیر درسی مناسب تو ساخته شود.',
    icon: 'compass',
  },
  {
    id: 'learn',
    title: 'ببین و یاد بگیر',
    description: 'ویدیوهای کوتاه و درس‌نامه تصویری را ببین و هر جا لازم بود، عقب برگرد.',
    icon: 'play',
  },
  {
    id: 'practice',
    title: 'تمرین کن و محک بزن',
    description: 'تمرین گام‌به‌گام و آزمون تثبیت، یادگیری را از «فهمیدن» به «تسلط» می‌رساند.',
    icon: 'list-checks',
  },
  {
    id: 'grow',
    title: 'پیشرفتت را ببین',
    description: 'کارنامه تحلیلی نشان می‌دهد کجا قوی شده‌ای و قدم بعدی کدام است.',
    icon: 'chart-line',
  },
]
