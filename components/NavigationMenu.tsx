import { Home, MessageCircle, ShoppingBag, Sparkles, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../pages/App.module.css'

export interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  path: string
  external?: boolean
}

export const navItems: NavItem[] = [
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
  { id: 'profile', label: 'My Profile', icon: User, path: '/profile' },
]

interface NavigationMenuProps {
  activeTab: string
}

export function NavigationMenu({ activeTab }: NavigationMenuProps) {
  const getImageForItem = (itemId: string) => {
    const imageMap = {
      home: '/inflatable home.png',
      room: '/inflatable bed button.png',
      chatbot: '/inflatable chat button.png',
      shop: '/inflatable shop tools button.png',
      profile: '/inflateable profile.png',
    }
    return imageMap[itemId as keyof typeof imageMap]
  }

  const renderNavItem = (item: NavItem) => {
    const isActive = activeTab === item.id
    const Icon = item.icon
    const imageSrc = getImageForItem(item.id)

    const buttonContent = (
      <>
        <div className="flex flex-col items-center gap-2 relative z-10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${item.label} Icon`}
              width={28}
              height={28}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
          ) : (
            <Icon
              className="w-5 h-5 text-white drop-shadow-sm"
              style={{
                color: '#ffffff !important',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
          )}
          <span className="nav-button-text">{item.label.toUpperCase()}</span>
        </div>
      </>
    )

    const buttonClasses = `inflatable-button relative py-[2px] px-2 md:p-8 rounded-xl md:rounded-[20px] border-2 font-bold text-xs
      transition-transform duration-150 min-h-[100px] max-w-[240px] w-full mx-auto
      flex flex-col items-center justify-center gap-2
      ${styles.navButton}
      ${isActive ? styles.active : ''}`

    if (item.external) {
      return (
        <a
          key={item.id}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
        >
          {buttonContent}
        </a>
      )
    }

    return (
      <Link key={item.id} href={item.path} className={buttonClasses}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ flex: 1, width: '100%' }}>
      {/* Keep nav from stretching so footer is always visible */}
      <nav className="sidebar-nav" style={{ width: '100%', flexGrow: 0 }}>
        {navItems.map(renderNavItem)}
      </nav>

      {/* Animated dots and EST. 2025 section */}
      <div className="mt-4 text-center" style={{ width: '100%' }}>
        <div className="flex justify-center gap-2 mb-2">
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
    </div>
  )
}
