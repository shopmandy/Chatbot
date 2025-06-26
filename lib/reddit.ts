/* Reddit Fetcher */

export async function fetchRedditTitles(): Promise<string[]> {
    try {
        const response = await fetch('https://www.reddit.com/r/HomeDecorating/top.json?t=week&limit=10', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MandyBot/1.0; +https://shopmandy.com)',
            },
        });
        console.log('Reddit status:', response.status);
        console.log('Reddit headers:', JSON.stringify(response.headers));
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Reddit fetch failed:', response.status, errorText.slice(0, 200));
            throw new Error("Failed to fetch Reddit data");
        }
        const data = await response.json();
        return data.data.children.map((post: any) => post.data.title);
    }
    catch (err) {
        console.error("Failed to fetch Reddit data", err);
        return [];
    }
}