'use client'
import { useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getImageUrl } from '@/lib/getImageUrl'
import { Category, Project } from '@/payload-types'
import SearchSvg from './icons/SearchSvg'
import { ArrowShortSvg } from './icons'
import { Button } from './ui/ButtonUI'
import { Title } from './Shared/Title'
import { useScopedI18n } from '../_locales/client'

interface ProjectDetailsSectionProps {
  project: Project
}

export default function ProjectDetailsSection({ project }: ProjectDetailsSectionProps) {
  const t = useScopedI18n('projectDetail')
  const { title, category, mainImage, gallery, projectDetails, description } = project

  const imagesList: Array<{ url: string; alt: string }> = []

  const mainUrl = getImageUrl(mainImage)
  if (mainUrl) {
    imagesList.push({
      url: mainUrl,
      alt: (typeof mainImage === 'object' && mainImage?.alt) || title,
    })
  }

  if (gallery && Array.isArray(gallery)) {
    gallery.forEach((item) => {
      const url = getImageUrl(item.image)
      if (url) {
        imagesList.push({
          url,
          alt: (typeof item.image === 'object' && item.image?.alt) || title,
        })
      }
    })
  }

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const categoryTitle = typeof category === 'object' ? (category as Category)?.title : ''

  const formattedDate = projectDetails?.date
    ? new Date(projectDetails.date).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section className="container pb-12 md:pb-20 xl:pb-28">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-8 xl:gap-10 mb-16 md:mb-24 items-center">
        <div className="py-6 md:py-13.75 px-6 xl:px-12 min-w-[40%] h-full">
          <dl className="space-y-4 text-base">
            {projectDetails?.client && (
              <div className="grid grid-cols-2 gap-4">
                <dt className="h6">{t('clientname')}</dt>
                <dd className="text-dark-100">{projectDetails.client}</dd>
              </div>
            )}

            {categoryTitle && (
              <div className="grid grid-cols-2 gap-4">
                <dt className="h6">{t('category')}</dt>
                <dd className="text-dark-100">{categoryTitle}</dd>
              </div>
            )}

            {projectDetails?.tags && (
              <div className="grid grid-cols-2 gap-4">
                <dt className="h6">{t('tags')}</dt>
                <dd className="text-dark-100">{projectDetails.tags}</dd>
              </div>
            )}

            {formattedDate && (
              <div className="grid grid-cols-2 gap-4">
                <dt className="h6">{t('date')}</dt>
                <dd className="text-dark-100">{formattedDate}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className=" ">
          <Title title={title} />
          <div className="prose max-w-none [&_.payload-richtext]:space-y-2">
            {description && <RichText data={description} />}
          </div>
        </div>
      </div>

      {imagesList.length > 0 && (
        <div className="relative group/slider">
          <div className="overflow-hidden rounded-[40px] md:rounded-[70px]" ref={emblaRef}>
            <div className="flex">
              {imagesList.map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-[0_0_100%] h-[350px] sm:h-[450px] md:h-[600px] group cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx === 0}
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors">
                    <Button variant="circle-outline" size="icon-xl" icon={SearchSvg}></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {imagesList.length > 1 && (
            <>
              <Button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-10 rotate-180"
                variant="circle-white"
                size="icon-md"
                aria-label="Previous slide"
                icon={ArrowShortSvg}
              ></Button>
              <Button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-10"
                variant="circle-white"
                size="icon-md"
                aria-label="Next slide"
                icon={ArrowShortSvg}
              ></Button>
            </>
          )}
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={imagesList.map((img) => ({ src: img.url, alt: img.alt }))}
      />
    </section>
  )
}
