import { MessageCircle, ShoppingBag, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState, useEffect } from 'react'
import { MagicalBackground } from './MagicalBackground'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const router = useRouter()
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

  // Optimized click handler using Next.js router
  const handleButtonClick = useCallback(
    (url: string) => {
      // Let profile page handle authentication - no special logic needed here
      if (url.startsWith('http')) {
        window.open(url, '_blank')
      } else {
        router.push(url)
      }
    },
    [router]
  )

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const navItems = [
    { id: 'room', label: 'AI Room Makeover', icon: Sparkles, path: '/room' },
    {
      id: 'chatbot',
      label: 'DIY Chatbot',
      icon: MessageCircle,
      path: '/chatbot',
    },
    {
      id: 'shop',
      label: 'Shop Toolkits',
      icon: ShoppingBag,
      path: 'https://shopmandy.com/',
      external: true,
    },
  ]

  return (
    <div
      className="hero-section-container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent',
      }}
    >
      <MagicalBackground />
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 2,
          background: 'transparent',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className="hero-box"
          style={{
            background: 'transparent',
            border: '4px solid #ff69b4',
            borderRadius: '24px',
            boxShadow: `
              0 20px 40px rgba(0, 0, 0, 0.1),
              0 10px 20px rgba(0, 0, 0, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.03),
              inset 0 1px 0 rgba(255, 255, 255, 0.8),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `,
            overflow: 'hidden',
            marginBottom: '0rem',
            position: 'relative',
            maxWidth: isMobile ? '98%' : '836px',
            margin: '0 auto',
            aspectRatio: isMobile ? '1.1' : '1.4',
            display: 'flex',
            flexDirection: 'column',
            minHeight: isMobile ? '700px' : 'auto',
          }}
        >
          {/* Enhanced Window Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(90deg, #ff69b4 0%, #ff1493 100%)',
              borderBottom: '1px solid #ff69b4',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '12px 16px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '16px',
              fontWeight: '700',
              color: '#0a164d',
              boxShadow: 'inset 0 1px 0px rgba(255, 255, 255, 0.3)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '700',
                letterSpacing: '1px',
                color: '#0a164d',
              }}
            >
              <Star
                style={{
                  width: 18,
                  height: 18,
                  color: '#0a164d',
                  strokeWidth: 2,
                }}
              />
              YOUR DIY BFF
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                style={{
                  width: '18px',
                  height: '18px',
                  background: '#ffffff',
                  border: '1px solid #ff69b4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Minimize"
                onClick={handleMinimize}
              >
                ─
              </button>
              <button
                style={{
                  width: '18px',
                  height: '18px',
                  background: '#ffffff',
                  border: '1px solid #ff69b4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Maximize"
              >
                □
              </button>
              <button
                style={{
                  width: '18px',
                  height: '18px',
                  background: '#ffffff',
                  border: '1px solid #ff69b4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Enhanced Section Content */}
          <div
            style={{
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              display: isMinimized ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'relative',
                marginBottom: isMobile ? '1.5rem' : '2rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Left Hammer */}
                <Image
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  width={36}
                  height={36}
                  style={{
                    width: isMobile ? '24px' : '36px',
                    height: isMobile ? '24px' : '36px',
                    imageRendering: 'pixelated',
                    transform: 'rotate(45deg) scaleX(-1)',
                    transformOrigin: 'center',
                    marginRight: isMobile ? '1rem' : '1.5rem',
                  }}
                />

                <h2
                  style={{
                    fontSize: isMobile ? '50px !important' : '2.8rem',
                    color: '#0a164d',
                    marginBottom: '0',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    lineHeight: '1.1',
                    fontFamily:
                      "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                    textShadow: '1px 1px 0px rgba(76, 45, 150, 0.5)',
                  }}
                >
                  WELCOME TO
                </h2>

                {/* Right Hammer */}
                <Image
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  width={36}
                  height={36}
                  style={{
                    width: isMobile ? '24px' : '36px',
                    height: isMobile ? '24px' : '36px',
                    imageRendering: 'pixelated',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'center',
                    marginLeft: isMobile ? '1rem' : '1.5rem',
                  }}
                />
              </div>

              {/* Background highlight for headline */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isMobile ? '90%' : '95%',
                  height: isMobile ? '60px' : '80px',
                  background:
                    'linear-gradient(90deg, rgba(255, 182, 230, 0.15) 0%, rgba(255, 105, 180, 0.1) 50%, rgba(255, 182, 230, 0.15) 100%)',
                  borderRadius: '12px',
                  zIndex: -1,
                  filter: 'blur(1px)',
                }}
              />

              <h1
                className="hero-title"
                style={{
                  fontSize: isMobile ? '1.6rem' : '2.2rem',
                  color: '#0a164d',
                  marginBottom: '0',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontWeight: '800',
                  letterSpacing: isMobile ? '1px' : '2px',
                  lineHeight: isMobile ? '1.2' : '1.1',
                  fontFamily:
                    "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: 'none',
                  position: 'relative',
                  zIndex: 1,
                  whiteSpace: isMobile ? 'normal' : 'nowrap',
                  textAlign: 'center',
                  display: 'block',
                  width: '100%',
                  maxWidth: isMobile ? '280px' : 'fit-content',
                  wordBreak: isMobile ? 'break-word' : 'normal',
                }}
              >
                MANDY&apos;S WORKSHOP
              </h1>
            </div>

            <p
              className="hero-subtext"
              style={{
                fontSize: isMobile ? '0.6rem' : '1.5rem',
                color: '#0a164d',
                marginBottom: isMobile ? '2.5rem' : '2rem',
                fontWeight: '600',
                lineHeight: isMobile ? '1.5' : '1.6',
                fontFamily: "'Roboto Mono', 'Courier New', monospace",
                letterSpacing: '0.5px',
                opacity: 1,
                padding: isMobile ? '0 2rem' : '0',
                textAlign: 'center',
                maxWidth: isMobile ? '320px' : 'none',
                margin: isMobile ? '0 auto 2.5rem auto' : '0 0 2rem 0',
              }}
            >
              Design with AI, build with Mandy, and shop the toolkit to make it
              real.
            </p>

            {/* Enhanced Buttons */}
            <div
              className="hero-buttons-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '1rem' : '16px',
                flexWrap: 'nowrap',
                paddingBottom: isMobile ? '2rem' : '2rem',
                maxWidth: isMobile ? '320px' : '1000px',
                margin: '0 auto',
                flexDirection: isMobile ? 'column' : 'row',
                padding: isMobile ? '0 1rem 2rem 1rem' : '0',
              }}
            >
              {navItems.map(item => {
                const Icon = item.icon
                const subheadings = {
                  room: 'AI-powered design',
                  chatbot: 'Expert DIY guidance',
                  shop: 'Get equipped',
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleButtonClick(item.path)}
                    className={`inflatable-button hero-button ${styles.heroButton}`}
                    style={{
                      height: isMobile ? '60px' : '140px',
                      width: isMobile ? '100%' : '220px',
                      margin: '0 auto',
                      padding: isMobile ? '0.5rem 1rem' : '1.25rem',
                      borderRadius: isMobile ? '12px' : '20px',
                      minWidth: isMobile ? '200px' : '220px',
                      maxWidth: isMobile ? '280px' : 'none',
                    }}
                  >
                    {/* Tab Content */}
                    <div
                      className="flex items-center justify-center h-full relative z-20"
                      style={{
                        gap: isMobile ? '0.75rem' : '0.5rem',
                        width: '100%',
                        flexDirection: isMobile ? 'row' : 'column',
                      }}
                    >
                      {item.id === 'room' ? (
                        // Special case for Room Makeover button with inflatable bed image
                        <>
                          <Image
                            src="/inflatable bed button.png"
                            alt="Inflatable Bed"
                            width={80}
                            height={80}
                            style={{
                              width: isMobile ? '36px' : '80px',
                              height: isMobile ? '36px' : '80px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1.1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: isMobile ? 'center' : 'center',
                              lineHeight: isMobile ? '1.1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              flex: isMobile ? 1 : 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            AI ROOM MAKEOVER
                          </div>
                        </>
                      ) : item.id === 'chatbot' ? (
                        // Special case for DIY Chatbot button with inflatable chat image
                        <>
                          <Image
                            src="/inflatable chat button.png"
                            alt="Inflatable Chat"
                            width={80}
                            height={80}
                            style={{
                              width: isMobile ? '36px' : '80px',
                              height: isMobile ? '36px' : '80px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1.1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: isMobile ? 'center' : 'center',
                              lineHeight: isMobile ? '1.1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              flex: isMobile ? 1 : 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            DIY CHATBOT
                          </div>
                        </>
                      ) : item.id === 'shop' ? (
                        // Special case for Shop Toolkits button with inflatable shop tools image
                        <>
                          <Image
                            src="/inflatable shop tools button.png"
                            alt="Inflatable Shop Tools"
                            width={80}
                            height={80}
                            style={{
                              width: isMobile ? '36px' : '80px',
                              height: isMobile ? '36px' : '80px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              flexShrink: 0,
                            }}
                          />
                          <div
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1.1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: isMobile ? 'center' : 'center',
                              lineHeight: isMobile ? '1.1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              flex: isMobile ? 1 : 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            SHOP TOOLKITS
                          </div>
                        </>
                      ) : (
                        // Default button content for other buttons
                        <>
                          <Icon
                            className="text-white"
                            style={{
                              width: isMobile ? '1.25rem' : '1.5rem',
                              height: isMobile ? '1.25rem' : '1.5rem',
                              minWidth: isMobile ? '1.25rem' : '1.5rem',
                              minHeight: isMobile ? '1.25rem' : '1.5rem',
                              display: 'block',
                              color: '#ffffff !important',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              fontWeight: '600',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              opacity: 0.9,
                            }}
                          >
                            {subheadings[item.id as keyof typeof subheadings]}
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
