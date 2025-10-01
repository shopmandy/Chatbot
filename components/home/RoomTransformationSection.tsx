import { useEffect, useRef, useState } from 'react'
import { InteractiveRoomImage } from './InteractiveRoomImage'

export function RoomTransformationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
        overflow: 'hidden',
      }}
    >
      {/* Content Area */}
      <div
        className="w-[95%] md:w-[800px]"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
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
            fontWeight: '700',
            color: '#0a164d',
            fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: '2px',
            lineHeight: '1.2',
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
          }}
        >
          Room Makeover
        </h2>

        {/* Sub-heading */}
        <p
          className="text-base md:text-xl"
          style={{
            color: '#000000',
            fontFamily: "'Roboto Mono', 'Courier New', monospace",
            fontWeight: '600',
            textAlign: 'center',
            margin: '0 0 2rem 0',
            lineHeight: '1.4',
          }}
        >
          Use AI to design and shop your dream room in seconds.
        </p>

        {/* Interactive Before/After Image Comparison */}
        <InteractiveRoomImage />

        {/* Call-to-Action Button */}
        <div
          style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '0' }}
        >
          <button
            className="inflatable-button"
            onClick={scrollToUpload}
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
                'perspective(1000px) rotateX(8deg) translateY(-4px)'
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
            Design my room
            <span style={{ fontSize: '14px' }}>↓</span>
          </button>
        </div>
      </div>
    </div>
  )
}
