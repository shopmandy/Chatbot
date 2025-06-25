/* Reddit Fetcher */

export async function fetchRedditTitles(): Promise<string[]> {
    const response = await fetch('https://www.reddit.com/r/HomeDecorating/top.json?t=week&limit=10');
    const data = await response.json();
    return data.data.children.map((post: any) => post.data.title);
}