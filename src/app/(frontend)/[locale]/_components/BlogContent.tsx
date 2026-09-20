import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getLocale, getTranslations } from 'next-intl/server'
import { BlogCategory, Post } from '@/payload-types'
import BlogSearch from './BlogSearch'
import { Title } from './Shared/Title'
import { lexicalConverters } from '@/lib/richTextConverters'
import { cn } from '@/lib/utils'

interface BlogContentProps {
  post: Post
  latestPosts?: Post[]
  categories?: BlogCategory[]
}

export default async function BlogContent({
  post,
  latestPosts = [],
  categories = [],
}: BlogContentProps) {
  const locale = await getLocale()
  const t = await getTranslations('blog')

  return (
    <section className="pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <article className="order-1 lg:order-2 lg:col-span-8 space-y-8">
            <Title title={post.title} as="h2" size="hero"></Title>
            <div className="prose prose-lg max-w-none space-y-6">
              {post.content && (
                <RichText data={post.content as any} converters={lexicalConverters} />
              )}
            </div>
          </article>
          <aside className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-28 self-start space-y-10">
            <BlogSearch />
            {latestPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-accent">{t('last')}</h3>
                <div className="space-y-4 divide-y divide-[#e2e8f0]">
                  {latestPosts.map((item: Post) => {
                    const itemDate = item.publishedDate
                      ? new Date(item.publishedDate).toLocaleDateString(
                          locale === 'de' ? 'de-DE' : 'en-US',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          },
                        )
                      : ''
                    return (
                      <div key={item.id} className="pt-4 first:pt-0">
                        <Link
                          href={`/${locale}/blog/${item.slug}`}
                          className="group block space-y-1 border-b border-b-gold-300 pb-1"
                        >
                          <h4 className="h7 group-hover:text-gold-300 transition-colors duration-500 line-clamp-2">
                            {item.title}
                          </h4>
                          <span className="text-small block text-right">{itemDate}</span>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {categories.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-accent">{t('categories')}</h3>
                <ul className="space-y-3 divide-y divide-[#e2e8f0]">
                  {categories.map((cat: BlogCategory) => (
                    <li key={cat.id} className="pt-3 first:pt-0">
                      <Link
                        href={`/${locale}/blog?category=${cat.slug}`}
                        className="hover:text-gold-300 transition-colors duration-500 block py-1 border-b border-b-gold-300 pb-1"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-accent">{t('tags')}</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tagItem, idx) => {
                    const categoryTitle =
                      typeof post.category === 'object' && post.category !== null
                        ? post.category.title
                        : post.category
                    const isActive = tagItem.tag === categoryTitle
                    return (
                      <span
                        key={tagItem.id || idx}
                        className={cn(
                          'px-6 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer',
                          isActive
                            ? 'bg-dark-200 text-white'
                            : 'bg-light-200 text-dark-200 hover:bg-dark-200 hover:text-white',
                        )}
                      >
                        {tagItem.tag}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
