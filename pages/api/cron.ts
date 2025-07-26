import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRedditTitles } from "../../lib/reddit";
import { cleanTitle, deduplicateTitles } from '../../lib/cleaner';
import { summarizeTopics } from "../../lib/summarizer";
import { redis } from '../../lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
        //return res.status(401).end('Unauthorized');
    //}

    try {
        const rawTitles = await fetchRedditTitles();
        const cleanedTitles = rawTitles.map(cleanTitle);
        const dedupedTitles = deduplicateTitles(cleanedTitles);
        const topics = await summarizeTopics(dedupedTitles);
        await redis.set('trending_questions', topics);
        console.log('Retrieved from redis: ', topics);
        res.status(200).json({ questions: topics ?? [] });
    } catch (err) {
        console.error('Cron job error: ', err);
        res.status(500).json({ error: 'Failed to generate topics' });
    }
}