import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import ComingSoon from '../../_components/ComingSoon'
import HeroSection from '../../_components/HeroSection'
import ServiceIntroSection from '../../_components/ServiceIntroSection'
import LogoMarqueeSection from '../../_components/LogoMarqueeSection'
import { YoutubeVideoSection } from '../../_components/YoutubeVideoSection'
import ServiceFeaturesSection from '../../_components/ServiceFeaturesSection'
import ServicePromoSection from '../../_components/ServicePromoSection'
import StatsSection from '../../_components/StatsSection'
import { Locales } from '@/messages/types'
import { getPayload as getCachedPayload } from '@/lib/payload'
import Breadcrumbs from '../../_components/Shared/Breadcrumbs'

export const dynamic = 'force-dynamic'

interface ServicePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const services = await payload.find({ collection: 'services', limit: 100, depth: 0 })
  const locales = ['de', 'en']

  return services.docs.flatMap((service: any) =>
    locales.map((locale: string) => ({
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      slug: service.slug,
    })),
  )
}

export default async function SingleServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params
  const t = await getTranslations('breadcrumbs')

  const payload = await getCachedPayload()

  const serviceData = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
    locale: locale as Locales,
    fallbackLocale: 'en',
  })

  const rawService = serviceData.docs[0]

  if (!rawService) {
    return notFound()
  }

  const [service, marqueeData, statsData] = await Promise.all([
    payload.findByID({
      collection: 'services',
      id: rawService.id,
      locale: locale as Locales,
      fallbackLocale: 'en',
      depth: 3,
    }),
    payload.findGlobal({
      slug: 'logo-marquee',
      locale: locale as Locales,
      fallbackLocale: 'en',
    }),
    payload.findGlobal({
      slug: 'company-stats',
      locale: locale as Locales,
      fallbackLocale: 'en',
    }),
  ])

  const breadcrumbItems = [
    {
      label: t('services') || 'Services',
      href: `/services`,
    },
    {
      label: service.title || slug,
      href: `/services/${slug}`,
    },
  ]

  const layout = (service as any).layout || []

  return (
    <main className="relative">
      <div className="absolute top-10 md:top-16 left-0 right-0 z-50">
        <div className="container mx-auto">
          <Breadcrumbs customItems={breadcrumbItems} />
        </div>
      </div>
      {layout.length === 0 ? (
        <ComingSoon isHome={false} />
      ) : (
        layout.map((section: any, idx: number) => {
          switch (section.blockType) {
            case 'hero-block':
              return <HeroSection key={idx} {...section} />

            case 'service-intro-block':
              return <ServiceIntroSection key={idx} {...section} />

            case 'logo-merquee-section':
              return <LogoMarqueeSection key={idx} {...marqueeData} />

            case 'youtube-video-block':
              return <YoutubeVideoSection key={idx} url={section.youtubeUrl} />

            case 'service-features-block':
              return <ServiceFeaturesSection key={idx} {...section} />

            case 'service-promo-block':
              return <ServicePromoSection key={idx} {...section} />

            case 'stats-section':
              return <StatsSection key={idx} {...statsData} />

            default:
              return null
          }
        })
      )}
    </main>
  )
}
