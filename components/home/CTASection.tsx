import { Mail, Star } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'

interface SubscriptionStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function CTASection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [email, setEmail] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>({ type: 'idle' })
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

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || !email.includes('@')) {
        setSubscriptionStatus({
          type: 'error',
          message: 'Please enter a valid email address',
        })
        return
      }

      setSubscriptionStatus({ type: 'loading' })

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (response.ok) {
          setSubscriptionStatus({
            type: 'success',
            message: "Thanks for signing up! You'll hear from us soon.",
          })
          setEmail('')
        } else {
          setSubscriptionStatus({
            type: 'error',
            message:
              typeof data.error === 'string'
                ? data.error
                : 'Something went wrong. Please try again.',
          })
        }
      } catch (error) {
        console.error('Email subscription error:', error)
        setSubscriptionStatus({
          type: 'error',
          message: 'Network error. Please check your connection and try again.',
        })
      }
    },
    [email]
  )

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div
          style={{
            background: '#ffffff',
            border: '3px solid #ff69b4',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: isMobile ? '4rem' : '6rem',
            position: 'relative',
            maxWidth: isMobile ? '95%' : '836px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
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
              padding: '8px 12px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '14px',
              fontWeight: '700',
              color: '#000000',
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
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#000000',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
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
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#000000',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
                }}
                title="Maximize"
              >
                □
              </button>
              <button 
                style={{
                  width: '16px',
                  height: '14px',
                  background: '#c0c0c0',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
                  color: '#000000',
                  cursor: 'pointer',
                  boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
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
              padding: '1rem',
              textAlign: 'center',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? '2rem' : '3.2rem',
                color: '#0a164d',
                marginBottom: '1rem',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.2',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textAlign: 'center',
                textShadow: '1px 1px 0px rgba(10, 22, 77, 0.5)',
              }}
            >
              JOIN THE MANDY WORKSHOP
            </h1>

            <p
              style={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                color: '#0a164d',
                marginBottom: '1rem',
                fontWeight: '600',
                lineHeight: '1.5',
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textAlign: 'center',
                opacity: 0.9,
              }}
            >
              Get 15% off your first toolkit, early access to our AI design tools, and DIY inspo you won't find anywhere else.
            </p>

            {/* Email Signup Form */}
            <div
              style={{
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.5rem',
              }}
            >
              <form
                onSubmit={handleEmailSubmit}
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '500px',
                }}
              >
                <div
                  style={{ position: 'relative', flex: '1', minWidth: '320px' }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email…"
                    required
                    disabled={subscriptionStatus.type === 'loading'}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: '1rem',
                      fontFamily: 'Roboto Mono, monospace',
                      fontWeight: '600',
                      border: '3px solid #f91b8f',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#4a1d3d',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 16px rgba(255, 105, 180, 0.2)',
                    }}
                  />
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {/* Main button */}
                  <button
                    type="submit"
                    disabled={subscriptionStatus.type === 'loading'}
                    style={{
                      width: '160px',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                      fontWeight: '700',
                      letterSpacing: '2px !important',
                      borderRadius: '20px !important',
                      border: '3px solid #ff1493 !important',
                      padding: '16px 20px',
                      cursor:
                        subscriptionStatus.type === 'loading'
                          ? 'not-allowed'
                          : 'pointer',
                      margin: '0',
                      background: subscriptionStatus.type === 'loading'
                        ? 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%) !important'
                        : 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%) !important',
                      color: '#ffffff !important',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'all 0.2s ease !important',
                      opacity: subscriptionStatus.type === 'loading' ? 0.7 : 1,
                      boxShadow: '0 4px 12px rgba(255, 20, 147, 0.3) !important',
                      transform: 'none !important',
                      filter: 'none !important',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3) !important',
                      imageRendering: 'auto !important',
                    }}
                  >
                    <span>
                      {subscriptionStatus.type === 'loading'
                        ? 'Signing Up...'
                        : 'Get 15% Off'}
                    </span>
                  </button>
                </div>
              </form>

              {/* Trust line */}
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#0a164d',
                  opacity: 0.8,
                  fontFamily: 'Roboto Mono, monospace',
                  fontWeight: '500',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                }}
              >
                No spam, just tools, tips, and early drops.
              </p>

              {/* Status Messages */}
              {subscriptionStatus.message && (
                <div
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily:
                      "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                    fontWeight: '600',
                    textAlign: 'center',
                    backgroundColor:
                      subscriptionStatus.type === 'success'
                        ? 'rgba(74, 222, 128, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                    color:
                      subscriptionStatus.type === 'success'
                        ? '#166534'
                        : '#dc2626',
                    border: `2px solid ${
                      subscriptionStatus.type === 'success'
                        ? '#22c55e'
                        : '#ef4444'
                    }`,
                  }}
                >
                  {subscriptionStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
