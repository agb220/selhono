import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Locales } from '@/app/(frontend)/_locales/types'

export const getCachedGlobal = cache(async (slug: string, locale: string, depth = 1) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return payload.findGlobal({
    slug: slug as any,
    locale: locale as Locales,
    fallbackLocale: Locales.EN,
    depth,
  })
})
