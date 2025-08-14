import type { NextApiRequest, NextApiResponse } from 'next'
import { RAGProcessor } from '@/lib/ragProcessor'
import { chunkText } from '@/lib/embeddings'

const ragProcessor = new RAGProcessor()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Add content to knowledge base
    try {
      const { content, metadata } = req.body
      
      if (!content || !metadata?.source) {
        return res.status(400).json({ 
          error: 'Content and source metadata are required' 
        })
      }
      
      // Chunk the content if it's long
      const chunks = chunkText(content, 1000, 200)
      
      if (chunks.length === 1) {
        // Single chunk
        const id = await ragProcessor.addToKnowledgeBase(content, metadata)
        return res.status(200).json({ 
          success: true, 
          id,
          chunks: 1 
        })
      } else {
        // Multiple chunks
        const chunkedMetadata = chunks.map((chunk, index) => ({
          ...metadata,
          title: metadata.title ? `${metadata.title} - Part ${index + 1}` : `Part ${index + 1}`,
          chunkIndex: index,
          totalChunks: chunks.length
        }))
        
        const ids = await Promise.all(
          chunks.map((chunk, index) => 
            ragProcessor.addToKnowledgeBase(chunk, chunkedMetadata[index])
          )
        )
        
        return res.status(200).json({ 
          success: true, 
          ids,
          chunks: chunks.length 
        })
      }
    } catch (error: any) {
      console.error('Error adding to knowledge base:', error)
      return res.status(500).json({ 
        error: 'Failed to add content to knowledge base',
        details: error.message 
      })
    }
  } else if (req.method === 'GET') {
    // Search knowledge base
    try {
      const { query, limit = 5 } = req.query
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ 
          error: 'Query parameter is required' 
        })
      }
      
      const results = await ragProcessor.searchKnowledgeBase(query, Number(limit))
      
      return res.status(200).json({
        success: true,
        results,
        query,
        count: results.length
      })
    } catch (error: any) {
      console.error('Error searching knowledge base:', error)
      return res.status(500).json({ 
        error: 'Failed to search knowledge base',
        details: error.message 
      })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
} 