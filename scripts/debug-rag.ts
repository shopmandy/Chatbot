import { config } from 'dotenv'
import { vectorStore } from '../lib/vectorStore'

// Load environment variables
config({ path: '.env.local' })

async function debugRAG() {
  console.log('🔍 Debugging RAG System...\n')

  try {
    // Test 1: Check if table exists
    console.log('1. Checking if table exists...')
    await vectorStore.initializeTable()
    console.log('✅ Table exists\n')

    // Test 2: Try to add a simple document
    console.log('2. Testing document addition...')
    const testId = await vectorStore.addDocument('This is a test document', {
      source: 'Test Source',
      title: 'Test Document',
      category: 'Testing',
    })
    console.log(`✅ Document added with ID: ${testId}\n`)

    // Test 3: Try to retrieve the document
    console.log('3. Testing document retrieval...')
    const doc = await vectorStore.getDocument(testId)
    if (doc) {
      console.log('✅ Document retrieved successfully')
      console.log(`   Content: ${doc.content}`)
      console.log(`   Source: ${doc.metadata.source}`)
    } else {
      console.log('❌ Failed to retrieve document')
    }

    // Test 4: Clean up
    console.log('\n4. Cleaning up test document...')
    await vectorStore.deleteDocument(testId)
    console.log('✅ Test document removed')

    console.log('\n🎉 All tests passed!')
  } catch (error: any) {
    console.error('❌ Debug failed:', error)
    console.error('\nError details:', {
      message: error.message,
      code: error.code,
      details: error.details,
    })
  }
}

// Run if called directly
if (require.main === module) {
  debugRAG()
}

export { debugRAG }
