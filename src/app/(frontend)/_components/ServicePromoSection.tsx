import Image from 'next/image'
import Link from 'next/link'
import { ServicePromoBlockType, Media } from '@/payload-types'
import { Button } from './ui/ButtonUI'
import { ArrowSvg } from './icons'
import { getImageUrl } from '@/lib/getImageUrl'

export default function ServicePromoSection({
  title,
  description,
  image,
  buttonText,
}: ServicePromoBlockType) {
  return (
    <section className="pb-16 md:pb-24 container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="relative w-full aspect-4/3 rounded-tr-[120px] md:rounded-tr-[200px] overflow-hidden">
          <Image
            src={getImageUrl(image)}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 593px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-accent lg:h4 text-dark-200 mb-2.5">{title}</h2>
          <p className="lg:input-medium mb-8">{description}</p>
          <Button asChild variant="primary" icon={ArrowSvg} className="w-full md:max-w-54.75">
            <Link href="/projects">{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
