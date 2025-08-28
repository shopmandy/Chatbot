import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import styles from './step3.module.css'

export default function OnboardingStep3() {
  const router = useRouter()
  const { user } = useUser()
  const [priceRange, setPriceRange] = useState({
    min: 50,
    max: 500,
  })
  const [activeSlider, setActiveSlider] = useState<'min' | 'max' | null>(null)

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setPriceRange(prev => {
      let newRange = { ...prev }

      if (type === 'min') {
        newRange.min = Math.min(value, prev.max - 10) // Ensure min is at least 10 less than max
        newRange.min = Math.max(newRange.min, 1) // Ensure min is at least 1 (Amazon requirement)
      } else {
        newRange.max = Math.max(value, prev.min + 10) // Ensure max is at least 10 more than min
      }

      return newRange
    })
  }

  const handleNext = () => {
    // Check if the price range is valid (min >= 1, max > min)
    const hasValidSelection =
      priceRange.min >= 1 && priceRange.max > priceRange.min
    if (hasValidSelection) {
      // Save as general budget range (since we removed categories)
      const budgetData = {
        general: {
          min: priceRange.min,
          max: priceRange.max,
        },
      }
      localStorage.setItem('onboarding_spending', JSON.stringify(budgetData))
      router.push('/onboarding/step4')
    }
  }

  const handleClose = async () => {
    // Mark onboarding as complete and redirect to home
    if (user) {
      try {
        await user.update({
          unsafeMetadata: { onboardingComplete: true },
        })
        // Add a small delay to ensure metadata is updated
        setTimeout(() => {
          router.push('/')
        }, 500)
      } catch (error) {
        console.error('Error updating user metadata:', error)
        router.push('/')
      }
    } else {
      router.push('/')
    }
  }

  const canProceed = priceRange.min >= 1 && priceRange.max > priceRange.min

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>
              GETTING TO KNOW YOU (3/6)
            </span>
            <div className={styles.windowControls}>
              <button className={styles.windowButton} onClick={handleClose}>
                ×
              </button>
              <button className={styles.windowButton}>□</button>
              <button className={styles.windowButton}>□</button>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        {/* Main content */}
        <div className={styles.content}>
          <h1 className={styles.mainTitle}>
            WHAT DO YOU USUALLY LIKE TO SPEND?
          </h1>

          <div className={styles.categoriesContainer}>
            <div className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>YOUR PRICE RANGE</h2>
              <div className={styles.priceSliderContainer}>
                <div className={styles.priceInputs}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Min Price</label>
                    <input
                      type="number"
                      min="1"
                      max="990"
                      value={priceRange.min}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 1
                        handlePriceChange('min', Math.max(1, value))
                      }}
                      className={styles.priceInput}
                      placeholder="$1"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Max Price</label>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={priceRange.max}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 10
                        handlePriceChange('max', Math.max(10, value))
                      }}
                      className={styles.priceInput}
                      placeholder="$1000"
                    />
                  </div>
                </div>
                <div className={styles.sliderContainer}>
                  <div className={styles.sliderTrack}></div>
                  <div
                    className={styles.sliderRange}
                    style={{
                      left: `${((priceRange.min - 1) / 999) * 100}%`,
                      width: `${((priceRange.max - priceRange.min) / 999) * 100}%`,
                    }}
                  ></div>
                  <div className={styles.sliderWrapper}>
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      step="10"
                      value={priceRange.min}
                      onChange={e =>
                        handlePriceChange('min', parseInt(e.target.value))
                      }
                      onMouseDown={() => setActiveSlider('min')}
                      onTouchStart={() => setActiveSlider('min')}
                      className={`${styles.priceSlider} ${styles.minSlider}`}
                      style={{ zIndex: activeSlider === 'min' ? 4 : 2 }}
                    />
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      step="10"
                      value={priceRange.max}
                      onChange={e =>
                        handlePriceChange('max', parseInt(e.target.value))
                      }
                      onMouseDown={() => setActiveSlider('max')}
                      onTouchStart={() => setActiveSlider('max')}
                      className={`${styles.priceSlider} ${styles.maxSlider}`}
                      style={{ zIndex: activeSlider === 'max' ? 4 : 3 }}
                    />
                  </div>
                </div>
                <div className={styles.priceDisplay}>
                  ${priceRange.min.toLocaleString()} - $
                  {priceRange.max.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.backButton}
            onClick={() => router.push('/onboarding/step2')}
          >
            ← Back
          </button>
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
