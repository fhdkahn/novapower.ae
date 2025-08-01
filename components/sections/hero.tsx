"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { GradientText } from '@/components/ui/gradient-text'
import { SplitText } from '@/components/ui/split-text'
import { useThemeMode } from '@/components/hooks/use-theme-mode'

export function Hero() {
  const themeMode = useThemeMode()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-start justify-center relative overflow-hidden pt-32">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Day mode background */}
        <motion.div
          key={`hero-day-${themeMode}`}
          initial="hidden"
          animate={themeMode === 'light' ? 'visible' : 'hidden'}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/building-day-hd.webp?v=2"
            alt="Luxury building in daylight"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {/* Overlay for better text readability - reduced opacity for clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20" />
        </motion.div>

        {/* Night mode background */}
        <motion.div
          key={`hero-night-${themeMode}`}
          initial="hidden"
          animate={themeMode === 'dark' ? 'visible' : 'hidden'}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/building-night-hd.webp?v=2"
            alt="Luxury building at night"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          {/* Overlay for better text readability - reduced opacity for clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/15 to-purple-900/15" />
        </motion.div>

        {/* Blurred gradient at the bottom for smooth merge */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10 translate-y-9 scale-y-125 rounded-b-[48px]
            ${themeMode === 'dark'
              ? 'bg-gradient-to-b from-transparent via-gray-900/20 via-70% to-gray-950/0 backdrop-blur-sm'
              : 'bg-gradient-to-b from-transparent via-white/20 via-70% to-white/0 backdrop-blur-sm'}
          `}
        />
      </div>

      {/* Animated accent elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl ${
            themeMode === 'dark' 
              ? 'bg-blue-400/10' 
              : 'bg-blue-500/8'
          }`}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            themeMode === 'dark' 
              ? 'bg-purple-400/10' 
              : 'bg-purple-500/8'
          }`}
        />
      </div>

      {/* Main Content - Moved Higher */}
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className={`inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border shadow-lg ${
              themeMode === 'dark' 
                ? 'bg-white/15 border-white/30 text-white' 
                : 'bg-white/25 border-gray-200/40 text-gray-800'
            }`}>
              <SplitText
                text="✨ Welcome to the Future of Real Estate"
                className={`text-sm font-medium ${
                  themeMode === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
                delay={0.5}
                duration={0.8}
                staggerDelay={0.04}
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                splitType="chars"
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className={`text-5xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-lg ${
              themeMode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Discover Your Dream
            <br />
            <GradientText className="text-5xl md:text-7xl">
              Luxury Properties
            </GradientText>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className={`text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-md ${
              themeMode === 'dark' ? 'text-gray-100' : 'text-gray-800'
            }`}
          >
            Redefining luxury through intelligent design, quality execution, and a commitment to building better environments for modern life.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          themeMode === 'dark' ? 'border-white/70' : 'border-gray-600/70'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 ${
            themeMode === 'dark' ? 'bg-white/70' : 'bg-gray-600/70'
          }`}></div>
        </div>
      </motion.div>
    </section>
  )
} 
