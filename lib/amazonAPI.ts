import ProductAdvertisingAPI from 'paapi5-nodejs-sdk';

const defaultClient = ProductAdvertisingAPI.ApiClient.instance;
defaultClient.accessKey = process.env.AMAZON_ACCESS_KEY_ID!;
defaultClient.secretKey = process.env.AMAZON_SECRET_ACCESS_KEY!;
defaultClient.host = 'webservices.amazon.com';
defaultClient.region = 'us-east-1';

const api = new ProductAdvertisingAPI.DefaultApi();

interface AmazonProduct {
  ASIN: string;
  DetailPageURL: string;
  Images?: {
    Primary?: {
      Large?: {
        URL: string;
        Height: number;
        Width: number;
      };
    };
  };
  ItemInfo?: {
    Title?: {
      DisplayValue: string;
    };
    ByLineInfo?: {
      Brand?: {
        DisplayValue: string;
      };
    };
  };
  Offers?: {
    Listings?: Array<{
      Price?: {
        DisplayAmount: string;
      };
    }>;
  };
}

interface AmazonSearchResponse {
  Items?: AmazonProduct[];
  TotalResultCount?: number;
}

export async function searchAmazonProducts(
  keywords: string, 
  category: string = 'All'
): Promise<AmazonSearchResponse> {
  
  console.log(`🔍 Single Amazon search for: "${keywords}"`);

  const searchItemsRequest = {
    PartnerTag: process.env.AMAZON_ASSOCIATE_TAG!,
    PartnerType: 'Associates',
    Keywords: keywords, // Just search for the exact query (e.g., "pink and pastel living room")
    SearchIndex: 'Home', // Use Home category for room decor
    ItemCount: 10, // Get more results since it's just one search
    Resources: [
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'Offers.Listings.Price'
    ]
  };

  console.log('📋 Single request for:', keywords);

  try {
    const response = await new Promise<any>((resolve, reject) => {
      api.searchItems(searchItemsRequest, (error: any, data: any) => {
        if (error) {
          console.error('❌ Amazon API Error:', error.message);
          reject(error);
        } else {
          console.log(`✅ Amazon API Success: Found ${data?.SearchResult?.Items?.length || 0} items for "${keywords}"`);
          resolve(data);
        }
      });
    });

    return {
      Items: response?.SearchResult?.Items || [],
      TotalResultCount: response?.SearchResult?.TotalResultCount || 0
    };
  } catch (error: any) {
    console.error('💥 Amazon search failed for:', keywords);
    throw error;
  }
}