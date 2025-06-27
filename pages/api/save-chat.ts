import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  const { messages } = req.body;

  const { error } = await supabase
    .from('chat_history')
    .insert([{ user_id: userId, messages }]);

  if (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Insert failed' });
  }

  return res.status(200).json({ success: true });
}