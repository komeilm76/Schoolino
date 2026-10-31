import maryamRezaei from '@/assets/images/teachers/maryam-rezaei.webp'
import aliSadeghi from '@/assets/images/teachers/ali-sadeghi.webp'
import zahraMousavi from '@/assets/images/teachers/zahra-mousavi.webp'
import mohammadKarimi from '@/assets/images/teachers/mohammad-karimi.webp'
import negarAhmadi from '@/assets/images/teachers/negar-ahmadi.webp'
import sinaMahmoudi from '@/assets/images/teachers/sina-mahmoudi.webp'

/**
 * Teacher portraits, keyed by `Teacher.imageKey`.
 *
 * Images are imported (not string paths) so Vite fingerprints and optimises
 * them; the sources are locally generated illustrations (no external CDN, no
 * broken placeholder URLs).
 */
export const teacherImages: Record<string, string> = {
  'maryam-rezaei': maryamRezaei,
  'ali-sadeghi': aliSadeghi,
  'zahra-mousavi': zahraMousavi,
  'mohammad-karimi': mohammadKarimi,
  'negar-ahmadi': negarAhmadi,
  'sina-mahmoudi': sinaMahmoudi,
}

/**
 * Resolves a portrait URL with a safe fallback so a missing key can never
 * render a broken image.
 */
export function resolveTeacherImage(key: string): string {
  return teacherImages[key] ?? maryamRezaei
}
