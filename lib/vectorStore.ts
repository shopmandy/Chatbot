import { supabase } from './supabase'
import {
  generateEmbedding,
  generateEmbeddings,
  type EmbeddingChunk,
} from './embeddings'

export interface VectorSearchResult {
  id: string
  content: string
  metadata: EmbeddingChunk['metadata']
  similarity: number
}

export class VectorStore {
  private tableName = 'knowledge_base'

  async initializeTable() {
    try {
      // Simply check if the table exists by trying to query it
      const { data, error } = await supabase
        .from(this.tableName)
        .select('id')
        .limit(1)

      if (error) {
        throw new Error(
          `Table '${this.tableName}' does not exist. Please create it manually in Supabase.`
        )
      }

      console.log('Vector store initialized successfully')
    } catch (error) {
      console.error('Failed to initialize vector store:', error)
      throw error
    }
  }

  async addDocument(
    content: string,
    metadata: Omit<EmbeddingChunk['metadata'], 'created_at'>
  ): Promise<string> {
    try {
      const embedding = await generateEmbedding(content)
      const fullMetadata = {
        ...metadata,
        created_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from(this.tableName)
        .insert({
          content,
          embedding: embedding, // Changed from embedding_data to embedding
          metadata: fullMetadata,
        })
        .select('id')
        .single()

      if (error) throw error

      return data.id
    } catch (error) {
      console.error('Error adding document:', error)
      throw new Error('Failed to add document to vector store')
    }
  }

  async searchSimilar(
    query: string,
    limit: number = 5,
    similarityThreshold: number = 0.7
  ): Promise<VectorSearchResult[]> {
    try {
      const queryEmbedding = await generateEmbedding(query)

      // Get all documents and calculate similarity in JavaScript
      const { data, error } = await supabase.from(this.tableName).select('*')

      if (error) throw error

      // Calculate cosine similarity for each document
      const results = data
        .map(doc => {
          const similarity = this.calculateCosineSimilarity(
            queryEmbedding,
            doc.embedding // Changed from embedding_data to embedding
          )
          return {
            id: doc.id,
            content: doc.content,
            metadata: doc.metadata,
            similarity,
          }
        })
        .filter(result => result.similarity >= similarityThreshold)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, limit)

      return results
    } catch (error) {
      console.error('Error searching similar documents:', error)
      throw new Error('Failed to search vector store')
    }
  }

  private calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) return 0

    let dotProduct = 0
    let norm1 = 0
    let norm2 = 0

    for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i]
      norm1 += vec1[i] * vec1[i]
      norm2 += vec2[i] * vec2[i]
    }

    norm1 = Math.sqrt(norm1)
    norm2 = Math.sqrt(norm2)

    if (norm1 === 0 || norm2 === 0) return 0

    return dotProduct / (norm1 * norm2)
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting document:', error)
      throw new Error('Failed to delete document from vector store')
    }
  }

  async updateDocument(
    id: string,
    content: string,
    metadata?: Partial<EmbeddingChunk['metadata']>
  ): Promise<void> {
    try {
      const updateData: any = { content }

      if (metadata) {
        updateData.metadata = metadata
      }

      // Regenerate embedding if content changed
      if (content) {
        updateData.embedding = await generateEmbedding(content) // Changed from embedding_data to embedding
      }

      const { error } = await supabase
        .from(this.tableName)
        .update(updateData)
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Error updating document:', error)
      throw new Error('Failed to update document from vector store')
    }
  }

  async getDocument(id: string): Promise<EmbeddingChunk | null> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      return data
        ? {
            id: data.id,
            content: data.content,
            metadata: data.metadata,
          }
        : null
    } catch (error) {
      console.error('Error getting document:', error)
      throw new Error('Failed to get document from vector store')
    }
  }
}

export const vectorStore = new VectorStore()
