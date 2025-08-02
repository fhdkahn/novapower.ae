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
    { href: '/new-launch', label: 'New Launch' }
  ]

  const companyInfo = [
    { label: 'Address', value: 'AL Shoala Building - AL Naboodha DUBAI' },
    { label: 'Phone', value: '+971 (04) 327 5988' },
    { label: 'Email', value: 'Sales@novapower.ae' }
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'WeChat', href: '#', icon: 'wechat' }
  ]

  return (
    <footer className={`relative overflow-hidden ${
      variant === 'transparent' 
        ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
        : 'bg-gradient-to-b from-white via-orange-50/50 to-pink-100/70 dark:from-gray-950 dark:via-gray-900/95 dark:to-gray-800/90'
    }`}>
      {/* Animated Light Streaks */}
      <div className="absolute inset-0 pointer-events-none">
        {lightStreaks.map((streak) => (
          <div
            key={streak.id}
            className={`absolute w-px bg-gradient-to-t from-transparent to-transparent animate-light-streak ${
              variant === 'transparent' 
                ? 'via-white/40' 
                : 'via-orange-300/60 dark:via-white/40'
            }`}
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
            <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
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
                  {social.icon === 'instagram' ? (
                    <svg viewBox="0 0 2500 2500" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor">
                      <defs>
                        <radialGradient id="instagram-gradient" cx="332.14" cy="2511.81" r="3263.54" gradientUnits="userSpaceOnUse">
                          <stop offset=".09" stopColor="#fa8f21"></stop>
                          <stop offset=".78" stopColor="#d82d7e"></stop>
                        </radialGradient>
                        <radialGradient id="instagram-gradient2" cx="1516.14" cy="2623.81" r="2572.12" gradientUnits="userSpaceOnUse">
                          <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0"></stop>
                          <stop offset="1" stopColor="#8c3aaa"></stop>
                        </radialGradient>
                      </defs>
                      <path d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57" fill="url(#instagram-gradient)"></path>
                      <path d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57" fill="url(#instagram-gradient2)"></path>
                    </svg>
                  ) : social.icon === 'wechat' ? (
                    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path fill="#2DC100" d="M300 255c0 24.854-20.147 45-45 45H45c-24.854 0-45-20.146-45-45V45C0 20.147 20.147 0 45 0h210c24.853 0 45 20.147 45 45v210z"></path>
                      <g fill="#FFF">
                        <path d="M200.803 111.88c-24.213 1.265-45.268 8.605-62.362 25.188-17.271 16.754-25.155 37.284-23 62.734-9.464-1.172-18.084-2.462-26.753-3.192-2.994-.252-6.547.106-9.083 1.537-8.418 4.75-16.488 10.113-26.053 16.092 1.755-7.938 2.891-14.889 4.902-21.575 1.479-4.914.794-7.649-3.733-10.849-29.066-20.521-41.318-51.232-32.149-82.85 8.483-29.25 29.315-46.989 57.621-56.236 38.635-12.62 82.054.253 105.547 30.927 8.485 11.08 13.688 23.516 15.063 38.224zm-111.437-9.852c.223-5.783-4.788-10.993-10.74-11.167-6.094-.179-11.106 4.478-11.284 10.483-.18 6.086 4.475 10.963 10.613 11.119 6.085.154 11.186-4.509 11.411-10.435zm58.141-11.171c-5.974.11-11.022 5.198-10.916 11.004.109 6.018 5.061 10.726 11.204 10.652 6.159-.074 10.83-4.832 10.772-10.977-.051-6.032-4.981-10.79-11.06-10.679z"></path>
                        <path d="M255.201 262.83c-7.667-3.414-14.7-8.536-22.188-9.318-7.459-.779-15.3 3.524-23.104 4.322-23.771 2.432-45.067-4.193-62.627-20.432-33.397-30.89-28.625-78.254 10.014-103.568 34.341-22.498 84.704-14.998 108.916 16.219 21.129 27.24 18.646 63.4-7.148 86.284-7.464 6.623-10.15 12.073-5.361 20.804.884 1.612.985 3.653 1.498 5.689zm-87.274-84.499c4.881.005 8.9-3.815 9.085-8.636.195-5.104-3.91-9.385-9.021-9.406-5.06-.023-9.299 4.318-9.123 9.346.166 4.804 4.213 8.69 9.059 8.696zm56.261-18.022c-4.736-.033-8.76 3.844-8.953 8.629-.205 5.117 3.772 9.319 8.836 9.332 4.898.016 8.768-3.688 8.946-8.562.19-5.129-3.789-9.364-8.829-9.399z"></path>
                      </g>
                    </svg>
                  ) : social.icon === 'linkedin' ? (
                    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <g fill="none">
                        <path d="M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z" fill="#069"></path>
                        <path d="M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z" fill="#ffffff"></path>
                      </g>
                    </svg>
                  ) : (
                    <span className="text-sm">{social.icon}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links and Contact Info - Two columns on small screens */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-6 lg:gap-8">
            {/* Navigation Links */}
            <div>
              <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
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
                    className={`block transition-colors duration-200 text-xs sm:text-sm font-medium ${
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
            <div>
              <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
                variant === 'transparent' 
                  ? 'text-white drop-shadow-lg' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                Contact Info
              </h3>
              <div className="space-y-4">
                {companyInfo.map((info) => (
                  <div key={info.label} className="text-xs sm:text-sm">
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
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
              variant === 'transparent' 
                ? 'text-white drop-shadow-lg' 
                : 'text-gray-900 dark:text-white'
            }`}>
              Stay Updated
            </h3>
            <p className={`text-xs sm:text-sm mb-4 ${
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
                className={`w-full px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-200 text-xs sm:text-sm ${
                  variant === 'transparent' 
                    ? 'bg-white/10 border-white/30 focus:border-white/60 focus:ring-2 focus:ring-white/20 text-black placeholder-gray-300' 
                    : 'bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
                }`}
              />
              <button className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-xs sm:text-sm ${
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
            <p className={`text-xs sm:text-sm ${
              variant === 'transparent' 
                ? 'text-white/70 drop-shadow-md' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              © {new Date().getFullYear()} NovaPower Real Estate. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs sm:text-sm">
              <span className={`${
                variant === 'transparent' 
                  ? 'text-white/70 drop-shadow-md' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                Privacy Policy
              </span>
              <span className={`${
                variant === 'transparent' 
                  ? 'text-white/70 drop-shadow-md' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                Terms of Service
              </span>
              <span className={`${
                variant === 'transparent' 
                  ? 'text-white/70 drop-shadow-md' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                Cookie Policy
              </span>
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
