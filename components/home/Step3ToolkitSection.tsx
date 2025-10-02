import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function Step3ToolkitSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
        paddingBottom: '1rem',
      }}
    >
      {/* Content Area */}
      <div
        className="w-[95%] md:w-[700px]"
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
          className="text-[50px] md:text-[3.5rem]"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: '#0a164d',
            fontFamily: "'Druk', 'Druk Wide Web Bold', 'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: '2px',
            lineHeight: '1.2',
            margin: '0 0 1rem 0',
            textAlign: 'center',
            textShadow: 
              '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          STEP 3: BUILD IT WITH OUR TOOLKITS.
        </h2>


        {/* Toolkit Image */}
        <div
          style={{
            position: 'relative',
            margin: '0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/shop tools.jpg"
            alt="Hot Girl Toolkit"
            width={600}
            height={400}
            className="w-full md:w-[600px]"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(255, 105, 180, 0.3)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
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
              background:
                'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%) !important',
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
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `
                0 12px 30px rgba(255, 20, 147, 0.6),
                0 6px 12px rgba(255, 20, 147, 0.4),
                inset 0 3px 6px rgba(255, 255, 255, 0.4),
                inset 0 -3px 6px rgba(255, 20, 147, 0.4)
              `
              e.currentTarget.style.transform =
                'perspective(1000px) rotateX(8deg) translateY(-4px) scale(1.05)'
              e.currentTarget.style.background =
                'linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #ff1493 100%)'
              e.currentTarget.style.filter =
                'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `
                0 8px 20px rgba(255, 20, 147, 0.4),
                0 4px 8px rgba(255, 20, 147, 0.2),
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(255, 20, 147, 0.3)
              `
              e.currentTarget.style.transform =
                'perspective(1000px) rotateX(5deg)'
              e.currentTarget.style.background =
                'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%)'
              e.currentTarget.style.filter =
                'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}
          >
            SHOP TOOLKITS
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
