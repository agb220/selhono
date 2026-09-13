import React from 'react'
import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { setStaticParamsLocale } from 'next-international/server'
import LayoutWrapper from '../../../_components/Layout/LayoutWrapper'
import ComingSoon from '@/app/(frontend)/_components/ComingSoon'
import HeroSection from '@/app/(frontend)/_components/HeroSection'
import ContactFormInlineSection from '@/app/(frontend)/_components/ContactFormInlineSection'
import BlogContent from '@/app/(frontend)/_components/BlogContent'
import { BlogCategory, Post } from '@/payload-types'

export const dynamic = 'force-dynamic'

interface BlogSinglePageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const posts = await payload.find({ collection: 'posts', limit: 100, depth: 0 })
  const locales = ['de', 'en']

  return posts.docs.flatMap((post: any) =>
    locales.map((locale: string) => ({
      locale,
      slug: post.slug,
    })),
  )
}

export default async function SingleBlogPage({ params }: BlogSinglePageProps) {
  const { slug, locale } = await params

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const postData = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  const rawPost = postData.docs[0]

  if (!rawPost) {
    return notFound()
  }

  const [post, latestPostsData, categoriesData] = await Promise.all([
    payload.findByID({
      collection: 'posts',
      id: rawPost.id,
      locale: locale as any,
      depth: 3,
    }),
    payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedDate',
      locale: locale as any,
    }),
    payload.find({
      collection: 'categories',
      limit: 10,
      locale: locale as any,
    }),
  ])

  const layout = (post as any).layout || []

  return (
    <LayoutWrapper>
      <main>
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
        ) : (
          layout.map((section: any, idx: number) => {
            switch (section.blockType) {
              case 'hero-block':
                return (
                  <React.Fragment key={idx}>
                    <HeroSection {...section} />
                    <BlogContent
                      post={post as Post}
                      latestPosts={latestPostsData.docs as Post[]}
                      categories={categoriesData.docs as BlogCategory[]}
                    />
                  </React.Fragment>
                )

              case 'contact-form-inline-block':
                return <ContactFormInlineSection key={idx} {...section} />

              default:
                return null
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
