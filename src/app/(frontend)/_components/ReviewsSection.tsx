import config from '@/payload.config'
import { getPayload } from 'payload'
import ReviewsBlock from './Shared/ReviewsBlock'
import { getCurrentLocale } from '../_locales/server'
import { Review } from '@/payload-types'

const ReviewsSection = async () => {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const data = await payload.findGlobal({
    slug: 'reviews-block',
    locale: locale as any,
    depth: 2,
  })

  const approvedReviews = (data.reviews || []).filter(
    (review): review is Review => typeof review === 'object' && review.isApproved === true,
  )

  return (
    <section className="container bg-gold-100 py-8 px-4 xl:py-14 xl:px-6 rounded-[70px] mb-16 md:mb-24 xl:mb-47">
      <div className="flex flex-col gap-9.5">
        <h2 className="text-accent xl:h4 text-center text-white max-w-120 mx-auto">{data.title}</h2>
        <ReviewsBlock
          reviews={approvedReviews}
          buttonLabel={data.ctaButton?.label || 'Add Review'}
        />
      </div>
    </section>
  )
}

export default ReviewsSection
