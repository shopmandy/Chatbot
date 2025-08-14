import { vectorStore } from '../lib/vectorStore'
import { RAGProcessor } from '../lib/ragProcessor'

async function testRAGSystem() {
  console.log('🧪 Testing RAG System...\n')

  try {
    // Test 1: Initialize vector store
    console.log('1. Testing vector store initialization...')
    await vectorStore.initializeTable()
    console.log('✅ Vector store initialized successfully\n')

    // Test 2: Add a test document
    console.log('2. Testing document addition...')
    const testContent = `# Test Document
    
This is a test document to verify the RAG system is working correctly. It contains information about basic DIY tools and safety guidelines.

## Key Points:
- Always wear safety equipment
- Use tools properly
- Keep your workspace clean
- Ask for help when needed`

    const testId = await vectorStore.addDocument(testContent, {
      source: 'Test Source',
      title: 'Test Document',
      category: 'Testing',
      tags: ['test', 'rag', 'verification']
    })
    console.log(`✅ Test document added with ID: ${testId}\n`)

    // Test 3: Test similarity search
    console.log('3. Testing similarity search...')
    const searchResults = await vectorStore.searchSimilar('safety guidelines', 3, 0.5)
    console.log(`✅ Found ${searchResults.length} similar documents`)
    searchResults.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.metadata.title} (${(result.similarity * 100).toFixed(1)}% match)`)
    })
    console.log()

    // Test 4: Test RAG processor
    console.log('4. Testing RAG processor...')
    const ragProcessor = new RAGProcessor()
    const ragContext = await ragProcessor.processQuery('What safety equipment should I use?')
    
    console.log(`✅ RAG context processed:`)
    console.log(`   Query: ${ragContext.query}`)
    console.log(`   Retrieved documents: ${ragContext.retrievedDocuments.length}`)
    console.log(`   Context length: ${ragContext.combinedContext.length} characters`)
    console.log()

    // Test 5: Test enhanced system prompt
    console.log('5. Testing enhanced system prompt...')
    const basePrompt = 'You are a helpful DIY assistant.'
    const enhancedPrompt = await ragProcessor.enhanceSystemPrompt(basePrompt, ragContext)
    console.log(`✅ System prompt enhanced:`)
    console.log(`   Base length: ${basePrompt.length} characters`)
    console.log(`   Enhanced length: ${enhancedPrompt.length} characters`)
    console.log()

    // Test 6: Test knowledge base search
    console.log('6. Testing knowledge base search...')
    const kbResults = await ragProcessor.searchKnowledgeBase('tools safety', 5)
    console.log(`✅ Knowledge base search returned ${kbResults.length} results`)
    kbResults.forEach((result, index) => {
      console.log(`   ${index + 1}. ${result.metadata.title || result.metadata.source}`)
    })
    console.log()

    // Test 7: Clean up test document
    console.log('7. Cleaning up test document...')
    await vectorStore.deleteDocument(testId)
    console.log('✅ Test document removed\n')

    console.log('🎉 All RAG system tests passed successfully!')
    console.log('\nYour RAG system is working correctly and ready to use.')

  } catch (error) {
    console.error('❌ RAG system test failed:', error)
    console.error('\nPlease check:')
    console.error('1. Your environment variables are set correctly')
    console.error('2. Supabase vector extension is enabled')
    console.error('3. OpenAI API key is valid')
    console.error('4. Database connection is working')
  }
}

// Run if called directly
if (require.main === module) {
  testRAGSystem()
}

export { testRAGSystem } 