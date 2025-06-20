import type { NextApiRequest, NextApiResponse } from 'next'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageUrl, prompt } = req.body

  try {
    let prediction = await replicate.predictions.create({
      version: '4836eb257a4fb8b87bac9eacbef9292ee8e1a497398ab96207067403a4be2daf',
      input: {
        image: imageUrl,
        prompt,
        negative_prompt: 'lowres, watermark, blurry, distorted furniture',
        num_inference_steps: 50,
        guidance_scale: 15,
        strength: 0.8,
      },
    })

    // ⏳ Poll every 2s until status is 'succeeded' or 'failed'
    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      prediction = await replicate.predictions.get(prediction.id)
    }

    if (prediction.status === 'succeeded' && prediction.output) {
      console.log('Final output:', prediction.output)
      return res.status(200).json({ outputUrl: Array.isArray(prediction.output) ? prediction.output[0] : prediction.output })
    } else {
      return res.status(500).json({ error: prediction.error || 'Prediction failed' })
    }

  } catch (err) {
    console.error('Error calling Replicate:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}