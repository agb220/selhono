import { getPayload } from 'payload'
import config from '@/payload.config'
import { getCurrentLocale } from '../_locales/server'
import { Project, ProjectsSectionBlockType } from '@/payload-types'
import ProjectCard from './Shared/ProjectCard'

const isProjectObject = (project: string | Project): project is Project => {
  return typeof project === 'object' && project !== null
}

const ProjectsSection = async (props: ProjectsSectionBlockType) => {
  const locale = await getCurrentLocale()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let projectsToShow: Project[] = []

  if (props.populateBy === 'manual' && props.selectedProjects) {
    projectsToShow = props.selectedProjects.filter(isProjectObject)
  } else {
    const limit = props.limit || 4

    const response = await payload.find({
      collection: 'projects',
      limit: limit,
      locale: locale as any,
      sort: '-createdAt',
      depth: 1,
    })

    projectsToShow = response.docs as Project[]
  }

  return (
    <section className="container mb-14 md:mb-25 xl:mb-43">
      <div className="mx-auto max-w-130 mb-6 md:mb-10 xl:mb-14">
        <h2 className="text-dark-200 text-accent xl:h2 text-center mb-2">{props.heading}</h2>
        {props.subheading && <p className="md:paragraph text-center">{props.subheading}</p>}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {projectsToShow.map((project, index) => {
          return <ProjectCard key={index} {...project} />
        })}
      </ul>
    </section>
  )
}

export default ProjectsSection
