"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Joyride, { Step, CallBackProps } from 'react-joyride'
import { AgentDashboard } from './components/AgentDashboard'
import ErrorBoundary from './components/ErrorBoundary'

const tourSteps: Step[] = [
  {
    target: '.nav-dashboard',
    content: 'Welcome to your dashboard! Here you can monitor all your agent activities, including call statistics and trends.',
    disableBeacon: true,
  },
  {
    target: '.nav-call-history',
    content: 'View your complete call history, transcripts, and detailed analytics for each conversation.',
  },
  {
    target: '.nav-agent-settings',
    content: 'Configure your agent settings, including voice, language, and greeting message.',
  },
  {
    target: '.nav-live-support',
    content: 'Access live support from our team.',
  }
]

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [runTour, setRunTour] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if coming from onboarding
    const fromOnboarding = searchParams.get('fromOnboarding')
    if (fromOnboarding === 'true') {
      setTimeout(() => {
        if (document.querySelector('.nav-dashboard')) {
          setIsReady(true)
          setRunTour(true)
        }
      }, 1000)
    }

    // Check if we have an access token in the URL hash
    if (window.location.hash && window.location.hash.includes('access_token=')) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      if (accessToken) {
        router.push(`/setup-account?access_token=${accessToken}`)
      }
    }
  }, [router, searchParams])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    if (status === 'finished' || status === 'skipped') {
      setRunTour(false)
    }
  }

  return (
    <>
      {isReady && (
        <Joyride
          steps={tourSteps}
          run={runTour}
          continuous
          showProgress
          showSkipButton
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#3b82f6',
              zIndex: 1000,
              overlayColor: 'rgba(0, 0, 0, 0)',
            },
            spotlight: {
              backgroundColor: 'transparent',
              borderRadius: '8px',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 10000px rgba(0, 0, 0, 0.75)',
            },
            tooltip: {
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'white',
              filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))'
            },
            tooltipContainer: {
              textAlign: 'left'
            },
            buttonNext: {
              backgroundColor: '#3b82f6',
              borderRadius: '6px',
              color: '#fff'
            },
            buttonBack: {
              marginRight: 10,
              backgroundColor: '#e5e7eb',
              borderRadius: '6px',
              color: '#374151'
            }
          }}
          spotlightClicks={true}
          disableOverlayClose={true}
          floaterProps={{
            disableAnimation: true,
            styles: {
              floater: {
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))'
              }
            }
          }}
        />
      )}
      <div className="container mx-auto py-10">
        <ErrorBoundary>
          <AgentDashboard />
        </ErrorBoundary>
      </div>
    </>
  )
}
