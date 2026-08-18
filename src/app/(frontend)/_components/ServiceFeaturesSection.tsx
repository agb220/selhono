import React from 'react'
import { ServiceFeaturesBlockType } from '@/payload-types'

export default function ServiceFeaturesSection({ columns }: ServiceFeaturesBlockType) {
  if (!columns || columns.length === 0) return null

  return (
    <section className="pb-16 md:pb-24 container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 md:max-w-200  md:mx-auto">
        {columns.map((col, idx) => {
          const listItems = col.items
            ? col.items.split('\n').filter((item) => item.trim() !== '')
            : []

          return (
            <div
              key={idx}
              className={
                idx === 0 ? 'md:pr-6 xl:pr-12 md:border-r md:border-[#cecece]' : ' md:pl-8 xl:pl-14'
              }
            >
              <h2 className="text-accent md:h4 text-dark-200 mb-4 md:mb-6">{col.title}</h2>

              {listItems.length > 0 && (
                <ol className="space-y-4 md:space-y-6 ">
                  {listItems.map((text, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-4">
                      <span className="text-gold-300 link">{itemIdx + 1}</span>
                      <span>{text.trim()}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
