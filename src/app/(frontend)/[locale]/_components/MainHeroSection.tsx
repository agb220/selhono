'use client'
import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/dist/client/link'
import { Button } from './ui/ButtonUI'
import { TypewriterText } from './ui/TypewriterText'
import { getImageUrl } from '@/lib/getImageUrl'
import { MainHeroBlockType } from '@/payload-types'
import { ArrowSvg } from './icons'

const MainHeroSection = (props: MainHeroBlockType) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [resetCount, setResetCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3, once: false })

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

  return (
    <section ref={sectionRef} className="container mb-14 md:mb-18 xl:mb-23.75 mt-20">
      <div className="relative h-[90vh] md:h-[85vh] w-full rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0 bg-black/25 z-10" />
        <Image
          src={getImageUrl(props.backgroundImage)}
          alt={props.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          unoptimized
          fetchPriority="high"
        />
        <div className="relative z-20 max-w-140 pl-4 md:pl-6 pt-8 md:pt-18">
          <h1 className="h4 md:h1 text-white">
            {isInView ? (
              <TypewriterText
                key={`${props.title}-${resetCount}`}
                text={props.title}
                onComplete={handleComplete}
              />
            ) : null}
          </h1>
          <AnimatePresence>
            {isTypingComplete && isInView && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {props.subtitle && (
                  <p className="paragraph text-white max-w-117">{props.subtitle}</p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                >
                  <Button
                    asChild
                    variant="default"
                    className="mt-5 md:mt-7 max-h-12 md:max-h-18.75"
                    iconPlacement="end"
                    icon={ArrowSvg}
                  >
                    <Link href={(props.buttonLink as string) || '/'}>{props.buttonText}</Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default MainHeroSection
