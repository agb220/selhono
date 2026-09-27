'use client'
import useEmblaCarousel from 'embla-carousel-react'
import TeamCard from './Shared/TeamCard'
import { Team } from '@/payload-types'

import { Button } from './ui/ButtonUI'
import { Title } from './Shared/Title'
import Link from 'next/link'

interface TeamSectionProps {
  title?: string
  button?: {
    label?: string
  }
  members?: Team[]
  viewMode?: 'grid' | 'scroll'
}

export default function TeamSection({
  title,
  button,
  members = [],
  viewMode = 'grid',
}: TeamSectionProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  if (!members.length) return null

  if (viewMode === 'scroll') {
    return (
      <section className="pb-16 md:pb-20 overflow-hidden">
        <div className="container px-2">
          <div className="flex flex-col">
            <Title title={title || ''} size="section" className="mb-10 text-center"></Title>
            <div className="overflow-hidden mb-10 xl:mb-14" ref={emblaRef}>
              <div className="flex gap-6">
                {members.map((member, idx) => (
                  <div
                    key={member.id || idx}
                    className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_23.5%] min-w-0"
                  >
                    <TeamCard {...member} />
                  </div>
                ))}
              </div>
            </div>
            {button && (
              <Button asChild className="self-center">
                <Link href={'/team'}>{button.label || ''}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-16 md:pb-24">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {members.map((member, idx) => (
            <TeamCard {...member} key={idx} />
          ))}
        </ul>
      </div>
    </section>
  )
}
