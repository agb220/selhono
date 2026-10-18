'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SloganBlockType } from '@/payload-types'
import { TypewriterText } from './ui/TypewriterText'

const SloganSection = (props: SloganBlockType) => {
  const sectionRef = useRef<HTMLElement>(null)

  const isInView = useInView(sectionRef, { amount: 0.3, once: false })

  const [isLinesFinished, setIsLinesFinished] = useState(false)
  const [resetCount, setResetCount] = useState(0)

  if (!isInView && isLinesFinished) {
    setIsLinesFinished(false)
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative max-w-160 mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-gray-900"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ originY: 0 }}
            className="absolute right-0 top-0 bottom-0 w-px bg-gray-900"
          />
          <blockquote className="h5 md:text-accent mb-8.5 text-dark-200 min-h-[4em] flex items-center justify-center">
            {isInView ? (
              <TypewriterText
                key={resetCount}
                text={props.quote}
                onComplete={() => setIsLinesFinished(true)}
              />
            ) : null}
          </blockquote>
          <motion.cite
            initial={{ opacity: 0, y: 10 }}
            animate={isLinesFinished && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="block text-uppercase not-italic"
          >
            {props.author}
          </motion.cite>
        </div>
      </div>
    </section>
  )
}

export default SloganSection
