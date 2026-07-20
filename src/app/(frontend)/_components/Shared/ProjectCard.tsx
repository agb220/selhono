import Image from 'next/image'
import { Project } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { Button } from '../ui/ButtonUI'
import Link from 'next/link'
import { ArrowShortSvg } from '../icons'

const ProjectCard = (props: Project) => {
  const imageUrl = getImageUrl(props.mainImage)
  const categoryName = typeof props.category === 'object' ? props.category?.title : ''
  return (
    <li className="max-w-136">
      <div className="flex flex-col group cursor-pointer">
        <Link
          href={`/projects/${props.slug}`}
          className="relative aspect-4/3 w-full overflow-hidden rounded-tr-[120px] mb-4 md:mb-6 max-h-136 block"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={props.title}
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
            <Link href={`/projects/${props.slug}`} className="">
              <h3 className="h7 md:h5 text-dark-200 mb-1 group-hover:text-gold-200 transition-colors duration-500">
                {props.title}
              </h3>
            </Link>
            {props.category && <p className="">{categoryName}</p>}
          </div>

          <Button
            asChild
            variant="circle-gold"
            icon={ArrowShortSvg}
            size="icon-md"
            className="group-hover:bg-gold-200"
          >
            <Link href={`/projects/${props.slug}`}></Link>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default ProjectCard
