import { MessageCircle, ShoppingBag, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { MagicalBackground } from './MagicalBackground'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const router = useRouter()
  const [isMinimized, setIsMinimized] = useState(false)

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
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent',
        paddingBottom: 'env(safe-area-inset-bottom)',
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
          className="hero-box w-[98%] md:w-[min(95%,836px)] aspect-[1.1] md:aspect-auto"
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
            overflow: 'visible',
            marginBottom: '0rem',
            position: 'relative',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '700px',
          }}
        >
          {/* Enhanced Window Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#e4f6ff',
              borderBottom: '2px solid #808080',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '12px 16px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '16px',
              fontWeight: '700',
              color: '#0a164d',
              boxShadow:
                'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
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
                  border: '1px solid #808080',
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
                  border: '1px solid #808080',
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
                  border: '1px solid #808080',
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
            className="p-4 md:p-6"
            style={{
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
              className="mb-6 md:mb-8 translate-y-4 md:translate-y-0"
              style={{
                position: 'relative',
                marginTop: 0,
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
                  className="w-6 h-6 md:w-9 md:h-9 mr-4 md:mr-6"
                  style={{
                    imageRendering: 'pixelated',
                    transform: 'rotate(45deg) scaleX(-1)',
                    transformOrigin: 'center',
                  }}
                />

                <h2
                  className="text-[clamp(28px,8vw,50px)] md:text-[2.8rem]"
                  style={{
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
                  className="w-6 h-6 md:w-9 md:h-9 ml-4 md:ml-6"
                  style={{
                    imageRendering: 'pixelated',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'center',
                  }}
                />
              </div>

              {/* Background highlight removed per request */}

              <h1
                className="hero-title text-[1.8rem] md:text-[3.5rem] tracking-[1px] md:tracking-[2px] leading-[1.2] md:leading-[1.1] whitespace-normal md:whitespace-nowrap max-w-[280px] md:max-w-fit break-words md:break-normal"
                style={{
                  color: '#0a164d',
                  marginBottom: '0',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  fontWeight: '800',
                  fontFamily:
                    "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textShadow: 'none',
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  display: 'block',
                  width: '100%',
                }}
              >
                MANDY&apos;S WORKSHOP
              </h1>
            </div>

            <p
              className="hero-subtext text-[0.6rem] md:text-2xl mb-10 md:mb-8 leading-[1.5] md:leading-[1.6] px-8 md:px-0 max-w-80 md:max-w-none mx-auto md:mx-0"
              style={{
                color: '#0a164d',
                fontWeight: '600',
                fontFamily: "'Roboto Mono', 'Courier New', monospace",
                letterSpacing: '0.5px',
                opacity: 1,
                textAlign: 'center',
              }}
            >
              Design with AI, build with Mandy, and shop the toolkit to make it
              real.
            </p>

            {/* Enhanced Buttons */}
            <div
              className="hero-buttons-container flex justify-center items-center gap-4 md:gap-4 flex-col md:flex-row max-w-80 md:max-w-none mx-auto px-4 pb-10 md:px-0 md:pb-8"
              style={{
                flexWrap: 'nowrap',
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
                    className={`inflatable-button hero-button ${styles.heroButton} h-[60px] md:h-[140px] w-full md:w-[220px] p-2 md:p-5 rounded-xl md:rounded-[20px] min-w-[200px] md:min-w-[220px] max-w-[280px] md:max-w-none`}
                    style={{
                      margin: '0 auto',
                    }}
                  >
                    {/* Tab Content */}
                    <div className="flex items-center justify-center h-full relative z-20 gap-3 md:gap-2 w-full flex-row md:flex-col">
                      {item.id === 'room' ? (
                        // Special case for Room Makeover button with inflatable bed image
                        <>
                          <Image
                            src="/inflatable bed button.png"
                            alt="Inflatable Bed"
                            width={80}
                            height={80}
                            className="w-9 h-9 md:w-20 md:h-20 flex-shrink-0"
                            style={{
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            className="text-[1.1rem] md:text-[1.4rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
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
                            className="w-9 h-9 md:w-20 md:h-20 flex-shrink-0"
                            style={{
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            className="text-[1.1rem] md:text-[1.4rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
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
                            className="w-9 h-9 md:w-20 md:h-20 flex-shrink-0"
                            style={{
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            className="text-[1.1rem] md:text-[1.4rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            SHOP TOOLKITS
                          </div>
                        </>
                      ) : (
                        // Default button content for other buttons
                        <>
                          <Icon
                            className="text-white w-5 h-5 md:w-6 md:h-6 min-w-5 min-h-5 md:min-w-6 md:min-h-6 block"
                            style={{
                              color: '#ffffff !important',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            className="text-4 md:text-[1.4rem] text-center leading-4 md:leading-[1.1] uppercase tracking-[1px]"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontWeight: '700',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-4 md:text-[1.4rem] text-center leading-4 md:leading-[1.1] opacity-90"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              color: '#ffffff !important',
                              fontWeight: '600',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
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
