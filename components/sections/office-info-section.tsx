import React from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight, MapPinned } from 'lucide-react'
import dynamic from 'next/dynamic'

const GlobeMap = dynamic(() => import('../ui/globe-map'), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><span className="text-gray-400">Loading globe...</span></div> })

/**
 * OfficeInfoSection displays office location, contact info, and timings in a modern, glassy card.
 */
const officeInfo = {
  address: 'Al naboodha Building E office 503,504 - Port Saeed Dubai UAE.',
  phone: '+971 4 327 5988',
  email: 'sales@novapower.ae',
  timings: [
    { days: 'Mon - Fri', hours: '9:00 AM - 6:00 PM' },
    { days: 'Sat', hours: '9:00 AM - 2:00 PM' },
    { days: 'Sun', hours: 'Closed' },
  ],
  directionsUrl: 'https://maps.app.goo.gl/v2dVHeesnBAZu6vp7',
}

export default function OfficeInfoSection() {
  return (
    <section
      className="relative min-w-full sm:min-w-[120vh] w-full flex justify-center items-center py-0 px-2 sm:px-4 -mt-[20px] sm:-mt-[37px] overflow-hidden min-h-[320px] sm:min-h-[480px]"
      style={{
        backgroundImage: 'url(/office-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Office Information Section"
    >
      {/* Top gradient overlay for fade-to-white effect */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" style={{ background: 'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.0) 40%)' }} />
      {/* Card Container - seamless fade, no border, no glass, no gradient */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        {/* Left: Info */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center gap-4 sm:gap-6 md:gap-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-lg">
            Visit Our Office
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <InfoItem
              icon={<MapPin className="animate-bounce-slow text-black w-6 h-6 sm:w-7 sm:h-7" />}
              label="Address"
              value={officeInfo.address}
            />
            <InfoItem
              icon={<Phone className="animate-pulse text-black w-6 h-6 sm:w-7 sm:h-7" />}
              label="Phone"
              value={officeInfo.phone}
            />
            <InfoItem
              icon={<Mail className="animate-fade-in text-black w-6 h-6 sm:w-7 sm:h-7" />}
              label="Email"
              value={officeInfo.email}
            />
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="p-1.5 sm:p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow text-black">
                <Clock className="text-black animate-spin-slow w-6 h-6 sm:w-7 sm:h-7" />
              </span>
              <div>
                <div className="text-base sm:text-lg font-semibold text-gray-800">Office Hours</div>
                <div className="text-gray-600 text-xs sm:text-sm">
                  {officeInfo.timings.map((t, i) => (
                    <div key={i} className="flex gap-1 sm:gap-2">
                      <span className="font-medium w-16 sm:w-20 text-xs sm:text-sm">{t.days}:</span>
                      <span className="text-xs sm:text-sm">{t.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a
            href={officeInfo.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center gap-2 px-3 sm:px-4 py-2 min-w-fit max-w-[160px] rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-gray-900 font-semibold hover:bg-white/30 transition-all duration-200 text-sm sm:text-lg group justify-center"
          >
            <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            Get Directions
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>
        {/* Right: Animated Globe */}
        <div className="flex-1 min-h-[320px] sm:min-h-[320px] md:min-h-[320px] lg:min-h-[480px] flex items-center justify-center relative">
          <GlobeMap />
        </div>
      </div>
      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 2s ease-in; }
        .animate-pulse { animation: pulse 2s infinite; }
      `}</style>
    </section>
  )
}

/**
 * InfoItem displays a label, value, and icon in a premium style.
 */
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <span className="p-1.5 sm:p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow text-black">
        {icon}
      </span>
      <div>
        <div className="text-base sm:text-lg font-semibold text-gray-800">{label}</div>
        <div className="text-gray-600 text-xs sm:text-sm">{value}</div>
      </div>
    </div>
  )
} 