import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentLocale } from '../_locales/server'
import { PromoBlockSectionType } from '@/payload-types'
import { getImageUrl } from '@/lib/hooks/getURL'

const PromoSection = async () => {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findGlobal({
    slug: 'promo-block',
    locale: locale as any,
  })

  if (!data || !data.leftImage) return null

  return (
    <section className="container py-16 xl:py-24">
      <div className="flex items-center">
        <div className="relative w-full aspect-4/3 lg:aspect-[1.15/1] overflow-hidden rounded-tr-[400px] max-w-[653px] h-[700px]">
          <Image
            src={getImageUrl({
              media: data.leftImage,
              size: 'big',
            })}
            alt={(data.leftImage as any).alt || 'Promo'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 max-w-md leading-tight">
              {data.title}
            </h2>
            <p className="text-white/80 max-w-sm text-sm md:text-base mb-6">{data.description}</p>

            {data.contactInfo?.phone && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"></div>
                <div>
                  <a href={`tel:${data.contactInfo.phone}`} className="block font-bold text-lg">
                    {data.contactInfo.phone}
                  </a>
                  <span className="text-xs text-white/60">{data.contactInfo.label}</span>
                </div>
              </div>
            )}

            {data.ctaButton?.link && (
              <div>
                <Link
                  href={data.ctaButton.link}
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#c9a076] hover:bg-[#b58e65] text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {data.ctaButton.label} →
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="relative aspect-4/3 lg:aspect-[0.88/1] overflow-hidden clip-promo-section w-full flex-1 z-0 -ml-58 max-h-[700px]">
          <Image
            src={getImageUrl({ media: data.rightImage, size: 'big' })}
            alt="Outdoor dining"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default PromoSection
