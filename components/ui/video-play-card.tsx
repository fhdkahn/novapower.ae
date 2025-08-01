'use client'
import React, { useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Play, Pause, Search, Eye, MapPin, Server, Store, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

// YouTube video data array
const videos = [
  {
    id: 1,
    title: "Dream Life Residences Launch Highlights",
    description: "Exclusive showcase of luxury living in Deira Island",
    youtubeId: "lNSbu8O8gOk",
    thumbnail: "/images/building-day-hd.webp"
  },
  {
    id: 2,
    title: "Dream Life Residences Launch Highlights",
    description: "Premium amenities and world-class features reveal",
    youtubeId: "7joOpiLLLnk",
    thumbnail: "/images/building-night-hd.webp"
  },
  {
    id: 3,
    title: "Dream Life Residences Launch Highlights",
    description: "Strategic location and investment opportunities",
    youtubeId: "3RiT6BLB1dw",
    thumbnail: "/images/heroback.webp"
  }
]

const VideoPlayCard = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showPauseButton, setShowPauseButton] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentVideo = videos[currentVideoIndex]

  // Memoized transform calculation to prevent unnecessary recalculations
  const transform = useMemo(() => {
    if (isVideoPlaying) return 'scale(1) rotateX(0deg) rotateY(0deg)'
    if (!isHovered) return 'scale(1) rotateX(0deg) rotateY(0deg)'
    
    const { x, y } = mousePosition
    const rotateY = Math.max(-8, Math.min(8, (x / 400) * 8))
    const rotateX = Math.max(-8, Math.min(8, -(y / 400) * 8))
    const scale = 1.03
    
    return `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [isVideoPlaying, isHovered, mousePosition])

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isVideoPlaying) return
    
    // Throttle mouse movement to improve performance
    if (mouseMoveTimeoutRef.current) return
    
    mouseMoveTimeoutRef.current = setTimeout(() => {
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = (e.clientX - centerX) * 0.5
      const mouseY = (e.clientY - centerY) * 0.5
      
      setMousePosition({ x: mouseX, y: mouseY })
      mouseMoveTimeoutRef.current = null
    }, 16) // ~60fps throttling
  }, [isVideoPlaying])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (isVideoPlaying) {
      setShowPauseButton(true)
    }
  }, [isVideoPlaying])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    setShowPauseButton(false)
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current)
      mouseMoveTimeoutRef.current = null
    }
  }, [])

  const handlePlayClick = useCallback(() => {
    setIsVideoPlaying(true)
  }, [])

  const handlePauseClick = useCallback(() => {
    setIsVideoPlaying(false)
    setShowPauseButton(false)
  }, [])

  const handleNextVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    setIsVideoPlaying(false)
    setShowPauseButton(false)
  }, [])

  const handlePrevVideo = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    setIsVideoPlaying(false)
    setShowPauseButton(false)
  }, [])

  // Memoized YouTube URL to prevent unnecessary iframe reloads
  const youtubeUrl = useMemo(() => {
    return `https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=${isVideoPlaying ? 1 : 0}&muted=1&controls=1&rel=0&modestbranding=1&showinfo=0&loop=1&playlist=${currentVideo.youtubeId}`
  }, [currentVideo.youtubeId, isVideoPlaying])

  return (
    <div className="flex items-center justify-center w-full h-full p-6 relative">
      {/* Logo - Screen Corner (Outside Card) */}
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

      <div className="relative w-full max-w-5xl">
        {/* Main Video Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm cursor-pointer"
            style={{
              transform,
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              willChange: 'transform',
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Video Background with Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-[#08182E] via-[#1a365d] to-[#2d3748]">
              {/* YouTube iframe - Only render when playing */}
              {isVideoPlaying && (
                <iframe
                  className="absolute inset-0 w-full h-full z-10"
                  src={youtubeUrl}
                  title={currentVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  key={`${currentVideo.id}-${isVideoPlaying}`}
                />
              )}
              
              {/* Static thumbnail overlay - Only show when not playing */}
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#08182E] via-[#1a365d] to-[#2d3748] transition-opacity duration-700">
                  <div className="absolute inset-0 bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-8 left-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
                    <div className="absolute bottom-12 right-12 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-500" />
                  </div>
                </div>
              )}
              
              {/* Central Play/Pause Button */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-20 ${
                isVideoPlaying && !showPauseButton ? 'opacity-0 pointer-events-none' : 'opacity-60'
              }`}>
                <button 
                  onClick={isVideoPlaying ? handlePauseClick : handlePlayClick}
                  className={`
                    w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full 
                    flex items-center justify-center shadow-2xl
                    transition-all duration-300 hover:scale-110 hover:bg-white/50
                    hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
                    ${isHovered && !isVideoPlaying ? 'animate-pulse scale-105' : ''}
                    ${isVideoPlaying && showPauseButton ? 'bg-black/80 text-white hover:bg-black' : ''}
                  `}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 ml-0" fill="currentColor" />
                  ) : (
                    <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
                  )}
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-20">
                <button
                  onClick={handlePrevVideo}
                  className="pointer-events-auto w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
                >
                  <ChevronLeft className="w-6 h-6 text-white group-hover:text-white/90" />
                </button>
                
                <button
                  onClick={handleNextVideo}
                  className="pointer-events-auto w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-110 group"
                >
                  <ChevronRight className="w-6 h-6 text-white group-hover:text-white/90" />
                </button>
              </div>

              {/* Video Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-20">
                <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                  {currentVideoIndex + 1} / {videos.length}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div 
          className="text-center mt-10 -mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {currentVideo.title}
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto drop-shadow-md">
            {currentVideo.description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default VideoPlayCard 