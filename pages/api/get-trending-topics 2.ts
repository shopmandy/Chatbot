import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '../../lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const topics = await redis.get<string[]>('trending_questions');
        res.status(200).json({ questions: topics ?? [] });
    } catch (err) {
        console.error('Error fetching trending questions:', err);
        res.status(500).json({ error: 'Failed to load questions' });
    }
}