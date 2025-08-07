import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import styles from './step1.module.css'

export default function OnboardingStep1() {
  const router = useRouter()
  const { user } = useUser()
  const [name, setName] = useState('')

  const handleNext = () => {
    if (name.trim()) {
      localStorage.setItem('onboarding_name', name)
      router.push('/onboarding/step2')
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

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>
              GETTING TO KNOW YOU (1/6)
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
          <div className={styles.sparkleIcon}>✨</div>
          <h1 className={styles.mainTitle}>WELCOME TO YOUR DIY JOURNEY! 🏡</h1>
          <p className={styles.description}>
            Let's build your home style profile so I can give you personalized
            recommendations!
          </p>
          <p className={styles.question}>What's your name?</p>
          <input
            className={styles.nameInput}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            onKeyPress={e => e.key === 'Enter' && handleNext()}
          />
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => router.back()}>
            ← Back
          </button>
          <button
            className={styles.nextButton}
            onClick={handleNext}
            disabled={!name.trim()}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
