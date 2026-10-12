'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, Variants } from 'framer-motion'
import { Button } from './ui/ButtonUI'
import { ArrowSvg, PhoneSvg } from './icons'
import { getImageUrl } from '@/lib/getImageUrl'
import { PromoBlock } from '@/payload-types'

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const rightImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.5, 1],
    },
  },
}

const PromoSection = (data: PromoBlock) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2 })

  return (
    <section ref={sectionRef} className="container mb-12 md:mb-24 xl:mb-48.5 overflow-hidden">
      <div className="flex items-stretch">
        <div className="relative z-10 w-full shrink-0 aspect-square lg:aspect-[1.15/1] overflow-hidden rounded-tr-[250px] md:rounded-tr-[400px] lg:max-w-130 h-140 max-h-140 lg:max-h-175">
          <Image
            src={getImageUrl(data.leftImage)}
            alt={(data.leftImage as any)?.alt || 'Promo'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="absolute inset-0 p-3 md:p-12 flex flex-col justify-center text-white"
          >
            <motion.h2
              variants={textItemVariants}
              className="text-accent-lg md:h3 mb-2 md:mb-5 lg:max-w-92"
            >
              {data.title}
            </motion.h2>
            <motion.p variants={textItemVariants} className="input-medium mb-2 md:mb-5 lg:max-w-81">
              {data.description}
            </motion.p>
            {data.contactInfo?.phone && (
              <motion.div
                variants={textItemVariants}
                className="flex items-center gap-2 lg:gap-3.75 mb-5 lg:mb-11.75"
              >
                <Button
                  asChild
                  variant="circle-white"
                  className="size-12 lg:size-[93px] p-0"
                  icon={PhoneSvg}
                >
                  <a href={`tel:${data.contactInfo.phone}`}></a>
                </Button>
                <div className="flex flex-col lg:gap-2">
                  <span className="text-medium-bold">{data.contactInfo.phone}</span>
                  <span className="input-medium">{data.contactInfo.label}</span>
                </div>
              </motion.div>
            )}
            {data.ctaButton?.link && (
              <motion.div variants={textItemVariants}>
                <Button
                  asChild
                  variant="default"
                  iconPlacement="end"
                  icon={ArrowSvg}
                  className="lg:max-w-61.75"
                >
                  <Link href={data.ctaButton.link}>{data.ctaButton.label}</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
        <motion.div
          variants={rightImageVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative aspect-4/3 lg:aspect-[1.15/1] overflow-hidden clip-promo-section w-full flex-1 z-0 -ml-58 max-h-175 hidden lg:flex"
        >
          <Image
            src={getImageUrl(data.rightImage)}
            alt={(data.rightImage as any)?.alt || 'Promo'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default PromoSection
