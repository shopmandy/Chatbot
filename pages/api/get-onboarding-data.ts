import { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    console.log('Fetching onboarding data for user id:', userId)

    // Get onboarding data for the current user
    const { data, error } = await supabase
      .from('onboarding_data')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase select error:', error)
      return res
        .status(500)
        .json({ error: error.message || 'Failed to fetch onboarding data' })
    }

    return res.status(200).json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
