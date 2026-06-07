'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { DropDownSvg } from '../icons'
import { Locales } from '../../_locales/types'
import Link from 'next/dist/client/link'
import { useChangeLocale } from '../../_locales/client'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const changeLocale = useChangeLocale()

  return (
    <div className="border-l border-border pl-6 flex items-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-1.5 text-sm font-semibold text-dark-200 hover:text-dark-200/80 transition-colors uppercase outline-none select-none cursor-pointer group">
          {currentLocale}
          <DropDownSvg
            className="size-4 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="min-w-27.5 bg-white border border-border rounded-lg p-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
          >
            <DropdownMenu.Item className="outline-none">
              <button
                onClick={() => changeLocale(Locales.EN)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer outline-none ${
                  currentLocale === 'en'
                    ? 'bg-gold-300/10 text-gold-300 font-bold'
                    : 'text-dark-200/70 hover:bg-gray-50 hover:text-dark-200'
                }`}
              >
                {Locales.EN}
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="outline-none mt-0.5">
              <button
                onClick={() => changeLocale(Locales.DE)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer outline-none ${
                  currentLocale === 'de'
                    ? 'bg-gold-300/10 text-gold-300 font-bold'
                    : 'text-dark-200/70 hover:bg-gray-50 hover:text-dark-200'
                }`}
              >
                {Locales.DE}
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
