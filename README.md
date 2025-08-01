# NovaPower Real Estate 🏠

A modern, luxury real estate landing page built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Inspired by React Bits design components with stunning animations and dark/light mode support.

## ✨ Features

- **Modern Design**: Inspired by React Bits with glassmorphism effects and smooth animations
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Interactive Components**: 
  - Tilted Cards with 3D hover effects
  - Spotlight Cards with mouse tracking
  - Gradient Text animations
  - Smooth scroll animations
- **Performance Optimized**: Built with Next.js 14 App Router and optimized images
- **Accessibility**: WCAG compliant with proper semantic markup

## 📝 About Page & Advanced Components

The About page (`/about`) showcases advanced UI/UX and technical features, demonstrating the best practices in modern React and Next.js development:

- **Parallax Hero Section**: Uses `BackgroundParallax` and `ParallaxOverlay` for layered, smooth parallax effects with optimized, lazy-loaded WebP images.
- **Stacked Timeline Carousel**: The `StackedCards` component displays a glassmorphic, interactive timeline of company milestones, with keyboard, drag/swipe, and dot navigation. Timeline data is modularized in `timeline-events.ts`.
- **Office Info Section**: `OfficeInfoSection` presents contact details and office hours in a modern card, with animated Lucide icons and a call-to-action for directions.
- **Animated 3D Globe**: The `GlobeMap` component renders a spinning, interactive globe with a custom marker for the office location, using `react-globe.gl` and custom HTML overlays.
- **Custom Footer**: Responsive, accessible footer with policy links, branding, and copyright.
- **Performance & Accessibility**: Implements dynamic imports for code splitting, responsive layouts, semantic HTML, and ARIA labels for accessibility.
- **Styling**: All sections use Tailwind CSS for consistent, mobile-first design, glassmorphism, and gradients.
- **Best Practices**: Follows modular, functional patterns, early returns for error handling, and leverages Next.js SSR/SSG where possible.

### Key Files for About Page
- `app/about/page.tsx` – Main About page layout and section composition
- `components/sections/office-info-section.tsx` – Office info card and globe
- `components/sections/stacked-cards.tsx` – Timeline carousel
- `components/sections/timeline-events.ts` – Timeline event data
- `components/ui/background-parallax.tsx` – Parallax background
- `components/ui/parallax-overlay.tsx` – Parallax overlay image
- `components/ui/globe-map.tsx` – 3D globe with custom marker

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd novapower-real-estate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Custom theme system with CSS variables

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main landing page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── tilted-card.tsx
│   │   ├── spotlight-card.tsx
│   │   ├── gradient-text.tsx
│   │   └── theme-toggle.tsx
│   ├── sections/          # Page sections
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   └── featured-properties.tsx
│   └── theme-provider.tsx # Theme context provider
├── tailwind.config.js     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient
- **Secondary**: Muted grays with proper contrast
- **Accent**: Dynamic based on theme

### Components
- **Tilted Card**: 3D perspective transforms on hover
- **Spotlight Card**: Interactive mouse tracking effect
- **Gradient Text**: Animated background gradients
- **Glass Effect**: Backdrop blur with transparency

### Animations
- **Entrance**: Staggered fade-in animations
- **Hover**: Scale and transform effects
- **Scroll**: Reveal animations on viewport entry

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy to Vercel by connecting your GitHub repository.

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Customization

### Theme Colors
Edit the CSS variables in `app/globals.css`:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... */
}
```

### Component Styling
All components use Tailwind CSS classes and can be easily customized by modifying the className props.

### Animations
Framer Motion variants are defined in each component and can be adjusted for different animation styles.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Bits](https://reactbits.dev) for design inspiration
- [Framer Motion](https://framer.com/motion) for animations
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide React](https://lucide.dev) for icons

---

Built with ❤️ by the NovaPower team 