import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { setStaticParamsLocale } from 'next-international/server'
import LayoutWrapper from '../../../_components/Layout/LayoutWrapper'
import ComingSoon from '@/app/(frontend)/_components/ComingSoon'
import HeroSection from '@/app/(frontend)/_components/HeroSection'
import ServiceIntroSection from '@/app/(frontend)/_components/ServiceIntroSection'

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

  const service = await payload.findByID({
    collection: 'services',
    id: rawService.id,
    locale: locale as any,
    depth: 3,
  })

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

              default:
                return null
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
