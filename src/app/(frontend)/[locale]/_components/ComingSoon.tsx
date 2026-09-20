import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from './ui/ButtonUI'

interface ComingSoonProps {
  isHome?: boolean
}

export default async function ComingSoon({ isHome = false }: ComingSoonProps) {
  const t = await getTranslations('commingSoon')

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
