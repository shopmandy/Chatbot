import { OpenAI } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import type { File } from 'formidable';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  imageUrl?: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: NextApiRequest): Promise<{ messages: Message[]; image?: File }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });
    let messages: Message[] = [];
    let image: File | undefined;

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        if (fields.messages) {
          messages = JSON.parse(fields.messages[0] as string);
        }

        if (files.image) {
          image = Array.isArray(files.image) ? files.image[0] : files.image;
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
    // Parse multipart form data (messages + optional image)
    const { messages, image } = await parseFormData(req);

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'No messages provided' });
    }

    // System prompt with branding & personality (merged from feature/chatbot)
    const systemPrompt = {
      role: 'system',
      content:
        'You are a fun, confident, and helpful DIY assistant for ShopMandy, a tools website for women. ' +
        'You help women tackle home projects, crafts, and decorating with clear, concise, jargon-free guidance. ' +
        'Your tone is playful, feminine, and empowering — always encouraging creativity and capability. ' +
        'Match the bold, colorful aesthetic of ShopMandy in your responses: energetic, expressive, and full of personality. ' +
        'Give step-by-step advice, clever shortcuts, and aesthetic tips (like styling, materials, and color choices). ' +
        'When relevant, highlight tools from the Hot Girl Toolkit: hammer, wrench, screwdriver and bits, pliers, level, and tape measure. ' +
        'Use markdown formatting, lists, casual expressions, and emojis to keep answers engaging and on-brand.' +
        'If an image is provided, first visually analyze it and explain what you see in simple terms.' +
        'Always mention safety tips for any risky task.' +
        'If user input is ambiguous, ask clarifying questions before giving advice.' +
        'Prioritize affordable, beginner-friendly solutions unless the user asks for professional-level advice.'+
        'IMPORTANT: Use markdown headings, bullet points, and numbered lists to break up your response. Add extra line breaks between steps and sections. Separate each step or section clearly. Avoid large blocks of text.'
    };

    // Prepare messages for OpenAI API
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
            detail: 'auto',
          },
        });

        allMessages.push({
          role: 'user',
          content: contentArray,
        });
      } else {
        allMessages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // Call OpenAI chat completion
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: allMessages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return res.status(200).json({
      response: chatResponse.choices[0].message,
    });
  } catch (error: any) {
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      status: error.status,
      response: error.response?.data,
    });
    return res.status(500).json({
      error: 'Failed to process request',
      details: error.message,
    });
  }
}
