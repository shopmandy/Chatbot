import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized user' });
    }

    const { data, error } = await supabase
        .from('chat_history')
        .select('messages')
        .eq('user_id', userId)
        .order('created_at', {ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Load error:', error);
        return res.status(500).json({ error: 'Load failed' });
    }

    return res.status(200).json({ messages: data?.messages ?? [] });
}