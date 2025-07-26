import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';

interface SaveChatRequestBody {
  messages: any[]; // You can refine this further if needed
  title: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 🟢 Cast req.body to the interface
    const { messages, title } = req.body as SaveChatRequestBody;

    console.log("user id:", userId);
    console.log('messages:', messages);
    console.log('title:', title);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid title' });
    }

    const { error } = await supabase
      .from('chat_history')
      .insert([{ user_id: userId, messages, title }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message || 'Failed to save chat' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}