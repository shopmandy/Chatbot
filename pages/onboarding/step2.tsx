import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import styles from './step2.module.css'

export default function OnboardingStep2() {
  const router = useRouter()
  const { user } = useUser()
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [homeType, setHomeType] = useState('')
  const [userName, setUserName] = useState('')

  const homeTypes = [
    'Apartment',
    'Condo',
    'Studio',
    'House',
    'Townhouse',
    'Other',
  ]

  useEffect(() => {
    // Get name from localStorage
    const name = localStorage.getItem('onboarding_name')
    if (name) {
      setUserName(name)
    } else {
      // If no name, go back to step 1
      router.push('/onboarding/step1')
    }

    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [router])

  const handleNext = () => {
    if (age.trim() && city.trim() && homeType) {
      localStorage.setItem('onboarding_age', age)
      localStorage.setItem('onboarding_city', city)
      localStorage.setItem('onboarding_homeType', homeType)
      router.push('/onboarding/step3')
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

  const canProceed = age.trim() && city.trim() && homeType

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>
              GETTING TO KNOW YOU (2/6)
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
            TELL ME ABOUT YOURSELF, {userName.toUpperCase()}!
          </h1>

          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Age</label>
              <input
                className={styles.input}
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="Your age"
                min="1"
                max="120"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>City</label>
              <input
                className={styles.input}
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Where do you live?"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                What type of home do you have?
              </label>
              <div className={styles.homeTypeGrid}>
                {homeTypes.map(type => (
                  <button
                    key={type}
                    className={`${styles.homeTypeButton} ${homeType === type ? styles.selected : ''}`}
                    onClick={() => setHomeType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button
            className={styles.backButton}
            onClick={() => router.push('/onboarding/step1')}
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
