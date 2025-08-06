import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import styles from './step5.module.css'

export default function OnboardingStep5() {
  const router = useRouter()
  const { user } = useUser()
  const [brandInput, setBrandInput] = useState('')
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleAddBrand = () => {
    const trimmedBrand = brandInput.trim()
    if (trimmedBrand && !brands.includes(trimmedBrand)) {
      setBrands(prev => [...prev, trimmedBrand])
      setBrandInput('')
    }
  }

  const handleRemoveBrand = (brandToRemove: string) => {
    setBrands(prev => prev.filter(brand => brand !== brandToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddBrand()
    }
  }

  const handleNext = () => {
    localStorage.setItem('onboarding_brands', JSON.stringify(brands))
    router.push('/onboarding/step6')
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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>
              GETTING TO KNOW YOU (5/6)
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
          <h1 className={styles.mainTitle}>ANY FAVORITE HOME BRANDS?</h1>
          <p className={styles.instruction}>
            Add brands you love or shop from often
          </p>

          <div className={styles.inputSection}>
            <div className={styles.inputGroup}>
              <input
                className={styles.brandInput}
                value={brandInput}
                onChange={e => setBrandInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter brand name"
              />
              <button
                className={styles.addButton}
                onClick={handleAddBrand}
                disabled={!brandInput.trim()}
              >
                Add
              </button>
            </div>
          </div>

          <div className={styles.brandsSection}>
            {brands.map(brand => (
              <div key={brand} className={styles.brandTag}>
                <span className={styles.brandName}>{brand}</span>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveBrand(brand)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.backButton}
            onClick={() => router.push('/onboarding/step4')}
          >
            ← Back
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
