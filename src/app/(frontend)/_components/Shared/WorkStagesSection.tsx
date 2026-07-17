'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { WorkStage } from '@/payload-types'
import Link from 'next/dist/client/link'
import { Button } from '../ui/ButtonUI'
import { ArrowSvg } from '../icons'

interface WorkStagesSectionProps {
  items: (string | WorkStage)[]
}

const WorkStagesSection = (props: WorkStagesSectionProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  return (
    <section className="overflow-hidden mb-8 md:mb-12 xl:mb-20">
      <div className="container mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <ul className="flex gap-5 md:gap-10.5 group/list">
            {props.items.map((item, index) => {
              if (typeof item === 'string') return null
              return <WorkStageCard {...item} key={index} />
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WorkStagesSection

const WorkStageCard = (props: WorkStage) => {
  return (
    <li
      className="w-full min-w-[320px] max-w-89.5 list-none mx-auto transition-all duration-300 bg-transparent
        group-hover/list:opacity-40 group-hover/list:scale-[0.98]
        hover:bg-light-100 hover:opacity-100! hover:scale-100! py-20.75 px-5 rounded-[30px] hover:text-gold-200"
    >
      <div className="flex flex-col w-full items-center justify-center text-center">
        <h4 className="mb-5 h5">{props.title}</h4>
        <p className="mb-13 shrink-0">{props.description}</p>
        <Button
          variant="link"
          size="menu"
          asChild
          icon={ArrowSvg}
          className="button-semmibold group-hover/list:text-gold-200"
        >
          <Link href={'/'}>{props.nameLink}</Link>
        </Button>
      </div>
    </li>
  )
}
