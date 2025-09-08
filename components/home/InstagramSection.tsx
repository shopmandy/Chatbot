import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from '../../pages/about.module.css'

export function InstagramSection() {
  const [slideWidth, setSlideWidth] = useState(300)
  const slideRef = useRef<HTMLDivElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Sample images for the carousel - replace with your actual images
  const carouselImages = [
    {
      src: '/box-crop.png',
      alt: 'Mandy Toolbox',
    },
    {
      src: '/carousel-image-2.png',
      alt: 'Mandy Bronco',
    },
    {
      src: '/hero-cb-edit.png',
      alt: 'Mandy Hero',
    },
    {
      src: '/wrench.png',
      alt: 'Mandy Wrench',
    },
    {
      src: '/carousel-image.png',
      alt: 'Behind the Scenes',
    },
    {
      src: '/mandy-collage.png',
      alt: 'Mandy Collage',
    },
  ]

  // Repeat images many times for robust infinite scroll
  const repeatCount = 10
  const continuousImages = Array(repeatCount).fill(carouselImages).flat()
  const totalImages = continuousImages.length
  const baseLength = carouselImages.length

  // Start index in the middle
  const [currentImageIndex, setCurrentImageIndex] = useState(
    baseLength * Math.floor(repeatCount / 2)
  )
  const [isPaused, setIsPaused] = useState(false)

  // Measure slide width for responsive carousel
  useEffect(() => {
    function updateWidth() {
      if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Continuous smooth scrolling effect with robust reset
  useEffect(() => {
    if (isPaused) return

    let animationId: number
    let lastTime = 0
    const targetFPS = 16 // Target ~16 FPS for smooth but not too fast animation

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        setCurrentImageIndex(prev => {
          const next = prev + 0.012 // back to original speed since we're throttling
          if (next > totalImages - baseLength * 2) {
            return baseLength * Math.floor(repeatCount / 2)
          }
          return next
        })
        lastTime = currentTime
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [baseLength, totalImages, isPaused])

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      width: '100%',
      boxSizing: 'border-box',
      paddingBottom: '2rem'
    }}>

      {/* Section Content */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        {/* Step Label */}
        <div style={{
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          fontWeight: '700',
          color: '#0a164d',
          fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          letterSpacing: '3px',
          textAlign: 'center',
          margin: '0',
          textTransform: 'uppercase'
        }}>
          STEP 4: SHARE IT
        </div>

        <h1
          style={{
            fontSize: isMobile ? '2rem' : '3.2rem',
            color: '#0a164d',
            marginBottom: '1rem',
            fontWeight: '700',
            letterSpacing: '2px',
            lineHeight: '1.3',
            fontFamily:
              "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
          }}
        >
          BUILD WITH US {" "}
          <a
            href="https://www.instagram.com/shopmandytools"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0a164d',
              textDecoration: 'none',
             }}
          >
            @SHOPMANDYTOOLS
          </a>
        </h1>

        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            color: '#0a164d',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            margin: '0',
            lineHeight: '1.4'
          }}
        >
          Follow @shopmandytools for DIY inspo, project ideas, and the latest drops.
        </p>

        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            background: 'transparent',
            padding: '0rem',
            marginTop: '0',
          }}
        >
          <section className={styles.carouselSection}>
            <div className={styles.carouselHeader}></div>
            <div className={styles.carouselContainer}>
              <div className={styles.carouselWrapper}>
                <div
                  className={styles.carouselTrack}
                  style={{
                    transform: `translateX(-${currentImageIndex * slideWidth}px)`,
                  }}
                >
                  {continuousImages.map((image, index) => (
                    <div
                      key={index}
                      className={styles.carouselSlide}
                      ref={index === 0 ? slideRef : undefined}
                    >
                      <a
                        href="https://instagram.com/shopmandytools"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          src={image.src}
                          alt={image.alt}
                          className={styles.carouselImage}
                          style={{
                            transition: 'all 0.3s ease',
                            filter: 'brightness(0.9) contrast(1.1)',
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
