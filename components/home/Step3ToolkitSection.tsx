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
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'transparent',
        overflow: 'visible',
        paddingBottom: '5rem',
        paddingTop: '0',
        marginTop: '-2rem',
      }}
    >
      {/* Content Area */}
      <div
        className="step3-content w-[95%] md:w-[700px]"
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
          >
            SHOP TOOLKITS
            <span style={{ fontSize: '14px' }}>→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .step3-content {
            width: 95% !important;
            max-width: 374px !important;
          }
        }
      `}</style>
    </div>
  )
}
