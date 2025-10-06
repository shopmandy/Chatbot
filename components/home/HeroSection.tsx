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
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent',
        marginTop: '8px',
        paddingTop: '140px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        overflow: 'visible',
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
          overflow: 'visible',
        }}
      >
        <div
          className="w-[95%] md:w-[min(95%,836px)]"
          style={{
            backgroundColor: '#ffffff',
            border: '3px solid transparent',
            borderRadius: '24px',
            background: `
              linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #B894E6 0%, #C894E6 25%, #D894E6 50%, #E694D6 75%, #E694C6 100%) border-box
            `,
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
            margin: '0 auto',
            marginBottom: '0rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'clamp(400px, 75vh, 620px)',
          }}
        >
          
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
            className="pt-8 px-3 md:p-6"
            style={{
              textAlign: 'center',
              display: isMinimized ? 'none' : 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              transition: 'all 0.3s ease',
              overflow: 'visible',
              minHeight: 'clamp(440px, 65vh, 660px)',
            }}
          >
            <div
              className="-mt-10 mb-8 md:mt-0 md:mb-8 translate-y-4 md:translate-y-0"
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {/* Left Hammer */}
                <Image
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-12 md:h-12"
                  style={{
                    imageRendering: 'pixelated',
                    transform: 'rotate(45deg) scaleX(-1)',
                    transformOrigin: 'center',
                  }}
                />

                <h2
                  style={{
                    color: '#0a164d',
                    margin: '0',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    lineHeight: '1.1',
                    fontFamily:
                      "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                    textShadow: 'none',
                    whiteSpace: 'nowrap',
                    fontSize: 'calc(var(--heroTitleSize) / 2)',
                  }}
                >
                  WELCOME TO
                </h2>

                {/* Right Hammer */}
                <Image
                  src="/pixelated hammer icon.png"
                  alt="Hammer"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-12 md:h-12"
                  style={{
                    imageRendering: 'pixelated',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'center',
                  }}
                />
              </div>

              {/* Background highlight removed per request */}

              <h1
                className={`${styles.heroTitle} hero-title tracking-[1px] leading-[1.05]`}
                style={{
                  color: '#0a164d',
                  marginTop: '1.5rem',
                  marginBottom: '1.5rem',
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
                  whiteSpace: 'normal',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    fontSize: 'var(--heroTitleSize)',
                    lineHeight: 1.05,
                  }}
                >
                  MANDY&apos;S
                </span>
                <span
                  style={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    fontSize: 'var(--heroTitleSize)',
                    lineHeight: 1.05,
                  }}
                >
                  WORKSHOP
                </span>
              </h1>
            </div>

            <p
              className="hero-subtext mt-0 md:mt-0 mb-0 md:mb-0 leading-[1.1] md:leading-[1.2] px-1 md:px-0 max-w-90 md:max-w-none mx-auto md:mx-0"
              style={{
                color: '#0a164d',
                fontWeight: '600',
                fontFamily: "'Attila Sans Classic', 'Arial', 'Helvetica', sans-serif",
                letterSpacing: '0.5px',
                opacity: 1,
                textAlign: 'center',
                fontSize: 'clamp(1.05rem, 2.5vw, 1.75rem)',
                marginTop: '0rem',
                marginBottom: '2rem',
                lineHeight: '1.1',
              }}
            >
              Design with AI, build with Mandy, and shop the toolkit to make it
              real.
            </p>

            {/* Enhanced Buttons */}
            <div
              className="hero-buttons-container mt-8 md:mt-6 flex justify-center items-center gap-4 md:gap-5 flex-col md:flex-row max-w-90 md:max-w-none mx-auto px-2 pb-14 md:px-0 md:pb-10"
              style={{
                flexWrap: 'nowrap',
                overflow: 'visible',
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
                    className="inflatable-button hero-button h-[28px] md:h-[140px] w-full md:w-[220px] py-[2px] px-2 md:p-5 rounded-xl md:rounded-[20px] min-w-[180px] md:min-w-[220px] max-w-[260px] md:max-w-none"
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
                            className="text-[12px] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-nowrap"
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
                            className="text-[12px] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-nowrap"
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
                            className="text-[12px] md:text-[0.8rem] text-center leading-[1.1] uppercase tracking-[1px] flex-1 md:flex-none whitespace-nowrap"
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
  );
}
