import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface EmbeddingChunk {
  id: string
  content: string
  metadata: {
    source: string
    title?: string
    category?: string
    tags?: string[]
    created_at: string
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw new Error('Failed to generate embedding')
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts,
    })

    return response.data.map(item => item.embedding)
  } catch (error) {
    console.error('Error generating embeddings:', error)
    throw new Error('Failed to generate embeddings')
  }
}

export function chunkText(
  text: string,
  chunkSize: number = 1000,
  overlap: number = 200
): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    let chunk = text.slice(start, end)

    // Try to break at sentence boundaries
    if (end < text.length) {
      const lastPeriod = chunk.lastIndexOf('.')
      const lastExclamation = chunk.lastIndexOf('!')
      const lastQuestion = chunk.lastIndexOf('?')
      const lastBreak = Math.max(lastPeriod, lastExclamation, lastQuestion)

      if (lastBreak > chunkSize * 0.7) {
        chunk = chunk.slice(0, lastBreak + 1)
        start = start + lastBreak + 1
      } else {
        start = end
      }
    } else {
      start = end
    }

    if (chunk.trim()) {
      chunks.push(chunk.trim())
    }

    // Apply overlap
    start = Math.max(0, start - overlap)
  }

  return chunks
}
