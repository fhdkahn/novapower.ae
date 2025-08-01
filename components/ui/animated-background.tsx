import Image from 'next/image'

/**
 * ModernRealEstateBackground (Optimized with Next.js Image)
 * Renders a zooming real estate background with a diagonal wedge overlay.
 * Uses Next.js <Image /> for optimization and CSS keyframes for animation.
 * Includes rising animation when section comes into view.
 */

const image = '/images/uploads/nobg00.png'

interface ModernRealEstateBackgroundProps {
  isInView?: boolean
}

const ModernRealEstateBackground = ({ isInView = false }: ModernRealEstateBackgroundProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[85%] overflow-hidden z-0">
      {/* Optimized Next.js Image for background, animated via wrapper */}
      <div className={`absolute inset-0 w-full h-full ${isInView ? 'rise-animation' : 'initial-state'}`}>
        <div className="absolute inset-0 w-full h-full animated-zoom">
          <Image
            src={image}
            alt="Modern real estate"
            fill
            priority
            quality={80}
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 100vw"
            style={{ zIndex: 0 }}
          />
        </div>
      </div>

      {/* Styles for animation and wedge overlay */}
      <style jsx>{`
        .initial-state {
          transform: translateY(100vh);
          opacity: 0;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .rise-animation {
          transform: translateY(0);
          opacity: 1;
          transition: transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animated-zoom {
          animation: zoomInOut 12s linear infinite;
          will-change: transform;
        }
        
        @keyframes zoomInOut {
          0% {
            transform: scale(1.08);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        
        /* Mobile: more pronounced zoom */
        @media (max-width: 640px) {
          .animated-zoom {
            animation: zoomInOutMobile 12s linear infinite;
          }
          @keyframes zoomInOutMobile {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1.2);
            }
          }
        }
        

      `}</style>
    </div>
  )
}

export default ModernRealEstateBackground