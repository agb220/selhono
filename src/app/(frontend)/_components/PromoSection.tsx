import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentLocale } from '../_locales/server'

import { getImageUrl } from '@/lib/hooks/getURL'

import { ArrowSvg, PhoneSvg } from './icons'
import { Button } from './ui/Button'

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
    <section className="container mb-12 md:mb-24 xl:mb-48.5">
      <div className="flex items-stretch">
        <div className="relative w-full aspect-4/3 lg:aspect-[1.15/1] overflow-hidden rounded-tr-[400px] max-w-130 max-h-175">
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
            <h2 className="h3 mb-5 max-w-92">{data.title}</h2>
            <p className="input-medium mb-5 max-w-81">{data.description}</p>

            {data.contactInfo?.phone && (
              <div className="flex items-center gap-3.75 mb-11.75">
                <Button
                  asChild
                  variant="circle-white"
                  className="h-[93px] max-w-[93px]"
                  icon={PhoneSvg}
                >
                  <a href={`tel:${data.contactInfo.phone}`}></a>
                </Button>
                <div className="flex flex-col gap-2">
                  <span className="text-medium-bold "> {data.contactInfo.phone}</span>
                  <span className="input-medium">{data.contactInfo.label}</span>
                </div>
              </div>
            )}

            {data.ctaButton?.link && (
              <Button
                asChild
                variant="default"
                iconPlacement="end"
                icon={ArrowSvg}
                className="max-w-61.75"
              >
                <Link href={data.ctaButton.link}>{data.ctaButton.label}</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="relative aspect-4/3 lg:aspect-[1.15/1] overflow-hidden clip-promo-section w-full flex-1 z-0 -ml-58 max-h-175">
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
