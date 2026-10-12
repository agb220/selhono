'use client'
import { useState, useEffect, useRef } from 'react'

interface TypewriterProps {
  text: string
  onComplete: () => void
  speed?: number
}

export function TypewriterText({ text, onComplete, speed = 40 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let index = 0
    setDisplayedText('')

    if (!text) return

    let timeoutId: NodeJS.Timeout

    const typeNextChar = () => {
      if (index < text.length) {
        index++
        setDisplayedText(text.slice(0, index))
        timeoutId = setTimeout(typeNextChar, speed)
      } else {
        onCompleteRef.current()
      }
    }

    timeoutId = setTimeout(typeNextChar, speed)

    return () => clearTimeout(timeoutId)
  }, [text, speed])

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-white ml-1 translate-y-0.5 animate-pulse" />
      )}
    </span>
  )
}
