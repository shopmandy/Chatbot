import { Users } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function FounderSection() {
  const [isMinimized, setIsMinimized] = useState(false)

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(97, 179, 242, 0.9) 0%, rgba(175, 219, 244, 0.9) 100%)',
            border: '3px solid #f91b8f',
            borderRadius: '24px',
            boxShadow:
              '0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            marginBottom: '0rem',
            position: 'relative',
          }}
        >
          {/* Enhanced Window Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background:
                'linear-gradient(135deg, rgba(97, 179, 242, 0.95) 0%, rgba(175, 219, 244, 0.95) 100%)',
              borderBottom: '3px solid #f91b8f',
              padding: '16px 24px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '18px',
              fontWeight: '700',
              color: '#ff69b4',
              boxShadow: '0 4px 20px rgba(255, 105, 180, 0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: '700',
                letterSpacing: '2px',
                textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
              }}
            >
              <Users style={{ width: 20, height: 20, color: '#f91b8f' }} />
              WHO IS MANDY?
            </div>
            <div className="window-controls">
              <button
                className="window-buttons"
                title="Minimize"
                onClick={handleMinimize}
              >
                <span className="window-button-icon">─</span>
              </button>
              <button className="window-buttons" title="Maximize">
                <span className="window-button-icon">□</span>
              </button>
              <button className="window-buttons" title="Close">
                <span className="window-button-icon">×</span>
              </button>
            </div>
          </div>

          {/* Enhanced Section Content */}
          <div
            style={{
              padding: '3rem',
              textAlign: 'left',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              style={{
                fontSize: '3.6rem',
                color: '#f91b8f',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.3',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textShadow: '0 4px 16px rgba(255, 105, 180, 0.3)',
                marginBottom: '0rem',
              }}
            >
              FEMALE FOUNDED
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '3rem',
                marginBottom: '0rem',
              }}
            >
              <div style={{ flex: '0 0 50%', marginTop: '1rem' }}>
                {[
                  'Mandy was founded by Caroline Blanck, an entrepreneur with a background in sustainability, law, and emerging tech. Her goal? Make DIY feel like it belongs to everyone—especially women.',
                  "Today, Mandy is powered by an all-women and BIPOC-led team blending design, technology, and self-reliance. We're reimagining tools to be functional, intuitive, and beautiful—built for how we live now.",
                  "DIY isn't just a skill—it's a mindset. Our tools are made to spark confidence, creativity, and control.",
                  "Let's build something better.",
                ].map((paragraph, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: '1.3rem',
                      color: '#f91b8f',
                      lineHeight: '1.6',
                      fontFamily: 'Roboto Mono, monospace',
                      fontWeight: '600',
                      marginBottom: '1rem',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '0rem',
                }}
              >
                <div>
                  <Image
                    src="/founder.png"
                    alt="Mandy's Founder, Caroline Blanck"
                    width={450}
                    height={450}
                    style={{
                      borderRadius: '16px',
                      boxShadow: '0 12px 32px rgba(255, 105, 180, 0.25)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
