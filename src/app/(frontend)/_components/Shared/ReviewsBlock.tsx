'use client'
import { useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Review } from '@/payload-types'
import { Button } from '../ui/Button'
import { getImageUrl } from '@/lib/hooks/getURL'
import ModalLayout from './Modal'
import ReviewForm from '../ReviewForm'
import { useScopedI18n } from '../../_locales/client'

interface ReviewsBlockProps {
  reviews: Review[]
  buttonLabel: string
}

export default function ReviewsBlock({ reviews, buttonLabel }: ReviewsBlockProps) {
  const t = useScopedI18n('modal')
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false })

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-4 xl:gap-6 backface-hidden">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button onClick={() => setIsModalOpen(true)}>{buttonLabel}</Button>
      </div>

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
  return (
    <div className="bg-white xl:py-13.25 py-8 px-2 xl:px-9.25 rounded-[30px] shadow-sm h-full flex flex-col gap-6 justify-between">
      <div className="flex gap-6">
        <div className="max-h-19.25 max-w-19.25 overflow-hidden">
          <Image
            src={getImageUrl({
              media: props.avatar && props.avatar,
              size: 'thumbnail',
            })}
            alt="Project Selhono"
            height={77}
            width={77}
            className="object-cover"
          />
        </div>
        <div>
          <div className="h5 text-dark-200">{props.author}</div>
          <p className="button">{props.location}</p>
        </div>
      </div>
      <p>{props.text}</p>
    </div>
  )
}
