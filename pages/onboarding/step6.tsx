import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import styles from './step6.module.css'; 

export default function OnboardingStep6() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleComplete = async () => {
    // Mark onboarding as complete and redirect to home
    if (user) {
      try {
        await user.update({
          unsafeMetadata: { onboardingComplete: true }
        });
        // Add a small delay to ensure metadata is updated
        setTimeout(() => {
          router.push('/');
        }, 500);
      } catch (error) {
        console.error('Error updating user metadata:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  const handleClose = async () => {
    // Mark onboarding as complete and redirect to home
    if (user) {
      try {
        await user.update({
          unsafeMetadata: { onboardingComplete: true }
        });
        // Add a small delay to ensure metadata is updated
        setTimeout(() => {
          router.push('/');
        }, 500);
      } catch (error) {
        console.error('Error updating user metadata:', error);
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>GETTING TO KNOW YOU (6/6)</span>
            <div className={styles.windowControls}>
              <button className={styles.windowButton} onClick={handleClose}>×</button>
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
          <div className={styles.celebrationIcon}>🎉</div>
          <h1 className={styles.mainTitle}>PERFECT! YOUR PROFILE IS READY!</h1>
          <p className={styles.description}>
            I'm now ready to give you personalized home decor recommendations based on your style and preferences.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => router.push('/onboarding/step5')}>
            ← Back
          </button>
          <button className={styles.completeButton} onClick={handleComplete}>
            Start Decorating! →
          </button>
        </div>
      </div>
    </div>
  );
} 