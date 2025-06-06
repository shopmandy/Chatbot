import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: NextApiRequest): Promise<{ messages: any[], image?: any }> {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    let messages: any[] = [];
    let image: any = null;

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        if (fields.messages) {
          messages = JSON.parse(fields.messages[0]);
        }

        if (files.image) {
          image = files.image[0];
        }

        resolve({ messages, image });
      } catch (e) {
        reject(e);
      }
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, image } = await parseFormData(req);

    if (!messages) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    const systemPrompt = {
      role: 'system',
      content: 'You are a fun, confident, and helpful DIY assistant for ShopMandy, a tools website for women. You help women tackle home projects, crafts, and decorating with clear, concise, jargon-free guidance. Your tone is playful, feminine, and empowering — always encouraging creativity and capability. Match the bold, colorful aesthetic of ShopMandy in your responses: energetic, expressive, and full of personality. Give step-by-step advice, clever shortcuts, and aesthetic tips (like styling, materials, and color choices).'
    };

    const allMessages: any[] = [systemPrompt];

    for (const msg of messages) {
      if (msg.role === 'user' && msg.imageUrl) {
        const contentArray: any[] = [];
        
        if (msg.content) {
          contentArray.push({ type: 'text', text: msg.content });
        }

        contentArray.push({
          type: 'image_url',
          image_url: {
            url: msg.imageUrl,
            detail: 'auto'
          }
        });

        allMessages.push({
          role: 'user',
          content: contentArray
        });
      } else {
        allMessages.push({
          role: msg.role,
          content: msg.content
        });
      }
    }

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: allMessages,
      max_tokens: 1000,
      temperature: 0.7
    });

    return res.status(200).json({ 
      response: chatResponse.choices[0].message 
    });
  } catch (error: any) {
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      response: error.response?.data
    });
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}