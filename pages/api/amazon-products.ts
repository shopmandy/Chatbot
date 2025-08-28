import { NextApiRequest, NextApiResponse } from 'next'
import { searchAmazonProducts } from '../../lib/amazonAPI'

interface ApiResponse {
  success: boolean
  products?: any[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { prompt, roomType, priceRange } = req.body

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ success: false, error: 'Prompt is required' })
  }

  try {
    // Create ONE search query combining prompt and room type
    const searchQuery =
      roomType && roomType !== '' ? `${prompt} ${roomType}` : prompt

    console.log(`🎯 Making single search for: "${searchQuery}"`)

    // Log price range if provided
    if (priceRange) {
      console.log(
        `💰 Using price filter: $${priceRange.min} - $${priceRange.max}`
      )
    }

    // Make ONLY ONE API call with correct SearchIndex and price filtering
    const products = await searchAmazonProducts(
      searchQuery,
      'HomeAndKitchen',
      priceRange
    )

    console.log(
      `✅ Single search returned ${products.Items?.length || 0} products`
    )

    res.status(200).json({
      success: true,
      products: products.Items || [],
    })
  } catch (error: any) {
    console.error('Amazon search failed:', error.message)
    console.error('Full error details:', error)

    // Check if this is an HTML response (common with auth errors)
    if (
      error.message?.includes('Unexpected token') &&
      error.message?.includes('<!DOCTYPE')
    ) {
      console.error(
        '🚨 Amazon API returned HTML instead of JSON - likely an authentication or endpoint error'
      )
      return res.status(500).json({
        success: false,
        error: 'Amazon API authentication error. Please check credentials.',
      })
    }

    if (error.message?.includes('Too Many Requests')) {
      return res.status(429).json({
        success: false,
        error: 'Rate limited. Please wait and try again.',
      })
    }

    if (error.message?.includes('environment variable')) {
      return res.status(500).json({
        success: false,
        error: 'Amazon API configuration error. Check environment variables.',
      })
    }

    // Log the raw error response for debugging
    if (error.response?.text) {
      console.error(
        'Raw error response:',
        error.response.text.substring(0, 500)
      )
    }

    res.status(500).json({
      success: false,
      error: `Amazon API Error: ${error.message}`,
    })
  }
}
