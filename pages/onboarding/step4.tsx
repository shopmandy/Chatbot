import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@clerk/nextjs";
import styles from './step4.module.css'; 

export default function OnboardingStep4() {
  const router = useRouter();
  const { user } = useUser();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const styleOptions = [
    'Modern', 'Bohemian', 'Industrial', 'Eclectic', 'Farmhouse',
    'Minimalist', 'Scandinavian', 'Traditional', 'Mid-Century', 'Art Deco'
  ];

  useEffect(() => {
    // Lock scrolling when onboarding is visible
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleNext = () => {
    if (selectedStyles.length > 0) {
      localStorage.setItem('onboarding_styles', JSON.stringify(selectedStyles));
      router.push('/onboarding/step5');
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
            <span className={styles.headerTitle}>GETTING TO KNOW YOU (4/6)</span>
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
          <h1 className={styles.mainTitle}>WHAT STYLES SPEAK TO YOU?</h1>
          <p className={styles.instruction}>Select all that apply</p>
          
          <div className={styles.styleGrid}>
            {styleOptions.map((style) => (
              <button
                key={style}
                className={`${styles.styleButton} ${selectedStyles.includes(style) ? styles.selected : ''}`}
                onClick={() => handleStyleToggle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => router.push('/onboarding/step3')}>
            ← Back
          </button>
          <button 
            className={styles.nextButton} 
            onClick={handleNext}
            disabled={selectedStyles.length === 0}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
} 