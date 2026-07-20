'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { BlogSectionBlockType, Post } from '@/payload-types'
import { BlogCard } from './Shared/BlogCard'
import { Button } from './ui/ButtonUI'
import Link from 'next/link'

interface BlogsSectionProps extends BlogSectionBlockType {
  posts?: Post[]
}

const BlogsSection = ({
  heading,
  subheading,
  cardVariant,
  posts = [],
  viewAllText,
}: BlogsSectionProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  return (
    <section className="container mb-8 md:mb-14 xl:mb-29">
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12 xl:mb-20 gap-3">
          <h2 className="text-accent xl:h2 text-center text-dark-200">{heading}</h2>
          {subheading && <p className="max-w-140 text-center xl:paragraph">{subheading}</p>}
        </div>
        <div className="overflow-hidden mb-8 xl:mb-12" ref={emblaRef}>
          {posts.length > 0 && (
            <ul className="flex gap-4 xl:gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} variant={cardVariant} />
              ))}
            </ul>
          )}
        </div>
        <Button asChild className="md:self-center md:max-w-[320px]">
          <Link href={`/posts`}> {viewAllText}</Link>
        </Button>
      </div>
    </section>
  )
}

export default BlogsSection
