import React, { useState, useEffect } from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import PriceRangeSlider from '../components/PriceRangeSlider'
import { getUserPriceRange } from '../lib/onboardingAPI'
import styles from './profile.module.css'

interface PriceRange {
  min: number
  max: number
}
interface UserPreferences {
  name: string
  age: string
  city: string
  homeType: string
  priceRange: PriceRange
  styles: string[]
  brands: string[]
}

export default function Profile() {
  const { user, isLoaded } = useUser()
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: '',
    age: '',
    city: '',
    homeType: '',
    priceRange: { min: 50, max: 500 },
    styles: [],
    brands: [],
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [newBrand, setNewBrand] = useState('')

  const homeTypes = [
    'Apartment',
    'Condo',
    'Studio',
    'House',
    'Townhouse',
    'Other',
  ]

  const styleOptions = [
    'Modern',
    'Bohemian',
    'Industrial',
    'Eclectic',
    'Farmhouse',
    'Minimalist',
    'Scandinavian',
    'Traditional',
    'Mid-Century',
    'Art Deco',
  ]

  useEffect(() => {
    // Load existing preferences from localStorage
    const name = localStorage.getItem('onboarding_name') || ''
    const age = localStorage.getItem('onboarding_age') || ''
    const city = localStorage.getItem('onboarding_city') || ''
    const homeType = localStorage.getItem('onboarding_homeType') || ''

    const savedRange = getUserPriceRange()
    const priceRange = savedRange || { min: 50, max: 500 }

    const stylesData = localStorage.getItem('onboarding_styles')
    const styles = stylesData ? JSON.parse(stylesData) : []

    const brandsData = localStorage.getItem('onboarding_brands')
    const brands = brandsData ? JSON.parse(brandsData) : []

    setPreferences({
      name,
      age,
      city,
      homeType,
      priceRange,
      styles,
      brands,
    })
  }, [])

  // Don't redirect to sign-in, show popup instead
  useEffect(() => {
    if (isLoaded && !user) {
      // Don't redirect, we'll show the popup
      return
    }
  }, [isLoaded, user])

  const handlePriceRangeChange = async (newRange: PriceRange) => {
    const newPreferences = { ...preferences, priceRange: newRange }
    setPreferences(newPreferences)
    await savePreferences(newPreferences)
  }

  const handleBasicInfoChange = async (
    field: keyof UserPreferences,
    value: string
  ) => {
    const newPreferences = { ...preferences, [field]: value }
    setPreferences(newPreferences)
    await savePreferences(newPreferences)
  }

  const handleStyleToggle = async (style: string) => {
    const newStyles = preferences.styles.includes(style)
      ? preferences.styles.filter(s => s !== style)
      : [...preferences.styles, style]

    const newPreferences = { ...preferences, styles: newStyles }
    setPreferences(newPreferences)
    await savePreferences(newPreferences)
  }

  const handleAddBrand = async () => {
    const trimmedBrand = newBrand.trim()
    if (trimmedBrand && !preferences.brands.includes(trimmedBrand)) {
      const newBrands = [...preferences.brands, trimmedBrand]
      const newPreferences = { ...preferences, brands: newBrands }
      setPreferences(newPreferences)
      setNewBrand('')
      await savePreferences(newPreferences)
    }
  }

  const handleRemoveBrand = async (brandToRemove: string) => {
    const newBrands = preferences.brands.filter(
      brand => brand !== brandToRemove
    )
    const newPreferences = { ...preferences, brands: newBrands }
    setPreferences(newPreferences)
    await savePreferences(newPreferences)
  }

  const savePreferences = async (prefsToSave: UserPreferences) => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      // Save to localStorage (same format as onboarding)
      localStorage.setItem('onboarding_name', prefsToSave.name)
      localStorage.setItem('onboarding_age', prefsToSave.age)
      localStorage.setItem('onboarding_city', prefsToSave.city)
      localStorage.setItem('onboarding_homeType', prefsToSave.homeType)

      const budgetData = {
        general: {
          min: prefsToSave.priceRange.min,
          max: prefsToSave.priceRange.max,
        },
      }
      localStorage.setItem('onboarding_spending', JSON.stringify(budgetData))
      localStorage.setItem(
        'onboarding_styles',
        JSON.stringify(prefsToSave.styles)
      )
      localStorage.setItem(
        'onboarding_brands',
        JSON.stringify(prefsToSave.brands)
      )

      setSaveMessage('Preferences updated successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving preferences:', error)
      setSaveMessage('Failed to save preferences')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    // Show sign-in prompt with natural Clerk popup when not authenticated
    return (
      <>
        <Head>
          <title>Profile - Mandy AI</title>
          <meta
            name="description"
            content="Manage your profile and preferences"
          />
        </Head>

        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Profile</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.signInPrompt}>
              <p className={styles.signInMessage}>
                Please sign in to access your profile and manage your
                preferences.
              </p>

              <SignInButton mode="modal" forceRedirectUrl="/profile">
                <button className={styles.signInButton}>
                  <span className={styles.signInIcon}>🔐</span>
                  <span>Sign In to Continue</span>
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Profile - Mandy AI</title>
        <meta
          name="description"
          content="Manage your profile and preferences"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Profile</h1>
        </div>

        <div className={styles.content}>
          {/* Account Management Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Manage Account</h2>
              <p className={styles.cardDescription}>
                Manage your account settings
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.accountManagement}>
                <div
                  className={styles.userButtonWrapper}
                  onClick={e => {
                    // Find the UserButton element and trigger its click
                    // Try multiple selectors to ensure compatibility
                    const userButton =
                      e.currentTarget.querySelector(
                        '[data-clerk-element="userButton"]'
                      ) ||
                      e.currentTarget.querySelector('.cl-userButtonBox') ||
                      e.currentTarget.querySelector(
                        'button[aria-label*="user"]'
                      ) ||
                      e.currentTarget.querySelector('button')

                    if (userButton) {
                      ;(userButton as HTMLElement).click()
                    }
                  }}
                >
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-20 h-20 border-3 border-pink-500 shadow-lg',
                        userButtonPopoverCard:
                          'shadow-xl border-2 border-pink-200 bg-white',
                        userButtonPopoverActionButton:
                          'text-pink-600 hover:bg-pink-50 font-medium',
                        userButtonPopoverActionButtonText: 'font-semibold',
                      },
                    }}
                  />
                  <div className={styles.accountHint}>
                    <span className={styles.hintText}>
                      Click to manage account
                    </span>
                    <span className={styles.hintSubtext}>
                      Email • Password • Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Personal Information</h2>
              <p className={styles.cardDescription}>
                Update your basic information for better recommendations
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name</label>
                  <input
                    className={styles.input}
                    value={preferences.name}
                    onChange={e =>
                      handleBasicInfoChange('name', e.target.value)
                    }
                    placeholder="Your name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Age</label>
                  <input
                    className={styles.input}
                    type="number"
                    value={preferences.age}
                    onChange={e => handleBasicInfoChange('age', e.target.value)}
                    placeholder="Your age"
                    min="1"
                    max="120"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>City</label>
                  <input
                    className={styles.input}
                    value={preferences.city}
                    onChange={e =>
                      handleBasicInfoChange('city', e.target.value)
                    }
                    placeholder="Where do you live?"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Home Type</label>
                  <select
                    className={styles.select}
                    value={preferences.homeType}
                    onChange={e =>
                      handleBasicInfoChange('homeType', e.target.value)
                    }
                  >
                    <option value="">Select home type</option>
                    {homeTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Price Range Settings Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Budget Preferences</h2>
              <p className={styles.cardDescription}>
                Set your preferred price range for furniture and decor
                recommendations
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.currentRange}>
                <span className={styles.rangeLabel}>Current Range:</span>
                <span className={styles.rangeValue}>
                  ${preferences.priceRange.min.toLocaleString()} - $
                  {preferences.priceRange.max.toLocaleString()}
                </span>
              </div>

              <PriceRangeSlider
                value={preferences.priceRange}
                onChange={handlePriceRangeChange}
                min={1}
                max={1000}
                step={10}
              />
            </div>
          </div>

          {/* Style Preferences Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Style Preferences</h2>
              <p className={styles.cardDescription}>
                Select the design styles that speak to you
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.stylesGrid}>
                {styleOptions.map(style => (
                  <button
                    key={style}
                    className={`${styles.styleButton} ${preferences.styles.includes(style) ? styles.selected : ''}`}
                    onClick={() => handleStyleToggle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Favorite Brands Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Favorite Brands</h2>
              <p className={styles.cardDescription}>
                Add brands you love or shop from often
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.brandInputSection}>
                <div className={styles.brandInputGroup}>
                  <input
                    className={styles.input}
                    value={newBrand}
                    onChange={e => setNewBrand(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddBrand()}
                    placeholder="Enter brand name"
                  />
                  <button
                    className={styles.addButton}
                    onClick={handleAddBrand}
                    disabled={!newBrand.trim()}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={styles.brandsSection}>
                {preferences.brands.map(brand => (
                  <div key={brand} className={styles.brandTag}>
                    <span className={styles.brandName}>{brand}</span>
                    <button
                      className={styles.removeBrandButton}
                      onClick={() => handleRemoveBrand(brand)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Status */}
          {saveMessage && (
            <div
              className={`${styles.saveMessage} ${saveMessage.includes('Failed') ? styles.error : styles.success}`}
            >
              {saveMessage}
            </div>
          )}

          {isSaving && (
            <div className={styles.saving}>
              <div className={styles.spinner}></div>
              <span>Saving...</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
