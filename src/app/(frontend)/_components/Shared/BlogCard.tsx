import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { Button } from '../ui/ButtonUI'
import { ArrowShortSvg } from '../icons'

interface BlogCardProps {
  post: Post
  variant: 'default' | 'simple'
  locale?: string
}

const formatDate = (dateString: string, locale: string = 'en-US') => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString(locale, { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month},${year}`
}

export const BlogCard = ({ post, variant, locale = 'en-US' }: BlogCardProps) => {
  const { title, slug, mainImage, publishedDate, category } = post

  const categoryTitle =
    category && typeof category === 'object' && 'title' in category ? category.title : ''

  if (variant === 'default') {
    return (
      <li className="h-full max-w-80">
        <div className="group block h-full">
          <article className="relative h-full flex flex-col bg-white border border-gray-100 rounded-[62px] p-5 shadow-card hover:border-gold-200  group-hover:bg-light-200 transition-colors duration-500">
            <Link
              href={`/posts/${slug}`}
              className="relative aspect-340/290 rounded-t-[50px] overflow-hidden mb-5"
            >
              <Image
                src={getImageUrl(mainImage)}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              />
              {categoryTitle && (
                <div className="absolute left-2 md:left-5 bottom-2 md:bottom-4 z-10">
                  <span className="inline-block bg-black/50 text-white px-1  md:px-2 py-1 md:py-2 rounded-t-[10px] rounded-br-[10px] text-number-small md:text-small ">
                    {categoryTitle}
                  </span>
                </div>
              )}
            </Link>

            <div className="grow flex flex-col">
              <h3 className="text-dark-200 h7 md:h5 mb-4 xl:mb-7 transition-colors group-hover:text-gold-200">
                <Link href={`/posts/${slug}`}> {title}</Link>
              </h3>

              <div className="mt-auto flex items-center justify-between gap-4 pt-1">
                <time className="text-small">{formatDate(publishedDate, locale)}</time>
                <Button
                  asChild
                  variant={'circle-gold'}
                  size={'icon'}
                  icon={ArrowShortSvg}
                  className="group-hover:bg-gold-200"
                >
                  <Link href={`/posts/${slug}`}></Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </li>
    )
  }

  return (
    <li className="h-full">
      <div className="group block h-full">
        <article className="h-full flex flex-col pb-5 border-b border-gray-100 hover:border-gold-200 transition-colors duration-300">
          <Link
            href={`/posts/${slug}`}
            className="relative aspect-380/290 rounded-[30px] overflow-hidden mb-7"
          >
            <Image
              src={getImageUrl(mainImage)}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            />
          </Link>

          <div className="grow flex flex-col px-1">
            <h3 className="text-dark-200 text-lg md:text-xl font-dm-serif leading-tight mb-5 transition-colors group-hover:text-gold-200">
              <Link href={`/posts/${slug}`}> {title}</Link>
            </h3>

            <div className="mt-auto flex items-center justify-between gap-4">
              <time className="text-gray-500 text-sm tracking-[0.01em]">
                {formatDate(publishedDate, locale)}
              </time>
              <Button
                asChild
                variant={'circle-gold'}
                size={'icon'}
                icon={ArrowShortSvg}
                className="group-hover:bg-gold-200"
              >
                <Link href={`/posts/${slug}`}></Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </li>
  )
}
