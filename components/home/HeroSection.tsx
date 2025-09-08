import { MessageCircle, ShoppingBag, Sparkles, Star } from 'lucide-react'
import { useRouter } from 'next/router'
import { useCallback, useState, useEffect } from 'react'
import { MagicalBackground } from './MagicalBackground'

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
    (url: string, itemId?: string) => {
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
    { id: 'room', label: 'Room Makeover', icon: Sparkles, path: '/room' },
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
    <div className="hero-section-container" style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative',
      background: 'transparent'
    }}>
      <MagicalBackground />
      <div style={{ width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 2, background: 'transparent', display: 'flex', justifyContent: 'center' }}>
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
            maxWidth: isMobile ? '95%' : '836px',
            margin: '0 auto',
            aspectRatio: isMobile ? '1.3' : '1.4',
            display: 'flex',
            flexDirection: 'column',
            minHeight: isMobile ? '600px' : 'auto',
          }}
        >
          {/* Enhanced Window Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'linear-gradient(90deg, #ffe0f2 0%, #ffe4e1 100%)',
              borderBottom: '2px solid #808080',
              padding: '8px 12px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '14px',
              fontWeight: '700',
              color: '#0a164d',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: '700',
                letterSpacing: '2px',
                color: '#0a164d',
                textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
              }}
            >
              <Star style={{ width: 20, height: 20, color: '#0a164d' }} />
              YOUR DIY BFF
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                style={{
                  width: '16px',
                  height: '14px',
                  background: '#ffffff',
                  border: '1px solid #f91b8f',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
                title="Minimize"
                onClick={handleMinimize}
              >
                ─
              </button>
              <button 
                style={{
                  width: '16px',
                  height: '14px',
                  background: '#ffffff',
                  border: '1px solid #f91b8f',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
                title="Maximize"
              >
                □
              </button>
              <button 
                style={{
                  width: '16px',
                  height: '14px',
                  background: '#ffffff',
                  border: '1px solid #f91b8f',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#0a164d',
                  cursor: 'pointer',
                  boxShadow: 'none',
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
            <div style={{ position: 'relative', marginBottom: isMobile ? '0.5rem' : '2rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                {/* Left Hammer */}
                <img 
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  style={{
                    width: isMobile ? '24px' : '36px',
                    height: isMobile ? '24px' : '36px',
                    imageRendering: 'pixelated',
                    transform: 'rotate(45deg) scaleX(-1)',
                    transformOrigin: 'center',
                    marginRight: isMobile ? '1rem' : '1.5rem'
                  }}
                />
                
                <h2
                  style={{
                    fontSize: isMobile ? '1.8rem' : '2.8rem',
                    color: '#0a164d',
                    marginBottom: '0',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    lineHeight: '1.1',
                    fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                    textShadow: '1px 1px 0px rgba(76, 45, 150, 0.5)',
                  }}
                >
                  WELCOME TO
                </h2>
                
                {/* Right Hammer */}
                <img 
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  style={{
                    width: isMobile ? '24px' : '36px',
                    height: isMobile ? '24px' : '36px',
                    imageRendering: 'pixelated',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'center',
                    marginLeft: isMobile ? '1rem' : '1.5rem'
                  }}
                />
              </div>
              
              <h1
                className="hero-title"
                style={{
                  fontSize: isMobile ? '3.3rem' : '5rem',
                  color: '#0a164d',
                  marginBottom: '0',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  lineHeight: '1.1',
                  fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: '1px 1px 0px rgba(10, 22, 77, 0.5)',
                }}
              >
                MANDY&apos;S WORKSHOP
              </h1>
            </div>

            <p
              className="hero-subtext"
              style={{
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                color: '#0a164d',
                marginBottom: isMobile ? '0.5rem' : '2rem',
                fontWeight: '600',
                lineHeight: isMobile ? '1.3' : '1.6',
                fontFamily: "'Attila Sans Classic', Arial, sans-serif",
                letterSpacing: '0.5px',
                opacity: 1,
                padding: isMobile ? '0 0.5rem' : '0',
              }}
            >
              Design with AI. Build with Mandy. Shop the toolkit to make it happen.
            </p>

            {/* Enhanced Buttons */}
            <div
              className="hero-buttons-container"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '0.5rem' : '16px',
                flexWrap: 'nowrap',
                paddingBottom: isMobile ? '0.5rem' : '2rem',
                maxWidth: '1000px',
                margin: '0 auto',
                flexDirection: isMobile ? 'column' : 'row',
                padding: isMobile ? '0 0.5rem 0.5rem 0.5rem' : '0',
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
                    onClick={() => handleButtonClick(item.path, item.id)}
                    className="inflatable-button hero-button"
                    style={{
                      height: isMobile ? '100px' : '140px',
                      width: isMobile ? '100%' : '220px',
                      margin: '0 auto',
                      padding: isMobile ? '1rem' : '1.25rem',
                      background: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%) !important',
                      border: '3px solid #ff1493 !important',
                      borderRadius: '20px !important',
                      color: '#ffffff !important',
                      fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                      textTransform: 'uppercase !important',
                      letterSpacing: '2px !important',
                      boxShadow: `
                        0 8px 20px rgba(255, 20, 147, 0.4),
                        0 4px 8px rgba(255, 20, 147, 0.2),
                        inset 0 2px 4px rgba(255, 255, 255, 0.3),
                        inset 0 -2px 4px rgba(255, 20, 147, 0.3)
                      `,
                      transform: 'perspective(1000px) rotateX(5deg) !important',
                      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2)) !important',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3) !important',
                      imageRendering: 'pixelated !important',
                      transition: 'all 0.2s ease !important',
                    }}
                  >
                    {/* Tab Content */}
                    <div className="flex flex-col items-center justify-center h-full relative z-20" style={{ gap: isMobile ? '0.5rem' : '0.5rem' }}>
                      {item.id === 'room' ? (
                        // Special case for Room Makeover button with inflatable bed image
                        <>
                          <img 
                            src="/inflatable bed button.png" 
                            alt="Inflatable Bed" 
                            style={{ 
                              width: isMobile ? '60px' : '80px',
                              height: isMobile ? '60px' : '80px',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }} 
                          />
                          <div
                            style={{
                              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}
                          >
                            ROOM MAKEOVER
                          </div>
                        </>
                      ) : item.id === 'chatbot' ? (
                        // Special case for DIY Chatbot button with inflatable chat image
                        <>
                          <img 
                            src="/inflatable chat button.png" 
                            alt="Inflatable Chat" 
                            style={{ 
                              width: isMobile ? '60px' : '80px',
                              height: isMobile ? '60px' : '80px',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }} 
                          />
                          <div
                            style={{
                              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}
                          >
                            DIY CHATBOT
                          </div>
                        </>
                      ) : item.id === 'shop' ? (
                        // Special case for Shop Toolkits button with inflatable shop tools image
                        <>
                          <img 
                            src="/inflatable shop tools button.png" 
                            alt="Inflatable Shop Tools" 
                            style={{ 
                              width: isMobile ? '60px' : '80px',
                              height: isMobile ? '60px' : '80px',
                              objectFit: 'contain',
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }} 
                          />
                          <div
                            style={{
                              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
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
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' 
                            }} 
                          />
                          <div
                            style={{
                              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            style={{ 
                              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontSize: isMobile ? '1rem' : '1.4rem',
                              fontWeight: '600',
                              textAlign: 'center',
                              lineHeight: isMobile ? '1' : '1.1',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              opacity: 0.9
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
