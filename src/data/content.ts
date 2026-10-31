export const services = [
  {
    id: 'it',
    title: 'زیرساخت و خدمات فناوری اطلاعات',
    description:
      'ارائه و مدیریت زیرساخت‌های سخت‌افزاری و شبکه، مراکز داده، اینترنت اشیا و خدمات پشتیبانی فناوری اطلاعات.',
    details: [
      'طراحی و مدیریت شبکه و زیرساخت',
      'راهکارهای ابری و مراکز داده',
      'اینترنت اشیا و پشتیبانی فناوری اطلاعات',
    ],
  },
  {
    id: 'ai',
    title: 'هوش مصنوعی و تحقیق‌وتوسعه',
    description:
      'طراحی و پیاده‌سازی راهکارهای مبتنی بر هوش مصنوعی و تحقیق و توسعه در حوزه‌های نوین فناوری.',
    details: [
      'طراحی راهکارهای هوشمند برای کسب‌وکارها',
      'تحلیل داده و اتوماسیون فرایندها',
      'پژوهش و توسعه فناوری‌های نوین',
    ],
  },
  {
    id: 'education',
    title: 'آموزش و فناوری‌های یادگیری',
    description:
      'ارائه دوره‌های آموزشی و مهارتی، پلتفرم‌های یادگیری، محتوای دیجیتال و اتصال به فرصت‌های شغلی.',
    details: [
      'دوره‌های تخصصی و مهارت‌محور',
      'پلتفرم‌های یادگیری و محتوای دیجیتال',
      'توسعه مهارت و اتصال به فرصت‌های شغلی',
    ],
  },
] as const
export type Panel =
  'about' | 'solutions' | 'services' | 'contact' | 'cooperate' | (typeof services)[number]['id']

export type Service = (typeof services)[number]
export type ServiceId = Service['id']
export const panelTitles: Record<Panel, string> = {
  about: 'درباره آوین',
  solutions: 'راهکارهای آوین',
  services: 'حوزه‌های فعالیت',
  contact: 'ارتباط با ما',
  cooperate: 'شروع همکاری',
  it: services[0].title,
  ai: services[1].title,
  education: services[2].title,
}
export const orbitLabels: readonly { text: string; panel: Panel; position: string }[] = [
  { text: 'آموزش', panel: 'education', position: 'education' },
  { text: 'هوش مصنوعی', panel: 'ai', position: 'ai' },
  { text: 'فناوری اطلاعات', panel: 'it', position: 'it' },
  { text: 'VOD', panel: 'education', position: 'vod' },
  { text: 'کاریابی و توسعه مسیر شغلی', panel: 'cooperate', position: 'career' },
]
