'use client'

import { useState, ReactNode } from 'react'

interface FooterAccordionProps {
  title: string
  children: ReactNode
}

export default function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between font-serif text-xl font-semibold mb-3 xl:mb-5 text-dark-200 xl:pointer-events-none text-left"
      >
        <span>{title}</span>
        <span className="md:hidden transition-transform duration-200 text-base">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 mt-2 xl:mt-0'
            : 'grid-rows-[0fr] opacity-0 xl:opacity-100'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
