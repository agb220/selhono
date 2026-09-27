import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/getImageUrl'
import { Team } from '@/payload-types'

interface TeamSectionProps {
  title?: string
  members?: Team[]
}

export default function TeamSection({ members = [] }: TeamSectionProps) {
  if (!members.length) return null

  return (
    <section className="pb-16 md:pb-24">
      <div className="container">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {members.map((member) => (
            <li key={member.id} className="group flex flex-col items-center text-center">
              <Link
                href={`/team/${member.slug}`}
                className="relative w-full aspect-3/4 mb-4 overflow-hidden rounded-3xl"
              >
                <Image
                  src={getImageUrl(member.photo)}
                  alt={member.name || 'Team member'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <h3 className="h5 text-dark-200 mb-1 transition-colors duration-500 group-hover:text-gold-300">
                {' '}
                <Link href={`/team/${member.slug}`}>{member.name}</Link>
              </h3>

              {(member.role || member.location) && (
                <p className="button mb-3">
                  {member.role}
                  {member.role && member.location ? ', ' : ''}
                  {member.location}
                </p>
              )}

              {member.socials && member.socials.length > 0 && (
                <div className="flex items-center gap-4">
                  {member.socials.map((social, index) => {
                    return (
                      <Link
                        key={social.id || index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-500 hover:opacity-70 max-w-5 max-h-5 overflow-hidden"
                        aria-label={social.platform}
                      >
                        <Image
                          src={getImageUrl(social.icon)}
                          alt={social.platform}
                          width={24}
                          height={24}
                          className="max-w-5 max-h-5 object-contain"
                        />
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
