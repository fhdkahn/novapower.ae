"use client"

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  
  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border">
        {/* Placeholder to maintain layout */}
      </div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border hover:bg-accent transition-colors"
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: resolvedTheme === 'dark' ? 1 : 0,
          opacity: resolvedTheme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: resolvedTheme === 'light' ? 1 : 0,
          opacity: resolvedTheme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="h-4 w-4" />
      </motion.div>
    </motion.button>
  )
} 