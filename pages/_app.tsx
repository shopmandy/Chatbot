import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import { ClerkProvider, useUser } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BubbleHamburger } from '../components/BubbleHamburger'
import { NavigationMenu, navItems } from '../components/NavigationMenu'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const activeTab =
    navItems.find(item => item.path === router.pathname)?.id || 'home'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    console.log('Toggling sidebar from:', sidebarOpen, 'to:', !sidebarOpen)
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    console.log('Closing sidebar')
    setSidebarOpen(false)
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      closeSidebar()
    }
  }, [router.pathname])

  // Debug sidebar state changes
  useEffect(() => {
    console.log('Sidebar state changed to:', sidebarOpen)
  }, [sidebarOpen])

  // Ensure all pages start at the top when navigating
  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined') {
        // Use requestAnimationFrame to ensure it happens after render
        requestAnimationFrame(() => {
          window.scrollTo(0, 0)
          // Also try to scroll the document element
          if (document.documentElement) {
            document.documentElement.scrollTop = 0
          }
          if (document.body) {
            document.body.scrollTop = 0
          }
        })
      }
    }

    // Listen to route changes
    router.events.on('routeChangeComplete', handleRouteChange)

    // Also handle initial load
    if (typeof window !== 'undefined') {
      handleRouteChange()
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  function OnboardingWrapper({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser()
    const wrapperRouter = useRouter()

    useEffect(() => {
      if (!isLoaded) return

      const onboardingComplete = user?.unsafeMetadata?.onboardingComplete

      if (
        user &&
        onboardingComplete !== true &&
        !wrapperRouter.pathname.startsWith('/onboarding')
      ) {
        wrapperRouter.push('/onboarding/step1')
      }
    }, [wrapperRouter.pathname, isLoaded, user, wrapperRouter])

    return <>{children}</>
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <OnboardingWrapper>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Poppins:wght@200;300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Hamburger menu for mobile - hidden when sidebar is open */}
        {!sidebarOpen && (
          <div className="mobile-hamburger-container">
            <BubbleHamburger
              onClick={() => {
                toggleSidebar()
              }}
              aria-label="Open navigation menu"
            />
          </div>
        )}
        <div className="app-layout">
          {/* Backdrop overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1999,
              }}
              onClick={() => closeSidebar()}
            />
          )}
          {/* Sidebar: slide-in for mobile */}
          <aside
            className={`sidebar${sidebarOpen ? ' open' : ''}`}
            style={
              sidebarOpen
                ? { boxShadow: '2px 0 16px 0 rgba(249, 27, 143, 0.18)' }
                : {}
            }
          >
            {/* Close button for mobile sidebar */}
            <button
              className="close-sidebar"
              aria-label="Close navigation menu"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                closeSidebar()
              }}
              style={{
                display: 'none',
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                color: '#f91b8f',
                fontSize: '2.2rem',
                zIndex: 2101,
              }}
            >
              <span aria-hidden="true">✕</span>
            </button>
            {/* Brand Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/inflatable hammer.png"
                  alt="Inflatable Hammer"
                  width={45}
                  height={45}
                  style={{
                    width: '45px',
                    height: 'auto',
                    imageRendering: 'pixelated',
                  }}
                />
              </div>
              <h2
                className="brand-heading"
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#f91b8f',
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: '0.1em',
                  fontFamily:
                    "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
                  textTransform: 'uppercase',
                }}
              >
                MANDY&apos;S
              </h2>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#f91b8f',
                  opacity: 0.7,
                  fontWeight: 600,
                  margin: 0,
                  fontFamily:
                    "'Press Start 2P', VT323, Poppins, Montserrat, Arial, sans-serif",
                  letterSpacing: '0.18em',
                }}
              >
                WORKSHOP
              </p>
            </div>
            {/* Navigation Menu Component */}
            <NavigationMenu activeTab={activeTab} />
          </aside>
          <div className="main-content">
            {/* Top Center Logo */}
            <div className="top-center-logo" onClick={() => router.push('/')}>
              <Image
                src="/mandy AI logo.png"
                alt="Mandy AI Logo"
                width={120}
                height={120}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <Component {...pageProps} />
            <Analytics />
          </div>
        </div>
      </OnboardingWrapper>
    </ClerkProvider>
  )
}
