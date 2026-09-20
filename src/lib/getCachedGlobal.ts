import { unstable_cache } from 'next/cache'
import { Locales } from '@/app/(frontend)/_locales/types'
import { getPayload } from './payload'

export const getCachedGlobal = async (slug: string, locale: string, depth = 1) => {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload()
        return await payload.findGlobal({
          slug: slug as any,
          locale: locale as Locales,
          fallbackLocale: Locales.EN,
          depth,
        })
      } catch (error) {
        console.error(`[getCachedGlobal] Error fetching '${slug}':`, error)
        return null
      }
    },
    [`global-${slug}-${locale}-${depth}`],
    {
      revalidate: 3600,
      tags: [`global_${slug}`],
    },
  )()
}
