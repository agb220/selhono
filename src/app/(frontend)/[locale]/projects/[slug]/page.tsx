import React from 'react'
import { getPayload as getCachedPayload } from '@/lib/payload'
import ComingSoon from '../../_components/ComingSoon'
import HeroSection from '../../_components/HeroSection'
import ProjectDetailsSection from '../../_components/ProjectDetailsSection'
import ContactFormInlineSection from '../../_components/ContactFormInlineSection'
import { Locales } from '@/messages/types'

export const dynamic = 'force-dynamic'

interface ServicePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const services = await payload.find({ collection: 'projects', limit: 100, depth: 0 })
  const locales = ['de', 'en']

  return services.docs.flatMap((service: any) =>
    locales.map((locale: string) => ({
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      slug: service.slug,
    })),
  )
}

export default async function SingleProjectPage({ params }: ServicePageProps) {
  const { slug, locale } = await params
  const payload = await getCachedPayload()

  const projectData = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as Locales,
    fallbackLocale: Locales.EN,
    depth: 0,
  })

  const rawProject = projectData.docs[0]

  // if (!rawProject) {
  //   return notFound()
  // }

  const [project] = await Promise.all([
    payload.findByID({
      collection: 'projects',
      id: rawProject.id,
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      depth: 3,
    }),
  ])

  const layout = (project as any).layout || []

  return (
    // <LayoutWrapper>
    <main>
      {layout.length === 0 ? (
        <ComingSoon isHome={false} />
      ) : (
        layout.map((section: any, idx: number) => {
          switch (section.blockType) {
            case 'hero-block':
              return (
                <React.Fragment key={idx}>
                  <HeroSection {...section} />
                  <ProjectDetailsSection project={project as any} />
                </React.Fragment>
              )

            case 'contact-form-inline-block':
              return <ContactFormInlineSection key={idx} {...section} />

            default:
              return null
          }
        })
      )}
    </main>
    // </LayoutWrapper>
  )
}
