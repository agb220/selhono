'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/getImageUrl'
import { Team, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Title } from './Shared/Title'
import { MailSvg, PhoneGoldSvg, WebsiteSvg } from './icons'

interface TeamDetailSectionProps {
  member: Team
}

export default function TeamDetailSection({ member }: TeamDetailSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const photoUrl = getImageUrl(member.photo as Media | string)

  return (
    <section className="pb-12 md:pb-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Title title={member.name} className="text-center" size="section"></Title>
            <p className="text-center mb-6">{member.role}</p>

            {member.shortDescription && (
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {member.shortDescription}
              </p>
            )}

            <div className="space-y-4 mb-8">
              {member.contacts?.email && (
                <a
                  href={`mailto:${member.contacts.email}`}
                  className="group flex items-center gap-3"
                >
                  <span>
                    <MailSvg className="group-hover:text-gold-300 duration-500 transition-colors" />
                  </span>
                  <span className="group-hover:text-gold-300 duration-500 transition-colors">
                    {member.contacts.email}
                  </span>
                </a>
              )}
              {member.contacts?.phone && (
                <a href={`tel:${member.contacts.phone}`} className="group flex items-center gap-3">
                  <span>
                    <PhoneGoldSvg className="group-hover:text-gold-300 duration-500 transition-colors" />
                  </span>
                  <span className="group-hover:text-gold-300 duration-500 transition-colors">
                    {member.contacts.phone}
                  </span>
                </a>
              )}
              {member.contacts?.website && (
                <a
                  href={member.contacts.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3"
                >
                  <span>
                    <WebsiteSvg className="group-hover:text-gold-300 duration-500 transition-colors" />
                  </span>
                  <span className="group-hover:text-gold-300 duration-500 transition-colors">
                    {member.contacts.website}
                  </span>
                </a>
              )}
            </div>

            {member.socials && member.socials.length > 0 && (
              <div className="flex items-center gap-4">
                {member.socials.map((social, index) => (
                  <Link
                    key={social.id || index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity duration-300 hover:opacity-70"
                    aria-label={social.platform}
                  >
                    <Image
                      src={getImageUrl(social.icon)}
                      alt={social.platform}
                      width={18}
                      height={18}
                      className="w-4 h-4 object-contain"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full aspect-4/5 rounded-3xl overflow-hidden max-h-60 md:max-h-176">
              {photoUrl && (
                <Image
                  src={photoUrl}
                  alt={member.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-top object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {member.biography && (
          <div className="mb-16">
            <Title title={'Short Biography'} className="mb-2" size="section"></Title>
            <div className="prose max-w-none">
              <RichText data={member.biography} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {member.skillsBlock?.items && member.skillsBlock.items.length > 0 && (
            <div>
              {member.skillsBlock.title && (
                <h3 className="h5 text-dark-200 mb-2">{member.skillsBlock.title}</h3>
              )}
              {member.skillsBlock.description && (
                <p className="mb-6">{member.skillsBlock.description}</p>
              )}

              <div className="space-y-6">
                {member.skillsBlock.items.map((skill, idx) => (
                  <div key={skill.id || idx}>
                    <div className="font-medium text-dark-200 mb-2">
                      <span>{skill.label}</span>
                    </div>
                    <div className="relative w-full bg-light-200 h-1 rounded-full">
                      <div
                        className="bg-gold-300 h-full rounded-full relative"
                        style={{ width: `${skill.percentage}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-dark-200 pointer-events-none">
                            {skill.percentage}%
                          </span>
                          <span className="block w-3 h-3 bg-light-200 border-2 border-gold-300 rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {member.faqBlock?.items && member.faqBlock.items.length > 0 && (
            <div>
              {member.faqBlock.title && (
                <h3 className="h5 text-dark-200 mb-2">{member.faqBlock.title}</h3>
              )}
              {member.faqBlock.description && (
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {member.faqBlock.description}
                </p>
              )}

              <div className="space-y-3">
                {member.faqBlock.items.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx

                  return (
                    <div
                      key={faq.id || idx}
                      className={`border rounded-2xl transition-all duration-200 ${
                        isOpen ? 'bg-light-200 border-transparent' : 'bg-white border-dark-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center p-4 text-left button text-dark-200"
                      >
                        <span>{faq.question}</span>
                        <span className="ml-2">{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && <div className="px-4 pb-4 pt-3">{faq.answer}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
