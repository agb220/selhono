import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from '../ui/dropdownMenu'
import { Locales } from '../../_locales/types'

interface HeaderProps {
  locale: string
}

export default async function Header({ locale }: HeaderProps) {
  const payload = await getPayload({ config })

  const logoSettings = await payload.findGlobal({
    slug: 'logo-settings',
  })

  const mainMenu = await payload.findGlobal({
    slug: 'main-menu',
  })

  const dynamicItems = (mainMenu.items as any[]) || []

  const homePage = {
    id: 'static-home',
    title: locale === Locales.DE ? 'Startseite' : 'Home',
    slug: '',
  }

  const allHeaderPages = [
    homePage,
    ...dynamicItems.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
    })),
  ]

  const MAX_VISIBLE_ITEMS = 6
  const visiblePages = allHeaderPages.slice(0, MAX_VISIBLE_ITEMS)
  const hiddenPages = allHeaderPages.slice(MAX_VISIBLE_ITEMS)

  return (
    <header className="w-full sticky top-0 z-40">
      <div className="container max-h-20 py-4 md:py-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-dark-200"
        >
          {logoSettings.logoType === 'image' && logoSettings.logoImage ? (
            <Image
              src={(logoSettings.logoImage as any).url}
              alt={(logoSettings.logoImage as any).alt || 'Logo'}
              width={140}
              height={40}
              className="object-contain max-h-8 md:max-h-12.5 w-auto"
            />
          ) : (
            <>{logoSettings.logoText || 'SELHONO'}</>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {visiblePages.map((page) => (
              <Link
                key={page.id}
                href={`/${page.slug ? `/${page.slug}` : ''}`}
                className="text-dark-200/80 hover:text-dark-200 font-medium transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* MOB */}
        <div className="block md:hidden">
          <button className="p-2 text-dark-200">
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
