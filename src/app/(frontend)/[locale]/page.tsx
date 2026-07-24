import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { getCurrentLocale } from '../_locales/server'
import LayoutWrapper from '../_components/Layout/LayoutWrapper'
import MainHeroSection from '../_components/MainHeroSection'
import HeroScrollSection from '../_components/HeroScrollSection'
import HeroSection from '../_components/HeroSection'
import WorkStagesSection from '../_components/Shared/WorkStagesSection'
import ComingSoon from '../_components/ComingSoon'
import PromoSection from '../_components/PromoSection'
import ReviewsSection from '../_components/ReviewsSection'
import LogoMarqueeSection from '../_components/LogoMarqueeSection'
import ProjectsSection from '../_components/ProjectsSection'
import StatsSection from '../_components/StatsSection'
import BlogsSection from '../_components/BlogsSection'
import { Post, Project, ProjectsSectionBlockType } from '@/payload-types'
import ContactUsSection from '../_components/ContactUsSection'

export const revalidate = 3600

export default async function HomePageComponent() {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [homePageData, promoData, reviewsData, marqueeData, statsData, ctaData] = await Promise.all(
    [
      payload.findGlobal({ slug: 'home-page', locale: locale as any, depth: 2 }),
      payload.findGlobal({ slug: 'promo-block', locale: locale as any }),
      payload.findGlobal({ slug: 'reviews-block', locale: locale as any, depth: 2 }),
      payload.findGlobal({ slug: 'logo-marquee', locale: locale as any }),
      payload.findGlobal({ slug: 'company-stats', locale: locale as any, depth: 1 }),
      payload.findGlobal({ slug: 'cta-section', locale: locale as any, depth: 1 }),
    ],
  )

  if (!homePageData) {
    return notFound()
  }

  const layout = homePageData.layout || []

  const projectSectionConfig = layout.find((s) => s.blockType === 'projects-section') as
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

  const blogSectionConfig = layout.find((s) => s.blockType === 'blog-section')

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
      <main className="">
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
        ) : (
          layout.map((section, idx) => {
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

              case 'cta-block-section':
                return <ContactUsSection key={idx} {...ctaData} />

              default:
                return null
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
