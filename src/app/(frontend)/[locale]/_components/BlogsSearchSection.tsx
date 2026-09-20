'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import BlogSearch from './BlogSearch'
import { getImageUrl } from '@/lib/getImageUrl'
import { BlogSearchBlockType, Post } from '@/payload-types'
import { Title } from './Shared/Title'
import { Button } from './ui/ButtonUI'
import { ArrowShortSvg } from './icons'

interface BlogsSearchSectionProps extends BlogSearchBlockType {
  latestPost?: Post | null
}

export default function BlogsSearchSection({ title, latestPost }: BlogsSearchSectionProps) {
  const locale = useLocale()

  const formattedDate = latestPost?.publishedDate
    ? new Date(latestPost.publishedDate).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <section className="pt-12 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 max-w-xl mx-auto">
          <BlogSearch />
        </div>
        {latestPost && (
          <div>
            {title && <Title title={title} as="h2" size="hero" className="mb-8"></Title>}
            <div className="group flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 aspect-16/10 relative rounded-[30px] overflow-hidden">
                <Image
                  src={getImageUrl(latestPost.mainImage)}
                  alt={latestPost.title}
                  fill
                  className="object-cover group-hover:scale-105 duration-500 transition-all"
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center pr-4">
                <h3 className="mb-4 h5 text-dark-200 group-hover:text-gold-300  duration-500 transition-colors">
                  <Link href={`/${locale}/blog/${latestPost.slug}`}>{latestPost.title}</Link>
                </h3>
                {latestPost.excerpt && <p className="text-small">{latestPost.excerpt}</p>}
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-small">{formattedDate}</span>
                  <Button
                    asChild
                    icon={ArrowShortSvg}
                    variant="circle-light"
                    size="icon-md"
                    className="group-hover:bg-gold-300 group-hover:text-white"
                  >
                    <Link href={`/${locale}/blog/${latestPost.slug}`}></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
