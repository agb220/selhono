import { SloganBlockType } from '@/payload-types'

const SloganSection = (props: SloganBlockType) => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative max-w-160 mx-auto px-8 md:px-16 text-center border-l border-r border-gray-900">
          <blockquote className="h5 md:text-accent mb-8.5 text-dark-200">{props.quote}</blockquote>
          <cite className="block text-uppercase not-italic">{props.author}</cite>
        </div>
      </div>
    </section>
  )
}

export default SloganSection
