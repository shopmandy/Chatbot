import { NextApiRequest, NextApiResponse } from 'next';
import { searchAmazonProducts } from '../../lib/amazonAPI';

interface ApiResponse {
  results: any[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ results: [], error: 'Method not allowed' });
  }

  const { prompt, roomType } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ results: [], error: 'Prompt is required' });
  }

  try {
    // Create ONE search query combining prompt and room type
    const searchQuery = roomType && roomType !== '' 
      ? `${prompt} ${roomType}` 
      : prompt;
    
    console.log(`🎯 Making single search for: "${searchQuery}"`);
    
    // Make ONLY ONE API call
    const products = await searchAmazonProducts(searchQuery, 'Home');
    
    console.log(`✅ Single search returned ${products.Items?.length || 0} products`);

    res.status(200).json({ 
      results: products.Items || []
    });
    
  } catch (error: any) {
    console.error('Amazon search failed:', error.message);
    
    if (error.message?.includes('Too Many Requests')) {
      return res.status(429).json({ 
        results: [], 
        error: 'Rate limited. Please wait and try again.' 
      });
    }
    
    res.status(500).json({ 
      results: [], 
      error: 'Failed to search Amazon' 
    });
  }
}