/* Reddit Fetcher */
import { getRedditAccessToken } from './redditAuth'

export async function fetchRedditTitles(): Promise<string[]> {
  const token = await getRedditAccessToken()
  console.log('Fetched Reddit access token:', token?.slice(0, 10))
  try {
    const response = await fetch(
      'https://oauth.reddit.com/r/HomeDecorating/top.json?t=week&limit=10',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'Mandy/1.0 by u/Medical-Cobbler5546',
        },
      }
    )
    console.log('Reddit status:', response.status)
    console.log('Reddit headers:', JSON.stringify(response.headers))
    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        'Reddit fetch failed:',
        response.status,
        errorText.slice(0, 200)
      )
      throw new Error('Failed to fetch Reddit data')
    }
    const data = await response.json()
    return data.data.children.map((post: any) => post.data.title)
  } catch (err) {
    console.error('Failed to fetch Reddit data', err)
    return []
  }
}
