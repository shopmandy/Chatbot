import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ResetOnboarding() {
  const { user } = useUser()
  const router = useRouter()
  const [status, setStatus] = useState<string>('')

  const resetOnboarding = async () => {
    if (!user) {
      setStatus('❌ No user found')
      return
    }

    try {
      setStatus('🔄 Resetting onboarding...')

      // Reset the onboarding complete flag
      await user.update({
        unsafeMetadata: { onboardingComplete: false },
      })

      setStatus('✅ Onboarding reset successfully! Redirecting...')

      // Clear localStorage
      localStorage.removeItem('onboarding_name')
      localStorage.removeItem('onboarding_age')
      localStorage.removeItem('onboarding_city')
      localStorage.removeItem('onboarding_homeType')
      localStorage.removeItem('onboarding_spending')
      localStorage.removeItem('onboarding_styles')
      localStorage.removeItem('onboarding_brands')

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Error resetting onboarding:', error)
      setStatus(`❌ Error: ${error}`)
    }
  }

  const checkStatus = () => {
    if (!user) {
      setStatus('❌ No user found')
      return
    }

    const onboardingComplete = user.unsafeMetadata?.onboardingComplete
    setStatus(`📊 Current status: onboardingComplete = ${onboardingComplete}`)
  }

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>🔄 Reset Onboarding Status</h1>

      <div style={{ marginBottom: '20px' }}>
        <p>
          This page helps you reset the onboarding status for testing purposes.
        </p>
        <p>
          <strong>Current User:</strong>{' '}
          {user ? user.emailAddresses[0]?.emailAddress : 'Not signed in'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={checkStatus}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Check Current Status
        </button>

        <button
          onClick={resetOnboarding}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Reset Onboarding
        </button>
      </div>

      {status && (
        <div
          style={{
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: status.includes('✅')
              ? '#d4edda'
              : status.includes('❌')
                ? '#f8d7da'
                : '#d1ecf1',
            border: status.includes('✅')
              ? '1px solid #c3e6cb'
              : status.includes('❌')
                ? '1px solid #f5c6cb'
                : '1px solid #bee5eb',
          }}
        >
          <strong>Status:</strong> {status}
        </div>
      )}

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
        }}
      >
        <h3>Instructions:</h3>
        <ol>
          <li>
            Click &quot;Check Current Status&quot; to see your current
            onboarding status
          </li>
          <li>
            Click &quot;Reset Onboarding&quot; to force the onboarding to appear
            again
          </li>
          <li>
            You&apos;ll be redirected to the home page where onboarding should
            pop up
          </li>
          <li>Check the browser console for debug information</li>
        </ol>
      </div>
    </div>
  )
}
