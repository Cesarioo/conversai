import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getElevenLabsId() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Not authenticated')
  }

  const { data: userData, error: userDataError } = await supabase
    .from('app_users')
    .select('elevenlabs_id')
    .eq('email', user.email)
    .single()

  if (userDataError || !userData?.elevenlabs_id) {
    throw new Error('Could not find ElevenLabs ID for user')
  }

  return userData.elevenlabs_id
} 