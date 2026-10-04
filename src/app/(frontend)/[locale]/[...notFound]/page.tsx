import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Button } from '../_components/ui/ButtonUI'

export default async function NotFound() {
  const t = await getTranslations('notfound')
  return (
    <section className="py-26 md:py-54">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-120 h-80 md:h-95 rounded-tl-2xl rounded-bl-2xl rounded-br-[120px] md:rounded-br-[160px] rounded-tr-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/404img.jpg"
                alt="Page not found"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h1 className="text-number  md:text-number-bigtext-gold-300 mb-4">404</h1>

            <p className="text-lg md:text-accent text-dark-200 mb-8 max-w-md">{t('desc')}</p>
            <Button>
              <Link href="/">{t('btn')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
