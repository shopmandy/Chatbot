import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function InflatableToolsSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
      setWindowWidth(width)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const tools = [
    {
      src: '/inflatable hammer.png',
      alt: 'Inflatable Hammer',
      size: isMobile ? 169 : 225,
      position: 'oval-top-left',
    },
    {
      src: '/inflatable wrench.png',
      alt: 'Inflatable Wrench',
      size: isMobile ? 158 : 214,
      position: 'oval-top',
    },
    {
      src: '/inflatable screwdriver.png',
      alt: 'Inflatable Screwdriver',
      size: isMobile ? 146 : 203,
      position: 'oval-top-right',
    },
    {
      src: '/inflatable bits.png',
      alt: 'Inflatable Bits',
      size: isMobile ? 135 : 191,
      position: 'oval-left',
    },
    {
      src: '/inflatable level.png',
      alt: 'Inflatable Level',
      size: isMobile ? 158 : 214,
      position: 'oval-bottom-left',
    },
    {
      src: '/inflatable tape measure .png',
      alt: 'Inflatable Tape Measure',
      size: isMobile ? 146 : 203,
      position: 'oval-bottom',
    },
    {
      src: '/inflatable pliers.png',
      alt: 'Inflatable Pliers',
      size: isMobile ? 140 : 197,
      position: 'oval-right',
    },
  ]

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Floating Tools */}
      {tools.map((tool, index) => {
        const getPosition = (position: string) => {
          const isMobilePosition = isMobile
          switch (position) {
            case 'oval-top-left':
              return isMobilePosition
                ? { top: '15%', left: '0%' }
                : { top: '8%', left: '8%' }
            case 'oval-top':
              return isMobilePosition
                ? { top: '60%', left: '3%', transform: 'translateY(-50%)' }
                : { top: '5%', left: '45%', transform: 'translateX(-50%)' }
            case 'oval-top-right':
              return isMobilePosition
                ? { top: '8%', right: '2%' }
                : { top: '8%', right: '8%' }
            case 'oval-left':
              return isMobilePosition
                ? { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
                : { top: '45%', left: '2%', transform: 'translateY(-50%)' }
            case 'oval-right':
              return isMobilePosition
                ? { bottom: '2%', left: '12%' }
                : { top: '45%', right: '2%', transform: 'translateY(-50%)' }
            case 'oval-bottom-left':
              return isMobilePosition
                ? { top: '60%', right: '3%', transform: 'translateY(-50%)' }
                : { bottom: '8%', left: '8%' }
            case 'oval-bottom':
              return isMobilePosition
                ? { top: '5%', left: '35%', transform: 'translateX(-50%)' }
                : { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }
            case 'oval-bottom-right':
              return isMobilePosition
                ? { bottom: '8%', right: '12%' }
                : { bottom: '8%', right: '8%' }
            default:
              return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }
          }
        }

        return (
          <Image
            key={index}
            src={tool.src}
            alt={tool.alt}
            width={80}
            height={80}
            style={{
              position: 'absolute',
              width: `${tool.size}px`,
              height: 'auto',
              zIndex: 1,
              ...getPosition(tool.position),
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
              imageRendering: 'pixelated',
              animation: isVisible
                ? tool.alt === 'Inflatable Pliers' && isMobile
                  ? `popUp ${0.6 + index * 0.1}s ease-out forwards, gentleFloatRotated ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                  : tool.alt === 'Inflatable Level' && isMobile
                    ? `popUp ${0.6 + index * 0.1}s ease-out forwards, gentleFloatLevel ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                    : `popUp ${0.6 + index * 0.1}s ease-out forwards, gentleFloat ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                : 'none',
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? tool.alt === 'Inflatable Pliers' && isMobile
                  ? 'translateY(0) scale(1) rotate(45deg)'
                  : tool.alt === 'Inflatable Level' && isMobile
                    ? 'translateY(0) scale(1) rotate(90deg)'
                    : 'translateY(0) scale(1)'
                : tool.alt === 'Inflatable Pliers' && isMobile
                  ? 'translateY(50px) scale(0.8) rotate(45deg)'
                  : tool.alt === 'Inflatable Level' && isMobile
                    ? 'translateY(50px) scale(0.8) rotate(90deg)'
                    : 'translateY(50px) scale(0.8)',
            }}
          />
        )
      })}

      {/* Central Message */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: isMobile ? '85%' : '1000px',
          padding: isMobile ? '2rem 1rem' : '0',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease-out',
          transitionDelay: isVisible ? '0.3s' : '0s',
        }}
      >
        <div
          style={{
            fontSize: isMobile
              ? '50px'
              : windowWidth < 1200
                ? '3.5rem'
                : windowWidth < 1600
                  ? '4rem'
                  : '4.375rem',
            fontWeight: '700',
            color: '#0a164d',
            fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: isMobile ? '1px' : '2px',
            lineHeight: isMobile ? '1.1' : '1.2',
            margin: 0,
            textAlign: 'center',
            wordWrap: 'break-word',
            maxWidth: '100%',
          }}
        >
          <div style={{ marginBottom: '0.5rem' }}>HERE, YOU CAN</div>
          <div style={{ marginBottom: '0.5rem' }}>
            <em style={{ fontStyle: 'italic' }}>DO IT YOURSELF</em>...
          </div>
          <div>WITH THE RIGHT TOOLS.</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes popUp {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(5px, -8px) rotate(2deg);
          }
          50% {
            transform: translate(-3px, -12px) rotate(-1deg);
          }
          75% {
            transform: translate(-5px, -6px) rotate(1deg);
          }
        }
        @keyframes gentleFloatRotated {
          0%,
          100% {
            transform: translate(0, 0) rotate(45deg);
          }
          25% {
            transform: translate(5px, -8px) rotate(47deg);
          }
          50% {
            transform: translate(-3px, -12px) rotate(44deg);
          }
          75% {
            transform: translate(-5px, -6px) rotate(46deg);
          }
        }
        @keyframes gentleFloatLevel {
          0%,
          100% {
            transform: translate(0, 0) rotate(90deg);
          }
          25% {
            transform: translate(5px, -8px) rotate(92deg);
          }
          50% {
            transform: translate(-3px, -12px) rotate(89deg);
          }
          75% {
            transform: translate(-5px, -6px) rotate(91deg);
          }
        }
      `}</style>
    </div>
  )
}
