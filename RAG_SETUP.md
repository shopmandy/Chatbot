# RAG (Retrieval-Augmented Generation) Setup Guide

This guide explains how to set up and use the RAG system in your ShopMandy chatbot.

## What is RAG?

RAG (Retrieval-Augmented Generation) enhances your chatbot by:
- **Retrieving** relevant information from your knowledge base
- **Augmenting** the AI's responses with this context
- **Generating** more accurate and helpful answers

## Prerequisites

1. **Supabase Account**: You need a Supabase project with vector support
2. **OpenAI API Key**: For generating embeddings and chat completions
3. **Environment Variables**: Configure your `.env.local` file

## Environment Setup

Create or update your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

## Supabase Vector Setup

### Option 1: Enable pgvector Extension (Recommended)

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the following SQL:

```sql
-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the knowledge_base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vector index for similarity search
CREATE INDEX IF NOT EXISTS idx_knowledge_base_embedding 
ON knowledge_base 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create metadata index for filtering
CREATE INDEX IF NOT EXISTS idx_knowledge_base_metadata 
ON knowledge_base 
USING GIN (metadata);
```

### Option 2: Use RPC Functions

If you prefer to use RPC functions, create these in your Supabase dashboard:

```sql
-- Function to create vector table
CREATE OR REPLACE FUNCTION create_vector_table(table_name TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      content TEXT NOT NULL,
      embedding vector(1536),
      metadata JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    CREATE INDEX IF NOT EXISTS idx_%I_embedding 
    ON %I 
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);
    
    CREATE INDEX IF NOT EXISTS idx_%I_metadata 
    ON %I 
    USING GIN (metadata);
  ', table_name, table_name, table_name, table_name, table_name);
END;
$$ LANGUAGE plpgsql;

-- Function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  table_name text
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY EXECUTE format('
    SELECT
      id,
      content,
      metadata,
      1 - (embedding <=> $1) AS similarity
    FROM %I
    WHERE 1 - (embedding <=> $1) > $2
    ORDER BY embedding <=> $1
    LIMIT $3;
  ', table_name)
  USING query_embedding, match_threshold, match_count;
END;
$$;
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Populate the knowledge base with initial content:
```bash
npm run populate-kb
```

This will add sample DIY content including:
- Tool safety guidelines
- Hammer basics
- Painting guides
- Electrical safety
- Furniture assembly tips

## Usage

### 1. Chat with RAG

Your chatbot now automatically uses RAG! When users ask questions:
1. The system searches your knowledge base for relevant information
2. Retrieves the most similar content
3. Enhances the AI's response with this context
4. Provides more accurate, helpful answers

### 2. Manage Knowledge Base

Visit `/admin/knowledge-base` to:
- Add new content
- Search existing content
- View how RAG is working

### 3. Add Custom Content

Use the admin interface or API to add your own content:

```typescript
// Example: Add content programmatically
const response = await fetch('/api/knowledge-base', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: 'Your DIY content here...',
    metadata: {
      source: 'Your Source',
      title: 'Content Title',
      category: 'Category',
      tags: ['tag1', 'tag2']
    }
  })
})
```

## How It Works

### 1. Content Processing
- Long content is automatically chunked into smaller pieces
- Each chunk is converted to a vector embedding using OpenAI
- Embeddings are stored in Supabase with metadata

### 2. Query Processing
- User questions are converted to embeddings
- Similarity search finds relevant content
- Context is combined and sent to the AI

### 3. Response Generation
- AI receives enhanced system prompt with context
- Responses are more accurate and relevant
- Users get better, more helpful answers

## Customization

### Adjusting RAG Parameters

Edit `lib/ragProcessor.ts` to customize:

```typescript
export class RAGProcessor {
  private maxContextLength = 4000      // Maximum context length
  private maxRetrievedDocs = 5         // Number of documents to retrieve
  private similarityThreshold = 0.7    // Similarity threshold for retrieval
}
```

### Changing Embedding Model

Edit `lib/embeddings.ts` to use different models:

```typescript
const response = await openai.embeddings.create({
  model: 'text-embedding-3-small',  // or 'text-embedding-3-large'
  input: text,
})
```

## Troubleshooting

### Common Issues

1. **Vector Extension Not Available**
   - Ensure pgvector is enabled in Supabase
   - Check your Supabase plan supports vector operations

2. **Embedding Generation Fails**
   - Verify your OpenAI API key is valid
   - Check API rate limits and billing

3. **Similarity Search Returns No Results**
   - Lower the similarity threshold
   - Ensure content exists in the knowledge base
   - Check that embeddings were generated correctly

### Debugging

Enable logging in your chat API to see RAG context:

```typescript
// In pages/api/chat.ts
console.log('RAG Context Summary:', ragProcessor.getContextSummary(ragContext))
```

## Performance Tips

1. **Content Chunking**: Keep chunks between 500-1000 characters for optimal retrieval
2. **Metadata**: Use descriptive tags and categories for better organization
3. **Regular Updates**: Keep your knowledge base current with new content
4. **Indexing**: Ensure vector indexes are properly created for fast searches

## Security Considerations

1. **API Keys**: Never expose API keys in client-side code
2. **Content Validation**: Validate and sanitize content before adding to knowledge base
3. **Access Control**: Consider implementing authentication for admin functions
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Next Steps

1. **Add Your Content**: Populate the knowledge base with your specific DIY guides
2. **Monitor Performance**: Track how RAG improves response quality
3. **Iterate**: Refine content and parameters based on user feedback
4. **Scale**: Consider adding more sophisticated retrieval strategies

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your environment variables are correct
3. Ensure Supabase vector support is enabled
4. Check OpenAI API status and billing

---

**Happy Building! 🛠️✨**

Your chatbot is now powered by RAG and ready to provide intelligent, context-aware DIY assistance! 