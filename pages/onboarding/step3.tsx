import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import styles from './step3.module.css'

export default function OnboardingStep3() {
  const router = useRouter()
  const { user } = useUser()
  const [priceRange, setPriceRange] = useState({
    min: 100,
    max: 1000,
  })

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
        newRange.min = Math.min(value, prev.max - 100) // Ensure min is at least 100 less than max
      } else {
        newRange.max = Math.max(value, prev.min + 100) // Ensure max is at least 100 more than min
      }

      return newRange
    })
  }

  const handleNext = () => {
    // Check if the price range is valid (min < max and both > 0)
    const hasValidSelection =
      priceRange.min >= 0 && priceRange.max > priceRange.min
    if (hasValidSelection) {
      localStorage.setItem('onboarding_spending', JSON.stringify(priceRange))
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

  const canProceed = priceRange.min >= 0 && priceRange.max > priceRange.min

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
                      min="0"
                      max="4900"
                      value={priceRange.min}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 0
                        handlePriceChange('min', Math.max(0, value))
                      }}
                      className={styles.priceInput}
                      placeholder="$0"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Max Price</label>
                    <input
                      type="number"
                      min="100"
                      max="5000"
                      value={priceRange.max}
                      onChange={e => {
                        const value = parseInt(e.target.value) || 100
                        handlePriceChange('max', Math.max(100, value))
                      }}
                      className={styles.priceInput}
                      placeholder="$5000"
                    />
                  </div>
                </div>
                <div className={styles.sliderContainer}>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange.min}
                    onChange={e =>
                      handlePriceChange('min', parseInt(e.target.value))
                    }
                    className={`${styles.priceSlider} ${styles.minSlider}`}
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange.max}
                    onChange={e =>
                      handlePriceChange('max', parseInt(e.target.value))
                    }
                    className={`${styles.priceSlider} ${styles.maxSlider}`}
                  />
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
