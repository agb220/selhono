'use client'
import { useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { Review } from '@/payload-types'
import { Button } from '../ui/ButtonUI'
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
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_31.5%] min-w-0"
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
  const firstLetter = props.author ? props.author.charAt(0).toUpperCase() : 'S'
  return (
    <div className="bg-white xl:py-13.25 py-8 px-2 xl:px-6 rounded-[30px] shadow-sm h-full flex flex-col gap-6 justify-between">
      <div className="flex gap-6 items-center">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
          {props.avatar ? (
            <Image
              src={props.avatar as string}
              alt={props.author || 'Project Selhono'}
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
