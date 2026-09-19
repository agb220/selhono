import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Locales } from '@/app/(frontend)/_locales/types'

export const getCachedGlobal = cache(async (slug: string, locale: string, depth = 1) => {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const data = await payload.findGlobal({
      slug: slug as any,
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      depth,
    })

    return data
  } catch (error) {
    console.error(
      `[getCachedGlobal] Error fetching global '${slug}' for locale '${locale}':`,
      error,
    )

    try {
      const payloadConfig = await config
      const payload = await getPayload({ config: payloadConfig })
      return await payload.findGlobal({
        slug: slug as any,
        locale: Locales.EN,
        depth,
      })
    } catch (fallbackError) {
      console.error(`[getCachedGlobal] Fallback failed for '${slug}':`, fallbackError)
      return null
    }
  }
})
