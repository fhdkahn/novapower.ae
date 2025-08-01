import React, { useRef, useEffect, useState, useMemo } from 'react'
import Globe from 'react-globe.gl'

// Nova Power Real Estate Developer coordinates
const NOVA_POWER = { lat: 25.2558929, lng: 55.3316373 }

const markerData = [
  {
    lat: NOVA_POWER.lat,
    lng: NOVA_POWER.lng,
    label: 'Nova Power Real Estate Developer (Dubai)',
    logo: '/nova.png',
  },
  {
    lat: 6.5244, // Lagos, Nigeria (Africa)
    lng: 3.3792,
    label: 'Nova Power Africa',
    logo: '/nova.png',
  },
  {
    lat: 22.5431, // Shenzhen, China
    lng: 114.0579,
    label: 'Nova Power China',
    logo: '/nova.png',
  }
]

interface CustomObject {
  lat: number;
  lng: number;
  element: HTMLElement;
}

/**
 * GlobeMap renders a spinning hollow globe with a custom marker and logo image.
 */
const GlobeMap: React.FC = () => {
  const globeEl = useRef<any>(null)
  const controlsLockRef = useRef<number>()

  // Responsive globe size
  const [globeSize, setGlobeSize] = useState(220)
  useEffect(() => {
    function handleResize() {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth
      let newSize = 220; // mobile default
      if (w < 640) newSize = 220; // mobile
      else if (w < 768) newSize = 280; // sm
      else if (w < 1024) newSize = 320; // md
      else newSize = 450; // lg+
      
      console.log('Window width:', w, 'Globe size:', newSize);
      setGlobeSize(newSize);
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Memoize marker objects for performance
  const customObjects: CustomObject[] = useMemo(() => markerData.map(marker => {
    // Create a container div for the marker
    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'flex-end';
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';
    // Add click handler to open Google Maps directions
    el.onclick = () => {
      window.open('https://maps.app.goo.gl/v2dVHeesnBAZu6vp7', '_blank', 'noopener,noreferrer');
    };

    // SVG pin (red, larger, on top)
    const icon = document.createElement('div');
    icon.innerHTML = `<svg height="48" width="48" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 491.268 491.268" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#D60949;" d="M383.48,137.846C383.48,61.842,321.646,0,245.634,0S107.788,61.842,107.788,137.846 c0,48.514,25.253,91.175,63.252,115.744l67.537,163.872c1.182,2.867,3.97,4.734,7.058,4.734c3.104,0,5.9-1.867,7.073-4.734 l67.537-163.879C358.227,229.014,383.48,186.36,383.48,137.846z"></path> <path style="fill:#B20040;" d="M245.634,422.195c3.104,0,5.9-1.867,7.073-4.734l67.537-163.879 c37.983-24.568,63.236-67.222,63.236-115.736C383.48,61.842,321.646,0,245.634,0"></path> <circle style="fill:#D60949;" cx="245.634" cy="473.12" r="18.148"></circle> <circle style="fill:#ffffff;" cx="245.634" cy="136.578" r="57.951"></circle> <path style="fill:#919191;" d="M245.634,78.627c32.012,0,57.951,25.947,57.951,57.951c0,31.996-25.939,57.951-57.951,57.951"></path> </g></svg>`;
    icon.style.display = 'block';
    icon.style.margin = '0';
    icon.style.padding = '0';
    icon.style.position = 'relative';
    icon.style.zIndex = '2';
    icon.style.marginLeft = '23px';
    icon.style.pointerEvents = 'none';
    el.appendChild(icon);

    // Nova.png image (no background, no border, no circle) - below the pin
    const logo = document.createElement('img');
    logo.src = marker.logo;
    logo.alt = marker.label;
    logo.style.width = '80px';
    logo.style.height = '55px';
    logo.style.objectFit = 'contain';
    logo.style.margin = '0';
    logo.style.background = 'none';
    logo.style.border = 'none';
    logo.style.borderRadius = '0';
    logo.style.boxShadow = 'none';
    logo.style.position = 'relative';
    logo.style.zIndex = '1';
    logo.style.marginTop = '-12px'; // overlap the pin base
    logo.style.filter = 'invert(1) brightness(0) contrast(9)';
    logo.style.mixBlendMode = 'screen';
    logo.style.transform = 'translateX(-8px)';
    logo.style.marginLeft = '16px';
    logo.style.pointerEvents = 'none';
    el.appendChild(logo);

    return {
      lat: marker.lat,
      lng: marker.lng,
      element: el,
    };
  }), []);

  useEffect(() => {
    function lockControls() {
      if (globeEl.current && globeEl.current.controls) {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableRotate = true; // allow manual rotation
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.7;
          const camDistance = globeEl.current.camera().position.length();
          controls.minDistance = camDistance;
          controls.maxDistance = camDistance;
        }
      }
      controlsLockRef.current = requestAnimationFrame(lockControls);
    }
    lockControls();
    return () => {
      if (controlsLockRef.current) cancelAnimationFrame(controlsLockRef.current);
    };
  }, [])

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="rounded-full overflow-hidden"
        style={{
          width: globeSize,
          height: globeSize,
          maxWidth: '100vw',
          maxHeight: '50vw',
          filter: 'brightness(1.15) contrast(1.15)',
          background: 'transparent',
        }}
      >
        <Globe
          ref={globeEl}
          width={globeSize}
          height={globeSize}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgba(255, 255, 255, 0)"
          showAtmosphere={false}
          // Custom marker as HTML element
          htmlElementsData={customObjects}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={(d) => (d as CustomObject).element}
          showGraticules={false}
        />
      </div>
    </div>
  )
}

export default GlobeMap 