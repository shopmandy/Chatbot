import { CTASection } from './CTASection'
import { HeroSection } from './HeroSection'
import { InflatableToolsSection } from './InflatableToolsSection'
import { InstagramSection } from './InstagramSection'
import { RoomTransformationSection } from './RoomTransformationSection'
import { Step2ChatbotSection } from './Step2ChatbotSection'
import { Step3ToolkitSection } from './Step3ToolkitSection'
import { useEffect, useState } from 'react'

export function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #e4f6ff 0%, #e6d7ff 15%, #f0e6ff 30%, #ffe0f2 45%, #f0e6ff 60%, #e6d7ff 75%, #e4f6ff 90%, #e4f6ff 100%)',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: '#ff0080',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
        border: 'none',
        outline: 'none'
      }}
    >
      <div style={{ 
        width: '100%', 
        minHeight: '100vh'
      }}>
        <HeroSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '1rem'
      }}>
        <InflatableToolsSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '1rem'
      }}>
        <RoomTransformationSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '1rem'
      }}>
        <Step2ChatbotSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '1rem'
      }}>
        <Step3ToolkitSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '10rem'
      }}>
        <InstagramSection />
      </div>
      <div style={{ 
        width: '100%', 
        marginTop: '3rem'
      }}>
        <CTASection />
      </div>
    </div>
  )
}
