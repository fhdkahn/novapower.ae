"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  animated?: boolean
}

export function GradientText({ 
  children, 
  className = '',
  gradient = 'from-blue-500 via-purple-500 to-pink-500',
  animated = true
}: GradientTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r ${gradient} bg-300% bg-clip-text text-transparent font-bold ${
        animated ? 'animate-gradient' : ''
      } ${className}`}
    >
      {children}
    </motion.span>
  )
} 