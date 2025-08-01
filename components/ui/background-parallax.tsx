"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface BackgroundParallaxProps {
  /**
   * Height of the background container (e.g., '110vh', '100%').
   */
  height?: string;
}

const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({ height = '110vh' }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);

  useEffect(() => {
    const parallaxFactor = -0.15; // Adjust for speed
    const lerpFactor = 0.08;      // Adjust for delay (0.08 = smooth, subtle delay)

    const animate = () => {
      const targetY = window.scrollY * parallaxFactor;
      currentY.current += (targetY - currentY.current) * lerpFactor;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${currentY.current}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
    return () => {};
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute top-0 left-0 w-full z-0 will-change-transform"
      style={{ height }}
    >
      <Image
        src="/heroback.webp"
        alt="Background sky for about section"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  );
};

export default BackgroundParallax; 