'use client'

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
            className="transition-opacity duration-300 hover:opacity-70 max-w-5.5 max-h-5.5"
            aria-label={social.name}
          >
            {iconUrl && <img src={iconUrl} alt={social.name} className="object-contain" />}
          </Link>
        )
      })}
    </div>
  )
}

export default SocialMediaComp
