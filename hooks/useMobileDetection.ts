import { useState, useEffect } from 'react'
import { UI_CONFIG } from '../constants'
import type { UseMobileDetectionReturn } from '../types'

export const useMobileDetection = (): UseMobileDetectionReturn => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < UI_CONFIG.MOBILE_BREAKPOINT)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile }
}
