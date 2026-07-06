import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'

import LayoutWrapper from '../../_components/Layout/LayoutWrapper'
import MainHeroSection from '../../_components/MainHeroSection'
import WorkStagesSection from '../../_components/Shared/WorkStagesSection'
import PromoSection from '../../_components/PromoSection'
import HeroScrollSection from '../../_components/HeroScrollSection'
import HeroSection from '../../_components/HeroSection'
import ComingSoon from '../../_components/ComingSoon'
import { setStaticParamsLocale } from 'next-international/server'
import ReviewsSection from '../../_components/ReviewsSection'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
  })

  const locales = ['de', 'en']

  return pages.docs.flatMap((page: any) =>
    locales.map((locale: string) => ({
      locale,
      slug: page.slug,
    })),
  )
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug, locale } = await params

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  const rawPage = pageData.docs[0]

  if (!rawPage) {
    return notFound()
  }

  const page = await payload.findByID({
    collection: 'pages',
    id: rawPage.id,
    locale: locale as any,
    depth: 2,
  })

  const layout = page.layout || []

  return (
    <LayoutWrapper>
      <main>
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
        ) : (
          layout.map((section: any, idx: number) => {
            if (section.blockType === 'main-hero') return <MainHeroSection key={idx} {...section} />
            if (section.blockType === 'hero-scroll')
              return <HeroScrollSection key={idx} {...section} />
            if (section.blockType === 'hero-block') return <HeroSection key={idx} {...section} />
            if (section.blockType === 'process-section')
              return <WorkStagesSection key={idx} items={section.stages || []} />
            if (section.blockType === 'promo-section') return <PromoSection key={idx} />
            if (section.blockType === 'reviews-section') {
              return <ReviewsSection key={idx} />
            }
            return null
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
