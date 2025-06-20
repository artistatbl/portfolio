'use client'

import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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

  return isMobile
}

export function useTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
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

  return isTablet
}

export function useDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
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

  return isDesktop
}