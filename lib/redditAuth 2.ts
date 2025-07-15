import { redis } from './redis';

export async function getRedditAccessToken(): Promise<string> {
    const cached = await redis.get<string>('reddit_access_token');
    if (cached) return cached;

    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');
    
    const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mandy/1.0 by Medical-Cobbler5546',
    },
    body: 'grant_type=client_credentials',
    });
    
    if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get token: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    const token = data.access_token;
    
    await redis.set('reddit_access_token', token, { ex: 3600 });
    return token;
    }
    
    