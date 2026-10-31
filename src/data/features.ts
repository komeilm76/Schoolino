import type { Feature } from '@/types/content'

/**
 * Value propositions for the bento-style «چرا اسکولینو؟» section.
 * `span` drives the asymmetric grid, `tone` keeps each tile visually distinct.
 */
export const features: Feature[] = [
  {
    id: 'video-lessons',
    title: 'ویدیوی درس‌به‌درس',
    description:
      'هر فصل کتاب به جلسه‌های کوتاه تقسیم شده است؛ می‌توانی سرعت را کم کنی، عقب برگردی و تا وقتی مفهوم جا نیفتاده جلو نروی.',
    icon: 'video',
    tone: 'brand',
    span: 'hero',
  },
  {
    id: 'step-by-step',
    title: 'حل تمرین گام‌به‌گام',
    description: 'تمرین‌های کتاب با راه‌حل تشریحی و ویدیویی، قدم به قدم بررسی می‌شوند.',
    icon: 'list-checks',
    tone: 'accent',
    span: 'standard',
  },
  {
    id: 'smart-exams',
    title: 'آزمون‌ساز هوشمند',
    description:
      'آزمون شخصی‌سازی‌شده بساز و کارنامه تحلیلی بگیر؛ سؤال‌ها بر اساس ضعف‌های تو انتخاب می‌شوند.',
    icon: 'target',
    tone: 'mint',
    span: 'wide',
  },
  {
    id: 'teachers',
    title: 'اساتید برگزیده',
    description: 'همه اساتید پیش از تدریس، آزمون تخصصی و تدریس آزمایشی را پشت سر می‌گذارند.',
    icon: 'award',
    tone: 'brand',
    span: 'standard',
  },
  {
    id: 'progress',
    title: 'مسیر و پیشرفت شفاف',
    description:
      'داشبورد یادگیری نشان می‌دهد کجای مسیر ایستاده‌ای، چه درس‌هایی مانده و کدام مبحث نیاز به مرور دارد.',
    icon: 'chart-line',
    tone: 'accent',
    span: 'tall',
  },
  {
    id: 'support',
    title: 'پشتیبانی تحصیلی',
    description: 'سؤال‌های درسی‌ات را بپرس؛ تیم پشتیبانی و مشاوران آموزشی پاسخ می‌دهند.',
    icon: 'headphones',
    tone: 'coral',
    span: 'standard',
  },
]
