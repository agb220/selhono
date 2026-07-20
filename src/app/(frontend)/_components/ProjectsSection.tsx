'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { Project, ProjectsSectionBlockType } from '@/payload-types'
import ProjectCard from './Shared/ProjectCard'
import { Button } from './ui/ButtonUI'
import Link from 'next/link'

interface ProjectsSectionProps extends ProjectsSectionBlockType {
  projects?: Project[]
}

const ProjectsSection = ({
  heading,
  subheading,
  viewAllText,
  projects = [],
}: ProjectsSectionProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })
  return (
    <section className="container mb-20 md:mb-25 xl:mb-43">
      <div className="flex flex-col">
        <div className="mx-auto max-w-130 mb-6 md:mb-10 xl:mb-14">
          <h2 className="text-dark-200 text-accent xl:h2 text-center mb-2">{heading}</h2>
          {subheading && <p className="md:paragraph text-center">{subheading}</p>}
        </div>
        <div className="overflow-hidden mb-8 xl:mb-12" ref={emblaRef}>
          {projects.length > 0 && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {projects.map((project, index) => {
                return <ProjectCard key={index} {...project} />
              })}
            </ul>
          )}
        </div>
        <Button asChild className="md:self-center md:max-w-[320px]">
          <Link href={`/projects`}> {viewAllText}</Link>
        </Button>
      </div>
    </section>
  )
}

export default ProjectsSection
