'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DropDownSvg } from '../../icons'
import { useChangeLocale } from '@/app/(frontend)/_locales/client'
import { Locales } from '@/app/(frontend)/_locales/types'
import { useTransition } from 'react'
import Link from 'next/link'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const changeLocale = useChangeLocale()
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (newLocale: Locales) => {
    startTransition(() => {
      changeLocale(newLocale)
    })
  }

  return (
    <div className="pl-6 flex items-center">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger className="flex items-center gap-1.5 link hover:text-gold-300 transition-colors uppercase outline-none select-none cursor-pointer group">
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
            className="min-w-20 bg-white border border-gold-100 rounded-lg p-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150 z-50"
          >
            {Object.values(Locales).map((localeValue) => (
              <DropdownMenu.Item key={localeValue} className="outline-none first:mt-0 mt-0.5">
                <Link
                  href={`/${localeValue}`}
                  replace
                  scroll={false}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer outline-none w-full uppercase ${
                    currentLocale === localeValue
                      ? 'bg-gold-300/10 text-gold-300 font-bold'
                      : 'text-dark-200/70 hover:bg-gray-50 hover:text-dark-200'
                  }`}
                >
                  {localeValue}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
