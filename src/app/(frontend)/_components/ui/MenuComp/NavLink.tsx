'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ButtonUI'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  title: string
  className?: string
}

export default function NavLink({ href, title, className }: NavLinkProps) {
  const pathname = usePathname()

  const normalizePath = (path: string) => {
    if (!path) return '/'

    const cleanPath = path.replace(/^\/(de|en)(\/|$)/, '/')

    return cleanPath.length > 1 && cleanPath.endsWith('/') ? cleanPath.slice(0, -1) : cleanPath
  }

  const cleanPathname = normalizePath(pathname)
  const cleanHref = normalizePath(href)

  const isActive = cleanHref === '/' ? cleanPathname === '/' : cleanPathname.startsWith(cleanHref)

  return (
    <Button
      variant="link"
      size="menu"
      isActive={isActive}
      asChild
      className={cn('font-normal!', isActive && 'text-gold-300! font-bold', className)}
    >
      <Link href={href} className="max-w-35 truncate inline-block vertical-middle">
        {title}
      </Link>
    </Button>
  )
}
