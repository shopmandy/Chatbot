import { MessageCircle, ShoppingBag, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
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
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          zIndex: 2,
          background: 'transparent',
          backgroundImage: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className="w-[95%] md:w-[min(95%,836px)]"
          style={{
            backgroundColor: '#ffffff',
            background: '#ffffff',
            backgroundImage: 'none',
            border: '2px solid transparent',
            borderRadius: '24px',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.4),
              0 0 20px rgba(255, 154, 209, 0.5),
              0 0 40px rgba(240, 120, 197, 0.4),
              0 0 60px rgba(212, 183, 255, 0.3),
              0 8px 32px rgba(255, 105, 180, 0.25),
              0 4px 16px rgba(212, 183, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            overflow: 'visible',
            marginBottom: '0rem',
            position: 'relative',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'clamp(500px, 80vh, 700px)',
          }}
        >
          {/* Holographic Border Effect */}
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              background: 'linear-gradient(45deg, #FF9AD1, #F078C5, #D4B7FF, #FF6FB4, #C896FF)',
              borderRadius: '26px',
              zIndex: -1,
              opacity: 0.9,
              filter: 'blur(2px)',
            }}
          />
          {/* Enhanced Window Title Bar */}
          <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
              <Star className={styles.starIcon} />
              <span className={styles.headerText}>YOUR DIY BFF</span>
            </div>
            <div className={styles.headerRight}>
              <button
                className={styles.windowButton}
                title="Minimize"
                onClick={handleMinimize}
              >
                ─
              </button>
              <button
                className={styles.windowButton}
                title="Maximize"
              >
                □
              </button>
              <button
                className={styles.windowButton}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Enhanced Section Content */}
          <div
            className="p-3 md:p-6"
            style={{
              textAlign: 'center',
              display: isMinimized ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              minHeight: 'clamp(400px, 60vh, 600px)',
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
                  className="text-[clamp(20px,6vw,35px)] md:text-[2rem]"
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
                className="hero-title text-[1.4rem] md:text-[2.5rem] tracking-[1px] md:tracking-[2px] leading-[1.1] md:leading-[1.1]"
                style={{
                  color: '#0a164d',
                  marginTop: '0.5rem',
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
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                  fontSize: 'clamp(40px, 2.5rem, 2.5rem)',
                }}
              >
                MANDY&apos;S WORKSHOP
              </h1>
            </div>

            <p
              className="hero-subtext text-[0.7rem] md:text-2xl mb-6 md:mb-8 leading-[1.4] md:leading-[1.6] px-4 md:px-0 max-w-90 md:max-w-none mx-auto md:mx-0"
              style={{
                color: '#0a164d',
                fontWeight: '600',
                fontFamily: "'Attila Sans Classic', 'Arial', 'Helvetica', sans-serif",
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
              className="hero-buttons-container flex justify-center items-center gap-3 md:gap-4 flex-col md:flex-row max-w-90 md:max-w-none mx-auto px-2 pb-6 md:px-0 md:pb-8"
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
                    className="inflatable-button hero-button h-[50px] md:h-[140px] w-full md:w-[220px] p-2 md:p-5 rounded-xl md:rounded-[20px] min-w-[180px] md:min-w-[220px] max-w-[260px] md:max-w-none"
                    style={{
                      margin: '0 auto',
                    }}
                  >
                    {/* Tab Content */}
                    <div className="flex items-center justify-center h-full relative z-20 gap-2 md:gap-2 w-full flex-row md:flex-col">
                      {item.id === 'room' ? (
                        // Special case for Room Makeover button with inflatable bed image
                        <>
                          <Image
                            src="/inflatable bed button.png"
                            alt="Inflatable Bed"
                            width={80}
                            height={80}
                            className="w-8 h-8 md:w-20 md:h-20 flex-shrink-0"
                            style={{
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <div
                            className="text-[0.5rem] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif !important",
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
                            className="text-[0.5rem] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif !important",
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
                            className="text-[0.5rem] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-normal md:whitespace-nowrap"
                            style={{
                              fontFamily:
                                "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif !important",
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
                                "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif !important",
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
                                "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif !important",
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
