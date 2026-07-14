import { getPayload } from 'payload'
import config from '@/payload.config'
import MainHeroSection from '../_components/MainHeroSection'
import LayoutWrapper from '../_components/Layout/LayoutWrapper'
import { getCurrentLocale } from '../_locales/server'
import { notFound } from 'next/navigation'
import WorkStagesSection from '../_components/Shared/WorkStagesSection'
import PromoSection from '../_components/PromoSection'
import HeroSection from '../_components/HeroSection'
import HeroScrollSection from '../_components/HeroScrollSection'
import ComingSoon from '../_components/ComingSoon'
import ReviewsSection from '../_components/ReviewsSection'
import LogoMarqueeSection from '../_components/LogoMarqueeSection'
import ProjectsSection from '../_components/ProjectsSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const locale = await getCurrentLocale()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const findResult = await payload.findGlobal({
    slug: 'home-page',
    locale: locale as any,
    depth: 2,
  })

  if (!findResult) {
    return notFound()
  }

  const layout = findResult.layout || []

  return (
    <LayoutWrapper>
      <main className="">
        {layout.length === 0 ? (
          <ComingSoon locale={locale} isHome={false} />
        ) : (
          (layout || []).map((section: any, idx: number) => {
            if (section.blockType === 'main-hero') {
              return <MainHeroSection key={idx} {...section} />
            }
            if (section.blockType === 'hero-scroll') {
              return <HeroScrollSection key={idx} {...section} />
            }
            if (section.blockType === 'hero-block') {
              return <HeroSection key={idx} {...section} />
            }
            if (section.blockType === 'process-section') {
              return <WorkStagesSection key={idx} items={section.stages || []} />
            }
            if (section.blockType === 'promo-section') {
              return <PromoSection key={idx} />
            }
            if (section.blockType === 'reviews-section') {
              return <ReviewsSection key={idx} />
            }
            if (section.blockType === 'logo-merquee-section') {
              return <LogoMarqueeSection key={idx} />
            }
            if (section.blockType === 'projects-section') {
              return <ProjectsSection key={idx} {...section} blockType={'projects-section'} />
            }
          })
        )}
      </main>
    </LayoutWrapper>
  )
}
