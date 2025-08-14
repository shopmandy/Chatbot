import { config } from 'dotenv'

console.log('=== Before loading .env.local ===')
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

console.log('\n=== Loading .env.local ===')
config({ path: '.env.local' })

console.log('\n=== After loading .env.local ===')
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log(
  'SUPABASE_KEY:',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'
)
