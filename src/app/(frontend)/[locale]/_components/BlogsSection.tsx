'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { BlogCard } from './Shared/BlogCard'
import { Button } from './ui/ButtonUI'
import { BlogSectionBlockType, Post } from '@/payload-types'

interface BlogsSectionProps extends BlogSectionBlockType {
  posts?: Post[]
  selectedCategory?: string
}

const BlogsSection = ({
  heading,
  subheading,
  cardVariant,
  posts = [],
  viewAllText,
  selectedCategory,
}: BlogsSectionProps) => {
  const locale = useLocale()
  const t = useTranslations('posts')

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

        {posts.length > 0 ? (
          <>
            <div className="overflow-hidden mb-8 xl:mb-12" ref={emblaRef}>
              <ul className="flex gap-4 xl:gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} variant={cardVariant} />
                ))}
              </ul>
            </div>
            {viewAllText && (
              <Button asChild className="md:self-center md:max-w-[320px]">
                <Link href={`/${locale}/blog`}>{viewAllText}</Link>
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
            <p className="text-gray-500 text-lg">
              {t('notCategory')} "<span className="text-uppercase">{selectedCategory}</span>".
            </p>
            <Button asChild className="md:max-w-60">
              <Link href={`/${locale}/blog`}>{t('btnTitle')}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogsSection
