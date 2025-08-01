"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Building, Users, Phone, Calendar } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import GooeyNav from '@/components/GooeyNav'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check both window scroll and any scrollable containers
      const windowScroll = window.scrollY > 50
      
      // Also check for scrollable containers (like in the launch page)
      const scrollableContainers = document.querySelectorAll('.overflow-y-auto, [style*="overflow-y: auto"]')
      let containerScroll = false
      
      scrollableContainers.forEach(container => {
        if (container.scrollTop > 50) {
          containerScroll = true
        }
      })
      
      setScrolled(windowScroll || containerScroll)
    }
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also listen for wheel events to catch snap scrolling
    const handleWheel = () => {
      setTimeout(() => {
        handleScroll()
      }, 10)
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    
    // Listen for touch events on mobile for snap scrolling
    const handleTouchMove = () => {
      setTimeout(() => {
        handleScroll()
      }, 10)
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    
    // Also listen for scroll events on scrollable containers
    const scrollableContainers = document.querySelectorAll('.overflow-y-auto, [style*="overflow-y: auto"]')
    scrollableContainers.forEach(container => {
      container.addEventListener('scroll', handleScroll, { passive: true })
    })
    
    // Check initial scroll position
    handleScroll()
    
    // Set mounted state after component is hydrated
    setIsMounted(true)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
      
      // Clean up container scroll listeners
      scrollableContainers.forEach(container => {
        container.removeEventListener('scroll', handleScroll)
      })
    }
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Expertise", href: "/#properties" },
    { label: "About", href: "/about" },
    { label: "New Launch", href: "/new-launch" },
  ]

  // Get current page to set correct active index
  const getCurrentPageIndex = () => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname === '/') return 0
      if (pathname === '/about') return 2
      if (pathname === '/new-launch') return 3
      // For expertise section on home page
      if (pathname === '/' && window.location.hash === '#properties') return 1
    }
    return 0 // Default to home
  }

  const mobileNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Expertise', href: '/#properties', icon: Building },
    { name: 'About', href: '/about', icon: Users },
    { name: 'New Launch', href: '/new-launch', icon: Building },
  ]

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-full px-4 sm:px-6 py-1.5 sm:py-1.5 lg:py-1 shadow-2xl border border-white/60 transition-all duration-300 ${
            scrolled ? 'backdrop-blur-xl bg-black/20' : 'backdrop-blur-md bg-black/90'
          }`}
        >
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2 sm:space-x-1"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-11 lg:w-12 lg:h-13 relative flex items-center justify-center">
                <Image
                  src="/logo.webp"
                  alt="NovaPower Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                  style={{
                    filter: 'invert(1) brightness(1.2) contrast(1.2)',
                    mixBlendMode: 'screen',
                    transform: 'translateX(4px) translateY(-4px)'
                  }}
                  priority
                  onError={(e) => console.error('Logo failed to load:', e)}
                  onLoad={() => console.log('Logo loaded successfully')}
                />
              </div>
              <div className="relative h-5 w-20 sm:h-7 sm:w-28 flex items-center">
                <Image
                  src="/nova.png"
                  alt="Nova"
                  width={112}
                  height={28}
                  className="object-contain w-full h-full"
                  style={{
                    filter: 'invert(1) brightness(1.2) contrast(1.2)',
                    mixBlendMode: 'screen',
                    transform: 'translateX(-8px)'
                  }}
                  priority
                  onError={(e) => console.error('Nova logo failed to load:', e)}
                  onLoad={() => console.log('Nova logo loaded successfully')}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation - GooeyNav */}
            <div className="hidden lg:block">
              <div style={{ height: '32px', position: 'relative' }} className="sm:h-[40px] lg:h-[32px]">
                {isMounted && (
                  <GooeyNav
                    items={navItems}
                    particleCount={10}
                    particleDistances={[60, 8]}
                    particleR={70}
                    initialActiveIndex={getCurrentPageIndex()}
                    animationTime={500}
                    timeVariance={200}
                    colors={[1, 2, 3, 4]}
                  />
                )}
              </div>
            </div>

            {/* Desktop CTA & Theme Toggle */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-5 py-1.5 sm:py-1.5 lg:py-1 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg text-xs sm:text-sm"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3 lg:h-3 mr-1.5 sm:mr-2 inline" />
                Schedule Tour
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors text-white"
              >
                {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden flex justify-center"
          >
            <div className="rounded-2xl p-6 shadow-2xl border border-white/10 w-[90%] max-w-[320px] bg-black/70 backdrop-blur-xl">
              <div className="space-y-4">
                {mobileNavItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-white/80 hover:text-white transition-colors font-medium flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-white/10"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Tour
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
} 
