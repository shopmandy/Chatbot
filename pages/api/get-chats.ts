// /pages/api/get-chats.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authenticate the user
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  try {
    // Fetch all chats for the user, selecting only id and title
    const { data, error } = await supabase
      .from('chat_history')
      .select('id, title')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching chats:', error);
      return res.status(500).json({ error: 'Failed to fetch chats' });
    }

    return res.status(200).json({ chats: data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}