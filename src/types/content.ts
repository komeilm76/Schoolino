/**
 * Content model for the Schoolino landing page.
 *
 * These types describe *presentation-agnostic* content so that static data can
 * later be replaced by an API payload without touching the UI components.
 */

/** Semantic tone used to colour a card, badge or icon. */
export type Tone = 'brand' | 'accent' | 'mint' | 'coral'

/** A single anchor link in the header, footer or mobile drawer. */
export interface NavLink {
  /** DOM id of the target section (without `#`). */
  id: string
  label: string
  description?: string
}

/** One school grade inside an education level. */
export interface Grade {
  /** Numeric grade, 1–12. */
  value: number
  /** Persian ordinal name, e.g. «هفتم». */
  label: string
}

/** Which illustration the level card should render. */
export type LevelVariant = 'elementary' | 'middle' | 'high'

/** A group of grades (elementary / middle / high school). */
export interface EducationLevel {
  id: string
  /** Geometric glyph variant. */
  variant: LevelVariant
  title: string
  /** Short range label, e.g. «پایه ۱ تا ۶». */
  range: string
  tagline: string
  description: string
  tone: Tone
  icon: string
  grades: Grade[]
  highlights: string[]
  stats: {
    lessons: number
    students: number
    hours: number
  }
}

/** A value proposition on the "Why Schoolino" bento grid. */
export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  tone: Tone
  /** Controls how much room the tile takes in the bento layout. */
  span: 'hero' | 'wide' | 'standard' | 'tall'
}

/** A teacher shown in the teachers showcase. */
export interface Teacher {
  id: string
  name: string
  subject: string
  level: string
  bio: string
  specialties: string[]
  experienceYears: number
  students: number
  lessons: number
  rating: number
  tone: Tone
  /** Key into the teacher portrait registry (`src/assets/teacherImages.ts`). */
  imageKey: string
}

/** One platform statistic. `value` is always raw; formatting happens in the UI. */
export interface Stat {
  id: string
  label: string
  value: number
  suffix: string
  icon: string
}

/** Subscription plan with demo pricing in Iranian Toman. */
export interface Plan {
  id: string
  name: string
  tagline: string
  audience: string
  monthlyPrice: number
  /** Total price for a 12-month subscription. */
  yearlyPrice: number
  recommended: boolean
  features: string[]
  ctaLabel: string
}

/** A demo testimonial. */
export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  initials: string
  tone: Tone
}

/** A FAQ entry rendered in the accessible accordion. */
export interface FaqItem {
  id: string
  question: string
  answer: string
}

/** One step in the «مسیر یادگیری» timeline. */
export interface LearningStep {
  id: string
  title: string
  description: string
  icon: string
}

/** Footer / header social link. */
export interface SocialLink {
  id: string
  label: string
  icon: string
  href: string
}

/** Full page content bundle — the unit a future API would return. */
export interface PageContent {
  levels: EducationLevel[]
  features: Feature[]
  teachers: Teacher[]
  stats: Stat[]
  plans: Plan[]
  testimonials: Testimonial[]
  faqs: FaqItem[]
  steps: LearningStep[]
  nav: NavLink[]
  footerNav: NavLink[]
  socials: SocialLink[]
}
