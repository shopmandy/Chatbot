import { CTASection } from './CTASection'
import { HeroSection } from './HeroSection'
import { InflatableToolsSection } from './InflatableToolsSection'
import { InstagramSection } from './InstagramSection'
import { RoomMakeoverHero } from './RoomMakeoverHero'
import { Step2ChatbotSection } from './Step2ChatbotSection'
import { Step3ToolkitSection } from './Step3ToolkitSection'
import { useEffect } from 'react'

export function HomePage() {
  // Force solid background on home page; disable global overlays that can look pixelated
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('home-solid')
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('home-solid')
      }
    }
  }, [])

  return (
    <div
      style={{
        background: '#f4ebff',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: '#ff0080',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden' as const,
        margin: 0,
        padding: 0,
      }}
    >
      {/* Hero Section - No spacing */}
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <HeroSection />
      </div>
      {/* All other sections with consistent spacing */}
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <InflatableToolsSection />
      </div>
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <RoomMakeoverHero 
          onGetStarted={() => {
            window.location.href = '/room'
          }}
          showSubheadline={false}
        />
      </div>
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <Step2ChatbotSection />
      </div>
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <Step3ToolkitSection />
      </div>
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <InstagramSection />
      </div>
      <div style={{ width: '100%', marginTop: '3rem' }}>
        <CTASection />
      </div>
    </div>
  )
}
