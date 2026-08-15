import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { setStaticParamsLocale } from 'next-international/server'
import LayoutWrapper from '../../../_components/Layout/LayoutWrapper'
import ComingSoon from '@/app/(frontend)/_components/ComingSoon'
import HeroSection from '@/app/(frontend)/_components/HeroSection'
import ServiceIntroSection from '@/app/(frontend)/_components/ServiceIntroSection'
import LogoMarqueeSection from '@/app/(frontend)/_components/LogoMarqueeSection'
import { YoutubeVideoSection } from '@/app/(frontend)/_components/YoutubeVideoSection'

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
      locale,
      slug: service.slug,
    })),
  )
}

export default async function SingleServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const serviceData = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  const rawService = serviceData.docs[0]

  if (!rawService) {
    return notFound()
  }

  const [service, marqueeData] = await Promise.all([
    payload.findByID({
      collection: 'services',
      id: rawService.id,
      locale: locale as any,
      depth: 3,
    }),
    payload.findGlobal({
      slug: 'logo-marquee',
      locale: locale as any,
    }),
  ])

  const layout = (service as any).layout || []

  return (
    <LayoutWrapper>
      <main>
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
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

              default:
                return null
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
