'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
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
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  if (displayMode === 'fullPage') {
    return (
      <section className="container mb-20 md:mb-25 xl:mb-43">
        <ProjectTabs currentCategory={currentCategory} categories={categories} />

        {projects.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 my-10 md:my-14">
            {projects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-stone-500 py-12">No projects found.</p>
        )}

        <ProjectPagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    )
  }

  return (
    <section className="container mb-20 md:mb-25 xl:mb-43">
      <div className="flex flex-col">
        {heading && (
          <div className="mx-auto max-w-130 mb-6 md:mb-10 xl:mb-14">
            <h2 className="text-dark-200 text-accent xl:h2 text-center mb-2">{heading}</h2>
            {subheading && <p className="md:paragraph text-center">{subheading}</p>}
          </div>
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
          <Button asChild className="md:self-center md:max-w-[320px]">
            <Link href={`/projects`}>{viewAllText}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
