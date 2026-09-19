import { getPayload } from 'payload'
import { setStaticParamsLocale } from 'next-international/server'
import config from '@/payload.config'
import { getCachedGlobal } from '@/lib/getCachedGlobal'
import { HomePage, Post, Project, ProjectsSectionBlockType } from '@/payload-types'
import ComingSoon from './_components/ComingSoon'
import MainHeroSection from './_components/MainHeroSection'
import HeroScrollSection from './_components/HeroScrollSection'
import HeroSection from './_components/HeroSection'
import ServicesSection from './_components/Shared/ServicesSection'
import PromoSection from './_components/PromoSection'
import ReviewsSection from './_components/ReviewsSection'
import LogoMarqueeSection from './_components/LogoMarqueeSection'
import ProjectsSection from './_components/ProjectsSection'
import StatsSection from './_components/StatsSection'
import BlogsSection from './_components/BlogsSection'
import PricingSection from './_components/PricingSection'
import ContactUsSection from './_components/ContactUsSection'
import { Locales } from '../_locales/types'

export const revalidate = 3600

export default async function HomePageComponent({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setStaticParamsLocale(locale)

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let homePageData: HomePage | null = null
  try {
    homePageData = (await getCachedGlobal('home-page', locale, 2)) as HomePage
  } catch (error) {
    console.error('Error fetching home-page global:', error)
  }

  const layout = homePageData?.layout || []

  const projectSectionConfig = layout.find((s: any) => s.blockType === 'projects-section') as
    ProjectsSectionBlockType | undefined

  const blogSectionConfig = layout.find((s: any) => s.blockType === 'blog-section') as
    Extract<NonNullable<HomePage['layout']>[number], { blockType: 'blog-section' }> | undefined

  const [promoData, reviewsData, marqueeData, statsData, ctaData, pricingData] = await Promise.all([
    getCachedGlobal('promo-block', locale),
    getCachedGlobal('reviews-block', locale, 2),
    getCachedGlobal('logo-marquee', locale),
    getCachedGlobal('company-stats', locale),
    getCachedGlobal('cta-section', locale),
    getCachedGlobal('pricing-global', locale),
  ])

  // const [homePageData, promoData, reviewsData, marqueeData, statsData, ctaData, pricingData] =
  //   await Promise.all([
  //     payload.findGlobal({ slug: 'home-page', locale: locale as any, depth: 2 }),
  //     payload.findGlobal({ slug: 'promo-block', locale: locale as any }),
  //     payload.findGlobal({
  //       slug: 'reviews-block',
  //       locale: locale as any,
  //       fallbackLocale: 'en',
  //       depth: 2,
  //     }),
  //     payload.findGlobal({ slug: 'logo-marquee', locale: locale as any, fallbackLocale: 'en' }),
  //     payload.findGlobal({ slug: 'company-stats', locale: locale as any, depth: 1 }),
  //     payload.findGlobal({
  //       slug: 'cta-section',
  //       locale: locale as any,
  //       fallbackLocale: 'en',
  //       depth: 1,
  //     }),
  //     payload.findGlobal({ slug: 'pricing-global', locale: locale as any, depth: 1 }),
  //   ])

  //const layout = homePageData.layout || []

  // const projectSectionConfig = layout.find((s) => s.blockType === 'projects-section') as
  //   ProjectsSectionBlockType | undefined
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
        locale: locale as Locales,
        fallbackLocale: Locales.EN,
        sort: '-createdAt',
        depth: 1,
      })
      projectItems = response.docs
    }
  }

  // const blogSectionConfig = layout.find((s) => s.blockType === 'blog-section')

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
        locale: locale as Locales,
        fallbackLocale: Locales.EN,
        sort: '-publishedDate',
        depth: 2,
      })
      blogPosts = response.docs
    }
  }

  return (
    // <LayoutWrapper>
    <main className="">
      {layout.length === 0 ? (
        <ComingSoon isHome={false} />
      ) : (
        layout.map((section, idx) => {
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
              return <ProjectsSection key={idx} {...section} projects={projectItems} />

            case 'stats-section':
              return <StatsSection key={idx} {...statsData} />

            case 'blog-section':
              return <BlogsSection key={idx} {...section} posts={blogPosts} />

            case 'pricing-block':
              return <PricingSection key={idx} {...pricingData} />

            case 'cta-block-section':
              return <ContactUsSection key={idx} {...ctaData} />

            default:
              return null
          }
        })
      )}
    </main>
    // </LayoutWrapper>
  )
}
