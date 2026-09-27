import React from 'react'
import { getPayload as getCachedPayload } from '@/lib/payload'
import ComingSoon from '../../_components/ComingSoon'
import HeroSection from '../../_components/HeroSection'
import ContactFormInlineSection from '../../_components/ContactFormInlineSection'
import { Locales } from '@/messages/types'
import TeamDetailSection from '../../_components/TeamDetailSection'
import TeamSection from '../../_components/TeamSection'

export const dynamic = 'force-dynamic'

interface TeamPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const team = await payload.find({ collection: 'team', limit: 100, depth: 0 })
  const locales = ['de', 'en']

  return team.docs.flatMap((item: any) =>
    locales.map((locale: string) => ({
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      slug: item.slug,
    })),
  )
}

export default async function SingleTeamPage({ params }: TeamPageProps) {
  const { slug, locale } = await params
  const payload = await getCachedPayload()

  const teamData = await payload.find({
    collection: 'team',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as Locales,
    fallbackLocale: Locales.EN,
    depth: 0,
  })

  const rawTeam = teamData.docs[0]

  // if (!rawProject) {
  //   return notFound()
  // }

  const [team] = await Promise.all([
    payload.findByID({
      collection: 'team',
      id: rawTeam.id,
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      depth: 3,
    }),
  ])

  const layout = (team as any).layout || []

  const hasTeamSection = layout.some((s: any) => s.blockType === 'team-block')
  let teamMembers: any[] = []

  if (hasTeamSection) {
    const allMembersData = await payload.find({
      collection: 'team',
      where: {
        id: {
          not_equals: rawTeam.id,
        },
      },
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      depth: 2,
      limit: 100,
    })
    teamMembers = allMembersData.docs
  }

  return (
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
                  <TeamDetailSection member={team} />
                </React.Fragment>
              )

            case 'team-block':
              return <TeamSection key={idx} {...section} members={teamMembers} viewMode="scroll" />

            case 'contact-form-inline-block':
              return <ContactFormInlineSection key={idx} {...section} />

            default:
              return null
          }
        })
      )}
    </main>
  )
}
