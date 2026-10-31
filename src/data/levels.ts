import type { EducationLevel } from '@/types/content'

/**
 * The three education levels offered by Schoolino.
 * Grade numbers are 1–12 following the Iranian school system.
 */
export const educationLevels: EducationLevel[] = [
  {
    id: 'elementary',
    variant: 'elementary',
    title: 'ابتدایی',
    range: 'پایه ۱ تا ۶',
    tagline: 'پایه‌گذاری با قصه، بازی و تصویر',
    description:
      'درس‌های ابتدایی با ویدیوهای کوتاه و زبان ساده آموزش داده می‌شوند تا کودک بدون استرس، مفهوم را بفهمد و تمرین را با علاقه انجام دهد.',
    tone: 'accent',
    icon: 'bookmark',
    grades: [
      { value: 1, label: 'اول' },
      { value: 2, label: 'دوم' },
      { value: 3, label: 'سوم' },
      { value: 4, label: 'چهارم' },
      { value: 5, label: 'پنجم' },
      { value: 6, label: 'ششم' },
    ],
    highlights: [
      'ویدیوی کوتاه ۵ تا ۱۲ دقیقه‌ای برای هر درس',
      'کاربرگ تمرین و آزمون تثبیت پس از هر جلسه',
      'گزارش هفتگی پیشرفت برای والدین',
    ],
    stats: { lessons: 780, students: 4200, hours: 96 },
  },
  {
    id: 'middle',
    variant: 'middle',
    title: 'متوسطه اول',
    range: 'پایه ۷ تا ۹',
    tagline: 'از تیزهوشان تا امتحان نهایی',
    description:
      'برای سال‌های حساس متوسطه اول، مسیر یادگیری ترکیبی از آموزش مفهومی، حل تمرین گام‌به‌گام و آمادگی هدفمند آزمون تیزهوشان است.',
    tone: 'brand',
    icon: 'compass',
    grades: [
      { value: 7, label: 'هفتم' },
      { value: 8, label: 'هشتم' },
      { value: 9, label: 'نهم' },
    ],
    highlights: [
      'آموزش خط‌به‌خط کتاب درسی و حل تمرین',
      'آزمون‌های شبیه‌ساز تیزهوشان با کارنامه تحلیلی',
      'جمع‌بندی شب امتحان برای دروس پایانی',
    ],
    stats: { lessons: 940, students: 5100, hours: 128 },
  },
  {
    id: 'high',
    variant: 'high',
    title: 'متوسطه دوم',
    range: 'پایه ۱۰ تا ۱۲',
    tagline: 'کنکور و امتحان نهایی، بدون سردرگمی',
    description:
      'رشته‌های ریاضی، تجربی و انسانی؛ آموزش مفهومی، نکته و تست و آزمون‌های شبیه‌ساز کنکور با تحلیل دقیق عملکرد در یک مسیر روشن.',
    tone: 'mint',
    icon: 'rocket',
    grades: [
      { value: 10, label: 'دهم' },
      { value: 11, label: 'یازدهم' },
      { value: 12, label: 'دوازدهم' },
    ],
    highlights: [
      'ویدیوهای نکته و تست با اساتید کنکور',
      'آزمون‌ساز هوشمند با بودجه‌بندی زمانی',
      'تحلیل آزمون و شناسایی نقاط ضعف',
    ],
    stats: { lessons: 1130, students: 6300, hours: 164 },
  },
]
