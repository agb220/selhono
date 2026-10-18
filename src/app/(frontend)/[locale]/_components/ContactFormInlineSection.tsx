'use client'
import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { ContactFormInlineBlockType } from '@/payload-types'
import ContactFormInline from './Shared/Forms/ContactFormInline'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
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

export const ContactFormInlineSection: React.FC<ContactFormInlineBlockType> = ({ title }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25, once: false })

  return (
    <section ref={sectionRef} className="pb-16 md:pb-24 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container mx-auto px-4"
      >
        {title && (
          <motion.h2
            variants={itemVariants}
            className="text-accent md:h4 text-center text-dark-200 mb-8 md:mb-12 max-w-158 mx-auto"
          >
            {title}
          </motion.h2>
        )}
        <motion.div variants={itemVariants}>
          <ContactFormInline />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ContactFormInlineSection
