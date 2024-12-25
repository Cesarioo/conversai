"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, ArrowRight, ArrowLeft, Phone } from 'lucide-react'
import { toast } from 'sonner'

const businessTypes = [
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
  { id: 'hotel', name: 'Hotel', icon: '🏨' },
  { id: 'spa', name: 'Spa & Wellness', icon: '💆' },
  { id: 'retail', name: 'Retail Store', icon: '🛍️' },
  { id: 'salon', name: 'Beauty Salon', icon: '💇' },
]

const languages = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
]

const voiceOptions = [
  { id: "IHngRooVccHyPqB4uQkG", name: "Corentin", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/corentin_sample.mp3", language: "fr" },
  { id: "gCux0vt1cPsEXPNSbchu", name: "Anna", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/anna_sample.mp3", language: "en" },
  { id: "6vTyAgAT8PncODBcLjRf", name: "Claire", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/claire_sample.mp3", language: "fr" },
  { id: "Qrl71rx6Yg8RvyPYRGCQ", name: "Guillaume", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/guillaume_sample.mp3", language: "fr" },
]

const steps = [
  {
    id: 'businessType',
    title: "What is your business?",
    description: "Select the type of business you operate.",
    component: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {businessTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all ${value === type.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
            onClick={() => onChange(type.id)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className="text-4xl mb-2">{type.icon}</span>
              <span className="text-sm font-medium">{type.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  },
  {
    id: 'language',
    title: "What's your primary business language?",
    description: "Choose the main language for your agent.",
    component: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <Card 
            key={lang.id}
            className={`cursor-pointer transition-all ${value === lang.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
            onClick={() => onChange(lang.id)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <span className="text-4xl mb-2">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  },
  {
    id: 'voiceId',
    title: "Choose your agent's voice",
    description: "Select a voice that matches your brand.",
    component: ({ value, onChange, onPlay }: { value: string; onChange: (value: string) => void; onPlay?: (audioUrl: string) => void }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voiceOptions.map((voice) => (
          <Card 
            key={voice.id}
            className={`cursor-pointer transition-all ${value === voice.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">{voice.name}</h3>
                  <p className="text-sm text-gray-500">{languages.find(l => l.id === voice.language)?.name}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onPlay) onPlay(voice.audioFile)
                  }}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="w-full" 
                variant={value === voice.id ? "default" : "outline"}
                onClick={() => onChange(voice.id)}
              >
                {value === voice.id ? 'Selected' : 'Select Voice'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  },
  {
    id: 'businessName',
    title: "What's your business name?",
    description: "Enter the name of your business.",
    component: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <Input
        placeholder="e.g., The Grand Hotel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-md"
      />
    )
  },
  {
    id: 'greeting',
    title: "Review your agent's greeting",
    description: "This is how your agent will greet customers.",
    component: ({ value, onChange, settings }: { 
      value: string; 
      onChange: (value: string) => void; 
      settings?: OnboardingSettings 
    }) => (
      <div className="space-y-4">
        <Input
          value={value || `Hello, this is ${settings?.name || '[Agent Name]'} from ${settings?.businessName || '[Business]'}, how may I help?`}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-md"
        />
      </div>
    )
  },
  {
    id: 'phone',
    title: "Where should we send notifications?",
    description: "Enter your phone number to receive real-time reservation notifications.",
    component: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <div className="max-w-md space-y-4">
        <div className="flex">
          <Phone className="mr-2 h-4 w-4 mt-3" />
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <p className="text-sm text-gray-500">
          Well send you a verification code to confirm your number.
        </p>
      </div>
    )
  }
]

interface OnboardingSettings {
  businessType: string;
  language: string;
  voiceId: string;
  businessName: string;
  greeting: string;
  phone: string;
  name: string;
  llm: string;
  temperature: number;
  maxTokens: number;
}

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showNumber, setShowNumber] = useState(false)
  const [settings, setSettings] = useState({
    businessType: "",
    language: "",
    voiceId: "",
    businessName: "",
    greeting: "",
    phone: "",
    name: "",
    llm: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1000
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlayVoice = (audioUrl: string) => {
    if (isPlaying) {
      audio?.pause()
      setIsPlaying(false)
    } else {
      const newAudio = new Audio(audioUrl)
      newAudio.onended = () => setIsPlaying(false)
      newAudio.play()
      setAudio(newAudio)
      setIsPlaying(true)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        conversation_config: {
          agent: {
            first_message: settings.greeting,
            language: settings.language,
          },
          tts: {
            voice_id: settings.voiceId,
          }
        },
      }
      
      console.log('Sending update with payload:', payload)

      const response = await fetch('/api/agent/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Update failed:', data)
        throw new Error('Failed to update agent settings')
      }

      console.log('Update successful:', data)
      setIsSuccess(true)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSettingsChange = (key: string, value: string) => {
    setSettings(prev => {
      const updates: Partial<typeof prev> = { [key]: value }
      
      if (key === 'businessName') {
        updates.name = value
        updates.greeting = `Hello, this is ${prev.voiceId ? voiceOptions.find(v => v.id === prev.voiceId)?.name : value} from ${value}, how may I help?`
      }
      
      if (key === 'voiceId') {
        const voiceName = voiceOptions.find(v => v.id === value)?.name
        updates.greeting = `Hello, this is ${voiceName} from ${prev.businessName}, how may I help?`
      }
      
      return { ...prev, ...updates }
    })
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-6xl">🎁</span>
        </motion.div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center">
          <AnimatePresence mode="wait">
            {!showNumber ? (
              <motion.div
                key="gift"
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: [0, 10, -10, 10, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -10, 10, -10, 0],
                }}
                onClick={() => setShowNumber(true)}
              >
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-8xl cursor-pointer">🎁</span>
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Your agent is ready!</h2>
                <p className="text-gray-500">Click the gift to reveal your number</p>
              </motion.div>
            ) : (
              <motion.div
                key="number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center cursor-pointer p-8 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => router.push('/?fromOnboarding=true')}
              >
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Phone className="h-6 w-6 text-blue-500" />
                  <p className="text-2xl font-semibold text-blue-500">{settings.phone}</p>
                </div>
                <div className="space-y-3 text-center max-w-sm mx-auto">
                  <p className="text-gray-600">
                    This is your unique business line. Share it with your customers to let them interact with your AI agent.
                  </p>
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-2">
                    <span className="text-green-500">🟢</span>
                    <p className="text-sm text-green-700">
                      Dont worry, you can modify all settings later in your dashboard.
                    </p>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm font-medium text-blue-500 hover:text-blue-600">
                      Continue to my Dashboard →
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="h-2 flex-1 mx-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-gray-500 mb-6">{currentStepData.description}</p>
                
                {currentStepData.component({
                  value: settings[currentStepData.id as keyof typeof settings] as string,
                  onChange: (value) => handleSettingsChange(currentStepData.id, value),
                  onPlay: currentStepData.id === 'voiceId' ? handlePlayVoice : undefined,
                  settings: settings
                })}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!settings[currentStepData.id as keyof typeof settings]}
                  >
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
