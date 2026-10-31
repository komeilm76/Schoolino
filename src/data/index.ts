import type { PageContent } from '@/types/content'
import { educationLevels } from './levels'
import { features } from './features'
import { teachers } from './teachers'
import { stats } from './stats'
import { plans } from './plans'
import { testimonials } from './testimonials'
import { faqs } from './faqs'
import { learningSteps } from './steps'
import { footerNav, mainNav, socials } from './navigation'

/**
 * Single content entry point.
 *
 * The landing page consumes this bundle (or its individual slices). When a real
 * API arrives, only this module needs to become async — components stay intact.
 */
export const pageContent: PageContent = {
  levels: educationLevels,
  features,
  teachers,
  stats,
  plans,
  testimonials,
  faqs,
  steps: learningSteps,
  nav: mainNav,
  footerNav,
  socials,
}

export {
  educationLevels,
  features,
  teachers,
  stats,
  plans,
  testimonials,
  faqs,
  learningSteps,
  mainNav,
  footerNav,
  socials,
}
