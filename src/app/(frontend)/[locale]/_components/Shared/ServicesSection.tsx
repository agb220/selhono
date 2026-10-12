'use client'
import { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/dist/client/link'
import { motion, useInView, Variants } from 'framer-motion'
import { Button } from '../ui/ButtonUI'
import { ArrowSvg } from '../icons'
import { cn } from '@/lib/utils'
import { Service } from '@/payload-types'

interface ServicesSectionProps {
  items: (string | Service)[]
  className?: string
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const ServicesSection = (props: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  return (
    <section ref={sectionRef} className="overflow-hidden mb-8 md:mb-12 xl:mb-20">
      <div className="container mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn('flex gap-2 md:gap-10 group/list', props.className)}
          >
            {props.items.map((item, index) => {
              if (typeof item === 'string') return null
              return <ServiceCard {...item} key={item.id || index} />
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

const ServiceCard = (props: Service) => {
  return (
    <motion.li variants={cardVariants} className="w-full min-w-[320px] max-w-90 list-none mx-auto">
      <div
        className="w-full transition-all duration-300 bg-transparent
          group-hover/list:opacity-40 group-hover/list:scale-[0.98]
          hover:bg-light-100 hover:opacity-100! hover:scale-100! py-6 md:py-10 xl:py-20 px-5 rounded-[30px] hover:text-gold-200"
      >
        <div className="flex flex-col w-full items-center justify-center text-center">
          <h4 className="mb-3 xl:mb-5 text-accent">{props.title}</h4>
          <p className="mb-6 xl:mb-13 shrink-0">{props.description}</p>
          <Button
            variant="link"
            size="menu"
            asChild
            icon={ArrowSvg}
            className="button-semmibold group-hover/list:text-gold-200"
          >
            <Link href={`/services/${props.slug}`}>{props.nameLink}</Link>
          </Button>
        </div>
      </div>
    </motion.li>
  )
}
