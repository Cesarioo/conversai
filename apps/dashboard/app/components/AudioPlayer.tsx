"use client"

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AudioPlayerProps {
  conversationId: string
}

export function AudioPlayer({ conversationId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const fetchAudio = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Fetching audio for conversation ID: ${conversationId}`);
      const response = await fetch(`/api/audio/${conversationId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${errorData.error}\nDetails: ${errorData.details}`);
      }
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error fetching audio:', error);
      setError(error instanceof Error ? error.message : 'Failed to load audio. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAudio();
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setError(`Unable to play audio. The file may be in an unsupported format. Error: ${error.message}`);
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return <div>Loading audio...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <pre className="whitespace-pre-wrap">{error}</pre>
        </AlertDescription>
        <Button variant="outline" size="sm" onClick={fetchAudio} className="ml-2 btn-outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </Alert>
    );
  }

  if (!audioUrl) {
    return <div>No audio available for this conversation.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="btn-outline">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex items-center space-x-2 w-48">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            step={0.1}
            value={[currentTime]}
            onValueChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value[0]
              }
            }}
            className="w-full"
          />
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 w-4 text-gray-500" />
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            className="w-24"
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={(e) => {
          console.error('Audio error:', e);
          setError(`Error loading audio file. The file may be missing or in an unsupported format. Error: ${(e.target as HTMLAudioElement).error?.message}`);
        }}
      />
    </div>
  )
}

