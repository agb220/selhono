'use client'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { HeroBlockType } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { TypewriterText } from './ui/TypewriterText'

const HeroSection = (props: HeroBlockType) => {
  const imageUrl = getImageUrl(props.image)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2, once: false })

  useEffect(() => {
    if (isInView) {
      setIsTypingComplete(false)
      setResetCount((prev) => prev + 1)
    } else {
      setIsTypingComplete(false)
    }
  }, [isInView, props.title])

  const handleComplete = useCallback(() => {
    setIsTypingComplete(true)
  }, [])

  if (!props.title) return null

  return (
    <section
      ref={sectionRef}
      className="relative min-h-100 h-[50vh] xl:h-[60vh] overflow-hidden mb-8 md:mb-14 xl:mb-20"
    >
      <div>
        <div className="absolute inset-0 bg-black/30 z-10" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={props.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
        <div className="text-white absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="h4 md:h1 text-white max-w-4xl">
            {isInView ? (
              <TypewriterText
                key={`${props.title}-${resetCount}`}
                text={props.title}
                onComplete={handleComplete}
              />
            ) : null}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
