import * as ProductAdvertisingAPIv1 from 'amazon-pa-api5-node-ts'
import type { AmazonSearchResult, PriceRange, SearchCategory } from '../types'

export async function searchAmazonProducts(
  keywords: string,
  category: SearchCategory = 'All',
  priceRange?: PriceRange
): Promise<AmazonSearchResult> {
  try {
    // Validate environment variables
    const accessKey = process.env.AMAZON_ACCESS_KEY_ID
    const secretKey = process.env.AMAZON_SECRET_ACCESS_KEY
    const partnerTag = process.env.AMAZON_ASSOCIATE_TAG

    if (!accessKey || !secretKey || !partnerTag) {
      console.error('Missing Amazon API credentials:', {
        hasAccessKey: !!accessKey,
        hasSecretKey: !!secretKey,
        hasPartnerTag: !!partnerTag,
      })
      throw new Error('Missing Amazon API credentials')
    }

    console.log('Initializing Amazon API with credentials...')

    // Initialize the client
    const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance

    // Set the region and credentials
    defaultClient.accessKey = accessKey
    defaultClient.secretKey = secretKey
    defaultClient.host = 'webservices.amazon.com'
    defaultClient.region = 'us-east-1'

    // Create API instance
    const api = new ProductAdvertisingAPIv1.DefaultApi()

    console.log(
      'Creating search request with keywords:',
      keywords,
      'category:',
      category
    )

    // Create search request using the proper class
    const searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest()

    // Set the required parameters
    searchItemsRequest['PartnerTag'] = partnerTag
    searchItemsRequest['PartnerType'] = 'Associates'
    searchItemsRequest['Keywords'] = keywords
    searchItemsRequest['SearchIndex'] = category === 'All' ? 'All' : category
    searchItemsRequest['ItemCount'] = 10
    searchItemsRequest['Resources'] = [
      'Images.Primary.Medium',
      'ItemInfo.Title',
      'ItemInfo.Features',
      'Offers.Listings.Price',
      'ItemInfo.ByLineInfo',
    ]

    // Add price range filtering if provided and valid
    if (priceRange) {
      const minPriceCents = Math.round(priceRange.min * 100)
      const maxPriceCents = Math.round(priceRange.max * 100)

      // Only add MinPrice if it's greater than 0 (Amazon requirement)
      if (minPriceCents > 0) {
        searchItemsRequest['MinPrice'] = minPriceCents
      }

      // Only add MaxPrice if it's greater than MinPrice or if MinPrice isn't set
      if (
        maxPriceCents > 0 &&
        (minPriceCents === 0 || maxPriceCents > minPriceCents)
      ) {
        searchItemsRequest['MaxPrice'] = maxPriceCents
      }

      console.log(
        `Adding price filter: $${priceRange.min} - $${priceRange.max} (${minPriceCents} - ${maxPriceCents} cents)`
      )
    }

    console.log('Making API request with:', searchItemsRequest)

    // Make the API call using the promise-based method
    const response = await api.searchItems(searchItemsRequest)

    console.log('Amazon API Response received:', response)

    // Process the response - return in format expected by the API route
    if (
      !response ||
      !response['SearchResult'] ||
      !response['SearchResult']['Items']
    ) {
      console.log('No items found in search result')
      return { Items: [], TotalResultCount: 0 }
    }

    // Transform the results to our format
    const items = response['SearchResult']['Items']
    const products = items.map(item => ({
      id: item['ASIN'],
      title: item['ItemInfo']?.['Title']?.['DisplayValue'] || 'No title',
      price:
        item['Offers']?.['Listings']?.[0]?.['Price']?.['DisplayAmount'] ||
        'Price not available',
      image:
        item['Images']?.['Primary']?.['Medium']?.['URL'] ||
        '/placeholder-image.jpg',
      url: item['DetailPageURL'] || '#',
      features: item['ItemInfo']?.['Features'] || [],
    }))

    console.log(`Successfully processed ${products.length} products`)
    return {
      Items: products,
      TotalResultCount: response['SearchResult']['TotalResultCount'] || 0,
    }
  } catch (error) {
    console.error('Amazon API Error:', error)

    // Enhanced error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    // Log the full error object for debugging
    console.error('Full error object:', JSON.stringify(error, null, 2))

    throw error
  }
}
