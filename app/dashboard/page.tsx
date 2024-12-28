"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AgentDashboard } from "../components/AgentDashboard"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        router.push('/login')
      }
    }

    checkUser()
  }, [router, supabase])

  return <AgentDashboard />
} 