import Link from 'next/link'
import { Button } from './ui/Button'
import { getScopedI18n } from '../_locales/server'

interface ComingSoonProps {
  locale: string
  isHome?: boolean
}

export default async function ComingSoon({ locale, isHome = false }: ComingSoonProps) {
  const t = await getScopedI18n('commingSoon')

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center pt-50 pb-20 xl:pt-30 max-h-screen">
      <h1 className="h4  mb-4 animate-pulse">{t('title')}</h1>
      <p className="text-gold-300 max-w-md mb-8 paragraph">{t('desc')}</p>

      {!isHome && (
        <Button asChild>
          <Link href={`/`}>{t('titleBtn')}</Link>
        </Button>
      )}
    </div>
  )
}
