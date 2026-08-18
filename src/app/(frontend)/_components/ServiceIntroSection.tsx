'use client'

import { useState } from 'react'
import { ServiceIntroBlockType } from '@/payload-types'
import { useI18n } from '../_locales/client'

export default function ServiceIntroSection({ title, subtitle, content }: ServiceIntroBlockType) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = useI18n()

  return (
    <section className="pb-16 md:pb-24 container">
      <div className="mx-auto text-center px-2 xl:px-0">
        <h2 className="text-accent md:h4 mb-6 xl:mb-8 max-w-129 mx-auto">{title}</h2>
        <p className="mb-6 xl:mb-12 xl:text-md text-gold-300">{subtitle}</p>
        <div className="relative md:text-left">
          <div
            className={`text-slate-600 text-sm md:text-base leading-relaxed columns-1 md:columns-2 gap-8 md:gap-12 [column-fill:balance] transition-all duration-300 md:max-h-none md:overflow-visible ${
              isExpanded ? 'max-h-none' : 'max-h-55 overflow-hidden'
            }`}
          >
            <div className="whitespace-pre-line">{content}</div>
          </div>
          <div className="mt-4 text-center md:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-number-small uppercase tracking-wider md:text-small"
            >
              {isExpanded ? t('serviceIntro.btnLess') : t('serviceIntro.btnMore')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
