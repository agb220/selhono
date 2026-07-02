import Image from 'next/image'
import { Title } from './Shared/Title'
import { HeroBlockType } from '@/payload-types'
import { getImageUrl } from '@/lib/hooks/getURL'

const HeroSection = (props: HeroBlockType) => {
  return (
    <section>
      <div className="relative h-105 xl:h-70 overflow-hidden">
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 z-10"></div>
        <Image
          src={getImageUrl({
            media: props.image,
            size: 'big',
          })}
          alt={props.title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="text-white absolute right-1/2 top-1/2 translate-y-[-50%] translate-x-[50%] z-20">
          <Title title={props.title} as="h1"></Title>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
