import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRedditTitles } from "@/lib/reddit";
import { cleanTitle, deduplicateTitles } from '@/lib/cleaner';
import { summarizeTopics } from "@/lib/summarizer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const rawTitles = await fetchRedditTitles();
        const cleanedTitles = rawTitles.map(cleanTitle);
        const dedupedTitles = deduplicateTitles(cleanedTitles);
        const topics = await summarizeTopics(dedupedTitles);
        res.status(200).json({ topics });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate topics' });
    }
}