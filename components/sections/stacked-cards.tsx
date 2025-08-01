import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { TimelineEvent } from './timeline-events';

// Import the timelineEvents array from timeline-carousel
import { timelineEvents } from './timeline-events';

/**
 * StackedCards: Glassmorphic stacked card carousel for timeline events
 * - 4 cards visible at a time (active + 3 for depth)
 * - Dot navigation, drag/swipe, keyboard support
 * - Responsive, accessible, glassmorphic
 */
const VISIBLE_CARDS = 4;

function getCardProps(idx: number, activeIndex: number) {
  // Returns stacking order, scale, opacity, offset for each card
  const pos = idx - activeIndex;
  // Only show cards within [-3, 0, 1, 2, 3]
  if (pos < -1 || pos > 2) return { visible: false };
  // CSS variable values for stacking
  const order = VISIBLE_CARDS - Math.abs(pos);
  const scale = pos === 0 ? 1 : pos === -1 ? 0.95 : 0.9 - 0.05 * Math.abs(pos);
  const opacity = pos === 0 ? 1 : pos === -1 ? 0.85 : 0.7 - 0.1 * Math.abs(pos);
  const offset = pos * 48; // px, horizontal offset
  const z = 10 + order;
  return { visible: true, order, scale, opacity, offset, z, pos };
}

