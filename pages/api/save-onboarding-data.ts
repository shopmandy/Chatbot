import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';

interface OnboardingDataRequestBody {
  name: string;
  age: string;
  city: string;
  type_of_home: string;
  category_budgets: any; // JSON object for budgets
  styles: string[]; // Array of style preferences
  brands: string[]; // Array of brand preferences
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Cast req.body to the interface
    const { 
      name, 
      age, 
      city, 
      type_of_home, 
      category_budgets, 
      styles, 
      brands 
    } = req.body as OnboardingDataRequestBody;

    console.log("user id:", userId);
    console.log('onboarding data:', { name, age, city, type_of_home, category_budgets, styles, brands });

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid name' });
    }

    if (!age || typeof age !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid age' });
    }

    if (!city || typeof city !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid city' });
    }

    if (!type_of_home || typeof type_of_home !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid type_of_home' });
    }

    if (!category_budgets || typeof category_budgets !== 'object') {
      return res.status(400).json({ error: 'Missing or invalid category_budgets' });
    }

    if (!styles || !Array.isArray(styles)) {
      return res.status(400).json({ error: 'Missing or invalid styles' });
    }

    if (!brands || !Array.isArray(brands)) {
      return res.status(400).json({ error: 'Missing or invalid brands' });
    }

    // Insert data into the onboarding_data table
    const { error } = await supabase
      .from('onboarding_data')
      .insert([{ 
        user_id: userId, 
        name, 
        age, 
        city, 
        type_of_home, 
        category_budgets, 
        styles, 
        brands 
      }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message || 'Failed to save onboarding data' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 