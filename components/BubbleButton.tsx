import React from 'react'
import styles from './BubbleButton.module.css'

interface BubbleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export function BubbleButton({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  className = '',
  'aria-label': ariaLabel 
}: BubbleButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.bubbleButton} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
