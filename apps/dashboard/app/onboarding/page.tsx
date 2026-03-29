"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, ArrowRight, ArrowLeft, Phone } from 'lucide-react'
import { toast } from 'sonner'
import businessPrompts from '@/data/promptBusiness.json'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const businessTypes = [
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
  { id: 'hotel', name: 'Hotel', icon: '🏨' },
  { id: 'tradesman', name: 'Tradesman (Electrical, Plumbing)', icon: '🔧' },
  { id: 'medical', name: 'Medical Practice', icon: '⚕️' },
  { id: 'beauty', name: 'Spa & Beauty Salon', icon: '💆' },
  { id: 'government', name: 'City Hall & Local Government', icon: '🏛️' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'saas', name: 'SaaS (Customer Support)', icon: '💻' },
  { id: 'petgrooming', name: 'Pet Grooming', icon: '🐕' },
]

const voiceOptions = [
  { id: "IHngRooVccHyPqB4uQkG", name: "Corentin", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/corentin_sample.mp3" },
  { id: "gCux0vt1cPsEXPNSbchu", name: "Anna", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/anna_sample.mp3" },
  { id: "6vTyAgAT8PncODBcLjRf", name: "Claire", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/claire_sample.mp3" },
  { id: "Qrl71rx6Yg8RvyPYRGCQ", name: "Guillaume", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/guillaume_sample.mp3" },
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
    id: 'businessContext',
    title: "Tell us more about your business",
    description: "Provide details about your business that will help your AI agent better assist your customers. Minimum 100 characters required.",
    component: ({ value, onChange, settings }: { 
      value: string; 
      onChange: (value: string) => void;
      settings?: OnboardingSettings 
    }) => {
      const businessType = businessTypes.find(type => type.id === settings?.businessType)?.name || "";
      let placeholder = "";
      
      if (businessType === "Restaurant") {
        placeholder = "Example: We are a French bistro specializing in traditional dishes. Our opening hours are Monday to Saturday, 11:30 AM to 10 PM. We offer a lunch menu at €25 and dinner menu at €45. We have a wine cellar with over 200 references. We can accommodate private events up to 40 people. We have a terrace for summer dining. All our ingredients are sourced from local producers.";
      }
      
      return (
        <div className="space-y-4">
          <Textarea
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px]"
          />
          <div className="flex justify-between text-sm">
            {value.length < 100 && (
              <span className="text-red-500">
                Please add {100 - value.length} more characters
              </span>
            )}
          </div>
        </div>
      );
    }
  },
  {
    id: 'websiteUrl',
    title: "Do you have a website?",
    description: "If you have a website, enter the URL to help train your assistant with your business information.",
    component: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
      <div className="space-y-4 max-w-md">
        <Input
          placeholder="https://www.example.com"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Leave empty if you dont have a website
        </p>
      </div>
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
  businessContext: string;
  voiceId: string;
  businessName: string;
  websiteUrl: string;
  greeting: string;
  phone: string;
  name: string;
  llm: string;
  temperature: number;
  maxTokens: number;
}

function PhoneDisplay() {
  const [phone, setPhone] = useState<string>("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchPhone() {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) return

      const { data, error } = await supabase
        .from('app_users')
        .select('phone')
        .eq('email', user.email)
        .single()

      if (!error && data) {
        setPhone(data.phone)
      }
    }

    fetchPhone()
  }, [supabase])

  return (
    <p className="text-2xl font-semibold text-blue-500">{phone}</p>
  )
}

export default function Onboarding() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [currentStep, setCurrentStep] = useState(0)
  const [showNumber, setShowNumber] = useState(false)
  const [settings, setSettings] = useState({
    businessType: "",
    businessContext: "",
    voiceId: "",
    businessName: "",
    websiteUrl: "",
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
    if (currentStepData.id === 'businessContext' && settings.businessContext.length < 100) {
      toast.error('Please provide at least 100 characters about your business');
      return;
    }

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
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error('Not authenticated')
      }

      // Update the notification_phone in app_users table
      const { error: updateError } = await supabase
        .from('app_users')
        .update({ 
          notification_phone: settings.phone,
          website: settings.websiteUrl.trim() || null
        })
        .eq('email', user.email)

      if (updateError) {
        console.error('Error updating user data:', updateError)
        throw new Error('Failed to update user data')
      }

      const businessType = businessTypes.find(type => type.id === settings.businessType)?.name || "";
      const businessPrompt = businessPrompts[businessType as keyof typeof businessPrompts]?.prompt || "";
      const knowledgeBases = [];

      // Create the text knowledge base entry if content exists
      if (settings.businessContext.trim()) {
        const formData = new FormData();
        const blob = new Blob([settings.businessContext], { type: 'text/plain' });
        formData.append('file', blob, 'knowledge_base.txt');

        const kbResponse = await fetch('/api/knowledge-base/new', {
          method: 'POST',
          body: formData,
        });

        if (!kbResponse.ok) {
          throw new Error('Failed to create text knowledge base entry');
        }

        const kbData = await kbResponse.json();
        knowledgeBases.push({
          name: 'Business Information',
          id: kbData.id,
          type: 'file'
        });
      }

      // Create the website knowledge base entry if URL exists
      if (settings.websiteUrl.trim()) {
        const urlFormData = new FormData();
        urlFormData.append('url', settings.websiteUrl);

        const websiteResponse = await fetch('/api/knowledge-base/new', {
          method: 'POST',
          body: urlFormData,
        });

        if (!websiteResponse.ok) {
          throw new Error('Failed to create website knowledge base entry');
        }

        const websiteData = await websiteResponse.json();
        knowledgeBases.push({
          name: 'Website Content',
          id: websiteData.id,
          type: 'url'
        });
      }

      const payload = {
        name: settings.businessName,
        conversation_config: {
          agent: {
            prompt: {
              prompt: businessPrompt,
              llm: settings.llm,
              temperature: settings.temperature,
              max_tokens: settings.maxTokens,
              knowledge_base: knowledgeBases
            },
            first_message: settings.greeting,
            website_url: settings.websiteUrl,
          },
          tts: {
            voice_id: settings.voiceId || "IHngRooVccHyPqB4uQkG"
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
      
      // Set authentication cookie
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error('Error getting session:', sessionError)
        throw new Error('Failed to get session')
      }

      // Set the cookie
      document.cookie = `supabase-auth-token=${JSON.stringify([sessionData.session?.access_token, sessionData.session?.refresh_token])}; path=/; max-age=604800`
      
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
        const voiceName = prev.voiceId ? voiceOptions.find(v => v.id === prev.voiceId)?.name : value;
        const isRestaurant = businessTypes.find(type => type.id === prev.businessType)?.name === "Restaurant";
        
        if (isRestaurant) {
          updates.greeting = `Bonjour, je suis ${voiceName} du restaurant ${value}. Comment puis-je vous aider ?`;
        } else {
          updates.greeting = `Hello, this is ${voiceName} from ${value}, how may I help?`;
        }
      }
      
      if (key === 'voiceId') {
        const voiceName = voiceOptions.find(v => v.id === value)?.name;
        const isRestaurant = businessTypes.find(type => type.id === prev.businessType)?.name === "Restaurant";
        
        if (isRestaurant) {
          updates.greeting = `Bonjour, je suis ${voiceName} du restaurant ${prev.businessName}. Comment puis-je vous aider ?`;
        } else {
          updates.greeting = `Bonjour, je suis ${voiceName} de ${prev.businessName}, comment puis-je vous aider ?`;
        }
      }

      if (key === 'businessType') {
        const voiceName = prev.voiceId ? voiceOptions.find(v => v.id === prev.voiceId)?.name : prev.name;
        const isRestaurant = businessTypes.find(type => type.id === value)?.name === "Restaurant";
        
        if (isRestaurant) {
          updates.greeting = `Bonjour, je suis ${voiceName} du restaurant ${prev.businessName}. Comment puis-je vous aider ?`;
        } else {
          updates.greeting = `Hello, this is ${voiceName} from ${prev.businessName}, how may I help?`;
        }
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
                  <PhoneDisplay />
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
                    disabled={
                      currentStepData.id === 'businessContext' 
                        ? settings.businessContext.length < 100 
                        : currentStepData.id === 'websiteUrl'
                        ? false
                        : !settings[currentStepData.id as keyof typeof settings]
                    }
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
