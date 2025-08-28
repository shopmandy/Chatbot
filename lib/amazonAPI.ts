import ProductAdvertisingAPIv1 from 'paapi5-nodejs-sdk'

export async function searchAmazonProducts(
  keywords: string,
  category: string = 'All',
  priceRange?: { min: number; max: number }
) {
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

    // Set the region and credentials (direct assignment method)
    defaultClient.host = 'webservices.amazon.com'
    ;(defaultClient as any).accessKey = accessKey
    ;(defaultClient as any).secretKey = secretKey

    // Create API instance
    const api = new ProductAdvertisingAPIv1.DefaultApi()

    console.log(
      'Creating search request with keywords:',
      keywords,
      'category:',
      category
    )

    // Create search request using object format (works better with TypeScript)
    const searchItemsRequest: any = {
      PartnerTag: partnerTag,
      PartnerType: 'Associates',
      Keywords: keywords,
      SearchIndex: category === 'All' ? 'All' : category,
      ItemCount: 10,
      Resources: [
        'Images.Primary.Medium',
        'ItemInfo.Title',
        'ItemInfo.Features',
        'Offers.Listings.Price',
        'ItemInfo.ByLineInfo',
      ],
    }

    // Add price range filtering if provided and valid
    if (priceRange) {
      const minPriceCents = Math.round(priceRange.min * 100)
      const maxPriceCents = Math.round(priceRange.max * 100)

      // Only add MinPrice if it's greater than 0 (Amazon requirement)
      if (minPriceCents > 0) {
        searchItemsRequest.MinPrice = minPriceCents
      }

      // Only add MaxPrice if it's greater than MinPrice or if MinPrice isn't set
      if (
        maxPriceCents > 0 &&
        (minPriceCents === 0 || maxPriceCents > minPriceCents)
      ) {
        searchItemsRequest.MaxPrice = maxPriceCents
      }

      console.log(
        `Adding price filter: $${priceRange.min} - $${priceRange.max} (${minPriceCents} - ${maxPriceCents} cents)`
      )
    }

    console.log('Making API request with:', searchItemsRequest)

    // Make the API call using the callback method that works with this SDK
    const response: any = await new Promise((resolve, reject) => {
      api.searchItems(searchItemsRequest, (error: any, data: any) => {
        if (error) {
          console.log('Error calling PA-API 5.0!')
          console.log(
            'Printing Full Error Object:\n' + JSON.stringify(error, null, 1)
          )
          console.log('Status Code: ' + error['status'])
          if (
            error['response'] !== undefined &&
            error['response']['text'] !== undefined
          ) {
            console.log(
              'Error Object: ' +
                JSON.stringify(error['response']['text'], null, 1)
            )
          }
          reject(error)
        } else {
          console.log('API called successfully.')
          resolve(data)
        }
      })
    })

    console.log('Amazon API Response received:', response)

    // Process the response - return in format expected by the API route
    if (!response || !response.SearchResult || !response.SearchResult.Items) {
      console.log('No items found in search result')
      return { Items: [], TotalResultCount: 0 }
    }

    // Transform the results to our format
    const items = response.SearchResult.Items
    const products = items.map((item: any) => ({
      id: item.ASIN,
      title: item.ItemInfo?.Title?.DisplayValue || 'No title',
      price:
        item.Offers?.Listings?.[0]?.Price?.DisplayAmount ||
        'Price not available',
      image: item.Images?.Primary?.Medium?.URL || '/placeholder-image.jpg',
      url: item.DetailPageURL || '#',
      features: item.ItemInfo?.Features || [],
    }))

    console.log(`Successfully processed ${products.length} products`)
    return {
      Items: products,
      TotalResultCount: response.SearchResult.TotalResultCount || 0,
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
