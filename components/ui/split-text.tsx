"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  splitType?: 'chars' | 'words'
  from?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
  to?: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
  }
  staggerDelay?: number
  once?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  splitType = 'chars',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  staggerDelay = 0.05,
  once = true,
  textAlign = 'center'
}: SplitTextProps) {
  
  const splitText = () => {
    if (splitType === 'words') {
      return text.split(' ').map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}`}
          initial={from}
          whileInView={to}
          viewport={{ once }}
          transition={{
            duration,
            delay: delay + (wordIndex * staggerDelay),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block mr-1"
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))
    }

    // Split by characters
    return text.split('').map((char, charIndex) => (
      <motion.span
        key={`char-${charIndex}`}
        initial={from}
        whileInView={to}
        viewport={{ once }}
        transition={{
          duration,
          delay: delay + (charIndex * staggerDelay),
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="inline-block"
        style={{
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          willChange: 'transform, opacity'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }

  return (
    <span
      className={`${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        position: 'relative'
      }}
    >
      {splitText()}
    </span>
  )
} 