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
      size: isMobile ? 140 : 225, // was 169 on mobile
      position: 'oval-top-left',
    },
    {
      src: '/inflatable wrench.png',
      alt: 'Inflatable Wrench',
      size: isMobile ? 130 : 214, // was 158
      position: 'oval-top',
    },
    {
      src: '/inflatable screwdriver.png',
      alt: 'Inflatable Screwdriver',
      size: isMobile ? 120 : 203, // was 146
      position: 'oval-top-right',
    },
    {
      src: '/inflatable bits.png',
      alt: 'Inflatable Bits',
      size: isMobile ? 115 : 191, // was 135
      position: 'oval-left',
    },
    {
      src: '/inflatable level.png',
      alt: 'Inflatable Level',
      size: isMobile ? 130 : 214, // was 158
      position: 'oval-bottom-left',
    },
    {
      src: '/inflatable tape measure .png',
      alt: 'Inflatable Tape Measure',
      size: isMobile ? 120 : 203, // was 146
      position: 'oval-bottom',
    },
    {
      src: '/inflatable pliers.png',
      alt: 'Inflatable Pliers',
      size: isMobile ? 115 : 197, // was 140
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
                ? { top: '26%', left: '4%' } // hammer: slightly further left
                : { top: '8%', left: '8%' }
            case 'oval-top':
              return isMobilePosition
                ? { top: '55%', left: '4%', transform: 'translateY(-50%)' } // wrench: down and further left
                : { top: '5%', left: '45%', transform: 'translateX(-50%)' }
            case 'oval-top-right':
              return isMobilePosition
                ? { top: '22%', right: '2%' } // screwdriver position stays; rotation handled in animation
                : { top: '8%', right: '8%' }
            case 'oval-left':
              return isMobilePosition
                ? { bottom: '18%', left: '52%', transform: 'translateX(-50%)' } // bits: moved up
                : { top: '45%', left: '2%', transform: 'translateY(-50%)' }
            case 'oval-right':
              return isMobilePosition
                ? { bottom: '16%', left: '22%' } // pliers: moved up
                : { top: '45%', right: '2%', transform: 'translateY(-50%)' }
            case 'oval-bottom-left':
              return isMobilePosition
                ? { top: '56%', right: '4%', transform: 'translateY(-50%)' } // level: moved slightly down
                : { bottom: '8%', left: '8%' }
            case 'oval-bottom':
              return isMobilePosition
                ? { top: '18%', left: '42%', transform: 'translateX(-50%)' } // tape measure: slightly left
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
                    : tool.alt === 'Inflatable Hammer' && isMobile
                      ? `popUpFlipped ${0.6 + index * 0.1}s ease-out forwards, gentleFloatHammer ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                      : tool.alt === 'Inflatable Screwdriver' && isMobile
                        ? `popUpScrewdriver ${0.6 + index * 0.1}s ease-out forwards, gentleFloatScrewdriver ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                        : `popUp ${0.6 + index * 0.1}s ease-out forwards, gentleFloat ${4 + index * 0.3}s ease-in-out infinite ${0.6 + index * 0.1}s`
                : 'none',
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? tool.alt === 'Inflatable Pliers' && isMobile
                  ? 'translateY(0) scale(1) rotate(45deg)'
                  : tool.alt === 'Inflatable Level' && isMobile
                    ? 'translateY(0) scale(1) rotate(90deg)'
                    : tool.alt === 'Inflatable Hammer' && isMobile
                      ? 'translateY(0) scale(1) scaleX(-1)'
                      : tool.alt === 'Inflatable Screwdriver' && isMobile
                        ? 'translateY(0) scale(1) rotate(-45deg)'
                        : 'translateY(0) scale(1)'
                : tool.alt === 'Inflatable Pliers' && isMobile
                  ? 'translateY(50px) scale(0.8) rotate(45deg)'
                  : tool.alt === 'Inflatable Level' && isMobile
                    ? 'translateY(50px) scale(0.8) rotate(90deg)'
                    : tool.alt === 'Inflatable Hammer' && isMobile
                      ? 'translateY(50px) scale(0.8) scaleX(-1)'
                      : tool.alt === 'Inflatable Screwdriver' && isMobile
                        ? 'translateY(50px) scale(0.8) rotate(-45deg)'
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
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: '#0a164d',
            fontFamily: "'Druk', 'Druk Wide Web Bold', 'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: '2px',
            lineHeight: '1.2',
            margin: 0,
            textAlign: 'center',
            wordWrap: 'break-word',
            maxWidth: '100%',
            textShadow: 
              '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
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
        @keyframes popUpFlipped {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8) scaleX(-1);
          }
          50% {
            transform: translateY(-10px) scale(1.05) scaleX(-1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) scaleX(-1);
          }
        }
        @keyframes gentleFloatHammer {
          0%,
          100% {
            transform: translate(0, 0) scaleX(-1);
          }
          25% {
            transform: translate(5px, -8px) scaleX(-1);
          }
          50% {
            transform: translate(-3px, -12px) scaleX(-1);
          }
          75% {
            transform: translate(-5px, -6px) scaleX(-1);
          }
        }
        @keyframes popUpScrewdriver {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8) rotate(-45deg);
          }
          50% {
            transform: translateY(-10px) scale(1.05) rotate(-45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(-45deg);
          }
        }
        @keyframes gentleFloatScrewdriver {
          0%,
          100% {
            transform: translate(0, 0) rotate(-45deg);
          }
          25% {
            transform: translate(5px, -8px) rotate(-44deg);
          }
          50% {
            transform: translate(-3px, -12px) rotate(-46deg);
          }
          75% {
            transform: translate(-5px, -6px) rotate(-45deg);
          }
        }
      `}</style>
    </div>
  )
}
