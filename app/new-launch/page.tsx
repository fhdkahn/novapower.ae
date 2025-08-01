'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import NewLaunchHeroText from '@/components/ui/new-launch-hero-text'
import { Footer } from '@/components/sections/footer'

const DreamLifeShowcaseSection = dynamic(() => import('@/components/ui/dream-life-showcase'), { ssr: false })
const LegacySlider = dynamic(() => import('@/components/ui/legacy-slider'), { ssr: false })
const FloorPlanTabs = dynamic(() => import('@/components/ui/floor-plan-tabs'), { ssr: false })
const LocationMap = dynamic(() => import('@/components/ui/location-map'), { ssr: false })
const VideoPlayCard = dynamic(() => import('@/components/ui/video-play-card'), { ssr: false })

export default function NewLaunchPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      {/* Fixed Video Background Layer */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video
          className="w-full h-full object-cover"
          src="/drhero2.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/featureproperty.png"
        />
      </div>
      {/* Fixed Diagonal Wedge Overlay - Applies to all sections */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div className="w-full h-full wedge-overlay" aria-hidden="true" />
        <style jsx>{`
          .wedge-overlay {
            clip-path: polygon(0 0, 9% 0, 0 50%);
            -webkit-clip-path: polygon(0 0, 9% 0, 0 50%);
            background: rgb(8, 24, 46);
            opacity: 1;
            box-shadow: 24px 0 64px 0 rgba(0, 0, 0, 0.1);
            will-change: clip-path, transform;
          }
          @media (max-width: 640px) {
            .wedge-overlay {
              top: 130px;
              height: calc(100% - 120px);
              clip-path: polygon(0 0, 20% 0, 0 50%);
              -webkit-clip-path: polygon(0 0, 20% 0, 0 50%);
            }
          }
        `}</style>
      </div>
      {/* Scrollable Snap Sections Above Video */}
      <div className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth z-10">
        {/* Hero Overlay as First Snap Section */}
        <section className="relative w-full h-screen flex items-center justify-center snap-start" style={{ isolation: 'isolate' }}>
          {/* DL Logo - top left */}
          <div className="absolute md:top-6 md:left-7 top-6 left-2 z-[9999] pointer-events-none">
        <Image
          src="/dlwhitelogo.png"
          alt="Dream Life Residences logo"
          width={150}
          height={150}
          className="object-contain h-10 w-auto md:h-20 drop-shadow-lg"
          priority
        />
      </div>
          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-start z-40 flex-grow pt-28 sm:pt-32 md:pt-40">
            <NewLaunchHeroText />
            <p className="mt-4 max-w-2xl text-base text-sm md:text-3xl font-light text-center text-[#ECF0F1] drop-shadow-lg">
              Introducing Dreamlife Residences: the first signature development in Dubai by Nova Power, setting new standards for elegance and comfort in Deira Island.
            </p>
          </div>
          {/* Scroll Down Indicator and Text */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 select-none">
            <motion.div
              aria-label="Scroll down"
              initial={{ y: 0 }}
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 animate-bounce-slow">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
            <span className="mt-1 text-white text-base md:text-2xl font-semibold tracking-tight drop-shadow-md bg-white/15 rounded-full px-4 py-1">
            Step into island living.
            </span>
          </div>
        </section>

        <DreamLifeShowcaseSection />

        {/* Legacy Image Slider Carousel */}
        <section className="h-screen flex flex-col justify-center items-center snap-start">
          <div className="flex justify-center items-center h-full w-full">
            <LegacySlider />
          </div>
        </section>
        {/* Floor Plan Tabs Section */}
        <section className="h-screen flex flex-col justify-center items-center snap-start">
          <FloorPlanTabs />
        </section>
        {/* Location Map Section */}
        <LocationMap />
        
        {/* Video Play Section */}
        <section className="h-screen flex flex-col justify-center items-center snap-start">
          <VideoPlayCard />
        </section>
        
        {/* Footer Section */}
        <section className="w-full snap-start">
          <Footer variant="transparent" />
        </section>
      </div>
    </main>
  )
}