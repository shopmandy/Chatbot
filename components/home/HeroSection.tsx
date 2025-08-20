import { MessageCircle, ShoppingBag, Sparkles, Star } from 'lucide-react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export function HeroSection() {
  const router = useRouter()
  const [isMinimized, setIsMinimized] = useState(false)

  // Optimized click handler using Next.js router
  const handleButtonClick = useCallback(
    (url: string) => {
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
    {
      id: 'chatbot',
      label: 'DIY Chatbot',
      icon: MessageCircle,
      path: '/chatbot',
    },
    { id: 'room', label: 'Room Makeover', icon: Sparkles, path: '/room' },
    {
      id: 'shop',
      label: 'Shop Toolkits',
      icon: ShoppingBag,
      path: 'https://shopmandy.com/',
      external: true,
    },
  ]

  return (
    <div className="hero-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(224, 234, 255, 0.9) 100%)',
            border: '3px solid #f91b8f',
            borderRadius: '24px',
            boxShadow:
              '0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            marginBottom: '3rem',
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
                'linear-gradient(135deg, rgba(255, 200, 230, 0.95) 0%, #c8d2f0 100%)',
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
              <Star style={{ width: 20, height: 20, color: '#f91b8f' }} />
              YOUR DIY BFF
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
              textAlign: 'center',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              style={{
                fontSize: '3.2rem',
                color: '#f91b8f',
                marginBottom: '1.5rem',
                fontWeight: '700',
                lineHeight: '1.3',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textShadow: '0 4px 16px rgba(255, 105, 180, 0.3)',
              }}
            >
              WELCOME TO MANDY&apos;S WORKSHOP
            </h1>

            <p
              style={{
                fontSize: '1.8rem',
                color: '#f91b8f',
                marginBottom: '3rem',
                fontWeight: '600',
                lineHeight: '1.4',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                opacity: 0.9,
              }}
            >
              Get instant help with home projects, decor ideas, and DIY tips.
              Just ask Mandy anything!
            </p>

            {/* Enhanced Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
              }}
            >
              {navItems.map(item => {
                const Icon = item.icon
                const subheadings = {
                  chatbot: 'Chat with Mandy',
                  room: 'AI-powered design',
                  shop: 'Get equipped',
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleButtonClick(item.path)}
                    className="nav-link home-button"
                    style={{
                      width: '180px',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontFamily:
                        "'Press Start 2P', VT323, Poppins, Montserrat, Arial, sans-serif",
                      fontWeight: '700',
                      letterSpacing: '1px',
                      borderRadius: '28px',
                      border: 'none',
                      padding: '0.8rem 1.2rem',
                      cursor: 'pointer',
                      margin: '0',
                      height: 'auto',
                      minHeight: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      background:
                        'linear-gradient(135deg, #fff6fa 0%, #f0f3fb 100%)',
                      boxShadow: '0 8px 24px rgba(255, 105, 180, 0.2)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <Icon style={{ width: 28, height: 28 }} />
                    <span>{item.label}</span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        opacity: 0.8,
                        lineHeight: 1.2,
                        padding: '0.5rem',
                        fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
                      }}
                    >
                      {subheadings[item.id as keyof typeof subheadings]}
                    </span>
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
