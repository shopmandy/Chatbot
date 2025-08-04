import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/router';

export default function DebugOnboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    if (isLoaded && user) {
      const info = {
        user: !!user,
        isLoaded,
        onboardingComplete: user.unsafeMetadata?.onboardingComplete,
        currentPath: router.pathname,
        shouldRedirect: user && user.unsafeMetadata?.onboardingComplete !== true && !router.pathname.startsWith("/onboarding"),
        userMetadata: user.unsafeMetadata,
        userId: user.id
      };
      setDebugInfo(info);
      console.log('🔍 Debug Info:', info);
    }
  }, [user, isLoaded, router.pathname]);

  const forceOnboarding = () => {
    router.push('/onboarding/step1');
  };

  const resetOnboarding = async () => {
    if (!user) return;
    
    try {
      await user.update({
        unsafeMetadata: { onboardingComplete: false }
      });
      alert('Onboarding reset! Refresh the page.');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Error resetting onboarding');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔍 Onboarding Debug</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Status:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={forceOnboarding}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Force Go to Onboarding
        </button>
        
        <button 
          onClick={resetOnboarding}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset Onboarding Status
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>What to check:</h3>
        <ul>
          <li>Is <code>user</code> true?</li>
          <li>Is <code>isLoaded</code> true?</li>
          <li>Is <code>onboardingComplete</code> false or undefined?</li>
          <li>Is <code>shouldRedirect</code> true?</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>💡 If onboarding still doesn't appear:</h3>
        <ol>
          <li>Check the browser console for the debug logs</li>
          <li>Make sure you're on the home page (/)</li>
          <li>Try clicking "Force Go to Onboarding"</li>
          <li>If that works, the issue is with the redirect logic</li>
        </ol>
      </div>
    </div>
  );
} 