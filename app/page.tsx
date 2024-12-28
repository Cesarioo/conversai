"use client"

import { useEffect, useState, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import Joyride, { CallBackProps } from 'react-joyride'

const tourSteps = [
  {
    target: '.nav-dashboard',
    content: 'Welcome to your dashboard! Here you can manage your AI agent and view call analytics.',
    disableBeacon: true,
  },
  {
    target: '.nav-call-history',
    content: 'View your call history and analytics to track customer interactions.',
  },
  {
    target: '.nav-agent-settings',
    content: 'Configure your agent settings, including voice, language, and business information.',
  },
  {
    target: '.nav-live-support',
    content: 'Access live support features and manage real-time interactions.',
  },
]

function WelcomeContent() {
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
      }, 100)
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
              boxShadow: '0 0 0 10000px rgba(0, 0, 0, 0.75)',
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to ConversAI
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-powered business communication solution. Let our intelligent agents handle customer inquiries while you focus on growing your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={() => router.push('/onboarding')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
          <p className="text-sm text-gray-500 pt-4">
            Already have an account? Head straight to your dashboard to manage your AI agent.
          </p>
        </div>
      </div>
    </>
  )
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WelcomeContent />
    </Suspense>
  )
}
