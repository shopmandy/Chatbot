import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized user' });
    }

    const { chatId } = req.query;
    if (!chatId || typeof chatId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid chatId' });
    }

    const { data, error } = await supabase
        .from('chat_history')
        .select('messages')
        .eq('user_id', userId)
        .eq('id', chatId)
        .single();

    if (error) {
        console.error('Load error:', error);
        return res.status(500).json({ error: 'Load failed' });
    }

    return res.status(200).json({ messages: data?.messages ?? [] });
}