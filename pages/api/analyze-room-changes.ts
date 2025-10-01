import { OpenAI } from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { RoomAnalysisRequest, RoomAnalysisResponse } from '../../types'
import { OPENAI_CONFIG } from '../../constants'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const validateRequest = (body: any): { isValid: boolean; error?: string } => {
  if (!body.beforeImageUrl || typeof body.beforeImageUrl !== 'string') {
    return { isValid: false, error: 'Before image URL is required' }
  }

  if (!body.afterImageUrl || typeof body.afterImageUrl !== 'string') {
    return { isValid: false, error: 'After image URL is required' }
  }

  return { isValid: true }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomAnalysisResponse>
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  const validation = validateRequest(req.body)
  if (!validation.isValid) {
    res.status(400).json({ success: false, error: validation.error })
    return
  }

  const { beforeImageUrl, afterImageUrl, roomType }: RoomAnalysisRequest =
    req.body

  try {
    console.log('🔍 Analyzing room transformation images...')

    const analysisPrompt = `Compare these two room images (before and after) and identify specific home decor items, furniture, and accessories that were ADDED or significantly changed in the after image.

Analyze ONLY the NEW items that appear in the after image. For each item, note:
- EXACT colors (navy blue, cream white, forest green, etc.)
- SPECIFIC materials (velvet, rattan, brass, marble, etc.) 
- CLEAR styles (bohemian, modern, vintage, industrial, etc.)
- PRECISE item types (throw pillows, floor lamp, coffee table, etc.)

Focus on these categories:
- Furniture pieces with specific materials/colors
- Textiles with patterns, colors, textures
- Lighting with style descriptions
- Plants with planter materials/colors
- Wall decor with style/color details
- Decorative objects with material/color specifics

Return ONLY a JSON array of 4-8 highly specific, searchable product terms. Each term should be:
- 2-3 words maximum
- Include specific color/material/style when visible
- Be realistic for Amazon product search

Example format: ["navy velvet pillows", "brass floor lamp", "jute area rug", "black wall art", "white ceramic planter", "rattan basket"]

Be very specific about what you actually see - colors, textures, materials, styles. This helps find exact matching products.`

    const response = await openai.chat.completions.create({
      model: OPENAI_CONFIG.MODEL,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: analysisPrompt },
            {
              type: 'image_url',
              image_url: {
                url: beforeImageUrl,
                detail: OPENAI_CONFIG.IMAGE_DETAIL,
              },
            },
            {
              type: 'image_url',
              image_url: {
                url: afterImageUrl,
                detail: OPENAI_CONFIG.IMAGE_DETAIL,
              },
            },
          ],
        },
      ],
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      temperature: OPENAI_CONFIG.TEMPERATURE,
    })

    const analysisResult = response.choices[0].message.content

    if (!analysisResult) {
      throw new Error('No analysis result received from OpenAI')
    }

    console.log('🎯 Raw analysis result:', analysisResult)

    // Try to parse JSON from the response
    let searchTerms: string[] = []
    try {
      // Look for JSON array in the response
      const jsonMatch = analysisResult.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        searchTerms = JSON.parse(jsonMatch[0])
      } else {
        // Fallback: extract terms from text format
        const lines = analysisResult.split('\n')
        searchTerms = lines
          .filter(line => line.includes('"') || line.includes('-'))
          .map(line => line.replace(/["\-\*\d\.]/g, '').trim())
          .filter(term => term.length > 0 && term.length < 50)
      }
    } catch (parseError) {
      console.warn(
        'Failed to parse JSON, extracting terms manually:',
        parseError
      )
      // Extract quoted terms as fallback
      const quotedTerms = analysisResult.match(/"([^"]+)"/g)
      if (quotedTerms) {
        searchTerms = quotedTerms.map(term => term.replace(/"/g, ''))
      }
    }

    // Add room type context to search terms if provided
    if (roomType && searchTerms.length > 0) {
      searchTerms = searchTerms.map(term =>
        term.includes(roomType.toLowerCase())
          ? term
          : `${term} ${roomType.toLowerCase()}`
      )
    }

    // Limit to most relevant terms
    searchTerms = searchTerms.slice(0, 8)

    console.log('✅ Extracted search terms:', searchTerms)

    res.status(200).json({
      success: true,
      searchTerms: searchTerms,
    })
  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown error'
    console.error('Image analysis error:', errorMessage)
    console.error('Full error details:', error)

    res.status(500).json({
      success: false,
      error: `Analysis failed: ${errorMessage}`,
    })
  }
}
