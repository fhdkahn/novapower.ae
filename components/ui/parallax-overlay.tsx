"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface ParallaxOverlayProps {
  src: string;
  alt: string;
  className?: string;
  /**
   * Offset in pixels from the bottom. Positive values move the overlay up.
   */
  bottomOffset?: number;
}

/**
 * ParallaxOverlay displays an image with a smooth, fast parallax effect on scroll.
 */
const ParallaxOverlay: React.FC<ParallaxOverlayProps> = ({ src, alt, className, bottomOffset = 0 }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    const maxParallax = -80; // Maximum upward movement in px (negative value)

    const animate = () => {
      const scrollY = window.scrollY;
      const parallax = Math.max(scrollY * -0.8, maxParallax);
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${parallax}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-x-0 bottom-0 flex justify-center z-40 pointer-events-none h-[100vh] sm:h-[110vh] transition-transform will-change-transform ${className || ''}`}
      style={{ bottom: bottomOffset }}
    >
      <div className="relative w-[100%] sm:w-[76%] h-full flex items-end">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-bottom opacity-95"
          sizes="(max-width: 640px) 90vw, 76vw"
        />
      </div>
    </div>
  );
};

export default ParallaxOverlay; 