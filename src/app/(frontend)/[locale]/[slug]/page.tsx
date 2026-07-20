import { getPayload as getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import LayoutWrapper from '../../_components/Layout/LayoutWrapper'
import MainHeroSection from '../../_components/MainHeroSection'
import WorkStagesSection from '../../_components/Shared/WorkStagesSection'
import PromoSection from '../../_components/PromoSection'
import HeroScrollSection from '../../_components/HeroScrollSection'
import HeroSection from '../../_components/HeroSection'
import ComingSoon from '../../_components/ComingSoon'
import { setStaticParamsLocale } from 'next-international/server'
import ReviewsSection from '../../_components/ReviewsSection'
import LogoMarqueeSection from '../../_components/LogoMarqueeSection'
import StatsSection from '../../_components/StatsSection'
import ProjectsSection from '../../_components/ProjectsSection'
import BlogsSection from '../../_components/BlogsSection'
import { Post, BlogSectionBlockType, ProjectsSectionBlockType, Project } from '@/payload-types'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
  })

  const locales = ['de', 'en']

  return pages.docs.flatMap((page: any) =>
    locales.map((locale: string) => ({
      locale,
      slug: page.slug,
    })),
  )
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug, locale } = await params

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  const rawPage = pageData.docs[0]

  if (!rawPage) {
    return notFound()
  }

  const [page, promoData, reviewsData, marqueeData, statsData] = await Promise.all([
    payload.findByID({
      collection: 'pages',
      id: rawPage.id,
      locale: locale as any,
      depth: 3,
    }),
    payload.findGlobal({ slug: 'promo-block', locale: locale as any }),
    payload.findGlobal({ slug: 'reviews-block', locale: locale as any, depth: 2 }),
    payload.findGlobal({ slug: 'logo-marquee', locale: locale as any }),
    payload.findGlobal({ slug: 'company-stats', depth: 1 }),
  ])

  const layout = page.layout || []

  const projectSectionConfig = layout.find((s: any) => s.blockType === 'projects-section') as
    ProjectsSectionBlockType | undefined
  let projectItems: Project[] = []

  if (projectSectionConfig) {
    if (projectSectionConfig.populateBy === 'manual' && projectSectionConfig.selectedProjects) {
      projectItems = projectSectionConfig.selectedProjects.filter(
        (p): p is Project => typeof p === 'object' && p !== null,
      )
    } else {
      const response = await payload.find({
        collection: 'projects',
        limit: projectSectionConfig.limit || 4,
        locale: locale as any,
        sort: '-createdAt',
        depth: 1,
      })
      projectItems = response.docs
    }
  }

  const blogSectionConfig = layout.find((s: any) => s.blockType === 'blog-section') as
    BlogSectionBlockType | undefined

  let blogPosts: Post[] = []

  if (blogSectionConfig) {
    if (blogSectionConfig.selectionType === 'manual' && blogSectionConfig.manualPosts) {
      blogPosts = blogSectionConfig.manualPosts.filter(
        (p): p is Post => typeof p === 'object' && p !== null,
      )
    } else {
      const response = await payload.find({
        collection: 'posts',
        limit: blogSectionConfig.limit || 3,
        locale: locale as any,
        sort: '-publishedDate',
        depth: 2,
      })
      blogPosts = response.docs
    }
  }

  return (
    <LayoutWrapper>
      <main>
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
        ) : (
          layout.map((section: any, idx: number) => {
            switch (section.blockType) {
              case 'main-hero':
                return <MainHeroSection key={idx} {...section} />

              case 'hero-scroll':
                return <HeroScrollSection key={idx} {...section} />

              case 'hero-block':
                return <HeroSection key={idx} {...section} />

              case 'process-section':
                return <WorkStagesSection key={idx} items={section.stages || []} />

              case 'promo-section':
                return <PromoSection key={idx} {...promoData} />

              case 'reviews-section':
                return <ReviewsSection key={idx} {...reviewsData} />

              case 'logo-merquee-section':
                return <LogoMarqueeSection key={idx} {...marqueeData} />

              case 'projects-section':
                return <ProjectsSection key={idx} {...section} projects={projectItems} />

              case 'stats-section':
                return <StatsSection key={idx} {...statsData} />

              case 'blog-section':
                return <BlogsSection key={idx} {...section} posts={blogPosts} />

              default:
                return null
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
