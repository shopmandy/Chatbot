import { AboutSection } from './AboutSection'
import { CTASection } from './CTASection'
import { FounderSection } from './FounderSection'
import { HeroSection } from './HeroSection'
import { InstagramSection } from './InstagramSection'

export function HomePage() {
  return (
    <div
      style={{
        backgroundColor: '#ffe0f2',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: '#ff0080',
        minHeight: '100vh',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <HeroSection />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <AboutSection />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <FounderSection />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <InstagramSection />
      </div>
      <div>
        <CTASection />
      </div>
    </div>
  )
}
