'use client'

import { useEffect, useRef } from 'react'
import { CompanyStat } from '@/payload-types'

type StatsCardProps = Exclude<CompanyStat['stats'], null | undefined>[number]

export const StatsCard = ({ value, label }: StatsCardProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (numberRef.current) {
      numberRef.current.textContent = '1'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          startCounter()
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [value])

  const startCounter = () => {
    const start = 1
    const end = value
    const duration = 1600
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      const easeProgress = progress * (2 - progress)
      const currentValue = Math.floor(easeProgress * (end - start) + start)

      if (numberRef.current) {
        numberRef.current.textContent = String(currentValue)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (numberRef.current) {
        numberRef.current.textContent = String(end)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center text-center px-4">
      <span className="text-[64px] md:text-[85px] leading-none font-bold text-gold-300 font-serif mb-4 selection:bg-transparent">
        <span ref={numberRef}>{value}</span>
      </span>

      <p className="text-dark-200 text-[18px] font-medium leading-relaxed tracking-wide whitespace-pre-line max-w-50">
        {label}
      </p>
    </div>
  )
}
