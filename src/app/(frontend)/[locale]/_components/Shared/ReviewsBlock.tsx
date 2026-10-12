'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, Variants } from 'framer-motion'
import { Review } from '@/payload-types'
import { Button } from '../ui/ButtonUI'
import ModalLayout from './Modal'
import ReviewForm from './Forms/ReviewForm'
import { getImageUrl } from '@/lib/getImageUrl'

interface ReviewsBlockProps {
  reviews: Review[]
  buttonLabel: string
  isInView?: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.5, 1],
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' },
  },
}

export default function ReviewsBlockComp({
  reviews,
  buttonLabel,
  isInView = true,
}: ReviewsBlockProps) {
  const t = useTranslations('modal')
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex gap-4 xl:gap-6 backface-hidden"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_31.5%] min-w-0"
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="flex justify-center mt-4"
      >
        <Button onClick={() => setIsModalOpen(true)}>{buttonLabel}</Button>
      </motion.div>
      <ModalLayout
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={t('title')}
        description={t('desc')}
      >
        <ReviewForm onSuccess={() => setIsModalOpen(false)} />
      </ModalLayout>
    </>
  )
}

const ReviewCard = (props: Review) => {
  const firstLetter = props.author ? props.author.charAt(0).toUpperCase() : 'S'
  const imageUrl = getImageUrl(props.avatar)
  return (
    <div className="bg-white xl:py-13.25 py-8 px-2 xl:px-6 rounded-[30px] shadow-sm h-full flex flex-col gap-6 justify-between">
      <div className="flex gap-6 items-center">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={props.author || 'Review for Selhono'}
              height={77}
              width={77}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gold-100 flex items-center justify-center text-white text-xl font-bold select-none">
              {firstLetter}
            </div>
          )}
        </div>
        <div>
          <div className="h5 text-dark-200">{props.author}</div>
          <p className="button">{props.location}</p>
        </div>
      </div>
      <p className="h-full">{props.text}</p>
    </div>
  )
}
