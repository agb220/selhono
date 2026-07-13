'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MarqueeTrackProps {
  children: React.ReactNode
}

export default function MarqueeTrack({ children }: MarqueeTrackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const items = Array.from(list.children) as HTMLElement[]
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const clone = item.cloneNode(true)
        list.appendChild(clone)
      })

      const totalWidth = list.scrollWidth / 2

      gsap.to(list, {
        x: `-${totalWidth}px`,
        duration: 50,
        ease: 'none',
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [children])

  return (
    <div ref={containerRef} className="relative w-full flex overflow-x-hidden select-none">
      <ul ref={listRef} className="flex whitespace-nowrap gap-6.25 shrink-0 pr-6.25">
        {children}
      </ul>
    </div>
  )
}
