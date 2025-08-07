import '@/styles/globals.css'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { Home, LogIn, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  {
    id: 'chatbot',
    label: 'DIY Chatbot',
    icon: MessageCircle,
    path: '/chatbot',
  },
  { id: 'room', label: 'Room Generator', icon: Sparkles, path: '/room' },
  {
    id: 'shop',
    label: 'Shop Toolkits',
    icon: ShoppingBag,
    path: 'https://shopmandy.com/',
    external: true,
  },
]

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const activeTab =
    navItems.find(item => item.path === router.pathname)?.id || 'home'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [router.pathname])

  function OnboardingWrapper({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser()
    const wrapperRouter = useRouter()

    useEffect(() => {
      setSidebarOpen(false)

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
        {/* Hamburger menu for mobile */}
        <button
          className="mobile-menu"
          aria-label="Open navigation menu"
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'fixed',
            top: 18,
            left: 18,
            zIndex: 2100,
            background: 'none',
            border: 'none',
            color: '#f91b8f',
            fontSize: '2.2rem',
            display: 'none',
          }}
        >
          <span aria-hidden="true">☰</span>
        </button>
        <div className="app-layout">
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
              onClick={() => setSidebarOpen(false)}
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
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                🔧
              </div>
              <h2
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#f91b8f',
                  lineHeight: 1,
                  margin: 0,
                  fontFamily:
                    "'Press Start 2P', VT323, Poppins, Montserrat, Arial, sans-serif",
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
                const isHovered = hoveredTab === item.id
                const Icon = item.icon
                if (item.external) {
                  return (
                    <a
                      key={item.id}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredTab(item.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`
                      relative px-6 py-4 rounded-3xl border-2 font-bold text-sm
                      transition-transform duration-150 min-h-[80px] max-w-[220px] w-full mx-auto
                      ${
                        isActive
                          ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white border-pink-300 transform scale-105'
                          : 'bg-gradient-to-br from-white via-pink-50 to-pink-100 text-pink-600 border-pink-200 hover:from-pink-100 hover:via-pink-150 hover:to-pink-200'
                      }
                      ${isHovered && !isActive ? 'transform scale-102' : ''}
                    `}
                      style={{
                        boxShadow: isActive
                          ? `\n                      0 8px 16px rgba(236, 72, 153, 0.3),\n                      0 4px 8px rgba(236, 72, 153, 0.2),\n                      inset 0 1px 0 rgba(255, 255, 255, 0.3),\n                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)\n                    `
                          : `\n                      0 6px 12px rgba(236, 72, 153, 0.15),\n                      0 2px 4px rgba(236, 72, 153, 0.1),\n                      inset 0 1px 0 rgba(255, 255, 255, 0.8),\n                      inset 0 -1px 0 rgba(236, 72, 153, 0.1)\n                    `,
                      }}
                    >
                      {/* Highlight overlay for 3D effect */}
                      <div
                        className={`
                      absolute top-2 left-2 right-2 h-4 rounded-t-2xl
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-white/20 to-white/10'
                          : 'bg-gradient-to-r from-white/60 to-white/30'
                      }
                    `}
                      />
                      {/* Tab Content */}
                      <div className="flex flex-col items-center gap-3 relative z-10">
                        <Icon
                          className={`w-8 h-8 ${isActive ? 'text-white drop-shadow-sm' : 'text-pink-600'}`}
                        />
                        <span
                          className={`text-sm leading-tight text-center font-bold ${isActive ? 'text-white drop-shadow-sm' : 'text-pink-600'}`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {/* Inner glow for active state */}
                      {isActive && (
                        <div className="absolute inset-3 rounded-2xl bg-white/5 animate-pulse pointer-events-none" />
                      )}
                    </a>
                  )
                }
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`
                    relative px-6 py-4 rounded-3xl border-2 font-bold text-sm
                    transition-transform duration-150 min-h-[80px] max-w-[220px] w-full mx-auto
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white border-pink-300 transform scale-105'
                        : 'bg-gradient-to-br from-white via-pink-50 to-pink-100 text-pink-600 border-pink-200 hover:from-pink-100 hover:via-pink-150 hover:to-pink-200'
                    }
                    ${isHovered && !isActive ? 'transform scale-102' : ''}
                  `}
                    style={{
                      boxShadow: isActive
                        ? `\n                    0 8px 16px rgba(236, 72, 153, 0.3),\n                    0 4px 8px rgba(236, 72, 153, 0.2),\n                    inset 0 1px 0 rgba(255, 255, 255, 0.3),\n                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)\n                  `
                        : `\n                    0 6px 12px rgba(236, 72, 153, 0.15),\n                    0 2px 4px rgba(236, 72, 153, 0.1),\n                    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n                    inset 0 -1px 0 rgba(236, 72, 153, 0.1)\n                  `,
                    }}
                  >
                    {/* Highlight overlay for 3D effect */}
                    <div
                      className={`
                    absolute top-2 left-2 right-2 h-4 rounded-t-2xl
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-white/20 to-white/10'
                        : 'bg-gradient-to-r from-white/60 to-white/30'
                    }
                  `}
                    />
                    {/* Tab Content */}
                    <div className="flex flex-col items-center gap-3 relative z-10">
                      <Icon
                        className={`w-8 h-8 ${isActive ? 'text-white drop-shadow-sm' : 'text-pink-600'}`}
                      />
                      <span
                        className={`text-sm leading-tight text-center font-bold ${isActive ? 'text-white drop-shadow-sm' : 'text-pink-600'}`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {/* Inner glow for active state */}
                    {isActive && (
                      <div className="absolute inset-3 rounded-2xl bg-white/5 animate-pulse pointer-events-none" />
                    )}
                  </Link>
                )
              })}
            </nav>
            {/* Sign In/Up or User Button */}
            <div
              className="sidebar-auth"
              style={{ marginTop: '2rem', width: '100%' }}
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <a
                    className="nav-link"
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5em',
                      fontWeight: 700,
                    }}
                  >
                    <LogIn style={{ width: 20, height: 20 }} />
                    <span>SIGN IN</span>
                  </a>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {/* Animated dots and EST. 2024 section */}
              <div className="mt-6 text-center">
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
                  EST. 2024
                </p>
              </div>
            </div>
          </aside>
          <div className="main-content">
            <Component {...pageProps} />
            <footer
              style={{
                textAlign: 'center',
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#ffe0f2',
                color: '#ff0080',
                fontWeight: 'bold',
                borderTop: '2px solid #ff0080',
              }}
            >
              💖 Follow us on Instagram:{' '}
              <a
                href="https://www.instagram.com/shopmandytools"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff0080', textDecoration: 'underline' }}
              >
                @shopmandytools
              </a>
            </footer>
          </div>
        </div>
      </OnboardingWrapper>
    </ClerkProvider>
  )
}
