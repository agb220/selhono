'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MarqueeTrackProps {
  children: ReactNode
}

export default function MarqueeTrack({ children }: MarqueeTrackProps) {
  return (
    <div className="relative w-full flex overflow-x-hidden">
      <motion.ul
        className="flex whitespace-nowrap gap-6.25 shrink-0 pr-6.25"
        animate={{ x: [0, '-50%'] }}
        transition={{
          ease: 'linear',
          duration: 25,
          repeat: Infinity,
        }}
      >
        {children}
      </motion.ul>
    </div>
  )
}
