import { supabase } from '@/lib/supabase'
import { getAuth } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      console.log('Unauthorized: no userId found')
      return res.status(401).json({ error: 'Unauthorized user' })
    }

    const { messages } = req.body

    if (!messages) {
      console.log('Bad Request: no messages in request body')
      return res.status(400).json({ error: 'No messages provided' })
    }

    console.log('Attempting to save chat:', { userId, messages })

    const { error } = await supabase
      .from('chat_history')
      .insert([{ user_id: userId, messages }])

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error, null, 2))
      return res.status(500).json({ error: error.message || 'Insert failed' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Unexpected error in API handler:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
