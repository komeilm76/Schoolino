import type { NavLink, SocialLink } from '@/types/content'

/** Primary navigation — anchors match the `id` of each landing page section. */
export const mainNav: NavLink[] = [
  { id: 'grades', label: 'پایه‌های تحصیلی', description: 'از اول تا دوازدهم' },
  { id: 'why', label: 'چرا اسکولینو؟', description: 'امکانات و رویکرد آموزشی' },
  { id: 'teachers', label: 'اساتید', description: 'با معلم‌های ما آشنا شو' },
  { id: 'plans', label: 'شهریه و اشتراک', description: 'پلن مناسب خودت را انتخاب کن' },
  { id: 'faq', label: 'سؤالات متداول', description: 'پاسخ پرتکرارترین سؤال‌ها' },
]

/** Footer quick links (same anchors, shorter labels). */
export const footerNav: NavLink[] = [
  { id: 'grades', label: 'پایه‌های تحصیلی' },
  { id: 'why', label: 'امکانات یادگیری' },
  { id: 'teachers', label: 'اساتید' },
  { id: 'plans', label: 'پلن‌ها و شهریه' },
  { id: 'faq', label: 'سؤالات متداول' },
]

/**
 * Demo social links. The URLs are placeholders: the UI opens an honest
 * "demo only" notice instead of navigating to a real account.
 */
export const socials: SocialLink[] = [
  { id: 'instagram', label: 'اینستاگرام', icon: 'instagram', href: '#' },
  { id: 'telegram', label: 'تلگرام', icon: 'send', href: '#' },
  { id: 'youtube', label: 'یوتیوب', icon: 'youtube', href: '#' },
  { id: 'mail', label: 'ایمیل', icon: 'mail', href: '#' },
]
