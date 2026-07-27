import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FeatureCardsBlockType } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { Button } from './ui/ButtonUI'
import { ArrowSvg } from './icons'

export const FeatureCardsSection: React.FC<FeatureCardsBlockType> = ({ items }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="py-16 md:py-24">
      <ul className="container mx-auto px-4 flex flex-col gap-20 md:gap-32">
        {items.map((item, index) => {
          const isReversed = index % 2 !== 0
          return (
            <li
              key={item.id || index}
              className={`flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-19 ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex flex-col lg:w-[40%]">
                <h2 className="text-accent md:h4 mb-2 md:mb-6 text-dark-200">{item.title}</h2>
                <p className="mb-4 md:mb-10">{item.description}</p>
                <Button asChild icon={ArrowSvg} variant="primary" className="lg:max-w-55">
                  <Link href={item.button.url}>{item.button.label}</Link>
                </Button>
              </div>
              <div className="w-full lg:w-[60%] relative aspect-4/3">
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
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FeatureCardsSection
