import { Mail, Star } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'
import styles from './CTASection.module.css'

interface SubscriptionStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export function CTASection() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [email, setEmail] = useState('')
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>({ type: 'idle' })

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
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="mb-16 md:mb-24 max-w-[95%] md:max-w-[836px]"
          style={{
            backgroundColor: '#ffffff',
            border: '3px solid transparent',
            borderRadius: '20px',
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
            position: 'relative',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Holographic header strip like hero box */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background:
                'linear-gradient(90deg, #B894E6 0%, #C894E6 25%, #D894E6 50%, #E694D6 75%, #E694C6 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 12px',
              color: '#ffffff',
              boxShadow:
                'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
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
                fontFamily: "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif",
              }}
            >
              <Star style={{ width: 20, height: 20, color: '#0a164d' }} />
              <span style={{ 
                fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                fontSize: '15px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                color: '#ffffff',
                whiteSpace: 'nowrap'
              }}>
                WELCOME TO THE FAM
              </span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                style={{
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
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
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
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
                  width: '16px',
                  height: '16px',
                  background: '#ffffff',
                  border: '1px solid #808080',
                  borderRadius: '2px',
                  fontSize: '10px',
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
              padding: '1rem',
              textAlign: 'center',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              className="text-[24px] md:text-[2rem]"
              style={{
                color: '#0a164d',
                marginBottom: '1rem',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.2',
                fontFamily: "'Attila Sans Classic', 'Arial', 'Helvetica', sans-serif",
                textAlign: 'center',
                textShadow: 'none',
              }}
            >
              JOIN THE MANDY WORKSHOP
            </h1>

            <p
              className="text-sm md:text-base"
              style={{
                color: '#0a164d',
                marginBottom: '1rem',
                fontWeight: '600',
                lineHeight: '1.5',
                fontFamily: "'Attila Sans Classic', 'Arial', 'Helvetica', sans-serif",
                textAlign: 'center',
                opacity: 0.9,
              }}
            >
              GET 15% OFF your first toolkit, early access to our AI design
              tools, and DIY inspo you won't find anywhere else.
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
                      fontFamily: "'Attila Sans Classic', 'Arial', 'Helvetica', sans-serif",
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
                    className={styles.ctaButton}
                    style={{
                      opacity: subscriptionStatus.type === 'loading' ? 0.7 : 1,
                    }}
                  >
                    <span>
                      {subscriptionStatus.type === 'loading'
                        ? 'signing up...'
                        : 'GET 15% OFF'}
                    </span>
                  </button>
                </div>
              </form>

              {/* Trust line */}

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
