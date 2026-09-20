'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/ButtonUI'
import { ArrowShortSvg } from './icons'

interface ProjectPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ProjectPagination({
  currentPage = 1,
  totalPages = 1,
}: ProjectPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-12 md:mt-16">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isActive = page === currentPage
        const formattedPage = page < 10 ? `0${page}` : `${page}`

        return (
          <Button
            key={page}
            variant={isActive ? 'circle-light' : 'circle-outline'}
            size="icon-md"
            isActive={isActive}
            onClick={() => handlePageChange(page)}
            aria-label={`Page ${page}`}
          >
            {formattedPage}
          </Button>
        )
      })}

      {currentPage < totalPages && (
        <Button
          variant="circle-outline"
          size="icon-md"
          icon={ArrowShortSvg}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next page"
        />
      )}
    </div>
  )
}
