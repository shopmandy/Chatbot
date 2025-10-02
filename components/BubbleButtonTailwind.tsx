import React from 'react'

interface BubbleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export function BubbleButtonTailwind({ 
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
      className={`
        /* Core button properties */
        inline-flex items-center justify-center border-0 cursor-pointer
        font-[Druk_Wide_Web_Bold] font-semibold uppercase tracking-wider text-center text-white
        whitespace-nowrap select-none transition-all duration-200 ease-out
        
        /* Responsive sizing */
        h-16 px-8 text-base leading-none
        md:h-16 md:px-8 md:text-base
        sm:h-14 sm:px-6 sm:text-sm
        
        /* Pill shape */
        rounded-full
        
        /* Background gradient - using custom CSS variables */
        bg-gradient-to-br from-pink-300 via-pink-400 to-purple-300
        
        /* Outer rim glow and inner glow */
        shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_0_0_2px_rgba(255,255,255,0.2),0_4px_12px_rgba(255,154,209,0.3),0_8px_24px_rgba(212,183,255,0.2),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.2)]
        
        /* Hover state */
        hover:not-disabled:scale-[1.02]
        hover:not-disabled:shadow-[0_0_0_1px_rgba(255,255,255,0.7),0_0_0_2px_rgba(255,255,255,0.3),0_6px_16px_rgba(255,154,209,0.4),0_12px_32px_rgba(212,183,255,0.3),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.3)]
        
        /* Active state */
        active:not-disabled:scale-[0.99]
        
        /* Focus state */
        focus-visible:outline-none
        focus-visible:shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_0_0_2px_rgba(255,255,255,0.2),0_0_0_4px_#ffffff,0_0_0_6px_#FF6FB4,0_4px_12px_rgba(255,154,209,0.3),0_8px_24px_rgba(212,183,255,0.2),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.2)]
        
        /* Disabled state */
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        disabled:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_2px_8px_rgba(255,154,209,0.2),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.1)]
        
        /* Motion preferences */
        motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:active:transform-none
        
        /* High contrast mode */
        high-contrast:border-2 high-contrast:border-white high-contrast:shadow-[0_0_0_1px_#000000,0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9)]
        high-contrast:focus-visible:shadow-[0_0_0_1px_#000000,0_0_0_4px_#ffffff,0_0_0_6px_#000000,0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.9)]
        
        /* Specular highlight pseudo-element - requires additional CSS */
        relative overflow-hidden
        
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      aria-label={ariaLabel}
    >
      {children}
      
      {/* Specular highlight - positioned element instead of pseudo-element for Tailwind */}
      <div className="absolute top-2 right-3 w-6 h-4 bg-white/60 rounded-full blur-sm pointer-events-none" 
           style={{
             background: 'radial-gradient(ellipse 24px 16px at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)'
           }} />
    </button>
  )
}
