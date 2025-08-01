"use client"

import { useTheme } from "@/components/theme-provider"

/**
 * Custom hook to get the actual theme mode (light/dark) 
 * even when the theme is set to 'system'
 */
export function useThemeMode() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme
} 