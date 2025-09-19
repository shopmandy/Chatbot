import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export function Step3ToolkitSection() {
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
        background: 'transparent',
        overflow: 'visible',
        paddingBottom: '1rem'
      }}
    >
      {/* Pixelated Stars Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        zIndex: 1
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'white',
              imageRendering: 'pixelated',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6,
              animation: `sparkle ${2 + Math.random() * 3}s infinite ease-in-out`
            }}
          />
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: isMobile ? '95%' : '700px',
        maxWidth: '800px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: 'all 0.8s ease-out',
        textAlign: 'center'
      }}>
        {/* Step Label */}
        <div style={{
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '3px',
          textAlign: 'center',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase'
        }}>
          STEP 3: BUILD IT
        </div>

        {/* Main Heading */}
        <h2 style={{
          fontSize: isMobile ? '50px' : '3.5rem',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '2px',
          lineHeight: '1.2',
          margin: '0 0 0.5rem 0',
          textAlign: 'center',
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          {isMobile ? (
            <>
              SHOP TOOLS TO<br />
              MAKE IT HAPPEN.
            </>
          ) : (
            'SHOP TOOLS TO MAKE IT HAPPEN.'
          )}
        </h2>

        {/* Sub-heading */}
        <p style={{
          fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
          color: '#0a164d',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          margin: '0 0 3rem 0',
          lineHeight: '1.4',
          whiteSpace: isMobile ? 'normal' : 'nowrap'
        }}>
          {isMobile ? (
            <>
              Stylish, functional, and ready to<br />
              go—everything you need in one kit.
            </>
          ) : (
            'Stylish, functional, and ready to go—everything you need in one kit.'
          )}
        </p>

        {/* Toolkit Image */}
        <div style={{
          position: 'relative',
          margin: '0',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img 
            src="/shop tools.jpg"
            alt="Hot Girl Toolkit"
            style={{
              width: isMobile ? '100%' : '600px',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(255, 105, 180, 0.3)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </div>

        {/* Call-to-Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="inflatable-button"
            onClick={() => window.open('https://shopmandy.com/', '_blank')}
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
            SHOP TOOLKITS
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
