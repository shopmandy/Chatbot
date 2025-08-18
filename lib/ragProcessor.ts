import { vectorStore, type VectorSearchResult } from './vectorStore'
import { generateEmbedding } from './embeddings'

export interface RAGContext {
  query: string
  retrievedDocuments: VectorSearchResult[]
  combinedContext: string
}

export class RAGProcessor {
  private maxContextLength = 4000
  private maxRetrievedDocs = 5
  private similarityThreshold = 0.7

  async processQuery(query: string): Promise<RAGContext> {
    try {
      // Retrieve relevant documents
      const retrievedDocuments = await vectorStore.searchSimilar(
        query,
        this.maxRetrievedDocs,
        this.similarityThreshold
      )

      // Combine context from retrieved documents
      const combinedContext = this.combineContext(query, retrievedDocuments)

      return {
        query,
        retrievedDocuments,
        combinedContext,
      }
    } catch (error) {
      console.error('Error processing RAG query:', error)
      // Return empty context if RAG fails
      return {
        query,
        retrievedDocuments: [],
        combinedContext: '',
      }
    }
  }

  private combineContext(
    query: string,
    documents: VectorSearchResult[]
  ): string {
    if (documents.length === 0) {
      return ''
    }

    let combinedContext = `Based on the following relevant information:\n\n`
    let currentLength = combinedContext.length

    for (const doc of documents) {
      const docContext = `Source: ${doc.metadata.source}${doc.metadata.title ? ` - ${doc.metadata.title}` : ''}\nContent: ${doc.content}\n\n`

      // Check if adding this document would exceed context length
      if (currentLength + docContext.length > this.maxContextLength) {
        break
      }

      combinedContext += docContext
      currentLength += docContext.length
    }

    return combinedContext.trim()
  }

  async enhanceSystemPrompt(
    basePrompt: string,
    context: RAGContext
  ): Promise<string> {
    if (!context.combinedContext) {
      return basePrompt
    }

    const enhancedPrompt = `${basePrompt}

IMPORTANT CONTEXT INFORMATION:
${context.combinedContext}

When answering the user's question, use the above context information to provide accurate, helpful responses. If the context contains relevant information, incorporate it naturally into your response. If the context doesn't contain relevant information for the user's specific question, rely on your general knowledge but mention that you're providing general advice.

Current user question: ${context.query}`

    return enhancedPrompt
  }

  async addToKnowledgeBase(
    content: string,
    metadata: {
      source: string
      title?: string
      category?: string
      tags?: string[]
    }
  ): Promise<string> {
    try {
      return await vectorStore.addDocument(content, metadata)
    } catch (error) {
      console.error('Error adding to knowledge base:', error)
      throw new Error('Failed to add content to knowledge base')
    }
  }

  async searchKnowledgeBase(
    query: string,
    limit: number = 5
  ): Promise<VectorSearchResult[]> {
    try {
      return await vectorStore.searchSimilar(
        query,
        limit,
        this.similarityThreshold
      )
    } catch (error) {
      console.error('Error searching knowledge base:', error)
      return []
    }
  }

  getContextSummary(context: RAGContext): string {
    if (context.retrievedDocuments.length === 0) {
      return 'No relevant context found'
    }

    const sources = context.retrievedDocuments.map(
      doc =>
        doc.metadata.source +
        (doc.metadata.title ? ` - ${doc.metadata.title}` : '')
    )

    return `Found ${context.retrievedDocuments.length} relevant sources: ${sources.join(', ')}`
  }
}
