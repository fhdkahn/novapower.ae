import { SplitText } from './split-text'

interface NewLaunchHeroTextProps {
  className?: string
  text?: string
}

/**
 * Animated hero text for the New Launch page using SplitText and framer-motion.
 * @param className - Optional Tailwind classes for styling
 * @param text - The text to animate (defaults to DreamLife Residences message)
 */
export default function NewLaunchHeroText({
  className = '',
  text = 'Welcome to DreamLife Residences'
}: NewLaunchHeroTextProps) {
  return (
    <SplitText
      text={text}
      className={`md:text-7xl font-semibold montserrat tracking-tighter text-white text-center px-4 text-xl ${className}`}
      delay={0.1}
      duration={0.3}
      splitType="chars"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      staggerDelay={0.099}
      once={true}
      textAlign="center"
    />
  )
} 