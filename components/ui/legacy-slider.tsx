import React, { useState, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import styles from './legacy-slider.module.css'
import {
  Cube3DIcon,
  SmartHomeIcon,
  BrandedInteriorsIcon,
  WaterPurifierIcon,
  WasteDisposalIcon,
  CardAccessIcon,
  OpenViewsIcon,
  PropertyAppIcon,
  ShuttleServiceIcon,
} from './project-feature-icons'

/**
 * Image metadata for the slider
 */
type SliderImage = {
  src: string
  author: string
  title: string
  topic: string
  description: string
}

const images: SliderImage[] = [
  { src: '/id/Picture0.webp', author: 'NOVA POWER', title: 'Main Lobby View', topic: '', description: 'The main lobby at DreamLife Residences offers a warm, upscale welcome with modern design, ambient lighting, and refined materials. This shared space includes a comfortable visitor seating area, a coffee lounge, and access to the elevator corridor, creating a relaxing and functional environment for residents and guests alike.' },
  { src: '/id/Picture00.webp', author: 'NOVA POWER', title: 'Lobby and Elevator Corridor', topic: '', description: 'The lobby and elevator corridor at DreamLife Residences are designed to provide a seamless transition between the main lobby and the residential floors. This shared space features a modern, upscale design with ambient lighting, refined materials, and a welcoming atmosphere. Residents and guests can easily access the elevator from the lobby, creating a convenient and functional environment.' },
  { src: '/id/Picture1.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '1BHK', description: 'A beautifully designed living room in a 1-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture2.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: '1BHK', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture3.jpg', author: 'NOVA POWER', title: 'Bathroom Interior', topic: '1BHK', description: 'A modern and elegant bathroom interior. Designed with premium materials, sleek fixtures, and a spa-like atmosphere to elevate everyday living.' },
  { src: '/id/Picture4.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '2BHK', description: 'A beautifully designed living room in a 2-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture5.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '2BHK', description: 'A beautifully designed living room in a 2-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture6.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: '1BHK', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture7.jpg', author: 'NOVA POWER', title: 'Bathroom Interior', topic: '2BHK', description: 'A modern and elegant bathroom interior. Designed with premium materials, sleek fixtures, and a spa-like atmosphere to elevate everyday living.' },
  { src: '/id/Picture8.jpg', author: 'NOVA POWER', title: 'Kitchen Interior', topic: '2BHK', description: 'A contemporary kitchen interior. Featuring modern cabinetry, high-quality appliances, and a clean, functional design—perfect for everyday living and entertaining.' },
  { src: '/id/Picture9.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '2BHK', description: 'A beautifully designed living room in a 2-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture10.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '1BHK', description: 'A beautifully designed living room in a 1-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture11.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: '2BHK', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture14.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: '2BHK', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture15.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: '3BHK', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture16.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: 'Duplex', description: 'A beautifully designed living room in a Duplex apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture17.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: 'Duplex', description: 'A beautifully designed living room in a Duplex apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
  { src: '/id/Picture18.jpg', author: 'NOVA POWER', title: 'Bedroom Interior', topic: 'Duplex', description: 'A serene and modern bedroom interior. Thoughtfully designed for comfort and relaxation, featuring contemporary finishes and calming tones.' },
  { src: '/id/Picture.jpg', author: 'NOVA POWER', title: 'Living Room View', topic: '2BHK', description: 'A beautifully designed living room in a 2-bedroom apartment at DreamLife Residences, offering comfort, elegance, and modern styling.' },
]

const ANIMATION_DURATION = 600 // ms

type Direction = 'next' | 'prev'

/**
 * Overlay card features for the slider
 */
const sliderFeatures = [
  {
    Icon: SmartHomeIcon,
    title: 'Smart Home',
  },
  {
    Icon: BrandedInteriorsIcon,
    title: 'Branded Interiors',
  },
  {
    Icon: WaterPurifierIcon,
    title: 'Water Purifier',
  },
  {
    Icon: WasteDisposalIcon,
    title: 'Waste Disposal',
  },
  {
    Icon: CardAccessIcon,
    title: 'Card Access',
  },
  {
    Icon: OpenViewsIcon,
    title: 'Open Views',
  },
  {
    Icon: PropertyAppIcon,
    title: 'Property App',
  },
  {
    Icon: ShuttleServiceIcon,
    title: 'Shuttle Service',
  },
];

/**
 * Overlay card component for slider features
 */
const SliderFeatureOverlay: React.FC<{ inView: boolean }> = ({ inView }) => (
  <div className={styles.overlayCard}>
    {/* Desktop: flex row with dividers */}
    <motion.div 
      className="hidden md:flex flex-row items-center w-full bg-transparent justify-center gap-2 md:gap-4"
      initial={{ y: 80, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: inView ? 80 : 120, 
        damping: inView ? 15 : 10, 
        delay: inView ? 0.4 : 0,
        duration: 0.3
      }}
    >
      {/* Logo and label */}
      <div className="flex flex-col items-center shrink-0 md:items-start md:justify-center md:pr-4 lg:pr-6 min-w-[70px] max-w-[150px]">
        <img
          src="/DLlogo3.png"
          alt="DREAMLIFE Logo"
          className="h-6 md:h-10 object-contain"
          style={{ filter: 'invert(1)' }}
        />
        <span className="text-[10px] md:text-xl font-bold tracking-tight text-black/70 uppercase mt-0.5">
          Interior Design
        </span>
      </div>
      {/* Divider after logo */}
      <div className="h-10 w-px bg-neutral-400 mx-1" aria-hidden="true" />
      {/* Features with dividers */}
      {sliderFeatures.map(({ Icon, title }, idx) => (
        <React.Fragment key={title}>
          <div className="flex flex-col items-center text-center min-w-[80px] max-w-[120px] px-1">
            <Icon className="w-8 h-8 text-black mb-1" aria-label={title} />
            <span className="text-[10px] md:text-xs font-medium text-black leading-tight">
              {title}
            </span>
          </div>
          {idx < sliderFeatures.length - 1 && (
            <div className="h-10 w-px bg-neutral-400 mx-1" aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </motion.div>
    {/* Mobile: grid layout, no dividers */}
    <motion.div 
      className="grid grid-cols-3 gap-x-1 gap-y-2 md:hidden w-full items-start"
      initial={{ y: 80, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: inView ? 80 : 120, 
        damping: inView ? 15 : 10, 
        delay: inView ? 0.4 : 0,
        duration: 0.3
      }}
    >
      {/* Logo and label in first cell */}
      <div className="flex flex-col items-center text-center col-span-3 mb-0.5">
        <img
          src="/DLlogo3.png"
          alt="DREAMLIFE Logo"
          className="h-5 object-contain mb-0.5"
        />
        <span className="text-[8px] font-light tracking-widest text-black/70 uppercase mt-0.5">
          Interior Design
        </span>
      </div>
      {sliderFeatures.map(({ Icon, title }) => (
        <div key={title} className="flex flex-col items-center text-center">
          <Icon className="w-6 h-6 text-black mb-0.5" aria-label={title} />
          <span className="text-[8px] font-medium text-black leading-tight">
            {title}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
)

const LegacySlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.9, once: false })
  const [displayIndex, setDisplayIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>('next')
  const [transitioning, setTransitioning] = useState(false)
  const [animImg, setAnimImg] = useState<null | {
    src: string
    from: DOMRect
    to: DOMRect
    direction: Direction
    nextIndex: number
  }>(null)
  const [show3DDropdown, setShow3DDropdown] = useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const threeDButtonRef = React.useRef<HTMLButtonElement>(null)

  // Refs for main image and thumbnails
  const mainImgRef = useRef<HTMLImageElement>(null)
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([])

  // --- Next-5 thumbnail bar logic ---
  // For a given currentIndex, the thumbnail bar is always the next 5 images (never including the main image)
  const THUMB_WINDOW = 3
  const totalImages = images.length
  // The indices for the thumbnail bar
  const thumbIndices = Array.from({ length: THUMB_WINDOW }, (_, i) => (currentIndex + 1 + i) % totalImages)

  // Animation handler (updated for new thumbnail bar logic)
  const triggerAnimation = useCallback((dir: Direction, nextIdx: number) => {
    if (transitioning) return
    setDirection(dir)
    setTransitioning(true)
    if (dir === 'prev') setDisplayIndex(nextIdx)
    const mainRect = mainImgRef.current?.getBoundingClientRect()
    // Always use the first thumbnail in the bar as the animation target
    const thumbBarFirstIdx = thumbIndices[0]
    const thumbImg = thumbRefs.current[thumbBarFirstIdx]
    const thumbRect = thumbImg?.getBoundingClientRect()
    if (!mainRect || !thumbRect) {
      setTransitioning(false)
      setCurrentIndex(nextIdx)
      setDisplayIndex(nextIdx)
      return
    }
    if (dir === 'next') {
      setAnimImg({ src: images[nextIdx].src, from: thumbRect, to: mainRect, direction: dir, nextIndex: nextIdx })
      setTimeout(() => {
        setAnimImg(null)
        setCurrentIndex(nextIdx)
        setDisplayIndex(nextIdx)
        setTransitioning(false)
      }, ANIMATION_DURATION)
    } else {
      setAnimImg({ src: images[currentIndex].src, from: mainRect, to: thumbRect, direction: dir, nextIndex: nextIdx })
      setTimeout(() => {
        setAnimImg(null)
        setCurrentIndex(nextIdx)
        setTransitioning(false)
      }, ANIMATION_DURATION)
    }
  }, [transitioning, currentIndex, totalImages, thumbIndices])

  // Navigation handlers (unchanged)
  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + totalImages) % totalImages
    triggerAnimation('prev', nextIdx)
  }, [currentIndex, triggerAnimation, totalImages])
  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalImages
    triggerAnimation('next', nextIdx)
  }, [currentIndex, triggerAnimation, totalImages])
  const handleThumbnailClick = useCallback((idx: number) => {
    if (idx === currentIndex || transitioning) return
    const dir = idx > currentIndex ? 'next' : 'prev'
    triggerAnimation(dir, idx)
  }, [currentIndex, transitioning, triggerAnimation])

  // For accessibility: highlight the active thumbnail
  const isActiveThumb = (idx: number) => idx === currentIndex

  // Calculate animation style for the wrapper div (unchanged)
  const animWrapperStyle = animImg
    ? {
        position: 'fixed' as const,
        left: animImg.from.left,
        top: animImg.from.top,
        width: animImg.from.width,
        height: animImg.from.height,
        zIndex: 10, // Ensure it's below the navbar (assuming navbar zIndex is higher)
        borderRadius: animImg.direction === 'next' ? '20px' : '0px',
        overflow: 'hidden' as const,
        transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.77,0,0.175,1)`,
        pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      } as React.CSSProperties
    : undefined

  // Animate the floating wrapper div (unchanged)
  React.useEffect(() => {
    if (!animImg) return
    const timer = setTimeout(() => {}, 10)
    requestAnimationFrame(() => {
      const wrapper = document.getElementById('anim-img-wrapper') as HTMLDivElement | null
      if (wrapper) {
        wrapper.style.left = animImg.to.left + 'px'
        wrapper.style.top = animImg.to.top + 'px'
        wrapper.style.width = animImg.to.width + 'px'
        wrapper.style.height = animImg.to.height + 'px'
        wrapper.style.borderRadius = animImg.direction === 'next' ? '0px' : '20px'
      }
    })
    return () => clearTimeout(timer)
  }, [animImg])

  // --- Sliding carousel track style ---
  // Thumbnail width and gap are now controlled by CSS for responsiveness
  const thumbBarStyle: React.CSSProperties = {
    // display and gap are in the CSS file now
    transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.77,0,0.175,1)`,
  }

  // 3D VR links
  const vrLinks = {
    'HUBB': 'https://vr.justeasy.cn/view/1a72g5n1681qr9l7-1730198507.html',
    '1BHK': 'https://vr.justeasy.cn/view/172zf516ub754za2-1726025564.html',
    '2BHK': 'https://vr.justeasy.cn/view/176fq25m167698l1-1753083151.html',
    '3BHK': 'https://vr.justeasy.cn/view/62172j5tf1678539-1726028065.html',
  } as const

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!show3DDropdown) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        threeDButtonRef.current && !threeDButtonRef.current.contains(target)
      ) {
        setShow3DDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [show3DDropdown]);

  // Responsive button size for 3D options
  const [optionBtnSize, setOptionBtnSize] = React.useState(60)
  React.useEffect(() => {
    function updateSize() {
      setOptionBtnSize(window.matchMedia('(max-width: 678px)').matches ? 40 : 60)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const [optionBtnFontSize, setOptionBtnFontSize] = React.useState(18)
  React.useEffect(() => {
    function updateFontSize() {
      setOptionBtnFontSize(window.matchMedia('(max-width: 678px)').matches ? 13 : 18)
    }
    updateFontSize()
    window.addEventListener('resize', updateFontSize)
    return () => window.removeEventListener('resize', updateFontSize)
  }, [])

  return (
    <div ref={sectionRef} style={{ position: 'relative', width: '100%' }}>
      {/* Logo - positioned above the carousel with animation */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: inView ? 80 : 120, 
          damping: inView ? 15 : 10, 
          delay: inView ? 0.4 : 0,
          duration: 0.3
        }}
        className="absolute top-8 left-8 z-[99999] flex justify-start w-auto pointer-events-auto"
        style={{ transform: 'translateZ(0)' }}
      >
        <Image
          src="/logo06.png"
          alt="Dream Life Residences logo"
          width={180}
          height={180}
          className="object-contain h-14 w-auto md:h-[120px] -mt-28 md:-mt-44 -ml-6 md:-ml-5"
          priority
        />
      </motion.div>
      <div className={`${styles.carousel} carousel mx-auto block`}>
        {/* Main image (unchanged) */}
        <div className={styles.list + ' list'}>
          <div className={styles.item + ' item ' + styles['glow-border']} key={images[displayIndex].src}>
            {/* For 'prev' animation, render the previous image as background, and hide only the outgoing main image */}
            {animImg && animImg.direction === 'prev' ? (
              <>
                {/* New main image (previous image) always visible */}
                <img
                  src={images[displayIndex].src}
                  alt={images[displayIndex].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, position: 'absolute', inset: 0, zIndex: 0 }}
                />
                {/* Outgoing main image, hidden during animation */}
                <img
                  ref={mainImgRef}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  style={{ visibility: 'hidden', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0, position: 'absolute', inset: 0, zIndex: 1 }}
                />
              </>
            ) : (
              <img
                ref={mainImgRef}
                src={images[displayIndex].src}
                alt={images[displayIndex].title}
                style={{ visibility: animImg && animImg.direction === 'prev' ? 'hidden' : 'visible', transition: 'visibility 0.1s', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
              />
            )}
            <div className={styles.content + ' content'}>
              <div className={styles.author + ' author'}>{images[displayIndex].author}</div>
              <div className={styles.title + ' title'}>{images[displayIndex].title}</div>
              <div className={styles.topic + ' topic'}>{images[displayIndex].topic}</div>
              <div className={styles.des + ' des'}>{images[displayIndex].description}</div>
              <div className={styles.buttons + ' buttons'}>
              </div>
            </div>
          </div>
        </div>

        {/* Floating animation image wrapper (unchanged) */}
        {animImg && (
          <div
            id="anim-img-wrapper"
            style={animWrapperStyle}
          >
            <img
              src={animImg.src}
              alt="animating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
            />
          </div>
        )}

        {/* Next-5 thumbnail bar */}
        <div className={styles.thumbnail + ' thumbnail'} style={thumbBarStyle}>
            {thumbIndices.map((i, idx) => {
              // Only these 5 thumbnails are visible/interactive
              let isHidden = false
              // Hide the first thumbnail during both 'next' and 'prev' animation if it matches the outgoing fullscreen image
              if (animImg && (animImg.direction === 'next' || animImg.direction === 'prev') && i === thumbIndices[0]) isHidden = true
              return (
                <div
                  className={
                    styles.item +
                    ' item' +
                    (isActiveThumb(i) ? ' active' : '')
                  }
                  key={images[i].src + '-thumb'}
                  onClick={() => handleThumbnailClick(i)}
                  aria-current={isActiveThumb(i) ? 'true' : undefined}
                  tabIndex={!isHidden ? 0 : -1}
                  role="button"
                  style={{
                    cursor: !isHidden ? 'pointer' : 'default',
                    opacity: !isHidden ? 1 : 0.3,
                    pointerEvents: !isHidden ? 'auto' : 'none',
                    transition: 'opacity 0.3s',
                    visibility: isHidden ? 'hidden' : 'visible',
                  }}
                >
                  <img
                    ref={el => {
                      thumbRefs.current[i] = el;
                    }}
                    src={images[i].src}
                    alt={images[i].title + ' thumbnail'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }}
                  />
                </div>
              )
            })}
        </div>

        {/* Arrows (unchanged) */}
        <div className={styles.arrows + ' arrows'}>
          <button onClick={handlePrev} aria-label="Previous" disabled={transitioning}>{'<'}</button>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              ref={threeDButtonRef}
              type="button"
              aria-label="View in 3D"
              className="w-[60px] h-[60px] flex items-center justify-center bg-white text-black border-none focus:outline-none"
              style={{ borderRadius: '12px' }}
              onClick={() => setShow3DDropdown(v => !v)}
            >
              <Cube3DIcon className="w-12 h-12" />
            </button>
            {show3DDropdown && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  bottom: '110%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  zIndex: 1000,
                }}
              >
                {(['HUBB', '1BHK', '2BHK', '3BHK'] as const).map(opt => (
                  <button
                    key={opt}
                    style={{
                      width: optionBtnSize,
                      height: optionBtnSize,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: 'rgba(174, 174, 174, 0.378)',
                      border: 'none',
                      color: '#000',
                      fontWeight: 300,
                      fontSize: optionBtnFontSize,
                      fontFamily: 'monospace',
                      letterSpacing: 2,
                      cursor: 'pointer',
                      filter: 'brightness(8)',
                      transition: 'background 0.3s',
                    }}
                    onClick={() => {
                      window.open(vrLinks[opt], '_blank');
                      setShow3DDropdown(false);
                    }}
                    onMouseDown={e => e.preventDefault()}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(174, 174, 174, 0.378)';
                    }}
                  >{opt}</button>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleNext} aria-label="Next" disabled={transitioning}>{'>'}</button>
        </div>

        {/* Time running (optional, can be animated with CSS if needed) */}
        <div className={styles.time + ' time'}></div>
      </div>
      <SliderFeatureOverlay inView={inView} />
    </div>
  )
}

export default LegacySlider