import { MessageCircle, ShoppingBag, Sparkles, Star, User } from 'lucide-react'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export function HeroSection() {
  const router = useRouter()
  const [isMinimized, setIsMinimized] = useState(false)

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
      id: 'profile',
      label: 'My Profile',
      icon: User,
      path: '/profile',
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
    <div>
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
              padding: '2andrem',
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
                letterSpacing: '2px',
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
                fontSize: '1.2rem',
                color: '#f91b8f',
                marginBottom: '3rem',
                fontWeight: '600',
                lineHeight: '1.4',
                fontFamily: 'Roboto Mono, monospace',
                opacity: 0.9,
              }}
            >
              Decorate your room with AI, get expert help from our DIY bot, and
              shop our tools to bring your project to life.
            </p>

            {/* Enhanced Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                paddingBottom: '2rem',
                maxWidth: '1000px',
                margin: '0 auto',
              }}
            >
              {navItems.map(item => {
                const Icon = item.icon
                const subheadings = {
                  room: 'AI-powered design',
                  chatbot: 'Expert DIY guidance',
                  profile: 'Manage preferences',
                  shop: 'Get equipped',
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleButtonClick(item.path, item.id)}
                    className="relative rounded-3xl border-2 font-bold text-sm transition-transform duration-150 bg-gradient-to-br from-white via-pink-50 to-pink-100 text-pink-600 border-pink-200 hover:from-pink-100 hover:via-pink-150 hover:to-pink-200"
                    style={{
                      minHeight: '120px',
                      maxWidth: '220px',
                      width: '100%',
                      flex: '1',
                      margin: '0',
                      padding: '1.5rem 1rem',
                      boxShadow: `
                        0 6px 12px rgba(236, 72, 153, 0.15),
                        0 2px 4px rgba(236, 72, 153, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8),
                        inset 0 -1px 0 rgba(236, 72, 153, 0.1)
                      `,
                    }}
                  >
                    {/* Highlight overlay for 3D effect */}
                    <div className="absolute top-2 left-2 right-2 h-4 rounded-t-2xl bg-gradient-to-r from-white/60 to-white/30" />
                    {/* Tab Content */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <Icon className="w-6 h-6 text-pink-600" />
                      <span
                        className="leading-tight text-center font-bold text-pink-600"
                        style={{
                          fontFamily: 'Roboto Mono, monospace',
                          fontSize: '0.95rem',
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="text-xs text-pink-500 opacity-80 font-medium text-center"
                        style={{ fontFamily: 'Roboto Mono, monospace' }}
                      >
                        {subheadings[item.id as keyof typeof subheadings]}
                      </span>
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
