import { useState, useCallback } from 'react'
import { getUserPriceRange } from '../lib/onboardingAPI'
import { API_ENDPOINTS, ERROR_MESSAGES, PRICE_VALIDATION } from '../constants'
import type {
  UseProductSearchReturn,
  AmazonProduct,
  RoomAnalysis,
  AmazonSearchRequest,
  AmazonSearchResponse,
  RoomAnalysisRequest,
  RoomAnalysisResponse,
} from '../types'

export const useProductSearch = (): UseProductSearchReturn => {
  const [products, setProducts] = useState<AmazonProduct[]>([])
  const [currentAnalysis, setCurrentAnalysis] = useState<RoomAnalysis | null>(
    null
  )
  const [loading, setLoading] = useState(false)

  const validatePriceRange = (rawPriceRange: any) => {
    if (!rawPriceRange) return null

    const { min, max } = rawPriceRange
    return min >= PRICE_VALIDATION.MIN_PRICE && max > min ? { min, max } : null
  }

  const analyzeRoomChanges = async (
    beforeImageUrl: string,
    afterImageUrl: string,
    roomType: string
  ): Promise<string[]> => {
    try {
      console.log('🔍 Analyzing room transformation for product extraction...')

      const analysisRequest: RoomAnalysisRequest = {
        beforeImageUrl,
        afterImageUrl,
        roomType,
      }

      const analysisResponse = await fetch(API_ENDPOINTS.ANALYZE_ROOM_CHANGES, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysisRequest),
      })

      if (analysisResponse.ok) {
        const analysisData: RoomAnalysisResponse = await analysisResponse.json()
        if (analysisData.success && analysisData.searchTerms) {
          console.log(
            '✅ Extracted search terms from images:',
            analysisData.searchTerms
          )
          return analysisData.searchTerms
        }
      } else {
        console.warn(
          'Image analysis failed, falling back to prompt-based search'
        )
      }
    } catch (analysisError) {
      console.warn('Image analysis error:', analysisError)
    }

    return []
  }

  const searchAmazonProducts = async (
    searchRequest: AmazonSearchRequest
  ): Promise<AmazonProduct[]> => {
    const productResponse = await fetch(API_ENDPOINTS.AMAZON_PRODUCTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(searchRequest),
    })

    if (!productResponse.ok) {
      const errorText = await productResponse.text()
      console.error('Amazon API HTTP error:', productResponse.status, errorText)
      throw new Error(
        `Amazon API returned ${productResponse.status}: ${errorText.substring(0, 200)}`
      )
    }

    const contentType = productResponse.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await productResponse.text()
      console.error(
        'Amazon API returned non-JSON response:',
        responseText.substring(0, 500)
      )
      throw new Error(
        'Amazon API returned HTML instead of JSON - check server logs'
      )
    }

    const productData: AmazonSearchResponse = await productResponse.json()
    console.log('Amazon API response:', productData)

    if (productData.success && productData.products) {
      console.log('First product sample:', productData.products[0])
      return productData.products
    } else {
      console.log('No products found or API error:', productData)
      throw new Error(ERROR_MESSAGES.NO_PRODUCTS_FOUND)
    }
  }

  const searchWithAnalysis = useCallback(
    async (
      beforeImageUrl: string,
      afterImageUrl: string,
      roomType: string,
      vision: string
    ): Promise<void> => {
      setLoading(true)

      try {
        const rawPriceRange = getUserPriceRange()
        const priceRange = validatePriceRange(rawPriceRange)
        console.log('Using price range for search:', priceRange)

        // Step 1: Analyze images for specific products
        const searchTerms = await analyzeRoomChanges(
          beforeImageUrl,
          afterImageUrl,
          roomType
        )

        // Cache the analysis results
        const analysis: RoomAnalysis = {
          searchTerms,
          beforeImageUrl,
          afterImageUrl,
          roomType,
        }
        setCurrentAnalysis(analysis)

        // Step 2: Search for products using AI-extracted terms
        const searchRequest: AmazonSearchRequest = {
          prompt: vision,
          roomType,
          priceRange: priceRange || undefined,
          beforeImageUrl,
          afterImageUrl,
          searchTerms,
        }

        const foundProducts = await searchAmazonProducts(searchRequest)
        setProducts(foundProducts)
      } catch (error) {
        console.log('Amazon products search failed:', error)
        throw error instanceof Error
          ? error
          : new Error(ERROR_MESSAGES.PRODUCT_SEARCH_FAILED)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const searchProducts = useCallback(
    async (analysis?: RoomAnalysis): Promise<void> => {
      setLoading(true)

      try {
        const rawPriceRange = getUserPriceRange()
        const priceRange = validatePriceRange(rawPriceRange)

        let searchRequest: AmazonSearchRequest

        if (analysis && analysis.searchTerms.length > 0) {
          console.log(
            '🎯 Using cached AI analysis for manual search:',
            analysis.searchTerms
          )
          searchRequest = {
            prompt: '', // Not needed when we have search terms
            roomType: analysis.roomType,
            priceRange: priceRange || undefined,
            beforeImageUrl: analysis.beforeImageUrl,
            afterImageUrl: analysis.afterImageUrl,
            searchTerms: analysis.searchTerms,
          }
        } else {
          console.log('⚠️ No cached AI analysis, using fallback prompt')
          searchRequest = {
            prompt: 'home decor',
            roomType: 'Living Room',
            priceRange: priceRange || undefined,
          }
        }

        const foundProducts = await searchAmazonProducts(searchRequest)
        setProducts(foundProducts)
      } catch (error) {
        console.log('Manual product search failed:', error)
        throw error instanceof Error
          ? error
          : new Error(ERROR_MESSAGES.PRODUCT_SEARCH_FAILED)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    products,
    currentAnalysis,
    searchProducts,
    loading,
    searchWithAnalysis, // Add the missing method
  }
}
