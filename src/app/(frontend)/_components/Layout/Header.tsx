import Link from 'next/link'
import Image from 'next/image'
import { getCurrentLocale, getScopedI18n } from '../../_locales/server'
import NavLink from '../ui/MenuComp/NavLink'
import LanguageSwitcher from '../ui/MenuComp/LanguageSwitcher'
import MobileMenu from '../ui/MenuComp/MobileMenu'
import { Locales } from '../../_locales/types'
import { getPayload } from '@/lib/payload'
import { getImageUrl } from '@/lib/getImageUrl'

export default async function Header() {
  const t = getScopedI18n('menu')
  const payload = await getPayload()

  const locale = await getCurrentLocale()

  // const MENU_MOCK = [
  //   { id: '1', title: locale === Locales.DE ? 'Über uns' : 'About Us', slug: 'about' },
  //   { id: '2', title: locale === Locales.DE ? 'Dienstleistungen' : 'Services', slug: 'services' },
  //   { id: '3', title: locale === Locales.DE ? 'Projekte' : 'Projects', slug: 'projects' },
  //   { id: '4', title: locale === Locales.DE ? 'Galerie' : 'Gallery', slug: 'gallery' },
  //   { id: '5', title: locale === Locales.DE ? 'Blog' : 'Blog', slug: 'blog' },
  //   { id: '6', title: locale === Locales.DE ? 'Preise' : 'Pricing', slug: 'pricing' },
  //   { id: '7', title: locale === Locales.DE ? 'Kontakt' : 'Contact', slug: 'contact' },
  // ]

  const logoSettings = await payload.findGlobal({
    slug: 'logo-settings',
  })

  const mainMenu = await payload.findGlobal({
    slug: 'main-menu',
    locale: locale,
  })

  const dynamicItems =
    (mainMenu as any)?.items?.map((pageData: any) => {
      return {
        id: pageData.id,
        title: pageData.title || 'Untitled',
        slug: pageData.slug || '',
      }
    }) || []

  const homePage = {
    id: 'static-home',
    title: locale === Locales.DE ? 'Startseite' : 'Home',
    slug: '',
  }

  const allHeaderPages = [homePage, ...dynamicItems]

  const MAX_VISIBLE_ITEMS = 4
  const shouldSlice = allHeaderPages.length > MAX_VISIBLE_ITEMS + 1

  const visiblePages = shouldSlice ? allHeaderPages.slice(0, MAX_VISIBLE_ITEMS) : allHeaderPages
  const hasMorePages = shouldSlice ? allHeaderPages.slice(MAX_VISIBLE_ITEMS) : []

  const imageUrl = getImageUrl(logoSettings?.logoImage)

  return (
    <header className="w-full fixed top-0 z-40 bg-white">
      <div className="container max-h-12 py-4 md:py-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-dark-200"
        >
          {imageUrl ? (
            <div className="max-h-8 md:max-h-12.5 min-w-56.75">
              <Image
                src={imageUrl}
                alt={(logoSettings.logoImage as any).alt || 'Logo'}
                height={50}
                width={227}
                className="object-cover object-center"
                unoptimized
              />
            </div>
          ) : (
            <>{logoSettings.logoText || 'SELHONO'}</>
          )}
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {visiblePages.map((page) => {
              const pageHref = `/${locale}${page.slug ? `/${page.slug}` : ''}`

              return <NavLink key={page.id} href={pageHref} title={page.title} />
            })}
          </nav>

          <LanguageSwitcher currentLocale={locale} />
        </div>

        <div className={hasMorePages ? 'block' : 'block xl:hidden'}>
          <MobileMenu allPages={allHeaderPages} locale={locale} />
        </div>
      </div>
    </header>
  )
}
