import { NextApiRequest, NextApiResponse } from 'next'
import { searchAmazonProducts } from '../../lib/amazonAPI'
import type { AmazonSearchRequest, AmazonSearchResponse } from '../../types'
import { AMAZON_CONFIG } from '../../constants'

const validateRequest = (body: any): { isValid: boolean; error?: string } => {
  if (!body.prompt || typeof body.prompt !== 'string') {
    return { isValid: false, error: 'Prompt is required and must be a string' }
  }

  if (body.priceRange && (!body.priceRange.min || !body.priceRange.max)) {
    return { isValid: false, error: 'Invalid price range format' }
  }

  return { isValid: true }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AmazonSearchResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ success: false, products: [], error: 'Method not allowed' })
    return
  }

  const validation = validateRequest(req.body)
  if (!validation.isValid) {
    res
      .status(400)
      .json({ success: false, products: [], error: validation.error })
    return
  }

  const { prompt, priceRange, searchTerms }: AmazonSearchRequest = req.body

  try {
    const allProducts: any[] = []

    // Primary Strategy: Use AI-analyzed search terms from vision analysis
    if (searchTerms && Array.isArray(searchTerms) && searchTerms.length > 0) {
      console.log('🎯 Using AI-analyzed search terms:', searchTerms)

      for (const term of searchTerms.slice(0, AMAZON_CONFIG.MAX_SEARCH_TERMS)) {
        console.log(`🔍 Searching for: "${term}"`)
        try {
          const termProducts = await searchAmazonProducts(
            term,
            AMAZON_CONFIG.DEFAULT_CATEGORY,
            priceRange
          )
          if (termProducts.Items && termProducts.Items.length > 0) {
            console.log(
              `✅ Found ${termProducts.Items.length} products for "${term}"`
            )
            allProducts.push(
              ...termProducts.Items.slice(
                0,
                AMAZON_CONFIG.MAX_PRODUCTS_PER_TERM
              )
            )
          }
        } catch (termError: any) {
          console.warn(
            `Failed to search for term "${term}":`,
            termError?.message || 'Unknown error'
          )
        }
      }
    } else {
      // Only fallback if no AI terms were provided at all
      console.log('⚠️  No AI search terms available, using original prompt')
      console.log(`🎯 Searching for: "${prompt}"`)

      const products = await searchAmazonProducts(
        prompt,
        AMAZON_CONFIG.DEFAULT_CATEGORY,
        priceRange
      )

      if (products.Items && products.Items.length > 0) {
        allProducts.push(...products.Items)
      }
    }

    // Remove duplicates and limit results
    const uniqueProducts = allProducts
      .filter(
        (product, index, self) =>
          index === self.findIndex(p => p.id === product.id)
      )
      .slice(0, AMAZON_CONFIG.MAX_TOTAL_PRODUCTS)

    console.log(`🎉 Final result: ${uniqueProducts.length} unique products`)

    res.status(200).json({
      success: true,
      products: uniqueProducts,
    })
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error'
    console.error('Amazon search failed:', errorMessage)
    console.error('Full error details:', error)

    // Check if this is an HTML response (common with auth errors)
    if (
      errorMessage.includes('Unexpected token') &&
      errorMessage.includes('<!DOCTYPE')
    ) {
      console.error(
        '🚨 Amazon API returned HTML instead of JSON - likely an authentication or endpoint error'
      )
      res.status(500).json({
        success: false,
        products: [],
        error: 'Amazon API authentication error. Please check credentials.',
      })
      return
    }

    if (errorMessage.includes('Too Many Requests')) {
      res.status(429).json({
        success: false,
        products: [],
        error: 'Rate limited. Please wait and try again.',
      })
      return
    }

    if (errorMessage.includes('environment variable')) {
      res.status(500).json({
        success: false,
        products: [],
        error: 'Amazon API configuration error. Check environment variables.',
      })
      return
    }

    // Log the raw error response for debugging
    if (error?.response?.text) {
      console.error(
        'Raw error response:',
        error.response.text.substring(0, 500)
      )
    }

    res.status(500).json({
      success: false,
      products: [],
      error: `Amazon API Error: ${errorMessage}`,
    })
  }
}
