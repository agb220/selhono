import { getPayload } from 'payload'
import config from '@/payload.config'
import MainHeroSection from '../_components/MainHeroSection'
import LayoutWrapper from '../_components/Layout/LayoutWrapper'
import { getCurrentLocale } from '../_locales/server'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const locale = await getCurrentLocale()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const findResult = await payload.findGlobal({
    slug: 'home-page',
    locale: locale as any,
    depth: 2,
  })

  if (!findResult) {
    return notFound()
  }

  return (
    <LayoutWrapper>
      <main className="">
        {(findResult.layout || []).map((section: any, idx: number) => {
          if (section.blockType === 'main-hero') {
            return <MainHeroSection key={idx} {...section} />
          }
        })}
      </main>
    </LayoutWrapper>
  )
}
