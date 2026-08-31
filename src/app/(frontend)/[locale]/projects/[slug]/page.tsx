import React from 'react'
import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { setStaticParamsLocale } from 'next-international/server'
import LayoutWrapper from '../../../_components/Layout/LayoutWrapper'
import ComingSoon from '@/app/(frontend)/_components/ComingSoon'
import HeroSection from '@/app/(frontend)/_components/HeroSection'
import ContactFormInlineSection from '@/app/(frontend)/_components/ContactFormInlineSection'
import ProjectDetailsSection from '@/app/(frontend)/_components/ProjectDetailsSection'

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
      locale,
      slug: service.slug,
    })),
  )
}

export default async function SingleProjectPage({ params }: ServicePageProps) {
  const { slug, locale } = await params

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const projectData = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  const rawProject = projectData.docs[0]

  if (!rawProject) {
    return notFound()
  }

  const [project] = await Promise.all([
    payload.findByID({
      collection: 'projects',
      id: rawProject.id,
      locale: locale as any,
      depth: 3,
    }),
  ])

  const layout = (project as any).layout || []

  return (
    <LayoutWrapper>
      <main>
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
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
    </LayoutWrapper>
  )
}
