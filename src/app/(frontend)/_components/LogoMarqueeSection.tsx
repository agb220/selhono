import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getImageUrl } from '@/lib/getImageUrl'
import { getCurrentLocale } from '../_locales/server'
import MarqueeTrack from './MarqueeTrack'

const LogoMarqueeSection = async () => {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findGlobal({
    slug: 'logo-marquee',
    locale: locale as any,
  })

  const baseLogos = data?.logos || []

  if (baseLogos.length === 0) return null

  return (
    <section className="w-full mb-16 md:mb-24 xl:mb-50">
      <div className="relative w-full flex overflow-x-hidden">
        <MarqueeTrack>
          {baseLogos.map((item, index) => {
            const logoUrl = getImageUrl(item.logoImage)

            if (!logoUrl) return null
            return (
              <li
                key={`${item.id || index}-${index}`}
                className="flex items-center justify-center max-h-25 w-auto"
              >
                <Image
                  src={logoUrl}
                  alt={item.brandName || 'Partner Logo'}
                  width={2500}
                  height={2000}
                  className="object-contain h-full w-full select-none pointer-events-none"
                />
              </li>
            )
          })}
        </MarqueeTrack>
      </div>
    </section>
  )
}

export default LogoMarqueeSection
