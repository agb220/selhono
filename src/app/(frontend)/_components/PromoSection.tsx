import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/ButtonUI'
import { getCurrentLocale } from '../_locales/server'
import { ArrowSvg, PhoneSvg } from './icons'
import { getImageUrl } from '@/lib/getImageUrl'

const PromoSection = async () => {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findGlobal({
    slug: 'promo-block',
    locale: locale as any,
  })

  if (!data || !data.leftImage) return null

  const imageUrlLeft = getImageUrl(data.leftImage)
  const imageUrlRight = getImageUrl(data.rightImage)

  return (
    <section className="container mb-12 md:mb-24 xl:mb-48.5">
      <div className="flex items-stretch">
        <div className="relative w-full shrink-0 aspect-square lg:aspect-[1.15/1] overflow-hidden rounded-tr-[250px] md:rounded-tr-[400px] lg:max-w-130 h-140 max-h-140 lg:max-h-175">
          {imageUrlLeft && (
            <Image
              src={imageUrlLeft}
              alt={(data.leftImage as any).alt || 'Promo'}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 p-3 md:p-12 flex flex-col justify-center text-white">
            <h2 className="text-accent-lg md:h3 mb-2 md:mb-5 lg:max-w-92">{data.title}</h2>
            <p className="input-medium mb-2 md:mb-5 lg:max-w-81">{data.description}</p>

            {data.contactInfo?.phone && (
              <div className="flex items-center gap-2 lg:gap-3.75 mb-5 lg:mb-11.75">
                <Button
                  asChild
                  variant="circle-white"
                  className="size-12 lg:size-[93px] p-0"
                  icon={PhoneSvg}
                >
                  <a href={`tel:${data.contactInfo.phone}`}></a>
                </Button>
                <div className="flex flex-col lg:gap-2">
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
                className="lg:max-w-61.75"
              >
                <Link href={data.ctaButton.link}>{data.ctaButton.label}</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="relative aspect-4/3 lg:aspect-[1.15/1] overflow-hidden clip-promo-section w-full flex-1 z-0 -ml-58 max-h-175 hidden lg:flex">
          {imageUrlRight && (
            <Image
              src={imageUrlRight}
              alt={(data.rightImage as any).alt || 'Promo'}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default PromoSection
