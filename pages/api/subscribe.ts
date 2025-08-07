import { NextApiRequest, NextApiResponse } from 'next'

interface SubscribeRequestBody {
  email: string
}

interface ShopifyCustomerData {
  customer: {
    email: string
    accepts_marketing: boolean
    tags: string
  }
}

interface ShopifyErrorResponse {
  errors?: Record<string, string[]>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email }: SubscribeRequestBody = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (!process.env.SHOPIFY_ADMIN_API_KEY || !process.env.SHOPIFY_SHOP_NAME) {
    console.error('Missing Shopify environment variables:', {
      hasApiKey: !!process.env.SHOPIFY_ADMIN_API_KEY,
      hasShopName: !!process.env.SHOPIFY_SHOP_NAME,
    })
    return res.status(500).json({
      error: 'Email signup is temporarily unavailable. Please try again later.',
    })
  }

  try {
    const shopifyUrl = `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-07/customers.json`

    const shopifyData: ShopifyCustomerData = {
      customer: {
        email,
        accepts_marketing: true,
        tags: 'custom-site-signup',
      },
    }

    const shopifyResponse = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shopifyData),
    })

    const data: ShopifyErrorResponse = await shopifyResponse.json()

    if (!shopifyResponse.ok) {
      console.error('Shopify API error:', data)

      // Handle Shopify error format - ensure we return a string
      let errorMessage = 'Failed to subscribe to newsletter'
      if (data.errors) {
        if (typeof data.errors === 'string') {
          errorMessage = data.errors
        } else if (typeof data.errors === 'object') {
          // Shopify often returns errors like { email: ["has already been taken"] }
          const errorKeys = Object.keys(data.errors)
          if (errorKeys.length > 0) {
            const firstErrorKey = errorKeys[0]
            const firstError = data.errors[firstErrorKey]
            if (Array.isArray(firstError) && firstError.length > 0) {
              errorMessage = `${firstErrorKey} ${firstError[0]}`
            }
          }
        }
      }

      return res.status(400).json({ error: errorMessage })
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    })
  } catch (error) {
    console.error('Subscribe API error:', error)
    return res.status(500).json({ error: 'Unexpected error occurred' })
  }
}
