import React from 'react'
import styles from './BubbleHamburger.module.css'

interface BubbleHamburgerProps {
  onClick?: () => void
  isOpen?: boolean
  'aria-label'?: string
  className?: string
}

export function BubbleHamburger({ 
  onClick, 
  isOpen = false, 
  'aria-label': ariaLabel = 'Toggle navigation menu',
  className = ''
}: BubbleHamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.bubbleHamburger} ${className}`}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
    >
      <span className={styles.hamburgerIcon}>
        <span className={`${styles.line} ${isOpen ? styles.line1Open : ''}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.line2Open : ''}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.line3Open : ''}`}></span>
      </span>
    </button>
  )
}
