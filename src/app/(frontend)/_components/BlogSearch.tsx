'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCurrentLocale, useScopedI18n } from '../_locales/client'
import SearchSvg from './icons/SearchSvg'

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt?: string
}

export interface BlogSearchLabels {
  input: string
  postTitle: string
  notFound: string
  search: string
}

interface BlogSearchProps {
  labels?: BlogSearchLabels
}

export default function BlogSearch({ labels }: BlogSearchProps) {
  const t = useScopedI18n('posts')
  const locale = useCurrentLocale()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const searchParam = encodeURIComponent(query.trim())

        const res = await fetch(`/api/blog-search?q=${searchParam}&locale=${locale}`)

        const data = await res.json()
        setResults(data.docs || [])
        setIsOpen(true)
      } catch (e) {
        console.error('Search fetch error:', e)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, locale])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={t('input')}
          className="w-full bg-light-200 text-dark-200 placeholder:text-gold-300 py-4 pl-8 pr-14 rounded-[20px] outline-none text-base font-jost transition-all border border-transparent focus:border-gold-300/40"
        />

        {query ? (
          <button
            onClick={handleClear}
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-dark-200 hover:opacity-70 transition-opacity p-1"
          >
            ✕
          </button>
        ) : (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold-300">
            <SearchSvg className="transition-opacity opacity-100" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[20px] shadow-xl border border-grey-100 z-50 overflow-hidden max-h-95 overflow-y-auto">
          {isLoading ? (
            <div className="p-5 text-center text-[#4D5053] font-jost text-sm">{t('search')}</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <div className="px-6 py-2 text-xs font-semibold text-dark-200 uppercase tracking-wider font-jost">
                {t('postTitle')}
              </div>
              {results.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-3 hover:bg-gold-100 transition-colors border-b border-gold-100 last:border-none"
                >
                  <div className="text-base mb-1">{post.title}</div>
                  {post.excerpt && (
                    <p className="text-xs text-gold-100 line-clamp-1">{post.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">{t('notFound')}</div>
          )}
        </div>
      )}
    </div>
  )
}
