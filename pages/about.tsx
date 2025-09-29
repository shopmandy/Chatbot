import { motion, useScroll, useTransform } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './about.module.css'

export default function About() {
  const [slideWidth, setSlideWidth] = useState(300) // default width
  const slideRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  // Parallax for each block (adjust the ranges for more/less movement)
  const yMission = useTransform(scrollY, [0, 400], [0, 60])
  const yValues = useTransform(scrollY, [0, 400], [0, 0])
  const yFounder = useTransform(scrollY, [0, 400], [0, 140])
  const yCarousel = useTransform(scrollY, [0, 400], [0, 220])

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
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const next = prev + 0.012 // slightly faster for pixel-based
        if (next > totalImages - baseLength * 2) {
          return baseLength * Math.floor(repeatCount / 2)
        }
        return next
      })
    }, 60)
    return () => clearInterval(interval)
  }, [baseLength, totalImages, isPaused])

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (window as any).instgrm === undefined
    ) {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    } else if (typeof window !== 'undefined' && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className={styles.fullBleedCloud}>
      <div className={styles.frostedGlass}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Tiny5&family=VT323&family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContentWrapper}>
            <h1 className={styles.heroMainHeading}>
              AT MANDY, WE BELIEVE THAT EVERY WOMAN
              <br />
              CAN DO-IT-HERSELF WITH THE RIGHT TOOLS.
            </h1>
            <div className={styles.heroVisuals}>
              {/* Camera with photo */}
              <div className={styles.cameraFrame}>
                <Image
                  src="/about page inspo 1.png"
                  alt="Camera with woman and Jeep"
                  width={600}
                  height={400}
                  className={styles.cameraImg}
                />
                {/* Top right starburst with circular image - SVG mask */}
                <motion.div
                  className={styles.starburstSVGWrapper}
                  style={{
                    position: 'absolute',
                    top: '-80px',
                    right: '-110px',
                    width: '200px',
                    height: '200px',
                    zIndex: 5,
                  }}
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="circleClipTopRight">
                        <circle cx="250" cy="250" r="160" />
                      </clipPath>
                    </defs>
                    <image
                      href="/Ellipse 34.png"
                      width="500"
                      height="500"
                      clipPath="url(#circleClipTopRight)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <motion.image
                      href="/Star 7.png"
                      width="500"
                      height="500"
                      style={{ mixBlendMode: 'multiply' }}
                      animate={{ rotate: 360 }}
                      transform="rotate(0 250 250)"
                      transition={{
                        repeat: Infinity,
                        duration: 16,
                        ease: 'linear',
                      }}
                    />
                  </svg>
                </motion.div>
                {/* Bottom left starburst with circular image - SVG mask */}
                <motion.div
                  className={styles.starburstSVGWrapper}
                  style={{
                    position: 'absolute',
                    bottom: '-130px',
                    left: '-110px',
                    width: '200px',
                    height: '200px',
                    zIndex: 5,
                  }}
                >
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="circleClipBottomLeft">
                        <circle cx="250" cy="250" r="160" />
                      </clipPath>
                    </defs>
                    <image
                      href="/Ellipse 33.png"
                      width="500"
                      height="500"
                      clipPath="url(#circleClipBottomLeft)"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <motion.image
                      href="/Star 7.png"
                      width="500"
                      height="500"
                      style={{ mixBlendMode: 'multiply' }}
                      animate={{ rotate: 360 }}
                      transform="rotate(0 250 250)"
                      transition={{
                        repeat: Infinity,
                        duration: 16,
                        ease: 'linear',
                      }}
                    />
                  </svg>
                </motion.div>
                {/* Torn paper mission statement - move to bottom right of camera */}
                <div
                  className={
                    styles.tornPaperWrapper + ' ' + styles.tornPaperAbsolute
                  }
                >
                  <Image
                    src="/3 3545895.png"
                    alt="Torn paper"
                    width={300}
                    height={200}
                    className={styles.tornPaperImg}
                  />
                  <span className={styles.tornPaperText}>
                    We are dedicated to empowering women to confidently build,
                    repair, and get it done, and we&apos;re here to provide the
                    tools to make it happen.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Content Section */}
        <main className={styles.aboutContent}>
          <div className={styles.spaceBetweenTornPaperAndAboutCard}></div>
          <div className={styles.aboutCard}>
            <motion.p className={styles.aboutHeading} style={{ y: yMission }}>
              Our mission is to break down barriers and stereotypes in the world
              of DIY by offering thoughtfully designed tools that cater to the
              needs and preferences of women.
            </motion.p>
            <motion.div style={{ y: yValues, width: '100%' }}>
              <p className={styles.boldPink}>We are committed to:</p>
              <ul className={styles.valuesList}>
                <li>🛠️ Quality and Innovation</li>
                <li>📚 Education and Support</li>
                <li>💖 Inclusivity</li>
                <li>🌿 Sustainability</li>
                <li>👯‍♀️ Community Building</li>
              </ul>
            </motion.div>
            <motion.p style={{ y: yFounder }}>
              Mandy is not just a brand; it&apos;s a movement. We are here to
              redefine what it means to be handy and to ensure that every woman
              has the tools and knowledge to turn her desires into reality.
            </motion.p>
            <motion.section
              className={styles.founderSection}
              style={{ y: yFounder }}
            >
              <h3>FEMALE FOUNDED</h3>
              <div className={styles.founderContent}>
                <div>
                  <p>
                    Caroline is a dynamic entrepreneur with a rich background in
                    sustainability, law, and emerging technologies. Caroline has
                    cultivated a unique blend of expertise that is intricately
                    woven into the fabric of Mandy.
                  </p>
                  <p>
                    Passionate about breaking down barriers in traditionally
                    male-dominated spaces, Caroline has channeled her love for
                    DIY and commitment to empowerment into creating Mandy. Her
                    vision is to revolutionize the DIY space by providing women
                    with tools that are not only functional but also beautifully
                    designed, ensuring that every tool reflects the strength and
                    elegance of its user.
                  </p>
                </div>
                <Image
                  src="/founder.png"
                  alt="Caroline, founder of Mandy Tools"
                  width={400}
                  height={400}
                  className={styles.founderImg}
                />
              </div>
            </motion.section>
          </div>
          <motion.section
            className={styles.carouselSection}
            style={{ y: yCarousel }}
          >
            <div className={styles.carouselHeader}>
              <span className={styles.carouselHeaderText}>
                Build along with us!
              </span>
              <a
                href="https://instagram.com/shopmandytools"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.carouselHeaderLink}
              >
                @shopmandytools
              </a>
            </div>
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
                      <a href="https://instagram.com/shopmandytools">
                        <Image
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={300}
                          className={styles.carouselImage}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}
