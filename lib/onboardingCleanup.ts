// Utility to clean up any invalid onboarding data that might cause JSON parsing errors
export function cleanupOnboardingData() {
  try {
    // Check and clean up onboarding_spending data
    const spendingData = localStorage.getItem('onboarding_spending')
    if (spendingData) {
      try {
        const parsed = JSON.parse(spendingData)
        console.log('Current spending data:', parsed)

        // Validate and fix the data structure
        if (parsed.general) {
          if (parsed.general.min === 0) {
            parsed.general.min = 1
            localStorage.setItem('onboarding_spending', JSON.stringify(parsed))
            console.log('Fixed min price from 0 to 1')
          }
        }
      } catch (error) {
        console.log('Invalid spending data found, removing...')
        localStorage.removeItem('onboarding_spending')
      }
    }

    // Check other onboarding data that might exist
    const onboardingData = localStorage.getItem('onboardingData')
    if (onboardingData) {
      try {
        JSON.parse(onboardingData)
      } catch (error) {
        console.log('Invalid onboarding data found, removing...')
        localStorage.removeItem('onboardingData')
      }
    }

    console.log('Onboarding data cleanup completed')
  } catch (error) {
    console.error('Error during onboarding data cleanup:', error)
  }
}

// Auto-run cleanup when this module is imported
if (typeof window !== 'undefined') {
  cleanupOnboardingData()
}
