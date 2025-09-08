import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { InteractiveRoomImage } from './InteractiveRoomImage'

export function RoomTransformationSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={sectionRef}
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '0',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      {/* Sparkling Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
          radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
          radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px, 80px 80px, 60px 60px, 40px 40px',
        animation: 'sparkle 3s ease-in-out infinite',
        pointerEvents: 'none'
      }} />

      {/* Content Area */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: isMobile ? '95%' : '800px',
        maxWidth: '900px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: 'all 0.8s ease-out',
        textAlign: 'center'
      }}>
        {/* Step Label */}
        <div style={{
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '3px',
          textAlign: 'center',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase'
        }}>
          STEP 1: ENVISION IT
        </div>

        {/* Main Heading */}
        <h2 style={{
          fontSize: isMobile ? '2.2rem' : '3.5rem',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '2px',
          lineHeight: '1.2',
          margin: '0 0 0.5rem 0',
          textAlign: 'center'
        }}>
          SEE YOUR SPACE TRANSFORMED.
        </h2>

        {/* Sub-heading */}
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          margin: '0 0 2rem 0',
          lineHeight: '1.4'
        }}>
          Use AI to design and shop your dream room in seconds.
        </p>

        {/* Interactive Before/After Image Comparison */}
        <InteractiveRoomImage />

        {/* Call-to-Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '0' }}>
          <button 
            className="inflatable-button"
            onClick={() => router.push('/room')}
            style={{
              background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%) !important',
              border: '3px solid #ff1493 !important',
              borderRadius: '20px !important',
              padding: '20px 40px !important',
              fontSize: '18px !important',
              fontWeight: '700 !important',
              color: '#ffffff !important',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              textTransform: 'uppercase',
              letterSpacing: '3px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: `
                0 8px 20px rgba(255, 20, 147, 0.4),
                0 4px 8px rgba(255, 20, 147, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(255, 20, 147, 0.3)
              `,
              position: 'relative',
              overflow: 'visible',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
              transform: 'perspective(1000px) rotateX(5deg)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                0 12px 30px rgba(255, 20, 147, 0.6),
                0 6px 12px rgba(255, 20, 147, 0.4),
                inset 0 3px 6px rgba(255, 255, 255, 0.4),
                inset 0 -3px 6px rgba(255, 20, 147, 0.4)
              `
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(8deg) translateY(-4px) scale(1.05)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ff1493 100%)'
              e.currentTarget.style.filter = 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                0 8px 20px rgba(255, 20, 147, 0.4),
                0 4px 8px rgba(255, 20, 147, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(255, 20, 147, 0.3)
              `
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%)'
              e.currentTarget.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}
          >
            Design my room
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
