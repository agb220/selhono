'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/ButtonUI'
import { useScopedI18n } from '../_locales/client'
import { cn } from '@/lib/utils'

export interface CategoryItem {
  id: string
  title: string
  slug: string
}

interface ProjectTabsProps {
  categories?: CategoryItem[]
  currentCategory?: string
}

export default function ProjectTabs({ categories = [], currentCategory = '' }: ProjectTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useScopedI18n('projects')

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }

    params.delete('page')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const allCategories = [{ id: 'all', title: t('all'), slug: '' }, ...categories]

  return (
    <div className="w-full my-8 border border-gold-300 rounded-[18px] overflow-hidden">
      <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {allCategories.map((cat) => {
          const isActive = (currentCategory || '') === cat.slug

          return (
            <Button
              key={cat.id || cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              variant="outline"
              className={cn(isActive ? 'bg-gold-300 text-white hover:bg-dark-200 shadow-md' : '')}
            >
              {cat.title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
