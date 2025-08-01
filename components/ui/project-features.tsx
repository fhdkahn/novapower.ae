import React from 'react'
import {
  BbqAreaIcon,
  CafeLoungeIcon,
  ChildrensPlayIcon,
  FitnessCenterIcon,
  SwimmingPoolIcon,
} from './project-feature-icons'

const features = [
  {
    Icon: SwimmingPoolIcon,
    title: 'SWIMMING POOL',
    subtitle: 'Resort-Inspired',
  },
  {
    Icon: BbqAreaIcon,
    title: 'BBQ AREA',
    subtitle: 'Outdoor Lounge',
  },
  {
    Icon: CafeLoungeIcon,
    title: 'CAFÉ LOUNGE',
    subtitle: 'Lobby Café Corner',
  },
  {
    Icon: FitnessCenterIcon,
    title: 'FITNESS CENTER',
    subtitle: 'Luxury Fitness',
  },
  {
    Icon: ChildrensPlayIcon,
    title: 'CHILDREN’S PLAY',
    subtitle: 'Kids’ Play Zone',
  },
]

const ProjectFeatures = () => (
  <section className="w-full bg-transparent py-2 md:py-2">
    <div className="container mx-auto px-2 sm:px-4">
      <div className="flex flex-col md:flex-row md:items-stretch justify-start w-full">
        {/* Title */}
        <div className="flex flex-col items-center shrink-0 md:items-start md:justify-center md:pr-4 lg:pr-6 pb-4 md:pb-0">
          <img
            src="/DLlogo3.png"
            alt="DREAMLIFE Logo"
            className="h-4 md:h-6 object-contain mb-2"
          />
          <span className="text-sm font-light tracking-widest text-black/70 uppercase">
            RESIDENCES
          </span>
        </div>

        {/* Dividers */}
        <div className="hidden md:block self-stretch w-px bg-neutral-400 md:mx-4" />
        <div className="block md:hidden w-full h-px bg-neutral-300 my-2" />

        {/* Features - DESKTOP (flex with dividers) */}
        <div className="hidden md:flex w-full items-stretch justify-around">
          {features.map(({ Icon, title, subtitle }, index) => (
            <React.Fragment key={title}>
              <div className="flex flex-1 flex-col items-center justify-center p-1 text-center lg:p-2">
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-black mb-1 md:mb-2" />
                <span className="text-[9px] md:text-xs font-medium text-black lg:text-xs">
                  {title}
                </span>
                {subtitle && (
                  <span className="text-[8px] md:text-xs text-black/70 lg:text-xs mt-1">
                    {subtitle}
                  </span>
                )}
              </div>
              {index < features.length - 1 && (
                <div className="w-px h-16 bg-neutral-400 self-center" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Features - MOBILE (grid, no dividers) */}
        <div className="grid grid-cols-3 gap-x-2 gap-y-4 md:hidden w-full pt-2">
          {features.map(({ Icon, title, subtitle }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-black mb-2" />
              <span className="text-[9px] md:text-xs font-medium text-black">
                {title}
              </span>
              {subtitle && (
                <span className="text-[8px] md:text-xs text-black/70 mt-1">
                  {subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default ProjectFeatures 