'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../Button'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  title: string
}

export default function NavLink({ href, title }: NavLinkProps) {
  const pathname = usePathname()

  const isActive =
    pathname === href || (href !== '/en' && href !== '/de' && pathname.startsWith(href))

  console.log('isActive', isActive)

  return (
    <Button
      variant="link"
      size="menu"
      isActive={isActive}
      asChild
      className={cn(isActive && 'text-gold-300! font-bold')}
    >
      <Link href={href}>{title}</Link>
    </Button>
  )
}
