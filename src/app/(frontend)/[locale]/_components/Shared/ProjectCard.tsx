'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/ButtonUI'
import { getImageUrl } from '@/lib/getImageUrl'
import { Project } from '@/payload-types'
import { ArrowShortSvg } from '../icons'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  classNameBorder?: string
}

const ProjectCard = ({ project, classNameBorder }: ProjectCardProps) => {
  const cardRef = useRef<HTMLLIElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.2 })

  const imageUrl = getImageUrl(project.mainImage)
  const categoryName = typeof project.category === 'object' ? project.category?.title : ''

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="max-w-136 list-none"
    >
      <div className="flex flex-col group cursor-pointer">
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            'relative aspect-4/3 w-full overflow-hidden mb-4 md:mb-6 max-h-136 block',
            classNameBorder,
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </Link>

        <div className="flex justify-between items-center gap-2">
          <div>
            <Link href={`/projects/${project.slug}`}>
              <h3 className="h7 md:h5 text-dark-200 mb-1 group-hover:text-gold-200 transition-colors duration-500">
                {project.title}
              </h3>
            </Link>
            {project.category && <p>{categoryName}</p>}
          </div>
          <Button
            asChild
            variant="circle-gold"
            icon={ArrowShortSvg}
            size="icon-md"
            className="group-hover:bg-gold-200"
          >
            <Link href={`/projects/${project.slug}`}></Link>
          </Button>
        </div>
      </div>
    </motion.li>
  )
}

export default ProjectCard
