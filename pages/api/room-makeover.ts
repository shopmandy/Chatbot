import type { NextApiRequest, NextApiResponse } from 'next'
import Replicate from 'replicate'

type Data = {
  outputUrl?: string
  error?: string
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageUrl, prompt } = req.body

  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: 'Missing imageUrl or prompt' })
  }

  try {
    const output = await replicate.run(
      'youzu/stable-interiors-v2',
      {
        input: {
          image: imageUrl,
          prompt,
          negative_prompt: 'lowres, watermark, blurry, distorted furniture',
          num_inference_steps: 50,
          guidance_scale: 15,
          prompt_strength: 0.8,
        },
      }
    )

    if (Array.isArray(output) && typeof output[0] === 'string') {
      res.status(200).json({ outputUrl: output[0] })
    } else {
      res.status(500).json({ error: 'Invalid output from Replicate model' })
    }
  } catch (error) {
    console.error('Replicate API Error:', error)
    res.status(500).json({ error: 'Model generation failed' })
  }
}
