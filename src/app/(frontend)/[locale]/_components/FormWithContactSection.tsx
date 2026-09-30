'use client'

import { MailSvg, PhoneSvg, WebsiteSvg } from './icons'
import ContactFormInline from './Shared/Forms/ContactFormInline'
import SocialMediaComp from './Shared/SocialMediaComp'
import { Title } from './Shared/Title'
interface ContactsData {
  email?: string
  phone?: string
  website?: string
  address?: string
}

interface FormWithContactSectionProps {
  title?: string
  contacts?: ContactsData
  socials?: any[]
}

export default function FormWithContactSection({
  title,
  contacts,
  socials = [],
}: FormWithContactSectionProps) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container">
        {title && (
          <Title
            title={title}
            className="max-w-130 mx-auto text-center mb-12 xl:mb-24"
            size="section"
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {contacts?.email && (
                <a
                  href={`mailto:${contacts.email}`}
                  className="flex items-center gap-4 text-dark-200 hover:text-gold-300 transition-colors group text-base md:text-lg"
                >
                  <MailSvg className="max-w-13 shrink-0 text-gold-300 transition-transform group-hover:scale-110" />
                  <span>{contacts.email}</span>
                </a>
              )}

              {contacts?.phone && (
                <a
                  href={`tel:${contacts.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 text-dark-200 hover:text-gold-300 transition-colors group text-base md:text-lg"
                >
                  <PhoneSvg className="max-w-13 shrink-0 text-gold-300 transition-transform group-hover:scale-110" />
                  <span>{contacts.phone}</span>
                </a>
              )}

              {contacts?.website && (
                <a
                  href={
                    contacts.website.startsWith('http')
                      ? contacts.website
                      : `https://${contacts.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-dark-200 hover:text-gold-300 transition-colors group text-base md:text-lg"
                >
                  <WebsiteSvg className="max-w-13 shrink-0 text-gold-300 transition-transform group-hover:scale-110" />
                  <span>{contacts.website}</span>
                </a>
              )}
            </div>

            {socials && socials.length > 0 && (
              <div className="pt-2">
                <SocialMediaComp links={socials} />
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            <ContactFormInline />
          </div>
        </div>
      </div>
    </section>
  )
}
