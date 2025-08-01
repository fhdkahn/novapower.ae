import { useState } from 'react'
import Image from 'next/image'

// Floor plan data structure
const floorPlans = [
  {
    key: '1br',
    label: '1 BR',
    title: '1 Bedroom (Type A)',
    unit: '1 BEDROOM + 1 SUITE + 1 BALCONY',
    suite: '462– 466 SQ.FT.',
    balcony: '47 – 47 SQ.FT.',
    total: '510 – 514 SQ.FT.',
    images: [
      '/images/uploads/FP2.png',
      '/images/uploads/FP3.png',
      '/images/uploads/FP4.png',
      '/images/uploads/FP5.png',
      '/images/uploads/FP6.png',
    ],
  },
  {
    key: '2br',
    label: '2 BR',
    title: '2 Bedroom (Type B)',
    unit: '2 BEDROOM + 2 SUITE + 1 BALCONY',
    suite: '700 – 720 SQ.FT.',
    balcony: '60– 65 SQ.FT.',
    total: '760 – 785 SQ.FT.',
    images: [
      '/images/uploads/FP7.png',
      '/images/uploads/FP8.png',
      '/images/uploads/FP9.png',
    ],
  },
  {
    key: '3br',
    label: '3 BR',
    title: '3 Bedroom (Type C)',
    unit: '3 BEDROOM + 3 SUITE + 2 BALCONY',
    suite: '1000 – 1050 SQ.FT.',
    balcony: '90– 100 SQ.FT.',
    total: '1090 – 1150 SQ.FT.',
    images: [
      '/images/uploads/FP111.png',
      '/images/uploads/FP10.png',
      '/images/uploads/FP12.png',
    ],
  },
]

export default function FloorPlanTabs() {
  const [selected, setSelected] = useState(0)
  // Track current image index for each tab
  const [imageIndexes, setImageIndexes] = useState([0, 0, 0])
  const plan = floorPlans[selected]
  const currentImageIndex = imageIndexes[selected] || 0
  const hasPrev = currentImageIndex > 0
  const hasNext = plan.images && currentImageIndex < plan.images.length - 1

  const handlePrev = () => {
    if (!hasPrev) return
    setImageIndexes(idxArr => idxArr.map((idx, i) => i === selected ? idx - 1 : idx))
  }
  const handleNext = () => {
    if (!hasNext) return
    setImageIndexes(idxArr => idxArr.map((idx, i) => i === selected ? idx + 1 : idx))
  }
  // Reset image index when tab changes
  const handleTabChange = (idx: number) => {
    setSelected(idx)
    setImageIndexes(idxArr => idxArr.map((v, i) => (i === idx ? 0 : v)))
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto flex justify-center">
      {/* Logo - Top Left Corner, more up and left */}
      <div className="absolute -top-14 md:-top-20 left-2 md:-left-14 z-[99999] pointer-events-none">
        <Image
          src="/dlwhitelogo.png"
          alt="Dream Life Residences logo"
          width={150}
          height={150}
          className="object-contain h-10 w-auto md:h-20 drop-shadow-lg"
          priority
        />
      </div>
      <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative p-3 sm:p-6 md:p-8 w-full max-w-6xl">
        {/* Tab Bar */}
        <div className="w-full border-b-2 border-white mb-3 sm:mb-6">
          <nav className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 justify-center sm:justify-start" role="tablist" aria-label="Floor plan tabs">
            {floorPlans.map((tab, idx) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={selected === idx}
                tabIndex={selected === idx ? 0 : -1}
                className={`text-sm sm:text-base md:text-lg font-semibold px-1 sm:px-2 pb-2 border-b-4 transition-colors duration-200 ${
                  selected === idx
                    ? 'border-black text-black'
                    : 'border-transparent text-white hover:text-white/80'
                }`}
                onClick={() => handleTabChange(idx)}
                onKeyDown={e => {
                  if (e.key === 'ArrowRight') handleTabChange((idx + 1) % floorPlans.length)
                  if (e.key === 'ArrowLeft') handleTabChange((idx - 1 + floorPlans.length) % floorPlans.length)
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6 items-center lg:items-start">
          {/* Details */}
          <div className="w-full md:flex-1 min-w-[120px] sm:min-w-[180px] max-w-xs sm:max-w-xs md:max-w-xs text-center sm:text-left mx-auto md:mx-0">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl font-serif text-[#c2a484] mb-1 sm:mb-2 md:mb-3 lg:mb-4 whitespace-nowrap text-center sm:text-left" style={{fontSize: 'clamp(1.1rem, 2.5vw, 2.25rem)'}}>{plan.title}</h2>
            <ul className="mb-2 sm:mb-3 md:mb-4 space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg text-neutral-800 text-center sm:text-left">
              <li><span className="font-bold tracking-wide">UNIT :</span><br/>{plan.unit}</li>
              <li><span className="font-bold tracking-wide">SUITE :</span><br/>{plan.suite}</li>
              <li><span className="font-bold tracking-wide">BALCONY :</span><br/>{plan.balcony}</li>
              <li><span className="font-bold tracking-wide">TOTAL :</span><br/>{plan.total}</li>
            </ul>
          </div>
          
          {/* Image + Arrows */}
          <div className="w-full md:max-w-[1100px] flex flex-col items-center">
            <div className="w-full max-w-[98vw] h-[220px] xs:h-[300px] sm:w-[520px] sm:h-[320px] md:w-[800px] md:h-[420px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl border border-white/20 mx-auto">
              <Image
                src={plan.images[imageIndexes[selected] || 0]}
                alt={plan.title + ' layout ' + ((imageIndexes[selected] || 0) + 1)}
                className="object-cover w-full h-full"
                width={1100}
                height={420}
                priority={selected === 0}
              />
            </div>
            
            {/* Arrow navigation */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                aria-label="Previous layout"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="text-xs sm:text-sm font-medium text-black select-none px-2 bg-white/20 backdrop-blur-sm rounded-lg py-1 border border-white/30">
                {(imageIndexes[selected] || 0) + 1} / {plan.images.length}
              </span>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                aria-label="Next layout"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Download button */}
        <a
          href="/dreamlife-brochure.pdf"
          download="Dream-Life-Brochure.pdf"
          className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-semibold border border-white/30 hover:bg-white/30 transition-colors text-black"
        >
          DOWNLOAD
        </a>
      </div>
    </div>
  )
} 
