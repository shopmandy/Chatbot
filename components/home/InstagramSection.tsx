import { Heart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from '../../pages/about.module.css'

export function InstagramSection() {
  const [slideWidth, setSlideWidth] = useState(300)
  const slideRef = useRef<HTMLDivElement>(null)
  const [isMinimized, setIsMinimized] = useState(false)

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
      src: '/denim-4517843_1280.jpg',
      alt: 'Denim',
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
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(230, 184, 241, 0.9) 0%, rgba(248, 174, 255, 0.9) 100%)',
            border: '3px solid #f91b8f',
            borderRadius: '24px',
            
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
            marginBottom: '0rem',
            position: 'relative',
          }}
        >
          {/* Enhanced Window Title Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background:
                'linear-gradient(135deg, rgba(230, 184, 241, 0.95) 0%, rgba(248, 174, 255, 0.95) 100%)',
              borderBottom: '3px solid #f91b8f',
              padding: '16px 24px',
              fontFamily: "'VT323', 'Tiny5', 'Courier New', Courier, monospace",
              fontSize: '18px',
              fontWeight: '700',
              color: '#ff69b4',
              boxShadow: '0 4px 20px rgba(255, 105, 180, 0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: '700',
                letterSpacing: '2px',
                textShadow: '0 0 12px rgba(255, 182, 230, 0.6)',
              }}
            >
              <Heart style={{ width: 20, height: 20, color: '#f91b8f' }} />
              FOLLOW @SHOPMANDYTOOLS
            </div>
            <div className="window-controls">
              <button
                className="window-buttons"
                title="Minimize"
                onClick={handleMinimize}
              >
                <span className="window-button-icon">─</span>
              </button>
              <button className="window-buttons" title="Maximize">
                <span className="window-button-icon">□</span>
              </button>
              <button className="window-buttons" title="Close">
                <span className="window-button-icon">×</span>
              </button>
            </div>
          </div>

          {/* Enhanced Section Content */}
          <div
            style={{
              padding: '1rem',
              textAlign: 'center',
              display: isMinimized ? 'none' : 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <h1
              style={{
                fontSize: '3.6rem',
                color: '#f91b8f',
                marginBottom: '2rem',
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
                  color: '#f91b8f',
                  textDecoration: 'none',
                 }}
              >
                @SHOPMANDYTOOLS
              </a>
            </h1>

            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                background: 'transparent',
                padding: '0rem',
                marginTop: '1rem',
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
      </div>
    </div>
  )
}