export default function StackedCards() {
  const [activeIndex, setActiveIndex] = useState(0); // Start at 1st card (0-based)
  const dragStartX = useRef<number | null>(null);
  const dragActive = useRef(false);

  // Navigation handlers
  const goTo = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(timelineEvents.length - 1, idx)));
  }, []);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  // Drag/swipe handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragActive.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragActive.current || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goNext();
      else goPrev();
      dragActive.current = false;
      dragStartX.current = null;
    }
  };
  const onPointerUp = () => {
    dragActive.current = false;
    dragStartX.current = null;
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  const activeEvent = timelineEvents[activeIndex];

  return (
    <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-4 sm:py-6 px-4 md:px-12 glass-container border border-white/20 mx-auto mt-[-30px] sm:mt-[-60px] relative z-40" aria-label="Technology Stack">
      {/* Left: Dynamic card text */}
      <div className="flex-1 max-w-lg w-full relative md:pr-4">
        {/* Our Legacy heading and pulse dot moved up */}
        <div className="flex items-center gap-2 text-gray-700 mb-4 sm:mb-6 absolute -top-6 sm:-top-10 left-0">
          <div className="w-3 h-3 sm:w-5 sm:h-5 bg-black rounded-full animate-pulse" />
          <span className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter">Our Legacy</span>
        </div>
        <div style={{ height: '2rem' }} />
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tighter mb-4 sm:mb-6 text-black">{activeEvent.label}</h1>
        <div className={`text-lg sm:text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${activeEvent.color} mb-3 sm:mb-4`}>{activeEvent.year}</div>
        {activeEvent.description && (() => {
          const [first, ...rest] = activeEvent.description.split('\n');
          return (
            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 min-h-[3rem]">
              <span className="font-bold">{first.trim()}</span>
              {rest.length > 0 && (
                <>
                  <br />
                  {rest.join('\n').trim()}
                </>
              )}
            </p>
          );
        })()}
        {/* Horizontal timeline with small images and active focus */}
        <div className="flex flex-col items-start self-start w-full">
          {/* Timeline line and ticks */}
          <div className="relative flex flex-col items-start">
            {/* Timeline line */}
            <div className="absolute left-2 right-2 sm:left-0 sm:right-0 top-1/2 h-1 bg-gray-300 rounded-full z-0 flex items-start" style={{ transform: 'translateY(-50%)' }}>
              {/* Arrowhead at the right end, moved further right */}
              <span className="absolute -right-5 top-1/2 -translate-y-1/2 flex items-center pr-1">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 8h20m0 0l-4-4m4 4l-4 4" stroke="#BDBDBD" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            {/* Ticks and images */}
            <div className="relative flex flex-row justify-between items-start z-10" style={{ minHeight: '60px sm:90px' }}>
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex flex-col items-center w-1/12 min-w-[20px] sm:min-w-[28px]">
                  {i % 2 === 0 ? (
                    <>
                      {/* Year above image */}
                      <span className="text-[10px] sm:text-xs text-gray-500 -mt-2 -mb-1 block">{event.year}</span>
                      {/* Image above tick, positioned further up */}
                      <button
                        onClick={() => goTo(i)}
                        aria-label={`Go to card ${i + 1}`}
                        className={`mb-1 mt-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 overflow-hidden flex items-center justify-center
                          ${activeIndex === i ? 'border-blue-500 scale-110 shadow-lg ring-2 ring-blue-300' : 'border-gray-300 opacity-80 hover:opacity-100'}`}
                        style={{ padding: 0 }}
                      >
                        <Image
                          src={event.image}
                          alt={event.label}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full rounded-full"
                          sizes="(max-width: 640px) 24px, (max-width: 768px) 32px, 40px"
                        />
                      </button>
                      {/* Tick */}
                      <div className={`w-1 h-4 bg-gray-300 rounded-full ${activeIndex === i ? 'bg-blue-400' : ''}`} />
                      {/* Spacer to push tick to center */}
                      <div style={{ height: '6px' }} />
                    </>
                  ) : (
                    <>
                      {/* Spacer to push tick to center */}
                      <div style={{ height: '23px' }} />
                      {/* Tick */}
                      <div className={`w-1 h-4 bg-gray-300 rounded-full ${activeIndex === i ? 'bg-blue-400' : ''}`} />
                      {/* Image below tick, positioned further down */}
                      <button
                        onClick={() => goTo(i)}
                        aria-label={`Go to card ${i + 1}`}
                        className={`mt-1 mb-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 overflow-hidden flex items-center justify-center
                          ${activeIndex === i ? 'border-blue-500 scale-110 shadow-lg ring-2 ring-blue-300' : 'border-gray-300 opacity-80 hover:opacity-100'}`}
                        style={{padding: 0 }}
                      >
                        <Image
                          src={event.image}
                          alt={event.label}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full rounded-full"
                          sizes="(max-width: 640px) 24px, (max-width: 768px) 32px, 40px"
                        />
                      </button>
                      {/* Year below image */}
                      <span className="text-[10px] sm:text-xs text-gray-500 -mb-2 -mt-1 block">{event.year}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Count-up Stats Row */}
        <div className="w-full max-w-lg mt-4 mb-4">
          <div className="mb-1 ml-1 text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wide">Total Developed Area</div>
          <div className="flex flex-row gap-3 justify-start">
            <CountUpCard 
              label="Residential Area"
              target={4000000}
              suffix="sqm"
              duration={1.5}
              icon={
                <svg height="30" width="30" viewBox="0 0 512 512" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g>
                    <path style={{ fill: '#aaaaaa' }} d="M238.933,140.8v298.667c7.68-10.24,20.48-17.067,34.133-17.067c11.947,0,23.04,5.12,31.573,13.653 c5.973-3.413,12.8-5.12,19.627-5.12c17.92,0,34.133,11.947,40.107,28.16c8.533-16.213,25.6-28.16,45.227-28.16 c5.973,0,11.947,0.853,17.067,2.56V140.8H238.933z" />
                    <g>
                      <path style={{ fill: '#232323' }} d="M136.533,448c0-28.16,23.04-51.2,51.2-51.2c25.6,0,46.933,18.773,50.347,43.52 c0,0,0-0.853,0.853-0.853V140.8h51.2V4.267h-230.4V499.2h25.6C85.333,471.04,108.373,448,136.533,448" />
                      <path style={{ fill: '#232323' }} d="M281.6,200.533c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533V192C290.133,197.12,286.72,200.533,281.6,200.533 M281.6,251.733c-5.12,0-8.533-3.413-8.533-8.533 v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V243.2C290.133,248.32,286.72,251.733,281.6,251.733 M281.6,302.933c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V294.4 C290.133,299.52,286.72,302.933,281.6,302.933 M281.6,354.133c-5.12,0-8.533-3.413-8.533-8.533v-17.067 c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V345.6C290.133,350.72,286.72,354.133,281.6,354.133 M281.6,405.333c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V396.8 C290.133,401.92,286.72,405.333,281.6,405.333" />
                      <path style={{ fill: '#232323' }} d="M332.8,200.533c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533 s8.533,3.413,8.533,8.533V192C341.333,197.12,337.92,200.533,332.8,200.533 M332.8,251.733c-5.12,0-8.533-3.413-8.533-8.533 v-17.067c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533V243.2C341.333,248.32,337.92,251.733,332.8,251.733 M332.8,302.933c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533V294.4 C341.333,299.52,337.92,302.933,332.8,302.933 M332.8,354.133c-5.12,0-8.533-3.413-8.533-8.533v-17.067 c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533V345.6C341.333,350.72,337.92,354.133,332.8,354.133 M332.8,405.333 c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533V396.8 C341.333,401.92,337.92,405.333,332.8,405.333 M332.8,440.32c-5.12,0-8.533-3.413-8.533-8.533v-0.853 c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v0.853C341.333,436.907,337.92,440.32,332.8,440.32" />
                      <path style={{ fill: '#232323' }} d="M384,200.533c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533V192C392.533,197.12,389.12,200.533,384,200.533 M384,251.733c-5.12,0-8.533-3.413-8.533-8.533 v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V243.2C392.533,248.32,389.12,251.733,384,251.733 M384,302.933c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V294.4 C392.533,299.52,389.12,302.933,384,302.933 M384,354.133c-5.12,0-8.533-3.413-8.533-8.533v-17.067c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533V345.6C392.533,350.72,389.12,354.133,384,354.133 M384,405.333c-5.12,0-8.533-3.413-8.533-8.533 v-17.067c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533V396.8C392.533,401.92,389.12,405.333,384,405.333 M384,446.293c-5.12,0-8.533-3.413-8.533-8.533v-6.827c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v6.827 C392.533,442.88,389.12,446.293,384,446.293" />
                    </g>
                    <g>
                      <path style={{ fill: '#aaaaaa' }} d="M93.867,64c-5.12,0-8.533-3.413-8.533-8.533V38.4c0-5.12,3.413-8.533,8.533-8.533 S102.4,33.28,102.4,38.4v17.067C102.4,60.587,98.987,64,93.867,64 M93.867,115.2c-5.12,0-8.533-3.413-8.533-8.533V89.6 c0-5.12,3.413-8.533,8.533-8.533S102.4,84.48,102.4,89.6v17.067C102.4,111.787,98.987,115.2,93.867,115.2 M93.867,166.4 c-5.12,0-8.533-3.413-8.533-8.533V140.8c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v17.067 C102.4,162.987,98.987,166.4,93.867,166.4 M93.867,217.6c-5.12,0-8.533-3.413-8.533-8.533V192c0-5.12,3.413-8.533,8.533-8.533 S102.4,186.88,102.4,192v17.067C102.4,214.187,98.987,217.6,93.867,217.6 M93.867,268.8c-5.12,0-8.533-3.413-8.533-8.533V243.2 c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v17.067C102.4,265.387,98.987,268.8,93.867,268.8 M93.867,320 c-5.12,0-8.533-3.413-8.533-8.533V294.4c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v17.067 C102.4,316.587,98.987,320,93.867,320 M93.867,371.2c-5.12,0-8.533-3.413-8.533-8.533V345.6c0-5.12,3.413-8.533,8.533-8.533 s8.533,3.413,8.533,8.533v17.067C102.4,367.787,98.987,371.2,93.867,371.2 M93.867,422.4c-5.12,0-8.533-3.413-8.533-8.533V396.8 c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v17.067C102.4,418.987,98.987,422.4,93.867,422.4 M93.867,473.6 c-5.12,0-8.533-3.413-8.533-8.533V448c0-5.12,3.413-8.533,8.533-8.533S102.4,442.88,102.4,448v17.067 C102.4,470.187,98.987,473.6,93.867,473.6" />
                    <path style={{ fill: '#aaaaaa' }} d="M145.067,64c-5.12,0-8.533-3.413-8.533-8.533V38.4c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C153.6,60.587,150.187,64,145.067,64 M145.067,115.2c-5.12,0-8.533-3.413-8.533-8.533V89.6 c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067C153.6,111.787,150.187,115.2,145.067,115.2 M145.067,166.4 c-5.12,0-8.533-3.413-8.533-8.533V140.8c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067 C153.6,162.987,150.187,166.4,145.067,166.4 M145.067,217.6c-5.12,0-8.533-3.413-8.533-8.533V192c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C153.6,214.187,150.187,217.6,145.067,217.6 M145.067,268.8 c-5.12,0-8.533-3.413-8.533-8.533V243.2c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067 C153.6,265.387,150.187,268.8,145.067,268.8 M145.067,320c-5.12,0-8.533-3.413-8.533-8.533V294.4c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C153.6,316.587,150.187,320,145.067,320 M145.067,371.2c-5.12,0-8.533-3.413-8.533-8.533 V345.6c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067C153.6,367.787,150.187,371.2,145.067,371.2 M145.067,422.4c-5.12,0-8.533-3.413-8.533-8.533V396.8c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067 C153.6,418.987,150.187,422.4,145.067,422.4" />
                    <path style={{ fill: '#aaaaaa' }} d="M196.267,64c-5.12,0-8.533-3.413-8.533-8.533V38.4c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C204.8,60.587,201.387,64,196.267,64 M196.267,115.2c-5.12,0-8.533-3.413-8.533-8.533V89.6 c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067C204.8,111.787,201.387,115.2,196.267,115.2 M196.267,166.4 c-5.12,0-8.533-3.413-8.533-8.533V140.8c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067 C204.8,162.987,201.387,166.4,196.267,166.4 M196.267,217.6c-5.12,0-8.533-3.413-8.533-8.533V192c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C204.8,214.187,201.387,217.6,196.267,217.6 M196.267,268.8 c-5.12,0-8.533-3.413-8.533-8.533V243.2c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067 C204.8,265.387,201.387,268.8,196.267,268.8 M196.267,320c-5.12,0-8.533-3.413-8.533-8.533V294.4c0-5.12,3.413-8.533,8.533-8.533 c5.12,0,8.533,3.413,8.533,8.533v17.067C204.8,316.587,201.387,320,196.267,320 M196.267,371.2c-5.12,0-8.533-3.413-8.533-8.533 V345.6c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533v17.067C204.8,367.787,201.387,371.2,196.267,371.2" />
                    <path style={{ fill: '#24AE5F' }} d="M458.24,499.2c1.707-5.12,2.56-11.093,2.56-17.067c0-28.16-23.04-51.2-51.2-51.2 c-19.627,0-36.693,11.093-45.227,28.16c-5.973-16.213-22.187-28.16-40.107-28.16c-23.893,0-42.667,18.773-42.667,42.667 c0,9.387,3.413,18.773,8.533,25.6H358.4H458.24z" />
                    <path style={{ fill: '#42C775' }} d="M247.467,499.2h42.667c-5.12-6.827-8.533-16.213-8.533-25.6c0-16.213,9.387-29.867,23.04-37.547 c-7.68-8.533-18.773-13.653-31.573-13.653c-14.507,0-27.307,6.827-34.987,17.92c-3.413-24.747-24.747-43.52-50.347-43.52 c-28.16,0-51.2,23.04-51.2,51.2c-28.16,0-51.2,23.04-51.2,51.2h102.4H247.467z" />
                    <path style={{ fill: '#aaaaaa' }} d="M503.467,507.733H8.533C3.413,507.733,0,504.32,0,499.2c0-5.12,3.413-8.533,8.533-8.533h494.933 c5.12,0,8.533,3.413,8.533,8.533C512,504.32,508.587,507.733,503.467,507.733" />
                  </g>
                </g>
              </svg>
            }
            gradient="from-blue-100 to-blue-50"
          />
            <CountUpCard 
              label="Office Area"
              target={600000}
              suffix="sqm"
              duration={1.5}
              icon={
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-8 h-8">
                  <path fill="#000000" d="M26 6h20v48H26z" />
                  <path fill="#c0c0c0" d="M16 2h32v4H16z" />
                  <path fill="#000000" d="M4 6h10v46H4z" />
                  <path fill="#aaaaaa" d="M26 52h28v8H26z" />
                  <g fill="#53d5fd">
                    <path d="M30 52h4v8h-4z" />
                    <path d="M38 52h4v8h-4z" />
                    <path d="M46 52h4v8h-4z" />
                    <path d="M46 42h10v4H46z" />
                    <path d="M46 32h10v4H46z" />
                    <path d="M46 22h10v4H46z" />
                    <path d="M46 12h10v4H46z" />
                    <path d="M38 42h4v4h-4z" />
                    <path d="M38 32h4v4h-4z" />
                    <path d="M38 22h4v4h-4z" />
                    <path d="M38 12h4v4h-4z" />
                    <path d="M30 42h4v4h-4z" />
                    <path d="M30 32h4v4h-4z" />
                    <path d="M30 22h4v4h-4z" />
                    <path d="M30 12h4v4h-4z" />
                  </g>
                  <g fill="#000000">
                    <path d="M26 46h32v6H26z" />
                    <path d="M26 36h32v6H26z" />
                    <path d="M26 26h32v6H26z" />
                    <path d="M26 16h32v6H26z" />
                    <path d="M26 6h32v6H26z" />
                  </g>
                  <g fill="#53d5fd">
                    <path d="M14 8h12v44H14z" />
                    <path d="M4 52h22v10H4z" />
                  </g>
                  <path fill="#c0c0c0" d="M2 50h24v2H2z" />
                  <g fill="#7a7a7a">
                    <path d="M14 38h12v2H14z" />
                    <path d="M14 28h12v2H14z" />
                    <path d="M14 18h12v2H14z" />
                    <path d="M14 10h12v2H14z" />
                  </g>
                  <path fill="#7a7a7a" d="M14 6h12v2H14z" />
                  <path fill="#aaaaaa" d="M4 52h2v10H4z" />
                  <g fill="#7a7a7a">
                    <path d="M10 52h1.3v10H10z" />
                    <path d="M10 52h12v1.1H10z" />
                    <path d="M10 60.9h12V62H10z" />
                    <path d="M15.3 52h1.3v10h-1.3z" />
                    <path d="M20.7 52H22v10h-1.3z" />
                  </g>
                  <path fill="#77bb41" d="M26 58h36v2H26z" />
                  <path fill="#c0c0c0" d="M24 60h38v2H24z" />
                  <path d="M61 57.8c.2-.3.3-.7.3-1.2c0-1.3-1-2.3-2.3-2.3h-.1V54c0-.6-.5-1.2-1.2-1.2c-.3 0-.5.1-.7.3c-.1-.8-.9-1.4-1.7-1.4c-1 0-1.7.8-1.7 1.8v.4c-.3-.2-.7-.4-1.1-.4c-.7 0-1.3.4-1.6 1c-.2-.1-.5-.1-.8-.1c-1.3 0-2.3 1-2.3 2.3c0 .5.2 1 .5 1.4c-.3.3-.5.7-.5 1.2c0 1 .8 1.8 1.7 1.8h9.2c.3.3.8.5 1.2.5c1.1 0 2-.9 2-2c.1-.8-.3-1.4-.9-1.8" fill="#77bb41" />
                  <g fill="#e32400">
                    <path d="M51.7 59.6c0 .6.5-.3 1.2-.3c.6 0 1.2.9 1.2.3c0-.6-.5-1.2-1.2-1.2s-1.2.6-1.2 1.2" />
                    <path d="M55.1 57.6c0 .3.3 0 .6 0s.6.3.6 0s-.3-.6-.6-.6s-.6.2-.6.6" />
                    <path d="M59.4 59.7c0 .3.3 0 .6 0s.6.3.6 0s-.3-.6-.6-.6c-.3.1-.6.3-.6.6" />
                  </g>
                  <g fill="#b5f478">
                    <path d="M56.9 56c0 .3.3-.1.6-.1s.6.4.6.1c0-.3-.3-.6-.6-.6s-.6.2-.6.6" />
                    <path d="M58.9 57.7c0 .3.3-.1.6-.1s.6.4.6.1c0-.3-.3-.6-.6-.6c-.4 0-.6.2-.6.6" />
                  </g>
                  <g fill="#e32400">
                    <path d="M49.2 56.6c0 .7.5-.4 1.2-.4s1.2 1 1.2.4s-.5-1.2-1.2-1.2s-1.2.5-1.2 1.2" />
                    <path d="M49.1 59.3c0 .3.3 0 .6 0s.6.3.6 0s-.3-.6-.6-.6c-.3.1-.6.3-.6.6" />
                  </g>
                  <path d="M54.3 54.7c0 .4.3-.2.8-.2c.4 0 .8.7.8.2c0-.4-.3-.8-.8-.8c-.4 0-.8.3-.8.8" fill="#b5f478" />
                  <path d="M56.5 59.9c0 .4.3-.2.8-.2c.4 0 .8.7.8.2c0-.4-.3-.8-.8-.8s-.8.3-.8.8" fill="#e32400" />
                </svg>
              }
              gradient="from-green-100 to-green-50"
            />
            <CountUpCard 
              label="Industrial Parks"
              target={500000}
              suffix="sqm"
              duration={1.5}
              icon={
                <svg height="24" width="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-8 h-8">
                  <g>
                    <path style={{fill:'#D7EBFF'}} d="M445.22,66.791c-12.121,0-23.551,3.306-33.412,9.082c-11.842,6.912-21.414,17.374-27.224,29.884 c-7.056-3.606-14.858-5.576-22.839-5.576c-27.613,0-50.085,22.471-50.085,50.085s22.471,50.085,50.085,50.085h83.553 c36.773-0.033,66.702-29.984,66.702-66.78C512,96.742,482.049,66.791,445.22,66.791z" />
                    <path style={{fill:'#BDDEFF'}} d="M512,133.571c0,36.796-29.928,66.746-66.702,66.78h-33.49V75.873 c9.861-5.776,21.292-9.082,33.412-9.082C482.049,66.791,512,96.742,512,133.571z" />
                    <path style={{fill:'#D7EBFF'}} d="M178.101,0.011c-12.121,0-23.551,3.306-33.412,9.082c-11.842,6.912-21.414,17.374-27.224,29.884 c-7.056-3.606-14.858-5.576-22.839-5.576c-27.613,0-50.085,22.471-50.085,50.085s22.471,50.085,50.085,50.085h83.553 c36.773-0.033,66.702-29.984,66.702-66.78C244.881,29.962,214.93,0.011,178.101,0.011z" />
                    <path style={{fill:'#BDDEFF'}} d="M244.881,66.791c0,36.796-29.928,66.746-66.702,66.78h-33.49V9.093 c9.861-5.776,21.292-9.082,33.412-9.082C214.93,0.011,244.881,29.962,244.881,66.791z" />
                    <path style={{fill:'#B8C9D9'}} d="M473.914,367.3c-0.556-1.781-1.225-3.562-1.783-5.342c-6.564-19.588-12.91-38.398-14.912-61.437 H321.877c-1.891,21.815-7.679,39.734-13.801,58.21c-0.444,1.113-0.778,2.115-1.112,3.228c-0.556,1.781-1.225,3.562-1.783,5.342 c-3.56,10.685-7.122,21.592-9.793,33.39c-2.56,10.351-4.452,21.258-5.342,33.39c-0.445,5.342-0.669,10.907-0.669,16.695v44.52 c0,9.22,7.475,16.695,16.695,16.695h183.644v-61.215C489.718,416.717,482.039,391.34,473.914,367.3z" />
                    <path style={{fill:'#9EACBA'}} d="M472.131,361.957c-6.564-19.588-12.91-38.398-14.912-61.437h-67.671v211.469h100.17v-61.215 c0-34.058-7.679-59.434-15.803-83.475C473.357,365.519,472.689,363.738,472.131,361.957z" />
                    <path style={{fill:'#e0edd4'}} d="M473.914,367.3H305.182c0.556-1.781,1.225-3.562,1.783-5.342c0.333-1.113,0.667-2.115,1.112-3.228 c6.121-18.476,11.91-36.395,13.801-58.21h135.342c2.002,23.039,8.347,41.849,14.912,61.437 C472.689,363.738,473.357,365.519,473.914,367.3z" />
                    <path style={{fill:'#b1dd8c'}} d="M389.548,300.52v66.78h84.366c-0.556-1.781-1.225-3.562-1.783-5.342 c-6.564-19.588-12.91-38.398-14.912-61.437H389.548z" />
                    <path style={{fill:'#576573'}} d="M457.22,300.52H321.877c0.669-5.342,0.892-10.907,0.892-16.695v-33.39 c0-9.238,7.456-16.695,16.695-16.695h100.17c9.239,0,16.695,7.457,16.695,16.695v33.39 C456.328,289.612,456.551,295.177,457.22,300.52z" />
                    <path style={{fill:'#485566'}} d="M439.633,233.74h-50.085v66.78h67.671c-0.669-5.342-0.892-10.907-0.892-16.695v-33.39 C456.328,241.197,448.872,233.74,439.633,233.74z" />
                    <path style={{fill:'#B8C9D9'}} d="M237.068,336.692c-1.448-7.457-2.782-14.914-4.119-22.371c-0.778-4.452-1.557-9.015-2.337-13.801 c-2.671-16.027-5.231-33.612-6.567-51.42c-0.444-5.342-0.778-10.462-1.002-15.359H55.205c-1.113,24.152-4.673,45.633-9.238,66.78 c-2.005,9.906-4.229,19.7-6.567,29.606c-8.459,36.284-17.14,73.903-17.14,120.649v44.52c0,9.238,7.456,16.695,16.695,16.695h166.949 c9.239,0,16.695-7.457,16.695-16.695v-94.605c0-10.24,4.562-19.7,12.466-26.044C245.114,366.881,240.897,357.129,237.068,336.692z" />
                    <path style={{fill:'#9EACBA'}} d="M237.068,336.692c-1.448-7.457-2.782-14.914-4.119-22.371c-0.778-4.452-1.557-9.015-2.337-13.801 c-2.671-16.027-5.231-33.612-6.567-51.42c-0.444-5.342-0.778-10.462-1.002-15.359h-83.919v278.249h66.78 c9.239,0,16.695-7.457,16.695-16.695v-94.605c0-10.24,4.562-19.7,12.466-26.044C245.114,366.881,240.897,357.129,237.068,336.692z" />
                    <path style={{fill:'#e0edd4'}} d="M230.613,300.52H45.967c4.563-21.147,8.125-42.628,9.238-66.78h167.84 c0.223,4.897,0.557,10.017,1.002,15.359C225.382,266.907,227.941,284.493,230.613,300.52z" />
                    <path style={{fill:'#b1dd8c'}} d="M139.124,233.74v66.78h91.488c-2.671-16.027-5.231-33.612-6.567-51.42 c-0.444-5.342-0.778-10.462-1.002-15.359L139.124,233.74L139.124,233.74z" />
                    <path style={{fill:'#576573'}} d="M223.044,233.74H55.205l0.445-16.695v-33.39c0-9.239,7.456-16.695,16.695-16.695h66.78h66.78 c9.239,0,16.695,7.456,16.695,16.695v33.39L223.044,233.74z" />
                    <path style={{fill:'#485566'}} d="M223.044,233.74l-0.445-16.695v-33.39c0-9.239-7.456-16.695-16.695-16.695h-66.78v66.78H223.044z" />
                    <path style={{fill:'#CFDBE6'}} d="M322.769,511.989H189.209v-94.605c0-9.22,7.475-16.695,16.695-16.695h100.17 c9.22,0,16.695,7.475,16.695,16.695V511.989z" />
                    <path style={{fill:'#9EACBA'}} d="M306.074,400.689h-50.085v111.3h66.78v-94.605C322.769,408.164,315.294,400.689,306.074,400.689z" />
                    <path style={{fill:'#576573'}} d="M322.769,434.079H189.209v-33.39c0-20.428,9.152-39.428,25.118-52.128 c11.706-9.429,26.532-14.651,41.662-14.651c17.956,0,34.749,6.978,47.27,19.645c12.531,12.391,19.51,29.178,19.51,47.134V434.079z" />
                    <path style={{fill:'#485566'}} d="M322.769,434.079v-33.39c0-17.956-6.978-34.743-19.51-47.134 c-12.521-12.667-29.314-19.645-47.27-19.645v100.17H322.769z" />
                    <path style={{fill:'#576573'}} d="M495.283,511.989H16.695C7.475,511.989,0,504.514,0,495.294l0,0c0-9.22,7.475-16.695,16.695-16.695 h478.588c9.22,0,16.695,7.475,16.695,16.695l0,0C511.978,504.514,504.503,511.989,495.283,511.989z" />
                    <path style={{fill:'#485566'}} d="M495.283,478.599H255.989v33.39h239.294c9.22,0,16.695-7.475,16.695-16.695 C511.978,486.074,504.503,478.599,495.283,478.599z" />
                  </g>
                </svg>
              }
              gradient="from-yellow-100 to-yellow-50"
            />
          </div>
        </div>
      </div>
      {/* Right: Stacked Cards */}
      <div className="relative w-full flex-1 flex items-center justify-center select-none md:pl-4" tabIndex={0} onKeyDown={onKeyDown}>
        <div className="relative w-full max-w-2xl h-[20rem] sm:h-[25rem] md:h-[30rem] flex items-center mx-auto" style={{ perspective: 1200 }}>
          {timelineEvents.map((event, idx) => {
            const props = getCardProps(idx, activeIndex);
            if (!props.visible) return null;
            const { order, scale, opacity, offset, z, pos } = props;
            if (typeof pos !== 'number') return null;
            return (
              <article
                key={event.year}
                className={`absolute top-0 left-0 w-full max-w-4xl h-[20rem] sm:h-[25rem] md:h-[30rem] glass rounded-2xl shadow-2xl transition-all duration-500 ease-in-out flex flex-col cursor-grab ${pos === 0 ? 'z-30' : ''}`}
                style={{
                  transform: `translateX(${offset}px) scale(${scale}) rotateX(10deg) rotateY(${pos * -20}deg)`,
                  opacity,
                  zIndex: z,
                  order,
                }}
                tabIndex={pos === 0 ? 0 : -1}
                aria-selected={pos === 0}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onClick={() => goTo(idx)}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex-1">
                  <Image
                    src={event.image}
                    alt={event.label}
                    fill
                    className="object-cover w-full h-full rounded-2xl"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1400px) 100vw, 1024px"
                    style={{
                      objectFit: activeIndex === 1 ? 'fill' : 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
        {/* Prev/Next buttons */}
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-gray-800/80 text-white shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-40 z-40"
          aria-label="Previous card"
        >
          &larr;
        </button>
        <button
          onClick={goNext}
          disabled={activeIndex === timelineEvents.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-gray-800/80 text-white shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-40 z-40"
          aria-label="Next card"
        >
          &rarr;
        </button>
      </div>
      {/* Glassmorphism style */}
      <style jsx>{`
        .glass {
          background: #fff;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .glass-container {
          background: #fff;
          border-radius: 1.5rem;
        }
      `}</style>
    </section>
  );
}

interface CountUpCardProps {
  label: string;
  target: number;
  suffix?: string;
  duration?: number;
  icon: React.ReactNode;
  gradient: string;
}

function CountUpCard({ label, target, suffix, duration, icon, gradient }: CountUpCardProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = target;
    const increment = Math.ceil(end / (60 * (duration || 1.5)));
    let current = start;
    let frame: number;
    const step = () => {
      current += increment;
      if (current >= end) {
        setCount(end);
      } else {
        setCount(current);
        frame = requestAnimationFrame(step);
      }
    };
    setCount(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);
  // Format with commas
  const formatted = count.toLocaleString();
  return (
    <div
      className={
        `flex flex-col items-center justify-center bg-white rounded-2xl px-2 sm:px-3 py-2 min-w-[80px] sm:min-w-[100px] max-w-[110px] sm:max-w-[130px] border border-gray-100 shadow-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 cursor-pointer group relative overflow-hidden`
      }
      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
    >
      <div className={`absolute inset-0 z-0 pointer-events-none bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-80 transition-opacity`} />
      <div className="relative z-10 flex flex-col items-center">
      <span className="mb-1">{icon}</span>
        <span className="text-[8px] sm:text-[10px] font-semibold text-gray-700 text-center mb-0.5 leading-tight whitespace-pre-line">
          {label}
        </span>

        <span className="text-sm sm:text-base font-medium text-black tabular-nums drop-shadow-sm">
          {formatted}{suffix && <span className="text-sm sm:text-base font-medium ml-1">{suffix}</span>}
        </span>
      </div>
    </div>
  );
} 