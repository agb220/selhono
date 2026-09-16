'use client'
import Image from 'next/image'
import Link from 'next/dist/client/link'

interface SocialLink {
  id?: string | null
  name: string
  url: string
  icon:
    | string
    | {
        url?: string | null
      }
    | any
}

interface SocialMediaCompProps {
  links: SocialLink[]
}

const SocialMediaComp = ({ links }: SocialMediaCompProps) => {
  if (!links || links.length === 0) return null

  return (
    <div className="flex items-center gap-5 ">
      {links.map((social, index) => {
        const key = social.id || index
        const iconUrl = typeof social.icon === 'object' ? social.icon?.url : null

        return (
          <Link
            key={key}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-300 hover:opacity-70 max-w-6 max-h-6 overflow-hidden"
            aria-label={social.name}
          >
            {iconUrl && (
              <Image
                src={iconUrl}
                alt={social.name}
                width={24}
                height={24}
                className="max-w-6 max-h-6 object-contain"
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default SocialMediaComp
