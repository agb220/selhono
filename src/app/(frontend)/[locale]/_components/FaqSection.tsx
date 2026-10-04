'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaqBlockType, Media } from '@/payload-types'
import { Title } from './Shared/Title'
import { ArrowShortSvg } from './icons'

type FaqSectionProps = FaqBlockType & {
  isReversed?: boolean
}

export default function FaqSection({
  title,
  image,
  items = [],
  isReversed = false,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const media = typeof image === 'object' ? (image as Media) : null
  const imageUrl = media?.url || (typeof image === 'string' ? image : '')

  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        {title && <Title title={title} className="text-center mb-6 md:mb-14" />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-6 flex flex-col ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="divide-y divide-dark-200 border-b border-dark-200">
              {items?.map((item, idx) => {
                const isOpen = openIndex === idx

                return (
                  <div key={idx} className="py-5 md:py-6">
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="w-full flex items-center justify-between gap-4 text-left group transition-colors"
                    >
                      <span className="h5 text-dark-200 group-hover:text-gold-300 transition-colors duration-500">
                        {item.question}
                      </span>
                      <span className="shrink-0 text-dark-200 group-hover:text-gold-300 transition-colors duration-300">
                        <ArrowShortSvg
                          className={`transition-transform duration-500 ${
                            isOpen ? 'rotate-90' : 'rotate-0'
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100 mt-4'
                          : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {imageUrl && (
            <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative w-full h-80 xl:h-120 max-h-170 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={imageUrl}
                  alt={title || "FAQ's"}
                  fill
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
