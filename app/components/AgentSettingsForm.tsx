"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, MessageSquare, Calendar, Info, Check, AlertCircle, Volume2, Pause, Mail } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useConversations } from '../contexts/ConversationsContext'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AgentSettings {
  name: string;
  prompt: string;
  firstMessage: string;
  voiceId: string;
  language: string;
  llm: string;
  temperature: number;
  maxTokens: number;
}

interface VoiceOption {
  id: string;
  name: string;
  audioFile: string;
}

const voiceOptions: VoiceOption[] = [
  { id: "IHngRooVccHyPqB4uQkG", name: "Corentin", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/corentin_sample.mp3" },
  { id: "gCux0vt1cPsEXPNSbchu", name: "Anna", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/anna_sample.mp3" },
  { id: "6vTyAgAT8PncODBcLjRf", name: "Claire", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/claire_sample.mp3" },
  { id: "Qrl71rx6Yg8RvyPYRGCQ", name: "Guillaume", audioFile: "https://pub-ec409c78c9ae4f9dad3ed1d5dbf6b44c.r2.dev/guillaume_sample.mp3" },
  { id: "custom", name: "Clone my own voice", audioFile: "" },
];

const reservationOptions = [
  { name: "SMS", icon: MessageSquare },
  { name: "Google Calendar", icon: Calendar },
  { name: "Email", icon: Mail },
];

const infoTooltips = {
  name: "The name of your AI agent. This will be used to identify the agent in the system. Choose a name that's descriptive and easy to remember, as it will help you manage multiple agents if you create them.",
  prompt: "The initial instructions given to the AI. This sets the context and behavior for the agent. Be specific about the agent's role, tone, and any particular knowledge or skills it should emulate. The more detailed and clear your prompt, the better your agent will perform.",
  firstMessage: "The greeting message the AI will use to start conversations. This sets the tone for the interaction and should be welcoming and aligned with your brand voice. Consider including a brief introduction of the AI's purpose to set clear expectations for the user.",
  voice: "The voice profile used for text-to-speech conversion in calls. This determines how your AI agent will sound in audio interactions. Choose a voice that best represents your brand and is appropriate for your target audience. You can also clone your own voice for a more personalized touch.",
  reservation: "Connect various platforms to manage reservations through the AI agent. This integration allows the AI to directly interact with your booking systems, providing a seamless experience for customers. Ensure you have the necessary API keys and permissions set up for each platform you wish to connect.",
  voiceSettings: "Configure the voice characteristics of your AI agent. These settings affect how the agent sounds in audio interactions, allowing you to customize the voice to match your brand identity and create a more engaging user experience.",
  language: "The primary language used by the AI agent for communication. This setting ensures that the agent communicates effectively in the chosen language, providing a natural and fluent conversation experience for users."
};

export function AgentSettingsForm() {
  const { agentData, isLoading, error, refetch } = useConversations()
  const [settings, setSettings] = useState<AgentSettings>({
    name: "",
    prompt: "",
    firstMessage: "",
    voiceId: "",
    language: "",
    llm: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 1000
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (agentData) {
      setSettings({
        name: agentData.name || "",
        prompt: agentData.conversation_config.agent.prompt.prompt || "",
        firstMessage: agentData.conversation_config.agent.first_message || "",
        voiceId: agentData.conversation_config.tts.voice_id || "",
        language: agentData.conversation_config.agent.language || "",
        llm: agentData.conversation_config.agent.prompt.llm || "gpt-3.5-turbo",
        temperature: agentData.conversation_config.agent.prompt.temperature || 0.7,
        maxTokens: agentData.conversation_config.agent.prompt.max_tokens || 1000
      });
      const voice = voiceOptions.find(v => v.id === agentData.conversation_config.tts.voice_id);
      setSelectedVoice(voice || null);
    }
  }, [agentData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleVoiceChange = (value: string) => {
    const voice = voiceOptions.find(v => v.id === value);
    setSelectedVoice(voice || null);
    setSettings(prev => ({ ...prev, voiceId: value }));
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    
    if (voice && voice.id !== 'custom') {
      if (audioRef.current) {
        audioRef.current.src = voice.audioFile;
        audioRef.current.load();
      } else {
        audioRef.current = new Audio(voice.audioFile);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const response = await fetch('/api/agent/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: settings.name,
          conversation_config: {
            agent: {
              prompt: {
                prompt: settings.prompt,
                llm: settings.llm,
                temperature: settings.temperature,
                max_tokens: settings.maxTokens,
              },
              first_message: settings.firstMessage,
              language: settings.language,
            },
            tts: {
              voice_id: settings.voiceId,
            },
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Settings updated successfully:', data);
        setSaveSuccess(true);
        refetch(); // Refresh the agent data
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail?.message || 'Failed to update agent settings');
      }
    } catch (error) {
      console.error('Error updating agent settings:', error);
      setSaveError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePlay = () => {
    if (!selectedVoice || selectedVoice.id === 'custom') return;

    if (isPlaying) {
      audioRef.current?.pause();
      audioRef.current?.load(); // Reset the audio to the beginning
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(selectedVoice.audioFile);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  if (isLoading) {
    return <div>Loading agent settings...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  const LabelWithInfo = ({ htmlFor, children, tooltip }: { htmlFor: string; children: React.ReactNode; tooltip: string }) => (
    <div className="flex items-center space-x-2">
      <Label htmlFor={htmlFor}>{children}</Label>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Info className="h-4 w-4 text-gray-500" />
              <span className="sr-only">More information</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm z-50">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  const SectionHeader = ({ children, tooltip }: { children: React.ReactNode; tooltip: string }) => (
    <div className="flex items-center space-x-2">
      <h2 className="text-2xl font-bold">{children}</h2>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Info className="h-5 w-5 text-gray-500" />
              <span className="sr-only">More information</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm z-50">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {saveError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <LabelWithInfo htmlFor="name" tooltip={infoTooltips.name}>Name</LabelWithInfo>
          <Input
            id="name"
            name="name"
            value={settings.name}
            onChange={handleChange}
            className="focus-blue"
          />
        </div>

        <div className="space-y-2">
          <LabelWithInfo htmlFor="prompt" tooltip={infoTooltips.prompt}>Prompt</LabelWithInfo>
          <Textarea
            id="prompt"
            name="prompt"
            value={settings.prompt}
            onChange={handleChange}
            rows={4}
            className="focus-blue"
          />
        </div>

        <div className="space-y-2">
          <LabelWithInfo htmlFor="firstMessage" tooltip={infoTooltips.firstMessage}>First Message</LabelWithInfo>
          <Input
            id="firstMessage"
            name="firstMessage"
            value={settings.firstMessage}
            onChange={handleChange}
            className="focus-blue"
          />
        </div>

        <div className="space-y-2">
          <LabelWithInfo htmlFor="voiceId" tooltip={infoTooltips.voice}>Voice</LabelWithInfo>
          <Select onValueChange={handleVoiceChange} value={settings.voiceId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voiceOptions.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedVoice && selectedVoice.id !== 'custom' && (
            <div className="mt-2 flex items-center space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="btn-outline"
                onClick={handleTogglePlay}
              >
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play sample'}
              </Button>
            </div>
          )}
          {settings.voiceId === 'custom' && (
            <Button type="button" variant="outline" className="mt-2 w-full btn-outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Clone my own voice
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <LabelWithInfo htmlFor="language" tooltip={infoTooltips.language}>Language</LabelWithInfo>
          <Input
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="focus-blue"
          />
        </div>

        <Button 
          type="submit" 
          className={`btn-primary ${saveSuccess ? 'bg-green-500 hover:bg-green-600' : ''}`}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : saveSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : 'Save Changes'}
        </Button>
      </form>

      <div className="space-y-4">
        <SectionHeader tooltip={infoTooltips.reservation}>Reservation</SectionHeader>
        <div className="space-y-2">
          {reservationOptions.map((option) => (
            <div key={option.name} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <option.icon className="h-5 w-5 text-gray-500" />
                <span>{option.name}</span>
              </div>
              <Button variant="outline" size="sm" className="btn-outline">Connect</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

