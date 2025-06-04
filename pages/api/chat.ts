/*backend for chatbot integration */

import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
    });

    return res.status(200).json({ response: chatResponse.choices[0].message });
  } catch (error: unknown) {
    console.error('OpenAI error:', error);
    return res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
}

