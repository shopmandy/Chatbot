import { useState } from 'react';
import { saveOnboardingData } from '../lib/onboardingAPI';

export default function TestOnboarding() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [savedData, setSavedData] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  const testData = {
    name: "Test User",
    age: "25",
    city: "New York",
    type_of_home: "apartment",
    category_budgets: {
      furniture: 1000,
      decor: 500,
      lighting: 300
    },
    styles: ["modern", "minimalist"],
    brands: ["IKEA", "West Elm"]
  };

  const handleTest = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      const response = await saveOnboardingData(testData);
      
      if (response.success) {
        setResult('✅ SUCCESS: Onboarding data saved successfully! Check your Supabase dashboard to see the new record.');
        // Automatically fetch the data after saving
        await fetchSavedData();
      } else {
        setResult(`❌ ERROR: ${response.error}`);
      }
    } catch (error) {
      setResult(`❌ EXCEPTION: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedData = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch('/api/get-onboarding-data');
      const result = await response.json();
      
      if (result.success) {
        setSavedData(result.data);
      } else {
        console.error('Failed to fetch data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test Onboarding Data Saving</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Test Data:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(testData, null, 2)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={handleTest} 
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test Save Onboarding Data'}
        </button>

        <button 
          onClick={fetchSavedData} 
          disabled={fetchLoading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: fetchLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {fetchLoading ? 'Loading...' : 'Fetch Saved Data'}
        </button>
      </div>

      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: result.includes('SUCCESS') ? '#d4edda' : '#f8d7da',
          border: result.includes('SUCCESS') ? '1px solid #c3e6cb' : '1px solid #f5c6cb'
        }}>
          <strong>Result:</strong> {result}
        </div>
      )}

      {savedData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Saved Data ({savedData.length} records):</h3>
          {savedData.map((record, index) => (
            <div key={index} style={{ 
              background: '#f8f9fa', 
              padding: '15px', 
              marginBottom: '10px', 
              borderRadius: '5px',
              border: '1px solid #dee2e6'
            }}>
              <pre style={{ margin: 0, fontSize: '12px' }}>
                {JSON.stringify(record, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>How to verify it worked:</h3>
        <ol>
          <li>Click the "Test Save Onboarding Data" button above</li>
          <li>Check the browser console for logs</li>
          <li>Check your terminal/server logs</li>
          <li>Click "Fetch Saved Data" to see the data retrieved from Supabase</li>
          <li>Go to your Supabase dashboard → Table Editor → onboarding_data</li>
          <li>You should see a new row with the test data</li>
        </ol>
      </div>
    </div>
  );
} 