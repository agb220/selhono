import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/ButtonUI'
import { getImageUrl } from '@/lib/getImageUrl'
import { Project } from '@/payload-types'
import { ArrowShortSvg } from '../icons'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  classNameBorder?: string
}

const ProjectCard = (props: ProjectCardProps) => {
  const imageUrl = getImageUrl(props.project.mainImage)
  const categoryName =
    typeof props.project.category === 'object' ? props.project.category?.title : ''
  return (
    <li className="max-w-136">
      <div className="flex flex-col group cursor-pointer">
        <Link
          href={`/projects/${props.project.slug}`}
          className={cn(
            'relative aspect-4/3 w-full overflow-hidden mb-4 md:mb-6 max-h-136 block',
            props.classNameBorder,
          )}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={props.project.title}
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
            <Link href={`/projects/${props.project.slug}`} className="">
              <h3 className="h7 md:h5 text-dark-200 mb-1 group-hover:text-gold-200 transition-colors duration-500">
                {props.project.title}
              </h3>
            </Link>
            {props.project.category && <p className="">{categoryName}</p>}
          </div>

          <Button
            asChild
            variant="circle-gold"
            icon={ArrowShortSvg}
            size="icon-md"
            className="group-hover:bg-gold-200"
          >
            <Link href={`/projects/${props.project.slug}`}></Link>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default ProjectCard
