import { useState } from 'react'
import Head from 'next/head'

interface KnowledgeBaseItem {
  id: string
  content: string
  metadata: {
    source: string
    title?: string
    category?: string
    tags?: string[]
    created_at: string
  }
  similarity?: number
}

export default function KnowledgeBaseAdmin() {
  const [newContent, setNewContent] = useState('')
  const [newMetadata, setNewMetadata] = useState({
    source: '',
    title: '',
    category: '',
    tags: '',

  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<KnowledgeBaseItem[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddContent = async () => {
    if (!newContent.trim() || !newMetadata.source.trim()) {
      setMessage('Please provide both content and source')
      return
    }

    setIsAdding(true)
    try {
      const tags = newMetadata.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newContent,
          metadata: {
            ...newMetadata,
            tags,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(
          `Successfully added content! ${data.chunks > 1 ? `Split into ${data.chunks} chunks.` : ''}`
        )
        setNewContent('')
        setNewMetadata({
          source: '',
          title: '',
          category: '',
          tags: '',
        })
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    } finally {
      setIsAdding(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setMessage('Please enter a search query')
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `/api/knowledge-base?query=${encodeURIComponent(searchQuery)}&limit=10`
      )

      const data = await response.json()

      if (data.success) {
        setSearchResults(data.results)
        setMessage(`Found ${data.count} results`)
      } else {
        setMessage(`Error: ${data.error}`)
        setSearchResults([])
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <>
      <Head>
        <title>Knowledge Base Admin - ShopMandy</title>
      </Head>


      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            🧠 Knowledge Base Admin
          </h1>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.includes('Error')
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Content Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                ➕ Add New Content
              </h2>


              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter the content you want to add to the knowledge base..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source *
                    </label>
                    <input
                      type="text"
                      value={newMetadata.source}
                      onChange={e =>
                        setNewMetadata({
                          ...newMetadata,
                          source: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., ShopMandy Guide"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newMetadata.title}
                      onChange={e =>
                        setNewMetadata({
                          ...newMetadata,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Tool Safety Guide"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newMetadata.category}
                      onChange={e =>
                        setNewMetadata({
                          ...newMetadata,
                          category: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Safety, Tools"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={newMetadata.tags}
                      onChange={e =>
                        setNewMetadata({ ...newMetadata, tags: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., safety, tools, beginners"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddContent}
                  disabled={isAdding}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAdding ? 'Adding...' : 'Add to Knowledge Base'}
                </button>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                🔍 Search Knowledge Base
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Query
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., hammer safety, painting walls"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>

                {searchResults.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Search Results
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {searchResults.map(result => (
                        <div
                          key={result.id}
                          className="border border-gray-200 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-800">
                              {result.metadata.title || result.metadata.source}
                            </h4>
                            {result.similarity && (
                              <span className="text-sm text-gray-500">
                                {(result.similarity * 100).toFixed(1)}% match
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Source: {result.metadata.source}
                            {result.metadata.category &&
                              ` • ${result.metadata.category}`}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {result.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              ℹ️ How RAG Works
            </h3>
            <div className="text-blue-700 space-y-2">
              <p>
                <strong>Retrieval-Augmented Generation (RAG)</strong> enhances
                your chatbot by:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Storing your knowledge base as vector embeddings</li>
                <li>Finding relevant information when users ask questions</li>
                <li>Providing more accurate, context-aware responses</li>
                <li>Learning from your specific content and expertise</li>
              </ul>
              <p className="mt-3 text-sm">
                The system automatically chunks long content, generates
                embeddings, and retrieves the most relevant information for each
                user query.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
