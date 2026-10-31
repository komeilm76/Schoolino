import type { Plan } from '@/types/content'

/**
 * Demo subscription plans. Prices are illustrative, in Iranian Toman, and are
 * not connected to any payment gateway. `yearlyPrice` is the total for a full
 * 12-month subscription (the UI derives the monthly equivalent and saving).
 */
export const plans: Plan[] = [
  {
    id: 'start',
    name: 'شروع',
    tagline: 'برای آشنایی با مسیر یادگیری',
    audience: 'دانش‌آموزانی که می‌خواهند کیفیت آموزش را امتحان کنند',
    monthlyPrice: 198000,
    yearlyPrice: 1680000,
    recommended: false,
    features: [
      'دسترسی به همه ویدیوهای یک پایه تحصیلی',
      '۳ ویدیوی رایگان از هر درس',
      'آزمون تثبیت پس از هر جلسه',
      'پشتیبانی پیام‌رسان در روزهای کاری',
    ],
    ctaLabel: 'انتخاب پلن شروع',
  },
  {
    id: 'complete',
    name: 'کامل',
    tagline: 'محبوب‌ترین انتخاب دانش‌آموزان',
    audience: 'دانش‌آموزانی که برنامه درسی کامل و آزمون تحلیلی می‌خواهند',
    monthlyPrice: 349000,
    yearlyPrice: 2980000,
    recommended: true,
    features: [
      'دسترسی نامحدود به همه پایه‌ها و درس‌ها',
      'آزمون‌ساز هوشمند با کارنامه تحلیلی',
      'حل تمرین گام‌به‌گام کتاب درسی',
      'جمع‌بندی شب امتحان و نمونه‌سؤال',
      'گزارش پیشرفت هفتگی برای والدین',
      'پشتیبانی تحصیلی با پاسخ کمتر از ۲۴ ساعت',
    ],
    ctaLabel: 'انتخاب پلن کامل',
  },
  {
    id: 'konkur',
    name: 'کنکور',
    tagline: 'برای یک سال حساس و سرنوشت‌ساز',
    audience: 'داوطلبان کنکور و آمادگی آزمون‌های تیزهوشان',
    monthlyPrice: 598000,
    yearlyPrice: 5180000,
    recommended: false,
    features: [
      'همه امکانات پلن کامل',
      'ویدیوهای نکته و تست کنکور',
      'آزمون شبیه‌ساز استاندارد با بودجه‌بندی',
      'تحلیل آزمون و شناسایی نقاط ضعف',
      'دو جلسه مشاوره تحصیلی اختصاصی',
    ],
    ctaLabel: 'انتخاب پلن کنکور',
  },
]

/** Discount percentage of the yearly plan compared to paying monthly. */
export const yearlyDiscountPercent = 30
