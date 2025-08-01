'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { createPortal } from 'react-dom'
import AnimatedBackground from '@/components/ui/animated-background'
import ProjectFeatures from '@/components/ui/project-features'

const galleryImages = [
  {
    src: '/images/vid2.mp4',
    title: 'Modern Facade',
    description: 'Clean angles and a carefully composed architectural rhythm',
    isVideo: true,
  },
  {
    src: '/images/gal1.webp',
    title: 'Designed Around the View',
    description: 'Surrounded by open space. Just clear, panoramic views all around.',
    isVideo: false,
  },
  {
    src: '/images/gal2.webp',
    title: 'Luxury Living',
    description: 'Modern Features. Thoughtfully Delivered.',
    isVideo: false,
  },
  {
    src: '/images/gal3.webp',
    title: 'Urban Serenity',
    description: 'Clean lines, open skies, and subtle coastal horizons',
    isVideo: false,
  },
]

const DreamLifeShowcaseSection = () => {
  const [expanded, setExpanded] = useState(0)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.9, once: false })
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Effect to control video playback based on expansion state and viewport visibility
  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (!videoRef) return
      
      const shouldPlay = expanded === index && inView
      
      if (shouldPlay) {
        videoRef.play().catch(() => {
          // Handle autoplay restrictions gracefully
          console.log('Video autoplay was prevented')
        })
      } else {
        videoRef.pause()
        videoRef.currentTime = 0 // Reset to beginning when not playing
      }
    })
  }, [expanded, inView])

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden snap-start">
      <AnimatedBackground isInView={inView} />

      {/* Logo - Rendered as portal to appear above everything */}
      {typeof window !== 'undefined' && createPortal(
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 80, 
            damping: 15, 
            delay: inView ? 0.4 : 0,
            duration: 0.3
          }}
          className="fixed top-32 md:top-8 left-8 z-[99999] -mt-28 md:-mt-5 -ml-6 md:-ml-6"
          style={{ zIndex: 99999, transform: 'translateZ(0)' }}
        >
          <Image
            src="/logo06.png"
            alt="Dream Life Residences logo"
            width={180}
            height={180}
            className="object-contain h-14 w-auto md:h-[100px]"
            priority
          />
        </motion.div>,
        document.body
      )}

      {/* Grid container for the content */}
      <div className="absolute inset-0 z-10 grid h-full w-full grid-cols-1 md:grid-cols-5 grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr] p-4 md:p-8 gap-4">

        {/* Project Features */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.2 }}
          className="row-start-3 md:row-start-2 md:col-start-1 md:col-span-3 self-end"
        >
          <div className="backdrop-blur-md md:w-[920px] bg-white/80 rounded-2xl shadow-lg w-full">
            <ProjectFeatures />
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.section
          initial={{ x: 120, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.1 }}
          className="hidden md:flex row-start-2 md:row-span-2 md:col-start-4 md:col-span-2 items-center justify-end"
        >
          <div className="flex gap-2 h-[260px] md:h-[550px] w-full md:w-auto">
            {galleryImages.map((img, idx) => (
              <div
                key={img.src}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-lg 
                  ${
                    expanded === idx
                      ? 'flex-grow md:w-[260px] z-10 opacity-100'
                      : 'w-[28px] flex-shrink-0 md:w-[48px] opacity-30 hover:opacity-60'
                  }
                  h-full`}
                onClick={() => setExpanded(idx)}
                aria-label={img.title}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setExpanded(idx)
                }}
              >
                {img.isVideo ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el
                    }}
                    src={img.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                )}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 transition-all duration-500 ${
                    expanded === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{img.title}</h3>
                  <p className="text-sm opacity-90">{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  )
}

export default DreamLifeShowcaseSection 