import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../../pages/about.module.css'

export function InstagramSection() {
  const [slideWidth, setSlideWidth] = useState(300)
  const slideRef = useRef<HTMLDivElement>(null)

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
    const targetFPS = 12 // Slower FPS for more visible images

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 1000 / targetFPS) {
        setCurrentImageIndex(prev => {
          const next = prev + 0.008 // slower speed for more visible images
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
    <div
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 150px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '0',
        background: 'transparent',
        overflow: 'hidden',
        paddingBottom: '2rem',
      }}
    >
      {/* Content Area */}
      <div
        className="step4-content"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '1000px',
          maxWidth: '1200px',
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          transition: 'all 0.8s ease-out',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '900',
            color: '#0a164d',
            fontFamily: "'Druk', 'Druk Wide Web Bold', 'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            letterSpacing: '2px',
            lineHeight: '1.3',
            margin: '0 0 1rem 0',
            textAlign: 'center',
            textShadow: 
              '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          STEP 4: FOLLOW ALONG FOR DIY INSPO.
        </h2>


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
                        <Image
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={300}
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

          {/* Follow Button */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className="inflatable-button step4-follow-button"
              onClick={() => window.open('https://www.instagram.com/shopmandytools', '_blank')}
            >
              FOLLOW @SHOPMANDYTOOLS
              <span style={{ fontSize: '14px' }}>→</span>
            </button>
          </div>
        </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .step4-content {
            width: 95% !important;
            max-width: 420px !important;
          }
          .step4-follow-button {
            max-width: 300px !important;
            min-width: 280px !important;
            font-size: clamp(0.6rem, 1.8vw, 1.2rem) !important;
            padding: 0.5rem 1rem !important;
          }
        }
        
        /* Remove all shadows from carousel images */
        .carouselSlide img {
          box-shadow: none !important;
        }
        
        .carouselSlide a:hover img {
          box-shadow: none !important;
        }
      `}</style>
    </div>
  )
}
