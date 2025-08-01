'use client'
import React, { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Hero } from '@/components/sections/hero'
import { FeaturedProperties } from '@/components/sections/featured-properties'
import { Team } from '@/components/sections/team'

export default function Home() {
  useEffect(() => {
    // Lenis smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Hash scroll logic
    if (typeof window !== 'undefined' && window.location.hash === '#properties') {
      const el = document.getElementById('properties');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <FeaturedProperties />
      <Team />
    </main>
  )
} 