'use client'
import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { HeroScrollBlockType } from '@/payload-types'
import { Title } from './Shared/Title'
import { getImageUrl } from '@/lib/getImageUrl'

export default function HeroScrollSection(props: HeroScrollBlockType) {
  const { title, slides } = props

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    startIndex: 2,
    containScroll: false,
    skipSnaps: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative w-full overflow-hidden text-white">
      {title && (
        <Title
          as="h1"
          title={title}
          className="absolute bottom-1/3 md:bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none drop-shadow-md text-4xl md:text-6xl font-light"
        />
      )}

      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-4.25">
          {slides?.map((slide, index) => {
            const isActive = index === selectedIndex

            const slideImageUrl = getImageUrl(slide.image)

            return (
              <div
                key={slide.id || index}
                className={`embla__slide relative h-[50vh] max-h-89 min-w-0 transition-all duration-700 ease-out will-change-[flex]
                ${
                  isActive ? 'flex-[0_0_80%] md:flex-[0_0_60%]' : 'flex-[0_0_25%] md:flex-[0_0_12%]'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 z-10"></div>

                  {slideImageUrl ? (
                    <Image
                      src={slideImageUrl}
                      alt="Project Selhono"
                      fill
                      priority={index === 0}
                      className="object-cover select-none pointer-events-none"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-800" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-2 absolute bottom-2 z-10  left-1/2 -translate-x-1/2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
