'use client'
import { useState } from 'react'
import Image from 'next/image'
import { CtaSection } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { Button } from './ui/ButtonUI'
import ArrowSvg from './icons/ArrowSvg'
import ModalLayout from './Shared/Modal'
import ContactForm from './Shared/Forms/ContactForm'
import { useScopedI18n } from '../_locales/client'

const ContactUsSection = (props: CtaSection) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const t = useScopedI18n('modalContact')

  return (
    <section className="mx-auto mb-10">
      <div className="relative overflow-hidden text-white flex flex-col items-center justify-center min-h-87.5 md:min-h-105">
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
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <h2 className="h4 mb-3 max-w-2xl">{props.title}</h2>
          <p className=" mb-8 max-w-xl input-medium">{props.description}</p>
          <Button
            variant="default"
            className="mt-5 md:mt-7 max-h-12 md:max-h-18.75"
            iconPlacement="end"
            icon={ArrowSvg}
            onClick={() => setIsModalOpen(true)}
          >
            {props.buttonText}
          </Button>
        </div>
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
