'use client'
import { motion } from 'framer-motion'
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function LocationMap() {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 4))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.5))
  }, [])

  const handleReset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center snap-start relative overflow-hidden py-8 lg:py-0">
      {/* Logo - Top Left Corner */}
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

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        {/* Left Side - Information */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-4 sm:p-6 lg:p-16 mt-16 sm:mt-20 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-4 lg:mb-6 drop-shadow-lg">
              Discover Our
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-gray-200 mt-1 lg:mt-2">
                Prime Location
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-8 lg:mb-12 leading-relaxed drop-shadow-md">
              Strategically positioned in the heart of Dubai Island, Dreamlife Residences offers unparalleled connectivity 
              and luxury living in one of the world's most prestigious districts.
            </p>

            {/* Location Features */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-white/30">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 drop-shadow-md">Prime Dubai Location</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed drop-shadow-sm">
                    Located in Dubai's most sought-after district, with easy access to major landmarks, 
                    shopping centers, and business hubs.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-white/30">
                  <span className="text-white text-sm sm:text-base lg:text-lg">🚗</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 drop-shadow-md">Excellent Connectivity</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed drop-shadow-sm">
                    Minutes away from Dubai International Airport, major highways, and public transportation.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-white/30">
                  <span className="text-white text-sm sm:text-base lg:text-lg">🏢</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 drop-shadow-md">Urban Lifestyle</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed drop-shadow-sm">
                    Surrounded by world-class dining, entertainment, and cultural attractions.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Custom Map */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-4 sm:p-6 lg:p-16 pt-8 sm:pt-12 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative"
          >
            <div className="h-full bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative">
              {/* Custom Map Container */}
              <div 
                ref={containerRef}
                className="h-full w-full relative overflow-hidden"
              >
                {/* Map Image */}
                <div 
                  className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-200 ease-out"
                  style={{
                    backgroundImage: 'url(/map.png)',
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                />
                
                {/* DIsland Image Overlay - Top Left */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative"
                  >
                    <img 
                      src="/DIsland2.webp" 
                      alt="Dubai Island" 
                      width={80}
                      height={60}
                      className="w-28 h-20 sm:w-28 sm:h-28 md:w-26 md:h-18 lg:w-48 lg:h-36 xl:w-56 xl:h-42 object-cover rounded-lg"
                    />
                  </motion.div>
                </div>
                
                {/* Zoom Controls */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col space-y-1 sm:space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleZoomIn}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                    title="Reset View"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </motion.button>
                </div>

                {/* Zoom Level Indicator */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2 border border-white/30">
                  <span className="text-xs sm:text-sm text-black font-medium">
                    {Math.round(scale * 100)}%
                  </span>
                </div>
            
                {/* Custom Map Pin Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 200 }}
                    className="relative pointer-events-auto"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      transformOrigin: 'center center'
                    }}
                  >
                    {/* Pin Shadow */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
                    
                    {/* Logo and Pin Container */}
                    <div className="flex flex-col items-center space-y-0 -mt-16">
                      {/* Logo */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        className="flex justify-center"
                      >
                        <a 
                          href="https://maps.app.goo.gl/MrYXRyqacAkcWZz48"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer hover:scale-105 transition-transform duration-200 block"
                          title="View location on Google Maps"
                        >
                          <img 
                            src="/dlwhitelogo.png" 
                            alt="Dream Life Residences" 
                            width={160}
                            height={80}
                            className="h-12 w-auto drop-shadow-lg pointer-events-none"
                          />
                        </a>
                      </motion.div>
                      
                      {/* Pin */}
                      <div className="relative">
                        <a 
                          href="https://maps.app.goo.gl/MrYXRyqacAkcWZz48"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer hover:scale-110 transition-transform duration-200 block"
                          title="View location on Google Maps"
                        >
                          <div className="w-6 h-6 flex items-center justify-center drop-shadow-lg pointer-events-none">
                            <svg 
                              fill="#ff2600" 
                              height="48px" 
                              width="48px" 
                              version="1.1" 
                              id="Capa_1" 
                              xmlns="http://www.w3.org/2000/svg" 
                              xmlnsXlink="http://www.w3.org/1999/xlink" 
                              viewBox="0 0 368.553 368.553" 
                              xmlSpace="preserve" 
                              stroke="#ff2600" 
                              strokeWidth="0.0036855300000000002"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2.211318"></g>
                              <g id="SVGRepo_iconCarrier"> 
                                <g> 
                                  <g> 
                                    <path d="M184.277,0c-71.683,0-130,58.317-130,130c0,87.26,119.188,229.855,124.263,235.883c1.417,1.685,3.504,2.66,5.705,2.67 c0.011,0,0.021,0,0.032,0c2.189,0,4.271-0.957,5.696-2.621c5.075-5.926,124.304-146.165,124.304-235.932 C314.276,58.317,255.96,0,184.277,0z M184.322,349.251C160.385,319.48,69.277,201.453,69.277,130c0-63.411,51.589-115,115-115 s115,51.589,115,115C299.276,203.49,208.327,319.829,184.322,349.251z"></path> 
                                    <path d="M184.277,72.293c-30.476,0-55.269,24.793-55.269,55.269s24.793,55.269,55.269,55.269s55.269-24.793,55.269-55.269 S214.753,72.293,184.277,72.293z M184.277,167.83c-22.204,0-40.269-18.064-40.269-40.269s18.064-40.269,40.269-40.269 s40.269,18.064,40.269,40.269S206.48,167.83,184.277,167.83z"></path> 
                                  </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                  <g> </g> 
                                </g> 
                              </g>
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 