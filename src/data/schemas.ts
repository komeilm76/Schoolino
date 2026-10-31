import { z } from 'zod'

/**
 * Runtime schemas for the static content.
 *
 * They are the contract a future API must satisfy. Today they power the data
 * integrity tests, so a malformed static entry fails CI instead of the UI.
 */
export const toneSchema = z.enum(['brand', 'accent', 'mint', 'coral'])

export const gradeSchema = z.object({
  value: z.number().int().min(1).max(12),
  label: z.string().min(1),
})

export const educationLevelSchema = z.object({
  id: z.string().min(1),
  variant: z.enum(['elementary', 'middle', 'high']),
  title: z.string().min(1),
  range: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(20),
  tone: toneSchema,
  icon: z.string().min(1),
  grades: z.array(gradeSchema).min(3),
  highlights: z.array(z.string().min(5)).min(1),
  stats: z.object({
    lessons: z.number().positive(),
    students: z.number().positive(),
    hours: z.number().positive(),
  }),
})

export const featureSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(20),
  icon: z.string().min(1),
  tone: toneSchema,
  span: z.enum(['hero', 'wide', 'standard', 'tall']),
})

export const teacherSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  subject: z.string().min(2),
  level: z.string().min(2),
  bio: z.string().min(20),
  specialties: z.array(z.string().min(2)).min(1),
  experienceYears: z.number().int().positive(),
  students: z.number().int().positive(),
  lessons: z.number().int().positive(),
  rating: z.number().min(1).max(5),
  tone: toneSchema,
  imageKey: z.string().min(1),
})

export const statSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(2),
  value: z.number().positive(),
  suffix: z.string(),
  icon: z.string().min(1),
})

export const planSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tagline: z.string().min(5),
  audience: z.string().min(10),
  monthlyPrice: z.number().positive(),
  yearlyPrice: z.number().positive(),
  recommended: z.boolean(),
  features: z.array(z.string().min(5)).min(3),
  ctaLabel: z.string().min(3),
})

export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  role: z.string().min(3),
  quote: z.string().min(30),
  rating: z.number().int().min(1).max(5),
  initials: z.string().min(1),
  tone: toneSchema,
})

export const faqSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(5),
  answer: z.string().min(40),
})

export const learningStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(20),
  icon: z.string().min(1),
})

export const navLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
})

export const socialLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().min(1),
  href: z.string().min(1),
})
