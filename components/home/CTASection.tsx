import { Mail, Sparkles } from 'lucide-react'
import { useCallback, useState } from 'react'

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
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(250, 238, 246, 0.9) 100%)',
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
              <Sparkles style={{ width: 20, height: 20, color: '#f91b8f' }} />
              READY TO START BUILDING?
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
              padding: '1rem',
              textAlign: 'center',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              style={{
                fontSize: '3.2rem',
                color: '#f91b8f',
                fontWeight: '700',
                letterSpacing: '2px',
                lineHeight: '1.2',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textAlign: 'center',
                marginBottom: '.5rem',
                textShadow: '0 4px 16px rgba(255, 105, 180, 0.3)',
              }}
            >
              YOUR NEXT PROJECT IS ONE
              <br />
              <span style={{ marginLeft: '2rem' }}>TOOLKIT AWAY</span>
            </h1>

            <p
              style={{
                fontSize: '1.4rem',
                color: '#f91b8f',
                marginBottom: '1rem',
                fontWeight: '600',
                lineHeight: '1.4',
                fontFamily:
                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                textAlign: 'center',
                opacity: 0.9,
              }}
            >
              Browse our complete collection of curated toolkits and find
              everything you need
              <br />
              to bring your DIY dreams to life. Quality tools, expert picks!
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
              <h3
                style={{
                  fontSize: '1.6rem',
                  color: '#f91b8f',
                  fontWeight: '700',
                  fontFamily:
                    "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textAlign: 'center',
                  marginBottom: '0.5rem',
                  letterSpacing: '1px',
                }}
              >
                GET EXCLUSIVE TOOLKIT UPDATES!
              </h3>

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
                  style={{ position: 'relative', flex: '1', minWidth: '280px' }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={subscriptionStatus.type === 'loading'}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: '1rem',
                      fontFamily:
                        "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
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
                  {/* Shadow layer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      left: '4px',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#4a1d3d',
                      borderRadius: '12px',
                      zIndex: 1,
                      opacity: 0.7,
                    }}
                  />
                  {/* Main button */}
                  <button
                    type="submit"
                    disabled={subscriptionStatus.type === 'loading'}
                    style={{
                      position: 'relative',
                      width: '160px',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontFamily:
                        "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                      fontWeight: '700',
                      letterSpacing: '1px',
                      borderRadius: '15px',
                      border: '2px solid #000',
                      padding: '16px 20px',
                      cursor:
                        subscriptionStatus.type === 'loading'
                          ? 'not-allowed'
                          : 'pointer',
                      margin: '0',
                      backgroundColor:
                        subscriptionStatus.type === 'loading'
                          ? '#fdd4e2'
                          : '#f91b8f',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      zIndex: 2,
                      transition: 'all 0.3s ease',
                      opacity: subscriptionStatus.type === 'loading' ? 0.7 : 1,
                    }}
                  >
                    <Mail style={{ width: 20, height: 20, color: 'white' }} />
                    <span>
                      {subscriptionStatus.type === 'loading'
                        ? 'Signing Up...'
                        : 'Sign Up'}
                    </span>
                  </button>
                </div>
              </form>

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
