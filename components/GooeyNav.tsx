"use client";

import { useRef, useEffect, useState } from "react";
import "./GooeyNav.css";
import Link from 'next/link'

interface NavItem {
  label: string;
  href: string;
}

interface GooeyNavProps {
  items: NavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

interface Particle {
  start: [number, number];
  end: [number, number];
  time: number;
  scale: number;
  color: number;
  rotate: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 500,
  particleDistances = [110, 30],
  particleR = 100,
  timeVariance = 1300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isInitialized, setIsInitialized] = useState(false);

  const noise = (n = 1): number => n / 2 - Math.random() * n;

  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number
  ): Particle => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLLIElement, forceRecalc = false) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    
    // Force layout recalculation if needed
    if (forceRecalc) {
      void containerRef.current.offsetHeight;
      void element.offsetHeight;
    }
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${Math.round(pos.x - containerRect.x)}px`,
      top: `${Math.round(pos.y - containerRect.y)}px`,
      width: `${Math.round(pos.width)}px`,
      height: `${Math.round(pos.height)}px`,
    };
    
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  // Helper to activate nav item and trigger effects
  const handleNavActivate = (index: number, liEl: HTMLLIElement | null) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      if (liEl) updateEffectPosition(liEl);
      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((p) => filterRef.current!.removeChild(p));
      }
      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
      }
      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLLIElement;
      handleNavActivate(index, liEl);
    }
  };

  const initializePosition = () => {
    if (!navRef.current || !containerRef.current || !filterRef.current || !textRef.current) return;
    
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as HTMLLIElement;
    
    if (activeLi) {
      // Ensure effects are completely hidden during initialization
      if (filterRef.current) {
        filterRef.current.style.visibility = 'hidden';
        filterRef.current.style.opacity = '0';
      }
      if (textRef.current) {
        textRef.current.style.visibility = 'hidden';
        textRef.current.style.opacity = '0';
        textRef.current.innerText = ''; // Clear any existing text
      }
      
      // Multiple attempts to ensure perfect positioning
      let attempts = 0;
      const maxAttempts = 5;
      
      const checkAndPosition = () => {
        attempts++;
        
        // Force layout recalculation
        void containerRef.current!.offsetHeight;
        void activeLi.offsetHeight;
        
        const rect = activeLi.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        
        // Only proceed if the element has stable dimensions
        if (rect.width > 0 && rect.height > 0 && containerRect.width > 0) {
          updateEffectPosition(activeLi, true);
          
          // Double-check positioning after a short delay
          setTimeout(() => {
            updateEffectPosition(activeLi, true);
            
            if (textRef.current && filterRef.current) {
              // Show effects only after positioning is complete
              filterRef.current.style.visibility = 'visible';
              textRef.current.style.visibility = 'visible';
              filterRef.current.style.opacity = '1';
              textRef.current.style.opacity = '1';
              textRef.current.classList.add("active");
              filterRef.current.classList.add("active");
              setIsInitialized(true);
            }
          }, 100);
        } else if (attempts < maxAttempts) {
          // If layout isn't ready, try again
          setTimeout(checkAndPosition, 75);
        }
      };
      
      checkAndPosition();
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current || !filterRef.current || !textRef.current) return;
    
    // Wait for navbar animation to complete (800ms from navbar animation duration)
    const timer = setTimeout(() => {
      // Additional delay to ensure everything is settled
      setTimeout(() => {
        initializePosition();
      }, 100);
    }, 800);

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLLIElement;
      if (currentActiveLi && isInitialized) {
        updateEffectPosition(currentActiveLi, true);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [activeIndex, isInitialized]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
            >
              <Link
                href={item.href}
                onClick={(e) => {
                  const liEl = e.currentTarget.parentElement as HTMLLIElement;
                  handleNavActivate(index, liEl);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="cursor-pointer"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <span 
        className="effect filter" 
        ref={filterRef} 
        style={{ 
          opacity: isInitialized ? 1 : 0,
          visibility: isInitialized ? 'visible' : 'hidden'
        }}
      />
      <span 
        className="effect text" 
        ref={textRef} 
        style={{ 
          opacity: isInitialized ? 1 : 0,
          visibility: isInitialized ? 'visible' : 'hidden'
        }}
      />
    </div>
  );
};

export default GooeyNav; 