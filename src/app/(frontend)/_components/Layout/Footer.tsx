import Image from 'next/image'
import Link from 'next/dist/client/link'
import NavLink from '../ui/MenuComp/NavLink'
import { Locales } from '../../_locales/types'
import SocialMediaComp from '../Shared/SocialMediaComp'
import { getCurrentLocale } from '../../_locales/server'

import { getPayload } from '@/lib/payload'
import { getImageUrl } from '@/lib/getImageUrl'

const Footer = async () => {
  const payload = await getPayload()
  const locale = await getCurrentLocale()

  const logoSettings = await payload.findGlobal({
    slug: 'logo-settings',
  })

  const footerSettings = await payload.findGlobal({
    slug: 'footer-settings',
    locale: locale as any,
  })

  const mainMenu = await payload.findGlobal({
    slug: 'main-menu',
    locale: locale as any,
  })
  const categoriesData = await payload.find({
    collection: 'categories',
    locale: locale as any,
    limit: 5,
  })

  const socialLinks = await payload.findGlobal({ slug: 'social-links' })

  const pagesLinks = mainMenu.items || []

  const imageUrl = getImageUrl(logoSettings?.logoImage)

  return (
    <footer className="container pt-10">
      <div className="flex flex-col xl:flex-row  mb-16 xl:mb-34.5 justify-between gap-14 xl:gap-25.25">
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
        <div className="flex flex-col md:flex-row justify-between gap-14 xl:gap-25.25">
          <div>
            <h4 className="font-serif text-xl font-semibold mb-5 text-dark-200">
              {footerSettings.columnTitles.pagesTitle || 'Pages'}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li>
                <NavLink href={'/'} title={locale === Locales.DE ? 'Startseite' : 'Home'}></NavLink>
              </li>
              {pagesLinks.map((item: any) => (
                <li key={item.id}>
                  <NavLink href={`/${locale}/${item.slug}`} title={item.title}></NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-semibold mb-5 text-dark-200">
              {footerSettings.columnTitles.servicesTitle || 'Services'}
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              {categoriesData.docs.map((category: any) => (
                <li key={category.id}>
                  <NavLink
                    href={`/${locale}/services?category=${category.slug}`}
                    title={category.title}
                  ></NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-semibold mb-5 text-dark-200">
              {footerSettings.columnTitles.contactTitle || 'Contact'}
            </h4>
            <ul className="flex flex-col gap-4 text-dark-200 font-normal">
              {footerSettings.contactBlock?.address && (
                <li className="whitespace-pre-line max-w-55">
                  {footerSettings.contactBlock?.address}
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
              {footerSettings.contactBlock?.phone && (
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
