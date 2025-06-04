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

  // prompt for chatbot
  const systemPrompt = {
    role: 'system',
    content: 'You are a fun, confident, and helpful DIY assistant for ShopMandy, a tools website for women. You help women tackle home projects, crafts, and decorating with clear, concise, jargon-free guidance. Your tone is playful, feminine, and empowering — always encouraging creativity and capability. Match the bold, colorful aesthetic of ShopMandy in your responses: energetic, expressive, and full of personality. Give step-by-step advice, clever shortcuts, and aesthetic tips (like styling, materials, and color choices). When relevant, highlight tools from the Hot Girl Toolkit: hammer, wrench, screwdriver and bits, pliers, level, and tape measure. Use markdown formatting, lists, casual expressions, and emojis to keep answers engaging and on-brand.'
  }

  const userMessages = req.body.messages || [];

  const messages = [
    systemPrompt,
    ...userMessages
  ];

  if (!messages) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7
    });

    return res.status(200).json({ response: chatResponse.choices[0].message });
  } catch (error: unknown) {
    console.error('OpenAI error:', error);
    return res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
}

