import { Award, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function AboutSection() {
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
              'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(255, 220, 174, 0.9) 100%)',
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
                'linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, rgba(255, 220, 174, 0.95) 100%)',
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
              <Award style={{ width: 20, height: 20, color: '#f91b8f' }} />
              ABOUT MANDY
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
              padding: '1.25rem',
              textAlign: 'left',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Mobile-only image above the header */}
            <div className="about-mobile-image" style={{ marginBottom: '1rem' }}>
              <Image
                src="/box-crop.jpeg"
                alt="Mandy's tools and equipment"
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
            <h1
              style={{
                fontSize: '3.2rem',
                color: '#f91b8f',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.2',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textShadow: '0 4px 16px rgba(255, 105, 180, 0.3)',
                marginBottom: '1rem',
              }}
            >
              AT MANDY, WE BELIEVE THAT EVERY WOMAN CAN DO-IT-HERSELF WITH THE
              RIGHT TOOLS.
            </h1>

            <div
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <div className="about-text" style={{ flex: '0 0 50%', marginTop: '0.5rem' }}>
                <p
                  className="font-semibold text-xl mb-6"
                  style={{
                    fontSize: '1.25rem',
                    color: '#f91b8f',
                    lineHeight: '1.5',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: '600',
                    marginBottom: '1rem',
                  }}
                >
                 We are dedicated to empowering everyone
                 to confidently build, repair, and get it done,
                 and we're here to provide the tools to make it happen.
                </p>

                <h3
                  className="font-bold text-3xl mb-6"
                  style={{
                    fontSize: '2rem',
                    color: '#f91b8f',
                    fontWeight: '700',
                    fontFamily:
                      "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                    marginBottom: '0.75rem',
                  }}
                >
                  We are committed to:
                </h3>

                <ul
                  className="space-y-3 text-xl"
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    'Quality and Innovation',
                    'Education and Support',
                    'Inclusivity',
                    'Sustainability',
                    'Community Building',
                  ].map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '0.5rem',
                        fontSize: '1.1rem',
                        color: '#f91b8f',
                        fontFamily: 'Roboto Mono, monospace',
                        fontWeight: '600',
                      }}
                    >
                      <div>
                        <Heart
                          style={{
                            width: 20,
                            height: 20,
                            color: '#f91b8f',
                            filter:
                              'drop-shadow(0 2px 4px rgba(255, 105, 180, 0.3))',
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: '600' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className="font-semibold mt-8 text-xl"
                  style={{
                    fontSize: '1.25rem',
                    color: '#f91b8f',
                    lineHeight: '1.5',
                    fontFamily: 'Roboto Mono, monospace',
                    fontWeight: '600',
                    marginTop: '1rem',
                  }}
                >
                  Mandy is not just a brand; it&apos;s a movement. We are here
                  to redefine what it means to be handy and to ensure that every
                  person has the tools and knowledge to turn their desires into
                  reality.
                </p>
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '0',
                }}
              >
                <div className="about-desktop-image" style={{ width: '100%', maxWidth: '520px' }}>
                  <Image
                    src="/box-crop.jpeg"
                    alt="Mandy's tools and equipment"
                    width={800}
                    height={600}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(255, 105, 180, 0.20)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              </div>
            </div>
            <style jsx>{`
              .about-mobile-image { display: none; }
              @media (max-width: 768px) {
                .about-mobile-image { display: block; }
                .about-desktop-image { display: none; }
                .about-text { flex: 0 0 100% !important; width: 100% !important; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  )
}
