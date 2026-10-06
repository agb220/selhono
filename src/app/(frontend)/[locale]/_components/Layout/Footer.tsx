import Image from 'next/image'
import Link from 'next/dist/client/link'
import { getLocale } from 'next-intl/server'
import NavLink from '../ui/MenuComp/NavLink'
import SocialMediaComp from '../Shared/SocialMediaComp'
import { getPayload } from '@/lib/payload'
import { getImageUrl } from '@/lib/getImageUrl'
import { getCachedGlobal } from '@/lib/getCachedGlobal'
import { Locales } from '@/messages/types'
import FooterAccordion from '../ui/MenuComp/FooterAccordion'
import { Key } from 'react'
import { Category } from '@/payload-types'

const Footer = async () => {
  const payload = await getPayload()
  const locale = await getLocale()
  const [logoSettings, footerSettings, mainMenu, socialLinks, categoriesData] = await Promise.all([
    getCachedGlobal('logo-settings', locale),
    getCachedGlobal('footer-settings', locale),
    getCachedGlobal('main-menu', locale),
    getCachedGlobal('social-links', locale),
    payload.find({
      collection: 'categories',
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      limit: 5,
    }),
  ])

  const pagesLinks = mainMenu.items || []
  const categories = (categoriesData?.docs || []) as Category[]

  const imageUrl = getImageUrl(logoSettings?.logoImage)

  return (
    <footer className="container pt-10 pb-2">
      <div className="flex flex-col xl:flex-row  mb-12 xl:mb-24 justify-between gap-12 xl:gap-18">
        <div className=" ">
          <div>
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
            <p className="max-w-98.25">{footerSettings.companyBlock.description}</p>
            <div className="mt-6">
              <SocialMediaComp links={socialLinks.links || []} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 xl:gap-16">
          <div>
            <FooterAccordion title={footerSettings.columnTitles?.pagesTitle || 'Pages'}>
              <ul className="flex flex-col gap-3">
                <li>
                  <NavLink href="/" title={locale === Locales.DE ? 'Startseite' : 'Home'} />
                </li>
                {pagesLinks.map(
                  (item: { id: Key | null | undefined; slug: any; title: string }) => (
                    <li key={item.id}>
                      <NavLink href={`/${item.slug}`} title={item.title} />
                    </li>
                  ),
                )}
              </ul>
            </FooterAccordion>
          </div>

          <div>
            <FooterAccordion title={footerSettings?.columnTitles?.servicesTitle || 'Services'}>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                {categories.map((category) => (
                  <li key={category.id}>
                    <NavLink href={`/projects?category=${category.slug}`} title={category.title} />
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>
          <div>
            <h4 className="font-serif text-xl font-semibold mb-5 text-dark-200">
              {footerSettings?.columnTitles?.contactTitle || 'Contact'}
            </h4>
            <ul className="flex flex-col gap-4 text-dark-200 font-normal">
              {footerSettings.contactBlock?.address && (
                <li className="whitespace-pre-line max-w-55">
                  {footerSettings?.contactBlock?.address}
                </li>
              )}
              {footerSettings.contactBlock?.email && (
                <li>
                  <a
                    href={`mailto:${footerSettings.contactBlock?.email}`}
                    className="hover:text-dark-200 transition-colors"
                  >
                    {footerSettings.contactBlock?.email}
                  </a>
                </li>
              )}
              {footerSettings?.contactBlock?.phone && (
                <li>
                  <a
                    href={`tel:${footerSettings.contactBlock?.phone}`}
                    className="hover:text-dark-200 transition-colors"
                  >
                    {footerSettings.contactBlock.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center">Copyright © {new Date().getFullYear()} SELHONO</div>
    </footer>
  )
}

export default Footer
