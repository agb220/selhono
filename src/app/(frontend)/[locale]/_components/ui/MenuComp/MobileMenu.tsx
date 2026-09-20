'use client'
import { useState, useEffect, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import NavLink from './NavLink'
import { Locales } from '@/messages/types'

interface MobileMenuProps {
  allPages: Array<{ id: string; title: string; slug: string }>
  locale: string
}

export default function MobileMenu({ allPages, locale }: MobileMenuProps) {
  const t = useTranslations('menu')
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => setIsAnimated(true))
      return () => cancelAnimationFrame(timer)
    } else {
      setIsAnimated(false)
    }
  }, [isOpen])

  useEffect(() => {
    handleClose()
  }, [pathname])

  const handleClose = () => {
    setIsAnimated(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 450)
  }

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => (open ? setIsOpen(true) : handleClose())}
      modal={false}
    >
      <Dialog.Trigger asChild>
        <button
          className="py-2 text-dark-200 outline-none cursor-pointer group"
          aria-label="Toggle menu"
        >
          <svg
            className={`size-6 transition-transform duration-300 ease-out ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-dark-200/15 backdrop-blur-sm z-50 transition-opacity duration-300 ease-out ${
            isAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <Dialog.Content
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 p-6 shadow-2xl flex flex-col outline-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isAnimated ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-end mb-6 shrink-0">
            <button
              onClick={handleClose}
              className="p-2 text-dark-200 outline-none cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Dialog.Title className="sr-only">{t('navTitle')}</Dialog.Title>
          <nav className="flex-1 overflow-y-auto pr-2 mb-6 flex flex-col gap-4 items-start scrollbar-thin">
            {allPages.map((page) => {
              const pageHref = `/${locale}${page.slug ? `/${page.slug}` : ''}`
              return <NavLink key={page.id} href={pageHref} title={page.title} />
            })}
          </nav>

          <div className="pt-4 border-t border-border/60 flex flex-col gap-3 shrink-0">
            <span className="text-xs font-bold text-dark-200/40 uppercase tracking-widest">
              {t('lang')}
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={isPending}
                onClick={() => handleLanguageChange(Locales.EN)}
                className={`py-2.5 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer border disabled:opacity-50 ${
                  locale === Locales.EN
                    ? 'bg-gold-300/10 text-gold-300 border-gold-300/30'
                    : 'bg-gray-50 text-dark-200/70 border-transparent hover:bg-gray-100'
                }`}
              >
                {Locales.EN}
              </button>
              <button
                disabled={isPending}
                onClick={() => handleLanguageChange(Locales.DE)}
                className={`py-2.5 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer border disabled:opacity-50 ${
                  locale === Locales.DE
                    ? 'bg-gold-300/10 text-gold-300 border-gold-300/30'
                    : 'bg-gray-50 text-dark-200/70 border-transparent hover:bg-gray-100'
                }`}
              >
                {Locales.DE}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
