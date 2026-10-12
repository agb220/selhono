'use client'

import { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, useInView, Variants } from 'framer-motion'
import ProjectCard from './Shared/ProjectCard'
import { Button } from './ui/ButtonUI'
import ProjectTabs, { CategoryItem } from './ProjectTabs'
import ProjectPagination from './ProjectPagination'
import { Project, ProjectsSectionBlockType } from '@/payload-types'

interface ProjectsSectionProps extends ProjectsSectionBlockType {
  projects?: Project[]
  totalPages?: number
  currentPage?: number
  currentCategory?: string
  categories?: CategoryItem[]
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const ProjectsSection = ({
  heading,
  subheading,
  viewAllText,
  displayMode,
  projects = [],
  totalPages = 1,
  currentPage = 1,
  currentCategory,
  categories = [],
}: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1, once: false })

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const t = useTranslations('projects')

  if (displayMode === 'fullPage') {
    return (
      <section ref={sectionRef} className="container mb-20 md:mb-25 xl:mb-43">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <ProjectTabs currentCategory={currentCategory} categories={categories} />
        </motion.div>
        {projects.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 my-10 md:my-14">
            {projects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-stone-500 py-12">{t('noProject')}</p>
        )}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <ProjectPagination currentPage={currentPage} totalPages={totalPages} />
        </motion.div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="container mb-20 md:mb-25 xl:mb-43 overflow-hidden">
      <div className="flex flex-col">
        {heading && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mx-auto max-w-130 mb-6 md:mb-10 xl:mb-14"
          >
            <h2 className="text-dark-200 text-accent xl:h2 text-center mb-2">{heading}</h2>
            {subheading && <p className="md:paragraph text-center">{subheading}</p>}
          </motion.div>
        )}

        <div className="overflow-hidden mb-8 xl:mb-12" ref={emblaRef}>
          {projects.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {projects.map((project, index) => {
                return (
                  <ProjectCard
                    key={project.id || index}
                    project={project}
                    classNameBorder="!rounded-tr-[120px]"
                  />
                )
              })}
            </ul>
          )}
        </div>

        {viewAllText && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="md:self-center"
          >
            <Button asChild className="w-full md:max-w-[320px]">
              <Link href={`/projects`}>{viewAllText}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
