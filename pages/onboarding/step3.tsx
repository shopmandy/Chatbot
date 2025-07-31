import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import styles from './step3.module.css'; 

export default function OnboardingStep3() {
  const router = useRouter();
  const { user } = useUser();
  const [spendingPreferences, setSpendingPreferences] = useState({
    furniture: '',
    homeDecor: '',
    lighting: '',
    textilesRugs: ''
  });

  const priceRanges = [
    'Under $100',
    '$100-$500',
    '$500-$1500',
    '$1500-$5000',
    '$5000+',
    'Custom'
  ];

  const categories = [
    { key: 'furniture', label: 'FURNITURE' },
    { key: 'homeDecor', label: 'HOME DECOR' },
    { key: 'lighting', label: 'LIGHTING' },
    { key: 'textilesRugs', label: 'TEXTILES & RUGS' }
  ];

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePriceSelect = (category: string, priceRange: string) => {
    setSpendingPreferences(prev => ({
      ...prev,
      [category]: priceRange
    }));
  };

  const handleNext = () => {
    // Check if at least one category has been selected
    const hasSelection = Object.values(spendingPreferences).some(value => value !== '');
    if (hasSelection) {
      localStorage.setItem('onboarding_spending', JSON.stringify(spendingPreferences));
      router.push('/onboarding/step4');
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

  const canProceed = Object.values(spendingPreferences).some(value => value !== '');

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header with window controls */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerTitle}>GETTING TO KNOW YOU (3/6)</span>
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
          <h1 className={styles.mainTitle}>WHAT DO YOU USUALLY LIKE TO SPEND?</h1>
          
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <div key={category.key} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category.label}</h2>
                <div className={styles.priceButtons}>
                  {priceRanges.map((priceRange) => (
                    <button
                      key={priceRange}
                      className={`${styles.priceButton} ${
                        spendingPreferences[category.key as keyof typeof spendingPreferences] === priceRange 
                          ? styles.selected 
                          : ''
                      }`}
                      onClick={() => handlePriceSelect(category.key, priceRange)}
                    >
                      {priceRange}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => router.push('/onboarding/step2')}>
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
  );
} 