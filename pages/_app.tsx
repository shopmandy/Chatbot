import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/next'
import styles from './App.module.css'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import {
  Home,
  LogIn,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  User,
} from 'lucide-react'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BubbleHamburger } from '../components/BubbleHamburger'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
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
  {
    id: 'profile',
    label: 'My Profile',
    icon: User,
    path: '/profile',
  },
]

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
                  fontWeight: 600,
                  color: '#f91b8f',
                  lineHeight: 1,
                  margin: 0,
                  letterSpacing: '0.18em',
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
            {/* Navigation Items */}
            <nav className="sidebar-nav" style={{ flex: 1, width: '100%' }}>
              {navItems.map(item => {
                const isActive = activeTab === item.id
                const isHovered = false // Use CSS hover states instead
                const Icon = item.icon
                if (item.external) {
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inflatable-button relative px-4 py-3 rounded-2xl border-2 font-bold text-xs
                      transition-transform duration-150 min-h-[80px] max-w-[200px] w-full mx-auto
                      ${styles.navButton}
                      ${isActive ? styles.active : ''}
                      ${isHovered && !isActive ? 'hover:scale-102' : ''}`}
                    >
                      {/* Removed glossy highlight overlay for matte effect */}
                      {/* Tab Content */}
                      <div className="flex flex-col items-center gap-2 relative z-10">
                        {item.id === 'room' ? (
                          // Special case for Room Makeover button with inflatable bed image
                          <>
                            <Image
                              src="/inflatable bed button.png"
                              alt="Inflatable Bed"
                              width={30}
                              height={30}
                              style={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'contain',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif",
                                fontWeight: 700,
                                color: '#ffffff',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '1.4rem',
                              }}
                            >
                              ROOM MAKEOVER
                            </span>
                          </>
                        ) : item.id === 'chatbot' ? (
                          // Special case for DIY Chatbot button with inflatable chat image
                          <>
                            <Image
                              src="/inflatable chat button.png"
                              alt="Inflatable Chat"
                              width={30}
                              height={30}
                              style={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'contain',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'Druk Wide Web Bold', 'Druk', 'Arial Black', sans-serif",
                                fontWeight: 700,
                                color: '#ffffff',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                fontSize: '1.4rem',
                              }}
                            >
                              DIY CHATBOT
                            </span>
                          </>
                        ) : item.id === 'shop' ? (
                          // Special case for Shop Toolkits button with inflatable shop tools image
                          <>
                            <Image
                              src="/inflatable shop tools button.png"
                              alt="Inflatable Shop Tools"
                              width={30}
                              height={30}
                              style={{
                                width: '30px',
                                height: '30px',
                                objectFit: 'contain',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                                fontWeight: 700,
                                color: '#ffffff !important',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '1.4rem !important',
                              }}
                            >
                              SHOP TOOLKITS
                            </span>
                          </>
                        ) : item.id === 'home' ? (
                          // Special case for Home button with inflatable home image
                          <>
                            <Image
                              src="/inflatable home.png"
                              alt="Inflatable Home"
                              width={28}
                              height={28}
                              style={{
                                width: '28px',
                                height: '28px',
                                objectFit: 'contain',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                                fontWeight: 700,
                                color: '#ffffff !important',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '1.4rem !important',
                              }}
                            >
                              HOME
                            </span>
                          </>
                        ) : item.id === 'profile' ? (
                          // Special case for Profile button with inflatable profile image
                          <>
                            <Image
                              src="/inflateable profile.png"
                              alt="Inflatable Profile"
                              width={28}
                              height={28}
                              style={{
                                width: '28px',
                                height: '28px',
                                objectFit: 'contain',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                                fontWeight: 700,
                                color: '#ffffff !important',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '1.4rem !important',
                              }}
                            >
                              PROFILE
                            </span>
                          </>
                        ) : (
                          // Default button content for other buttons
                          <>
                            <Icon
                              className="w-6 h-6 text-white drop-shadow-sm"
                              style={{
                                color: '#ffffff !important',
                                filter:
                                  'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                              }}
                            />
                            <span
                              className="text-xs leading-tight text-center text-white drop-shadow-sm"
                              style={{
                                fontFamily:
                                  "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                                fontWeight: 700,
                                color: '#ffffff !important',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '1.4rem !important',
                              }}
                            >
                              {item.label}
                            </span>
                          </>
                        )}
                      </div>
                      {/* Removed inner glow for matte effect */}
                    </a>
                  )
                }
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`inflatable-button relative px-4 py-3 rounded-2xl border-2 font-bold text-xs
                    transition-transform duration-150 min-h-[80px] max-w-[200px] w-full mx-auto
                    ${styles.navButton}
                    ${isActive ? styles.active : ''}
                    ${isHovered && !isActive ? 'hover:scale-102' : ''}`}
                  >
                    {/* Removed glossy highlight overlay for matte effect */}
                    {/* Tab Content */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      {item.id === 'room' ? (
                        // Special case for Room Makeover button with inflatable bed image
                        <>
                          <Image
                            src="/inflatable bed button.png"
                            alt="Inflatable Bed"
                            width={40}
                            height={40}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontSize: '1.4rem !important',
                            }}
                          >
                            ROOM MAKEOVER
                          </span>
                        </>
                      ) : item.id === 'chatbot' ? (
                        // Special case for DIY Chatbot button with inflatable chat image
                        <>
                          <Image
                            src="/inflatable chat button.png"
                            alt="Inflatable Chat"
                            width={40}
                            height={40}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontSize: '1.4rem !important',
                            }}
                          >
                            DIY CHATBOT
                          </span>
                        </>
                      ) : item.id === 'shop' ? (
                        // Special case for Shop Toolkits button with inflatable shop tools image
                        <>
                          <Image
                            src="/inflatable shop tools button.png"
                            alt="Inflatable Shop Tools"
                            width={40}
                            height={40}
                            style={{
                              width: '40px',
                              height: '40px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontSize: '1.4rem !important',
                            }}
                          >
                            SHOP TOOLKITS
                          </span>
                        </>
                      ) : item.id === 'home' ? (
                        // Special case for Home button with inflatable home image
                        <>
                          <Image
                            src="/inflatable home.png"
                            alt="Inflatable Home"
                            width={28}
                            height={28}
                            style={{
                              width: '28px',
                              height: '28px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontSize: '1.4rem !important',
                            }}
                          >
                            HOME
                          </span>
                        </>
                      ) : item.id === 'profile' ? (
                        // Special case for Profile button with inflatable profile image
                        <>
                          <Image
                            src="/inflateable profile.png"
                            alt="Inflatable Profile"
                            width={28}
                            height={28}
                            style={{
                              width: '28px',
                              height: '28px',
                              objectFit: 'contain',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontSize: '1.4rem !important',
                            }}
                          >
                            PROFILE
                          </span>
                        </>
                      ) : (
                        // Default button content for other buttons
                        <>
                          <Icon
                            className="w-6 h-6 text-white drop-shadow-sm"
                            style={{
                              color: '#ffffff !important',
                              filter:
                                'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                            }}
                          />
                          <span
                            className="text-xs leading-tight text-center text-white drop-shadow-sm"
                            style={{
                              fontFamily:
                                "'VT323', 'Tiny5', 'Courier New', Courier, monospace !important",
                              fontWeight: 700,
                              color: '#ffffff !important',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                            }}
                          >
                            {item.label}
                          </span>
                        </>
                      )}
                    </div>
                    {/* Removed inner glow for matte effect */}
                  </Link>
                )
              })}
            </nav>
            {/* Sign In/Up for logged out users */}
            {/* Animated dots and EST. 2024 section */}
            <div
              className="mt-6 text-center"
              style={{ marginTop: 'auto', width: '100%' }}
            >
              <div className="flex justify-center gap-2 mb-4">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: 'hsl(320, 100%, 50%)' }}
                />
                <div
                  className="w-3 h-3 rounded-full animate-pulse delay-150"
                  style={{ background: 'hsl(320, 100%, 85%)' }}
                />
                <div
                  className="w-3 h-3 rounded-full animate-pulse delay-300"
                  style={{ background: 'hsl(320, 100%, 50%)' }}
                />
              </div>
              <p
                className="text-xs font-semibold"
                style={{ color: 'hsl(320, 100%, 50%)', opacity: 0.5 }}
              >
                EST. 2025
              </p>
            </div>
          </aside>
          <div className="main-content">
            <Component {...pageProps} />
            <Analytics />
          </div>
        </div>
      </OnboardingWrapper>
    </ClerkProvider>
  )
}
