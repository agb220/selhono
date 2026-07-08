import Image from 'next/image'
import Link from 'next/dist/client/link'
import { Title } from './Shared/Title'
import { Button } from './ui/ButtonUI'
import { MainHeroBlockType } from '@/payload-types'
import { ArrowSvg } from './icons'

const MainHeroSection = (props: MainHeroBlockType) => {
  return (
    <section className="container mb-14 md:mb-18 xl:mb-23.75 mt-20">
      <div className="relative h-[90vh] md:h-[85vh] w-full rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="absolute inset-0 bg-black/25 z-10" />
        <Image
          src={props.backgroundImage as string}
          alt={props.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="relative z-20 max-w-175 pl-4 md:pl-6 pt-8 md:pt-18">
          <Title
            title={props.title}
            description={props.subtitle}
            as="h1"
            size="hero"
            descVariant="light"
            className="text-white"
            classNameDesc="max-w-[470px]"
          />
          <Button
            asChild
            variant="default"
            className="mt-5 md:mt-7 max-h-12 md:max-h-18.75"
            iconPlacement="end"
            icon={ArrowSvg}
          >
            <Link href={props.buttonLink as string}>{props.buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MainHeroSection
