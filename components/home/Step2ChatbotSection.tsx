import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function Step2ChatbotSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleBubbles, setVisibleBubbles] = useState<string[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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
        overflow: 'hidden',
      }}
    >
      {/* Content Area */}
      <div
        className="step2-content"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '1000px',
          maxWidth: '1200px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateY(0) scale(1)'
            : 'translateY(50px) scale(0.95)',
          transition: 'all 0.8s ease-out',
          textAlign: 'center',
        }}
      >

        {/* Main Heading */}
        <h2
          className="main-heading"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: '#0a164d',
            fontFamily: "'Druk', 'Druk Wide Web Bold', 'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: '2px',
            lineHeight: '1.3',
            margin: '0 0 1rem 0',
            textAlign: 'center',
            textShadow: 
              '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          STEP 2: GET STEP BY STEP GUIDANCE.
        </h2>


        {/* Retro Chat Window */}
        <div
          style={{
            position: 'relative',
            margin: '12px 0 0 0',
            borderRadius: '24px',
            overflow: 'visible',
            background: '#ffffff',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.2),
              0 0 20px rgba(255, 154, 209, 0.4),
              0 0 40px rgba(240, 120, 197, 0.3),
              0 0 60px rgba(212, 183, 255, 0.2),
              0 8px 32px rgba(255, 105, 180, 0.2),
              0 4px 16px rgba(212, 183, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `,
          }}
        >
          {/* Holographic border ring */}
          <div
            style={{
              position: 'absolute',
              inset: '-2px',
              borderRadius: '26px',
              background: 'linear-gradient(135deg, #ff9ad1, #f078c5, #d4b7ff)',
              zIndex: -1,
              filter: 'blur(0.5px)',
            }}
          />
          {/* Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(90deg, #B894E6 0%, #C894E6 25%, #D894E6 50%, #E694D6 75%, #E694C6 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 12px',
              fontFamily: "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif",
              fontSize: '17px',
              fontWeight: '700',
              color: '#ffffff',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: '700',
                letterSpacing: '2px',
                color: '#ffffff',
                textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  background: '#f91b8f',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                }}
              >
                M
              </span>
              <span style={{ 
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                MANDY AI
              </span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                −
              </div>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                □
              </div>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                ×
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div
            style={{
              padding: '1.5rem',
              background: '#ffffff',
              minHeight: '200px',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
            }}
          >
            {/* Mandy's First Message */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '1rem',
                opacity: visibleBubbles.includes('mandy1') ? 1 : 0,
                transform: visibleBubbles.includes('mandy1')
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.9)',
                transition: 'all 0.5s ease-out',
              }}
            >
              <div
                style={{
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
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div
                style={{
                  background: '#ffe0f2',
                  color: '#0a164d',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 20px 8px',
                  border: '2px solid #ff69b4',
                  fontSize: '17px',
                  fontFamily: "'VT323', monospace",
                  maxWidth: '70%',
                  boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
                }}
              >
                What are you working on today? 🔨💕
              </div>
            </div>

            {/* User's Message */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                justifyContent: 'flex-end',
                marginBottom: '1rem',
                opacity: visibleBubbles.includes('user') ? 1 : 0,
                transform: visibleBubbles.includes('user')
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.9)',
                transition: 'all 0.5s ease-out',
              }}
            >
              <div
                style={{
                  background: '#f91b8f',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 8px 20px',
                  border: '2px solid #ff69b4',
                  fontSize: '17px',
                  fontFamily: "'VT323', monospace",
                  fontWeight: '700',
                  maxWidth: '70%',
                  boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
                }}
              >
                How do I hang a picture?
              </div>
              <div
                style={{
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
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/inflateable profile.png"
                  alt="User Profile"
                  width={24}
                  height={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </div>
            </div>

            {/* Mandy's Response */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '1rem',
                opacity: visibleBubbles.includes('mandy2') ? 1 : 0,
                transform: visibleBubbles.includes('mandy2')
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.9)',
                transition: 'all 0.5s ease-out',
              }}
            >
              <div
                style={{
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
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div
                style={{
                  background: '#ffe0f2',
                  color: '#0a164d',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 20px 8px',
                  border: '2px solid #ff69b4',
                  fontSize: '17px',
                  fontFamily: "'VT323', monospace",
                  maxWidth: '70%',
                  boxShadow: '0 4px 16px rgba(255, 105, 180, 0.15)',
                }}
              >
                Grab your Hot Girl Toolkit: use the hammer to gently tap a nail
                into the wall where you want your picture, and the level to make
                sure it&apos;s straight. Hang your artwork, step back, and enjoy
                your newly decorated wall! 🖼️🔨✨
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="inflatable-button"
            onClick={() => router.push('/chatbot')}
          >
            Ask Mandy AI
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .step2-content {
            width: 95% !important;
            max-width: 374px !important;
          }
          .step-label {
            font-size: 1.2rem !important;
          }
          .sub-heading {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}
