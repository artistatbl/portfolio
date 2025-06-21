'use client'

import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkIsMobile()

    // Add event listener
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Return null during SSR to prevent hydration mismatch
  if (!isHydrated) return null
  return isMobile
}

export function useTablet() {
  const [isTablet, setIsTablet] = useState<boolean | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    const checkIsTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1440)
    }

    // Check on mount
    checkIsTablet()

    // Add event listener
    window.addEventListener('resize', checkIsTablet)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsTablet)
  }, [])

  // Return null during SSR to prevent hydration mismatch
  if (!isHydrated) return null
  return isTablet
}

export function useDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1440)
    }

    // Check on mount
    checkIsDesktop()

    // Add event listener
    window.addEventListener('resize', checkIsDesktop)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Return null during SSR to prevent hydration mismatch
  if (!isHydrated) return null
  return isDesktop
}