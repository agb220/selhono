'use client'
import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import ReviewsBlockComp from './Shared/ReviewsBlock'
import { Review, ReviewsBlock } from '@/payload-types'

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const ReviewsSection = (data: ReviewsBlock) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })

  const approvedReviews = (data.reviews || []).filter(
    (review): review is Review => typeof review === 'object' && review.isApproved === true,
  )

  return (
    <section
      ref={sectionRef}
      className="container bg-gold-100 py-8 px-4 xl:py-14 xl:px-6 rounded-[70px] mb-16 md:mb-24 xl:mb-47"
    >
      <div className="flex flex-col gap-9.5">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-accent xl:h4 text-center text-white max-w-120 mx-auto"
        >
          {data.title}
        </motion.h2>
        <ReviewsBlockComp
          reviews={approvedReviews}
          buttonLabel={data.ctaButton?.label || 'Add Review'}
          isInView={isInView}
        />
      </div>
    </section>
  )
}

export default ReviewsSection
