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
        width: '1000px',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        paddingBottom: '2rem',
      }}
    >
      {/* Section Content */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#0a164d',
            marginBottom: '1rem',
            fontWeight: '900',
            letterSpacing: '2px',
            lineHeight: '1.2',
            fontFamily: "'Druk', 'Druk Wide Web Bold', 'VT323', 'Tiny5', 'Courier New', Courier, monospace",
            textShadow: 
              '0 2px 8px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          STEP 4: SHARE IT <br />
          BUILD WITH US{' '}
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
      </div>
    </div>
  )
}
