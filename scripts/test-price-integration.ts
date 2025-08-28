import { getUserPriceRange } from '../lib/onboardingAPI'

// Test the price range integration
console.log('Testing price range integration...')

// Simulate setting onboarding data with price range
const testBudgetData = {
  general: {
    min: 50,
    max: 200,
  },
}

// Save to localStorage (in real scenario this would be saved during onboarding)
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('onboarding_spending', JSON.stringify(testBudgetData))
}

// Test getUserPriceRange function
const priceRange = getUserPriceRange()
console.log('Retrieved price range:', priceRange)

// Test the structure that will be sent to Amazon API
const apiRequestBody = {
  prompt: 'modern living room furniture',
  priceRange: priceRange,
}

console.log('API request body with price range:', apiRequestBody)
console.log(
  'Price range for Amazon API (min in cents):',
  priceRange?.min ? priceRange.min * 100 : 'undefined'
)
console.log(
  'Price range for Amazon API (max in cents):',
  priceRange?.max ? priceRange.max * 100 : 'undefined'
)
