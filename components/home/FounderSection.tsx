import { Users } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function FounderSection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '1rem' : '2rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '2rem',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          fontSize: '18px',
          fontWeight: '700',
          color: '#ff69b4',
          textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
        }}
      >
        <Users style={{ width: 20, height: 20, color: '#f91b8f' }} />
        WHO IS MANDY?
      </div>

      {/* Section Content */}
      <div
        style={{
          textAlign: 'left',
        }}
      >
        {/* Mobile-only image above the header (mirror About section) */}
        <div className="founder-mobile-image" style={{ marginBottom: '1rem' }}>
          <Image
            src="/founder.png"
            alt="Mandy's Founder, Caroline Blanck"
            width={800}
            height={800}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(255, 105, 180, 0.20)',
            }}
          />
        </div>
        {/* Top row: grid with image on left spanning header + subheader */}
        <div
          className="founder-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            alignItems: 'start',
            columnGap: isMobile ? '0' : '1.5rem',
            rowGap: isMobile ? '1rem' : '0',
            marginBottom: '1rem',
          }}
        >
          {/* Left image spans full text block height */}
          <div
            className="founder-desktop-image"
            style={{ gridColumn: 1, gridRow: '1', alignSelf: 'stretch' }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <Image
                src="/founder.png"
                alt="Mandy's Founder, Caroline Blanck"
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 8px 20px rgba(255, 105, 180, 0.20)',
                }}
              />
            </div>
          </div>

          {/* Right-side text container (header + all paragraphs) */}
          <div
            className="founder-text-content"
            style={{ gridColumn: isMobile ? 1 : 2, gridRow: 1 }}
          >
            <h1
              style={{
                fontSize: isMobile ? '2rem' : '3.2rem',
                color: '#f91b8f',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.2',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textShadow: '0 4px 16px rgba(255, 105, 180, 0.3)',
                margin: 0,
                marginBottom: '1rem',
              }}
            >
              FEMALE FOUNDED
            </h1>
            {[
              'Mandy was founded by Caroline Blanck to make DIY feel like it belongs to everyone—especially women.',
              'Led by an all-women, BIPOC team, we blend design, tech, and self-reliance to reimagine tools that are functional, intuitive, and beautiful.',
              "DIY isn't just a skill—it's a mindset. Our tools spark confidence, creativity, and control.",
              "Let's build something better.",
            ].map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontSize: isMobile ? '1rem' : '1.25rem',
                  color: '#f91b8f',
                  lineHeight: '1.5',
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: '600',
                  marginBottom: index === 0 ? '1rem' : '1rem',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Remaining paragraphs under the grid (right column content) */}
        {/* No additional text below; all content is now in the right column */}
        <style jsx>{`
          .founder-mobile-image {
            display: none;
          }
          @media (max-width: 768px) {
            .founder-mobile-image {
              display: block;
            }
            .founder-desktop-image {
              display: none;
            }
            /* Make text span full width on mobile */
            .founder-text {
              width: 100% !important;
            }
            /* Make the grid single column and text full width on mobile */
            .founder-grid {
              grid-template-columns: 1fr !important;
            }
            .founder-text-content {
              grid-column: 1 !important;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
