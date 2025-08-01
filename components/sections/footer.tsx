'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface LightStreak {
  id: number
  left: string
  animationDelay: string
  animationDuration: string
  opacity: number
}

interface FooterProps {
  variant?: 'default' | 'transparent'
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const [lightStreaks, setLightStreaks] = useState<LightStreak[]>([])

  useEffect(() => {
    // Generate random light streaks
    const generateStreaks = () => {
      const streaks: LightStreak[] = []
      for (let i = 0; i < 20; i++) {
        streaks.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
          opacity: 0.2 + Math.random() * 0.3
        })
      }
      setLightStreaks(streaks)
    }

    generateStreaks()
    const interval = setInterval(generateStreaks, 8000)
    return () => clearInterval(interval)
  }, [])

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/expertise', label: 'Expertise' },
    { href: '/about', label: 'About' },
    { href: '/new-launch', label: 'New Launch' },
    { href: '/contact', label: 'Contact' }
  ]

  const companyInfo = [
    { label: 'Address', value: '123 Business District, City, State 12345' },
    { label: 'Phone', value: '(555) 123-4567' },
    { label: 'Email', value: 'info@novapower.com' }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Instagram', href: '#', icon: '📷' }
  ]

  return (
    <footer className={`relative overflow-hidden ${
      variant === 'transparent' 
        ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
        : 'bg-gradient-to-b from-white via-orange-50/50 to-pink-100/70 dark:from-gray-950 dark:via-gray-900/95 dark:to-gray-800/90'
    }`}>
      {/* Animated Light Streaks - Only for default variant */}
      {variant === 'default' && (
        <div className="absolute inset-0 pointer-events-none">
          {lightStreaks.map((streak) => (
            <div
              key={streak.id}
              className="absolute w-px bg-gradient-to-t from-transparent via-orange-300/60 to-transparent dark:via-white/40 animate-light-streak"
              style={{
                left: streak.left,
                height: '100%',
                animationDelay: streak.animationDelay,
                animationDuration: streak.animationDuration,
                opacity: streak.opacity
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient Glow Effect - Only for default variant */}
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-to-t from-orange-200/35 via-orange-100/10 to-transparent dark:from-gray-700/40 dark:via-gray-800/20" />
      )}
      
      {/* Additional Radial Glow - Only for default variant */}
      {variant === 'default' && (
        <div className="absolute inset-0 bg-gradient-radial from-orange-300/20 via-orange-200/10 to-transparent dark:from-white/5 dark:via-gray-600/10" />
      )}
      
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo - Same as navbar */}
              <div className="w-18 h-18 relative flex items-center justify-center">
                <Image
                  src="/logo.webp"
                  alt="NovaPower Logo"
                  width={58}
                  height={58}
                  className="object-contain w-full h-full dark:invert dark:brightness-125 dark:contrast-125 dark:mix-blend-screen"
                  style={{
                    transform: 'translateX(4px) translateY(-5px)'
                  }}
                  priority
                  onError={(e) => console.error('Logo failed to load:', e)}
                  onLoad={() => console.log('Logo loaded successfully')}
                />
              </div>
              <div className="relative h-8 w-32 flex items-center">
                <Image
                  src="/nova.png"
                  alt="Nova"
                  width={128}
                  height={32}
                  className="object-contain w-full h-full dark:invert dark:brightness-125 dark:contrast-125 dark:mix-blend-screen"
                  style={{
                    transform: 'translateX(-8px)'
                  }}
                  priority
                  onError={(e) => console.error('Nova logo failed to load:', e)}
                  onLoad={() => console.log('Nova logo loaded successfully')}
                />
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${
              variant === 'transparent' 
                ? 'text-white/90 drop-shadow-lg' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Transforming the real estate landscape with innovative solutions and exceptional service.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-400 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className={`text-lg font-semibold mb-4 ${
              variant === 'transparent' 
                ? 'text-white drop-shadow-lg' 
                : 'text-gray-900 dark:text-white'
            }`}>
              Quick Links
            </h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block transition-colors duration-200 text-sm font-medium ${
                    variant === 'transparent' 
                      ? 'text-white/80 hover:text-white drop-shadow-md' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company Information */}
          <div className="lg:col-span-1">
            <h3 className={`text-lg font-semibold mb-4 ${
              variant === 'transparent' 
                ? 'text-white drop-shadow-lg' 
                : 'text-gray-900 dark:text-white'
            }`}>
              Contact Info
            </h3>
            <div className="space-y-4">
              {companyInfo.map((info) => (
                <div key={info.label} className="text-sm">
                  <span className={`block font-medium mb-1 ${
                    variant === 'transparent' 
                      ? 'text-white/70 drop-shadow-md' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {info.label}
                  </span>
                  <span className={`${
                    variant === 'transparent' 
                      ? 'text-white/90 drop-shadow-md' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className={`text-lg font-semibold mb-4 ${
              variant === 'transparent' 
                ? 'text-white drop-shadow-lg' 
                : 'text-gray-900 dark:text-white'
            }`}>
              Stay Updated
            </h3>
            <p className={`text-sm mb-4 ${
              variant === 'transparent' 
                ? 'text-white/80 drop-shadow-md' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-200 text-sm ${
                  variant === 'transparent' 
                    ? 'bg-white/10 border-white/30 focus:border-white/60 focus:ring-2 focus:ring-white/20 text-black placeholder-gray-300' 
                    : 'bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                }`}
              />
              <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm ${
                variant === 'transparent' 
                  ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50' 
                  : 'bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600'
              }`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-6 border-t ${
          variant === 'transparent' 
            ? 'border-white/20' 
            : 'border-white/20 dark:border-gray-700/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${
              variant === 'transparent' 
                ? 'text-white/70 drop-shadow-md' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              © {new Date().getFullYear()} NovaPower Real Estate. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className={`transition-colors duration-200 ${
                  variant === 'transparent' 
                    ? 'text-white/70 hover:text-white drop-shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`transition-colors duration-200 ${
                  variant === 'transparent' 
                    ? 'text-white/70 hover:text-white drop-shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className={`transition-colors duration-200 ${
                  variant === 'transparent' 
                    ? 'text-white/70 hover:text-white drop-shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400'
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 opacity-50 dark:from-white/30 dark:via-gray-300/40 dark:to-white/30 dark:opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-orange-300/30 via-orange-200/15 to-transparent dark:from-white/10 dark:via-gray-600/15" />
    </footer>
  )
}

const FooterWrapper: React.FC = () => {
  const pathname = usePathname();
  if (pathname === '/about' || pathname === '/new-launch') return null;
  return <Footer />;
};

export { Footer, FooterWrapper }; 