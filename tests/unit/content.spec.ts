import { describe, expect, it } from 'vitest'
import {
  educationLevelSchema,
  faqSchema,
  featureSchema,
  learningStepSchema,
  navLinkSchema,
  planSchema,
  socialLinkSchema,
  statSchema,
  teacherSchema,
  testimonialSchema,
} from '@/data/schemas'
import {
  educationLevels,
  faqs,
  features,
  footerNav,
  learningSteps,
  mainNav,
  plans,
  pageContent,
  socials,
  stats,
  teachers,
  testimonials,
} from '@/data'
import { teacherImages } from '@/assets/teacherImages'
import { yearlySavingPercent } from '@/utils/format'

/** Section ids rendered by App.vue — anchors must match these. */
const SECTION_IDS = [
  'hero',
  'impact',
  'grades',
  'why',
  'path',
  'teachers',
  'plans',
  'testimonials',
  'faq',
]

describe('content integrity', () => {
  it('validates every education level', () => {
    for (const level of educationLevels) {
      expect(educationLevelSchema.safeParse(level).success, level.id).toBe(true)
    }
  })

  it('covers grades 1 to 12 exactly once', () => {
    const grades = educationLevels.flatMap((level) => level.grades.map((grade) => grade.value))
    expect(grades).toHaveLength(12)
    expect([...grades].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('validates features, teachers, stats, plans, testimonials, faqs, steps and links', () => {
    for (const item of features) expect(featureSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of teachers) expect(teacherSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of stats) expect(statSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of plans) expect(planSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of testimonials)
      expect(testimonialSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of faqs) expect(faqSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of learningSteps)
      expect(learningStepSchema.safeParse(item).success, item.id).toBe(true)
    for (const item of [...mainNav, ...footerNav]) {
      expect(navLinkSchema.safeParse(item).success, item.id).toBe(true)
    }
    for (const item of socials) expect(socialLinkSchema.safeParse(item).success, item.id).toBe(true)
  })

  it('keeps every id unique inside its collection', () => {
    const collections = {
      educationLevels,
      features,
      teachers,
      stats,
      plans,
      testimonials,
      faqs,
      learningSteps,
    }
    for (const [name, collection] of Object.entries(collections)) {
      const ids = collection.map((item) => item.id)
      expect(new Set(ids).size, `${name} has duplicate ids`).toBe(ids.length)
    }
  })

  it('points every navigation anchor at a real section', () => {
    for (const item of [...mainNav, ...footerNav]) {
      expect(SECTION_IDS, `missing section for #${item.id}`).toContain(item.id)
    }
  })

  it('resolves a portrait for every teacher', () => {
    for (const teacher of teachers) {
      expect(teacherImages[teacher.imageKey], `no image for ${teacher.id}`).toBeTruthy()
    }
  })

  it('marks exactly one recommended plan, and it is the cheapest yearly per month', () => {
    const recommended = plans.filter((plan) => plan.recommended)
    expect(recommended).toHaveLength(1)
  })

  it('price lists are internally consistent (yearly is cheaper than 12 months)', () => {
    for (const plan of plans) {
      expect(yearlySavingPercent(plan.monthlyPrice, plan.yearlyPrice), plan.id).toBeGreaterThan(0)
    }
  })

  it('exposes a single content bundle with every collection', () => {
    expect(pageContent.levels).toHaveLength(3)
    expect(pageContent.features.length).toBeGreaterThanOrEqual(4)
    expect(pageContent.faqs.length).toBeGreaterThanOrEqual(6)
    expect(pageContent.plans).toHaveLength(3)
    expect(pageContent.steps).toHaveLength(4)
  })
})
