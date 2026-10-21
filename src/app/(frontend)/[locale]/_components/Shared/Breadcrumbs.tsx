'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[]
}

export const Breadcrumbs = ({ customItems }: BreadcrumbsProps) => {
  const pathname = usePathname()
  const locale = useLocale()

  if (customItems && customItems.length > 0) {
    return (
      <nav aria-label="Breadcrumb" className="py-4 md:py-6">
        <ol className="flex items-center flex-wrap gap-2 text-sm text-white">
          <li>
            <Link href="/" className="hover:text-gold-200 transition-colors duration-500">
              {locale === 'de' ? 'Startseite' : 'Home'}
            </Link>
          </li>
          {customItems.map((item, index) => {
            const isLast = index === customItems.length - 1

            return (
              <li key={item.href} className="flex items-center gap-2 min-w-0">
                <span>/</span>
                {isLast ? (
                  <span
                    className="font-medium truncate max-w-24 sm:max-w-62.5 md:max-w-xs"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-gold-200 transition-colors">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  const segments = pathname.split('/').filter(Boolean)
  const pathSegments = segments.slice(1)

  if (pathSegments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="py-4 md:py-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
        <li>
          <Link href={`/${locale}`} className="hover:text-gold-300 transition-colors">
            {locale === 'de' ? 'Startseite' : locale === 'uk' ? 'Головна' : 'Home'}
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${locale}/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1

          const formattedLabel = segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())

          return (
            <li key={href} className="flex items-center gap-2 min-w-0">
              <span>/</span>
              {isLast ? (
                <span
                  className="text-dark-200 font-medium truncate max-w-37.5 sm:max-w-62.5 md:max-w-xs"
                  aria-current="page"
                >
                  {formattedLabel}
                </span>
              ) : (
                <Link href={href} className="hover:text-gold-300 transition-colors">
                  {formattedLabel}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
