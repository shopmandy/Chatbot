import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export function Step2ChatbotSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>([])
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
          // Trigger bubble animations with staggered delays
          setTimeout(() => setVisibleBubbles(['mandy1']), 500)
          setTimeout(() => setVisibleBubbles(prev => [...prev, 'user']), 1000)
          setTimeout(() => setVisibleBubbles(prev => [...prev, 'mandy2']), 1500)
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
        marginTop: '0',
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
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
          margin: '0 0 1.5rem 0',
          textTransform: 'uppercase'
        }}>
          STEP 2: LEARN IT
        </div>

        {/* Main Heading */}
        <h2 style={{
          fontSize: isMobile ? '50px' : '3.5rem',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '2px',
          lineHeight: '1.2',
          margin: '0 0 1.5rem 0',
          textAlign: 'center'
        }}>
          {isMobile ? (
            <>
              <div>GET EXPERT</div>
              <div>GUIDANCE 24/7.</div>
            </>
          ) : (
            'GET EXPERT GUIDANCE 24/7.'
          )}
        </h2>

        {/* Sub-heading */}
        <p style={{
          fontSize: isMobile ? '1rem' : '1.2rem',
          color: '#000000',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          margin: '0 0 3rem 0',
          lineHeight: '1.4'
        }}>
          Our chatbot walks you through every step, big or small.
        </p>

        {/* Retro Chat Window */}
        <div style={{
          position: 'relative',
          margin: '0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          border: '3px solid #ff69b4'
        }}>
          {/* Title Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#e4f6ff',
            borderBottom: '2px solid #808080',
            padding: '8px 12px',
            fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            fontSize: '14px',
            fontWeight: '700',
            color: '#000000',
            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '700',
              letterSpacing: '2px',
              color: '#0a164d',
              textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
            }}>
              <span style={{
                width: '20px',
                height: '20px',
                background: '#f91b8f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>M</span>
              MANDY AI
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#c0c0c0',
                border: '1px solid #808080',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: '#000000'
              }}>−</div>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#c0c0c0',
                border: '1px solid #808080',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: '#000000'
              }}>□</div>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#c0c0c0',
                border: '1px solid #808080',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                color: '#000000'
              }}>×</div>
            </div>
          </div>

          {/* Chat Area */}
          <div style={{
            padding: '1.5rem',
            background: '#ffffff',
            minHeight: '200px'
          }}>
            {/* Mandy's First Message */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '1rem',
              opacity: visibleBubbles.includes('mandy1') ? 1 : 0,
              transform: visibleBubbles.includes('mandy1') ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              transition: 'all 0.5s ease-out'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#ff69b4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: "'VT323', monospace",
                boxShadow: '0 2px 6px rgba(255, 105, 180, 0.3)',
                flexShrink: 0
              }}>M</div>
              <div style={{
                background: '#ffe0f2',
                color: '#0a164d',
                padding: '12px 16px',
                borderRadius: '20px 20px 20px 8px',
                border: '2px solid #ff69b4',
                fontSize: '14px',
                fontFamily: "'VT323', monospace",
                maxWidth: '70%',
                boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)'
              }}>
                What are you working on today? 🔨💕
              </div>
            </div>

            {/* User's Message */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              justifyContent: 'flex-end',
              marginBottom: '1rem',
              opacity: visibleBubbles.includes('user') ? 1 : 0,
              transform: visibleBubbles.includes('user') ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              transition: 'all 0.5s ease-out'
            }}>
              <div style={{
                background: '#f91b8f',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '20px 20px 8px 20px',
                border: '2px solid #ff69b4',
                fontSize: '14px',
                fontFamily: "'VT323', monospace",
                fontWeight: '700',
                maxWidth: '70%',
                boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)'
              }}>
                How do I hang a picture?
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#f91b8f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                flexShrink: 0,
                overflow: 'hidden'
              }}>
                <img 
                  src="/inflateable profile.png" 
                  alt="User Profile" 
                  style={{ 
                    width: '24px', 
                    height: '24px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                  }} 
                />
              </div>
            </div>

            {/* Mandy's Response */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '1rem',
              opacity: visibleBubbles.includes('mandy2') ? 1 : 0,
              transform: visibleBubbles.includes('mandy2') ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
              transition: 'all 0.5s ease-out'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#ff69b4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: "'VT323', monospace",
                boxShadow: '0 2px 6px rgba(255, 105, 180, 0.3)',
                flexShrink: 0
              }}>M</div>
              <div style={{
                background: '#ffe0f2',
                color: '#0a164d',
                padding: '12px 16px',
                borderRadius: '20px 20px 20px 8px',
                border: '2px solid #ff69b4',
                fontSize: '14px',
                fontFamily: "'VT323', monospace",
                maxWidth: '70%',
                boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)'
              }}>
                Grab your Hot Girl Toolkit: use the hammer to gently tap a nail into the wall where you want your picture, and the level to make sure it's straight. Hang your artwork, step back, and enjoy your newly decorated wall! 🖼️🔨✨
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="inflatable-button"
            onClick={() => router.push('/chatbot')}
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
            Ask Mandy AI
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
