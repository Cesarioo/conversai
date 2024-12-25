"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AgentDashboard } from './components/AgentDashboard'
import ErrorBoundary from './components/ErrorBoundary'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if we have an access token in the URL hash
    if (window.location.hash && window.location.hash.includes('access_token=')) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      if (accessToken) {
        router.push(`/setup-account?access_token=${accessToken}`)
      }
    }
  }, [router])

  return (
    <div className="container mx-auto py-10">
      <ErrorBoundary>
        <AgentDashboard />
      </ErrorBoundary>
    </div>
  )
}
