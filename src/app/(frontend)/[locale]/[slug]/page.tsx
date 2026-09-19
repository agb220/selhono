import { getPayload as getCachedPayload } from '@/lib/payload'
import { setStaticParamsLocale } from 'next-international/server'
import { Post, BlogSectionBlockType, ProjectsSectionBlockType, Project } from '@/payload-types'
import ComingSoon from '../_components/ComingSoon'
import MainHeroSection from '../_components/MainHeroSection'
import HeroScrollSection from '../_components/HeroScrollSection'
import HeroSection from '../_components/HeroSection'
import ServicesSection from '../_components/Shared/ServicesSection'
import PromoSection from '../_components/PromoSection'
import ReviewsSection from '../_components/ReviewsSection'
import LogoMarqueeSection from '../_components/LogoMarqueeSection'
import ProjectsSection from '../_components/ProjectsSection'
import StatsSection from '../_components/StatsSection'
import BlogsSection from '../_components/BlogsSection'
import SloganSection from '../_components/SloganSection'
import FeatureCardsSection from '../_components/FeatureCardsSection'
import ContactFormInlineSection from '../_components/ContactFormInlineSection'
import ContactUsSection from '../_components/ContactUsSection'
import ProcessStepsSection from '../_components/ProcessStepsSection'
import PricingSection from '../_components/PricingSection'
import BlogsSearchSection from '../_components/BlogsSearchSection'
import { Locales } from '../../_locales/types'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
  searchParams: Promise<{
    category?: string
    page?: string
    q?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getCachedPayload()
  const locales = [Locales.DE, Locales.EN]

  const pagesByLocale = await Promise.all(
    locales.map(async (locale) => {
      const pages = await payload.find({
        collection: 'pages',
        limit: 100,
        locale: locale as any,
        depth: 0,
      })

      return pages.docs.map((page: any) => ({
        locale,
        slug: page.slug,
      }))
    }),
  )

  return pagesByLocale.flat()
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug, locale } = await params
  const { category: selectedCategory, page: currentPageParam, q: searchQuery } = await searchParams
  const pageNumber = Number(currentPageParam) || 1

  setStaticParamsLocale(locale)

  const payload = await getCachedPayload()

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as Locales,
    fallbackLocale: Locales.EN,
    depth: 0,
  })

  const rawPage = pageData.docs[0]

  // if (!rawPage) {
  //   return notFound()
  // }

  const [page, promoData, reviewsData, marqueeData, statsData, ctaData, pricingData] =
    await Promise.all([
      payload.findByID({
        collection: 'pages',
        id: rawPage.id,
        locale: locale as Locales,
        fallbackLocale: Locales.EN,
        depth: 3,
      }),
      payload.findGlobal({ slug: 'promo-block', locale: locale as any }),
      payload.findGlobal({ slug: 'reviews-block', locale: locale as any, depth: 2 }),
      payload.findGlobal({ slug: 'logo-marquee', locale: locale as any }),
      payload.findGlobal({ slug: 'company-stats', locale: locale as any, depth: 1 }),
      payload.findGlobal({ slug: 'cta-section', locale: locale as any, depth: 1 }),
      payload.findGlobal({ slug: 'pricing-global', locale: locale as any, depth: 1 }),
    ])

  const layout = page.layout || []

  const projectSectionConfig = layout.find((s: any) => s.blockType === 'projects-section') as
    (ProjectsSectionBlockType & { displayMode?: 'grid' | 'fullPage' }) | undefined

  let projectItems: Project[] = []
  let totalPages = 1
  let categoriesList: any[] = []

  if (projectSectionConfig) {
    const isFullPage = projectSectionConfig.displayMode === 'fullPage'

    if (isFullPage) {
      const whereQuery: any = {}
      if (selectedCategory) {
        whereQuery['category.slug'] = { equals: selectedCategory }
      }

      const [projectsRes, categoriesRes] = await Promise.all([
        payload.find({
          collection: 'projects',
          limit: projectSectionConfig.limit || 4,
          page: pageNumber,
          locale: locale as Locales,
          fallbackLocale: Locales.EN,
          sort: '-createdAt',
          depth: 1,
          where: whereQuery,
        }),
        payload.find({
          collection: 'categories',
          limit: 100,
          locale: locale as any,
          sort: 'title',
        }),
      ])

      projectItems = projectsRes.docs
      totalPages = projectsRes.totalPages
      categoriesList = categoriesRes.docs
    } else {
      if (projectSectionConfig.populateBy === 'manual' && projectSectionConfig.selectedProjects) {
        projectItems = projectSectionConfig.selectedProjects.filter(
          (p): p is Project => typeof p === 'object' && p !== null,
        )
      } else {
        const response = await payload.find({
          collection: 'projects',
          limit: projectSectionConfig.limit || 4,
          locale: locale as Locales,
          fallbackLocale: Locales.EN,
          sort: '-createdAt',
          depth: 1,
        })
        projectItems = response.docs
      }
    }
  }

  const hasBlogSection = layout.some((s: any) => s.blockType === 'blog-section')
  const hasBlogSearchSection = layout.some((s: any) => s.blockType === 'blog-search-section')

  const blogSectionConfig = layout.find((s: any) => s.blockType === 'blog-section') as
    BlogSectionBlockType | undefined

  let blogPosts: Post[] = []
  let latestPostItem: Post | null = null

  if (hasBlogSearchSection) {
    const latestRes = await payload.find({
      collection: 'posts',
      limit: 1,
      locale: locale as Locales,
      fallbackLocale: Locales.EN,
      sort: '-publishedDate',
      depth: 2,
    })
    latestPostItem = latestRes.docs[0] || null
  }

  if (hasBlogSection) {
    if (!blogSectionConfig || blogSectionConfig.selectionType !== 'manual') {
      const postsWhereQuery: any = {}
      if (selectedCategory) {
        postsWhereQuery['category.slug'] = { equals: selectedCategory }
      }

      const response = await payload.find({
        collection: 'posts',
        limit: blogSectionConfig?.limit || 10,
        locale: locale as Locales,
        fallbackLocale: Locales.EN,
        sort: '-publishedDate',
        depth: 2,
        where: postsWhereQuery,
      })
      blogPosts = response.docs
    } else if (blogSectionConfig.selectionType === 'manual' && blogSectionConfig.manualPosts) {
      blogPosts = blogSectionConfig.manualPosts.filter(
        (p): p is Post => typeof p === 'object' && p !== null,
      )
    }
  }

  return (
    // <LayoutWrapper>
    <main>
      {layout.length === 0 ? (
        <ComingSoon isHome={false} />
      ) : (
        layout.map((section: any, idx: number) => {
          switch (section.blockType) {
            case 'main-hero':
              return <MainHeroSection key={idx} {...section} />

            case 'hero-scroll':
              return <HeroScrollSection key={idx} {...section} />

            case 'hero-block':
              return <HeroSection key={idx} {...section} />

            case 'services-section':
              return (
                <ServicesSection
                  key={idx}
                  items={section.services || []}
                  className="grid md:grid-cols-2 xl:grid-cols-3"
                />
              )

            case 'promo-section':
              return <PromoSection key={idx} {...promoData} />

            case 'reviews-section':
              return <ReviewsSection key={idx} {...reviewsData} />

            case 'logo-merquee-section':
              return <LogoMarqueeSection key={idx} {...marqueeData} />

            case 'projects-section':
              return (
                <ProjectsSection
                  key={idx}
                  {...section}
                  projects={projectItems}
                  totalPages={totalPages}
                  currentPage={pageNumber}
                  currentCategory={selectedCategory}
                  categories={categoriesList}
                />
              )

            case 'stats-section':
              return <StatsSection key={idx} {...statsData} />

            case 'blog-section':
              return (
                <BlogsSection
                  key={idx}
                  {...section}
                  posts={blogPosts}
                  selectedCategory={selectedCategory}
                />
              )

            case 'slogan-block':
              return <SloganSection key={idx} {...section} />

            case 'feature-cards-block':
              return <FeatureCardsSection key={idx} {...section} />

            case 'contact-form-inline-block':
              return <ContactFormInlineSection key={idx} {...section} />

            case 'cta-block-section':
              return <ContactUsSection key={idx} {...ctaData} />

            case 'process-steps-block':
              return <ProcessStepsSection key={idx} {...section} />

            case 'pricing-block':
              return <PricingSection key={idx} {...pricingData} />

            case 'blog-search-section':
              return <BlogsSearchSection key={idx} {...section} latestPost={latestPostItem} />

            default:
              return null
          }
        })
      )}
    </main>
    // </LayoutWrapper>
  )
}
