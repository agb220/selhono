'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { FeatureCardsBlockType } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { Button } from './ui/ButtonUI'
import { ArrowSvg } from './icons'

const FeatureCardItem = ({
  item,
  index,
}: {
  item: NonNullable<FeatureCardsBlockType['items']>[number]
  index: number
}) => {
  const cardRef = useRef<HTMLLIElement>(null)
  const isInView = useInView(cardRef, { amount: 0.2, once: false })

  const isReversed = index % 2 !== 0

  return (
    <motion.li
      ref={cardRef}
      className={`flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-19 overflow-hidden ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60, y: 20 }}
        animate={
          isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isReversed ? 60 : -60, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="flex flex-col lg:w-[40%]"
      >
        <h2 className="text-accent md:h4 mb-2 md:mb-6 text-dark-200">{item.title}</h2>
        <p className="mb-4 md:mb-10">{item.description}</p>
        {item.button && (
          <Button asChild icon={ArrowSvg} variant="primary" className="lg:max-w-55">
            <Link href={item.button.url}>{item.button.label}</Link>
          </Button>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -60 : 60, y: 20 }}
        animate={
          isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isReversed ? -60 : 60, y: 20 }
        }
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="w-full lg:w-[60%] relative aspect-4/3"
      >
        <Image
          src={getImageUrl(item.image)}
          alt={`${item.title} "Selhono"`}
          fill
          className={`object-cover ${
            isReversed
              ? 'rounded-tr-[100px] md:rounded-tr-[130px]'
              : 'rounded-tl-[100px] md:rounded-tl-[130px]'
          }`}
        />
      </motion.div>
    </motion.li>
  )
}

export const FeatureCardsSection: React.FC<FeatureCardsBlockType> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <ul className="container mx-auto px-4 flex flex-col gap-20 md:gap-32">
        {items.map((item, index) => (
          <FeatureCardItem key={item.id || index} item={item} index={index} />
        ))}
      </ul>
    </section>
  )
}

export default FeatureCardsSection
