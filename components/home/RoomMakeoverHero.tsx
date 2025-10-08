import React, { useState } from 'react'
import Image from 'next/image'
import { BubbleButton } from '../BubbleButton'
import styles from './RoomMakeoverHero.module.css'

interface RoomMakeoverHeroProps {
  onGetStarted?: () => void
  showSubheadline?: boolean
  headline?: string
}

export function RoomMakeoverHero({ onGetStarted, showSubheadline = true, headline }: RoomMakeoverHeroProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const stats = [
    { number: '10,000+', label: 'Rooms Transformed' },
    { number: '30 Sec', label: 'Avg. Speed' },
    { number: '98%', label: 'Love Their Results' },
  ]

  return (
    <div className={styles.heroContainer}>
      {/* Floating Background Elements */}
      <div className={styles.floatingBubbles}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={styles.bubble}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Headline Section */}
        <div className={styles.headlineSection}>
          <h1 className={styles.mainHeadline}>
            {headline || "STEP 1: TRANSFORM YOUR ROOM IN SECONDS."}
          </h1>
          {showSubheadline && (
            <p className={styles.subHeadline}>
              Where AI meets curated design. Your room, styled in seconds.
            </p>
          )}
        </div>

        {/* Before/After Showcase */}
        <div className={styles.showcaseContainer}>
          <div className={styles.beforeAfterContainer}>
            <div className={styles.beforeAfterImages}>
              {/* Before Side */}
              <div className={styles.beforeSide}>
                <div className={styles.beforeLabel}>before</div>
                <Image
                  src="/double dorm before.png"
                  alt="Before - Double Dorm Room"
                  width={500}
                  height={300}
                  className={styles.roomImage}
                />
              </div>

              {/* After Side with Interactive Bubbles */}
              <div className={styles.afterSide}>
                <div className={styles.afterLabel}>after</div>
                <Image
                  src="/double dorm after.png"
                  alt="After - Double Dorm Room"
                  width={500}
                  height={300}
                  className={styles.roomImage}
                />

                {/* Original-style product cards */}
                <div className={`${styles.productCard} ${styles.cardTopLeft}`}>
                  <div className={styles.productThumb}>
                    <Image src="/blue wallpaper.jpg" alt="Dimoon Blue Peel and Stick Wallpaper" width={60} height={60} />
                  </div>
                  <h4 className={styles.productTitle}>Dimoon Blue Peel and Stick Wallpaper</h4>
                  <div className={styles.productPriceSmall}>$8.99</div>
                  <a className={styles.productLink} href="https://amzn.to/46nd3Ut" target="_blank" rel="noopener noreferrer">buy on amazon</a>
                </div>

                <div className={`${styles.productCard} ${styles.cardBottomRight}`}>
                  <div className={styles.productThumb}>
                    <Image src="/woven rug.jpg" alt="nuLOOM Rigo Jute Hand Woven Area Rug" width={60} height={60} />
                  </div>
                  <h4 className={styles.productTitle}>nuLOOM Rigo Jute Hand Woven Area Rug</h4>
                  <div className={styles.productPriceSmall}>$67</div>
                  <a className={styles.productLink} href="https://amzn.to/3VB17Za" target="_blank" rel="noopener noreferrer">buy on amazon</a>
                </div>
              </div>
            </div>

            {/* Statistics inside container */}
            <div className={styles.statsSection}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main CTA Button */}
        <button 
          className="inflatable-button"
          onClick={onGetStarted}
        >
          design my room
        </button>
      </div>
    </div>
  )
}
