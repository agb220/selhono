'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView, Variants } from 'framer-motion'
import { Button } from './ui/ButtonUI'
import ModalLayout from './Shared/Modal'
import ContactForm from './Shared/Forms/ContactForm'
import { CtaSection } from '@/payload-types'
import ArrowSvg from './icons/ArrowSvg'
import { getImageUrl } from '@/lib/getImageUrl'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const ContactUsSection = (props: CtaSection) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useTranslations('modalContact')

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.3, once: false })

  return (
    <section ref={sectionRef} className="container mx-auto mb-10 overflow-hidden">
      <div className="relative overflow-hidden text-white flex flex-col items-center justify-center min-h-87.5 md:min-h-105 rounded-[40px] md:rounded-[60px]">
        {props.backgroundImage && (
          <Image
            src={getImageUrl(props.backgroundImage)}
            alt={props.title}
            fill
            className="object-cover object-center -z-10 brightness-[0.7]"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="container mx-auto flex flex-col items-center justify-center text-center px-4"
        >
          <motion.h2 variants={itemVariants} className="h4 mb-3 max-w-2xl">
            {props.title}
          </motion.h2>

          <motion.p variants={itemVariants} className="mb-8 max-w-xl input-medium">
            {props.description}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              variant="default"
              className="mt-5 md:mt-7 max-h-12 md:max-h-18.75"
              iconPlacement="end"
              icon={ArrowSvg}
              onClick={() => setIsModalOpen(true)}
              size="sm"
            >
              {props.buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <ModalLayout
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={t('title')}
        description={t('description')}
      >
        <ContactForm onSuccess={() => setIsModalOpen(false)} />
      </ModalLayout>
    </section>
  )
}

export default ContactUsSection
