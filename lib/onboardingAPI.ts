export interface OnboardingData {
  name: string
  age: string
  city: string
  type_of_home: string
  category_budgets: any // JSON object for budgets
  styles: string[] // Array of style preferences
  brands: string[] // Array of brand preferences
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
