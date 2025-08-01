'use client';
import Image from 'next/image'
import React from 'react'
import Lenis from '@studio-freight/lenis'
import ParallaxOverlay from '@/components/ui/parallax-overlay'
import BackgroundParallax from '@/components/ui/background-parallax'
import dynamic from 'next/dynamic'
import OfficeInfoSection from '@/components/sections/office-info-section'
import Link from 'next/link'

const StackedCards = dynamic(() => import('@/components/sections/stacked-cards'), { ssr: false })

export default function AboutPage() {
  React.useEffect(() => {
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
    return () => {
      lenis.destroy()
    }
  }, [])
  return (
    <>
      <section className="relative flex items-center justify-center min-h-[100vh] sm:min-h-[120vh] min-w-full sm:min-w-[120vh] w-full overflow-hidden">
       
        {/* Background Image (Delayed Parallax) */}
        <BackgroundParallax height="110vh" />
        {/* Overlay Image (Parallax) */}
        <ParallaxOverlay src="/abouthero.webp" alt="Modern building illustration" bottomOffset={-50} className="sm:bottom-[-100px]" />
        {/* Fade to white at the bottom of both images */}
        <div
          className="pointer-events-none absolute left-0 bottom-0 w-full h-[30vh] sm:h-[42vh] z-40"
          style={{ background: 'linear-gradient(to bottom, transparent, white 50%)' }}
        />
        {/* Content (Hero Text) */}
        <div className="absolute top-24 sm:top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center w-full px-4">
          <h1 className="montserrat text-xl sm:text-3xl md:text-3xl font-medium mb-0 text-white drop-shadow-lg tracking-tighter text-center">Building Tomorrow, Backed by Legacy</h1>
          <p className="montserrat text-xs sm:text-base md:text-lg text-white/90 dark:text-gray-200 max-w-6xl tracking-tighter text-center mt-1 mb-4 font-medium px-2 sm:px-0">
            <span className="block sm:whitespace-nowrap"><span className="font-bold">Nova Power Real Estate</span> is a premier Dubai-based developer.</span>
            <span className="block sm:whitespace-nowrap">Powered by the global strength of <span className="font-bold">ShenZhouTong Group</span>, a top 500 Chinese enterprise.</span>
            <span className="block sm:whitespace-nowrap">Established in 1996 and headquartered in Shenzhen.</span>
            <span className="block sm:whitespace-nowrap"><span className="font-bold">ShenZhouTong</span> drives innovation and sustainable growth across industries.</span>
            <span className="block sm:whitespace-nowrap">21 subsidiaries, including 3 publicly listed companies and 1 pre-IPO firm.</span>
            <span className="block sm:whitespace-nowrap">With a legacy of leadership and innovation <span className="font-bold">Nova Power</span> shapes Dubai's future with purpose-driven real estate.</span>
          </p>
        </div>
      </section>
      {/* Timeline: stacked glass card carousel */}
      <section className="w-full min-w-full sm:min-w-[120vh] bg-white py-6 sm:py-12 relative z-40">
        <StackedCards />
      </section>
      {/* Big Text Block Below the Picture */}
      <section className="min-w-full sm:min-w-[120vh] w-full bg-white py-4 relative z-40">
        <div className="w-full px-4 flex flex-col items-center">
          <div className="text-gray-900 font-semibold montserrat tracking-tighter text-2xl sm:text-3xl md:text-5xl lg:text-7xl leading-[1.05] text-center">
            <div>Where your vision</div>
            <div className="flex flex-row items-center justify-center flex-wrap gap-1 sm:gap-2 mt-1">
              <span>finds its</span>
              <span className="inline-block align-middle">
                <Image
                  src="/home.webp"
                  alt="Modern luxury home exterior"
                  width={140}
                  height={60}
                  className="object-cover w-[60px] h-[25px] sm:w-[90px] sm:h-[40px] md:w-[140px] md:h-[60px]"
                  style={{ objectPosition: 'center' }}
                  priority={false}
                  sizes="(max-width: 640px) 60px, (max-width: 768px) 90px, 140px"
                />
              </span>
              <span>home.</span>
            </div>
          </div>
        </div>
      </section>
      {/* Responsive image below the big text block */}
      <div className="w-full min-w-full sm:min-w-[100vh] flex justify-center bg-white relative">
        <div className="w-full max-w-5xl px-2 sm:px-4 relative">
          <Image
            src="/aboutimage3.webp"
            alt="Modern luxury home exterior"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            priority={false}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 80vw"
          />
          {/* Gradient overlay for fade effect (sides and bottom only) */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, white 0%, transparent 10%, transparent 90%, white 100%),' +
                'linear-gradient(to bottom, transparent 20%, white 60%)',
            }}
          />
        </div>
      </div>
      {/* Office Info Section */}
      <OfficeInfoSection />
      {/* Custom Image Section with Background */}
      <section
        className="min-w-full sm:min-w-[120vh] w-full relative min-h-[190px] sm:min-h-[450px]"
        style={{
          backgroundImage: 'url(https://framerusercontent.com/images/u1hEqFmJEUFPRIoLCS06cD6UE.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top white gradient for fade-in to above section */}
        {/* Top overlay gradient: fade upward and downward, taller and shifted up */}
        <div
          className="pointer-events-none absolute left-0 w-full h-12 sm:h-20 z-20 top-[-15px] sm:top-[-50px]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #93C7E3 60%, transparent 100%)',
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <div className="relative w-[70%] sm:w-[70%] h-[70%] sm:h-[70%] flex justify-center items-end">
            <Image
              src="https://framerusercontent.com/images/A9iTwwkXCiQfTEkxv8WnDHfccqk.png"
              alt="NovaPower Real Estate Illustration"
              width={1920}
              height={800}
              className="w-full h-full object-cover"
              priority={false}
              sizes="(max-width: 640px) 85vw, 70vw"
            />
            {/* Side gradient overlay for fade effect (bottom half only) */}
            <div
              className="pointer-events-none absolute left-0 right-0 bottom-0 z-10"
              style={{
                top: '60%',
                background:
                  'linear-gradient(to right, rgb(168, 202, 220) 0%, transparent 10%, transparent 90%, rgb(196, 232, 245) 100%)',
              }}
            />
          </div>
        </div>
        {/* Footer Overlay */}
        <footer className="absolute bottom-0 left-0 w-full py-4 sm:py-6 px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 border-t border-white/20 select-none z-30">
          {/* Left: Policy Links */}
          <div className="flex flex-col md:flex-row items-center gap-1 sm:gap-2 md:gap-6 text-sm sm:text-lg text-white font-medium">
            <Link href="/privacy" className="hover:underline transition-opacity opacity-80 hover:opacity-100 text-center">Privacy Policy</Link>
            <span className="hidden md:inline-block">|</span>
            <Link href="/terms" className="hover:underline transition-opacity opacity-80 hover:opacity-100 text-center">Terms of Service</Link>
            <span className="hidden md:inline-block">|</span>
            <Link href="/cookies" className="hover:underline transition-opacity opacity-80 hover:opacity-100 text-center">Cookie Policy</Link>
          </div>
          {/* Center: Logo and Nova Image */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            <span className="w-10 h-10 sm:w-16 sm:h-16 md:w-18 md:h-18 relative flex items-center justify-center">
              <Image
                src="/logo.webp"
                alt="NovaPower Logo"
                width={70}
                height={70}
                className="object-contain w-full h-full"
                style={{ transform: 'translateX(9px) translateY(-5px)' }}
                priority={false}
              />
            </span>
            <span className="relative h-7 w-20 sm:h-9 sm:w-26 md:h-8 md:w-32 flex items-center">
              <Image
                src="/nova.png"
                alt="Nova"
                width={128}
                height={32}
                className="object-contain w-full h-full dark:invert dark:brightness-125 dark:contrast-125 dark:mix-blend-screen"
                style={{ transform: 'translateX(-8px)' }}
                priority={false}
              />
            </span>
          </div>
          {/* Right: Copyright */}
          <div className="text-sm sm:text-lg text-white font-medium text-center md:text-right opacity-80">
            © 2025 NovaPower Real Estate. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  )
} 