'use client'
import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { ProcessStepsBlockType } from '@/payload-types'
import ProcessStepCard from './Shared/ProcessStepCard'
import { Title } from './Shared/Title'

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const ProcessStepsSection = (props: ProcessStepsBlockType) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isTitleInView = useInView(sectionRef, { amount: 0.1, once: false })

  if (!props.steps || props.steps.length === 0) return null

  return (
    <section ref={sectionRef} className="pb-16 md:pb-28 overflow-hidden">
      <div className="container">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? 'visible' : 'hidden'}
          className="text-center max-w-2xl mx-auto mb-16 md:mb-24"
        >
          <Title
            title={props.title}
            description={props.description ? props.description : ''}
            as="h2"
            size="section"
          />
        </motion.div>
        <div className="flex flex-col gap-16 md:gap-28 max-w-6xl mx-auto">
          {props.steps.map((step, index) => (
            <ProcessStepCard step={step} index={index} key={step.id || index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessStepsSection
