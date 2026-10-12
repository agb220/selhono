'use client'
import { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useInView, Variants } from 'framer-motion'
import { BlogCard } from './Shared/BlogCard'
import { Button } from './ui/ButtonUI'
import { BlogSectionBlockType, Post } from '@/payload-types'

interface BlogsSectionProps extends BlogSectionBlockType {
  posts?: Post[]
  selectedCategory?: string
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: 'easeOut' },
  },
}

const BlogsSection = ({
  heading,
  subheading,
  cardVariant,
  posts = [],
  viewAllText,
  selectedCategory,
}: BlogsSectionProps) => {
  const locale = useLocale()
  const t = useTranslations('posts')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.2, once: false })

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  return (
    <section ref={sectionRef} className="container mb-8 md:mb-14 xl:mb-29 overflow-hidden">
      <div className="flex flex-col">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center justify-center mb-8 md:mb-12 xl:mb-20 gap-3"
        >
          <h2 className="text-accent xl:h2 text-center text-dark-200">{heading}</h2>
          {subheading && <p className="max-w-140 text-center xl:paragraph">{subheading}</p>}
        </motion.div>

        {posts.length > 0 ? (
          <>
            <div className="overflow-hidden mb-8 xl:mb-12" ref={emblaRef}>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex gap-4 xl:gap-6 backface-hidden"
              >
                {posts.map((post) => (
                  <motion.div key={post.id} variants={cardItemVariants} className="h-full">
                    <BlogCard post={post} variant={cardVariant} />
                  </motion.div>
                ))}
              </motion.ul>
            </div>
            {viewAllText && (
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex justify-center"
              >
                <Button asChild className="md:self-center md:max-w-[320px]">
                  <Link href={`/${locale}/blog`}>{viewAllText}</Link>
                </Button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
            <p className="text-gray-500 text-lg">
              {t('notCategory')} "<span className="text-uppercase">{selectedCategory}</span>".
            </p>
            <Button asChild className="md:max-w-60">
              <Link href={`/${locale}/blog`}>{t('btnTitle')}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogsSection
