export interface OnboardingData {
  name: string
  age: string
  city: string
  type_of_home: string
  category_budgets: any // JSON object for budgets
  styles: string[] // Array of style preferences
  brands: string[] // Array of brand preferences
}

export interface PriceRange {
  min: number
  max: number
}

export async function saveOnboardingData(
  data: OnboardingData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/save-onboarding-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to save onboarding data',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error saving onboarding data:', error)
    return { success: false, error: 'Network error occurred' }
  }
}

export function getUserPriceRange(): PriceRange | null {
  try {
    const savedBudget = localStorage.getItem('onboarding_spending')
    console.log('Reading price range from localStorage:', savedBudget)

    if (!savedBudget) return null

    const budgetData = JSON.parse(savedBudget)
    console.log('Parsed budget data:', budgetData)

    // Handle the new structure with general budget
    if (budgetData.general) {
      const result = {
        min: Math.max(budgetData.general.min || 1, 1), // Ensure min is at least 1
        max: budgetData.general.max || 1000,
      }
      console.log('Returning price range:', result)
      return result
    }

    // Fallback for old direct structure
    if (budgetData.min !== undefined && budgetData.max !== undefined) {
      const result = {
        min: Math.max(budgetData.min, 1), // Ensure min is at least 1
        max: budgetData.max,
      }
      console.log('Returning legacy price range:', result)
      return result
    }

    console.log('No valid price range found')
    return null
  } catch (error) {
    console.error('Error parsing saved price range:', error)
    return null
  }
}

// Example usage:
// const result = await saveOnboardingData({
//   name: "John Doe",
//   age: "25",
//   city: "New York",
//   type_of_home: "apartment",
//   category_budgets: { furniture: 1000, decor: 500 },
//   styles: ["modern", "minimalist"],
//   brands: ["IKEA", "West Elm"]
// });
