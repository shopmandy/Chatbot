import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import styles from './step6.module.css';
import { saveOnboardingData } from '../../lib/onboardingAPI'; 

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
    try {
      // Collect all onboarding data from localStorage
      const name = localStorage.getItem('onboarding_name') || '';
      const age = localStorage.getItem('onboarding_age') || '';
      const city = localStorage.getItem('onboarding_city') || '';
      const type_of_home = localStorage.getItem('onboarding_homeType') || '';
      const spendingData = localStorage.getItem('onboarding_spending');
      const stylesData = localStorage.getItem('onboarding_styles');
      const brandsData = localStorage.getItem('onboarding_brands');

      // Parse JSON data
      const category_budgets = spendingData ? JSON.parse(spendingData) : {};
      const styles = stylesData ? JSON.parse(stylesData) : [];
      const brands = brandsData ? JSON.parse(brandsData) : [];

      console.log('📊 Collected onboarding data:', {
        name, age, city, type_of_home, category_budgets, styles, brands
      });

      // Save data to Supabase
      const result = await saveOnboardingData({
        name,
        age,
        city,
        type_of_home,
        category_budgets,
        styles,
        brands
      });

      if (result.success) {
        console.log('✅ Onboarding data saved successfully!');
      } else {
        console.error('❌ Failed to save onboarding data:', result.error);
      }

      // Mark onboarding as complete and redirect to home
      if (user) {
        try {
          await user.update({
            unsafeMetadata: { onboardingComplete: true }
          });
          // Add a delay to ensure metadata is updated
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
    } catch (error) {
      console.error('❌ Error in handleComplete:', error);
      // Still redirect even if saving fails
      router.push('/');
    }
  };

  const handleClose = async () => {
    try {
      // Collect all onboarding data from localStorage
      const name = localStorage.getItem('onboarding_name') || '';
      const age = localStorage.getItem('onboarding_age') || '';
      const city = localStorage.getItem('onboarding_city') || '';
      const type_of_home = localStorage.getItem('onboarding_homeType') || '';
      const spendingData = localStorage.getItem('onboarding_spending');
      const stylesData = localStorage.getItem('onboarding_styles');
      const brandsData = localStorage.getItem('onboarding_brands');

      // Parse JSON data
      const category_budgets = spendingData ? JSON.parse(spendingData) : {};
      const styles = stylesData ? JSON.parse(stylesData) : [];
      const brands = brandsData ? JSON.parse(brandsData) : [];

      console.log('📊 Collected onboarding data (close):', {
        name, age, city, type_of_home, category_budgets, styles, brands
      });

      // Save data to Supabase
      const result = await saveOnboardingData({
        name,
        age,
        city,
        type_of_home,
        category_budgets,
        styles,
        brands
      });

      if (result.success) {
        console.log('✅ Onboarding data saved successfully! (close)');
      } else {
        console.error('❌ Failed to save onboarding data (close):', result.error);
      }

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
    } catch (error) {
      console.error('❌ Error in handleClose:', error);
      // Still redirect even if saving fails
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