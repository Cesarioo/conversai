import { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { format } from 'date-fns'
import { Conversation } from '@/data/sampleConversations'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from './AudioPlayer'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

interface CallDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  call: Conversation | null
}

interface TranscriptEntry {
  role: string
  message: string
  time_in_call_secs: number
}

export function CallDetailsModal({ isOpen, onClose, call }: CallDetailsModalProps) {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && call) {
      setIsLoading(true)
      setError(null)
      fetch(`/api/conversations/${call.conversation_id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch conversation details')
          }
          return response.json()
        })
        .then(data => {
          setTranscript(data.transcript || [])
        })
        .catch(err => {
          console.error('Error fetching conversation details:', err)
          setError('Failed to load conversation details. Please try again.')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isOpen, call])

  if (!call) {
    return null
  }

  const renderTranscript = () => {
    if (isLoading) {
      return <div className="text-center">Loading transcript...</div>
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
        {transcript.map((entry, index) => (
          <div key={index} className={`flex ${entry.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${
              entry.role === 'agent' 
                ? 'bg-blue-100 text-blue-900 rounded-bl-none' 
                : 'bg-gray-100 text-gray-900 rounded-br-none'
            }`}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium capitalize text-sm">{entry.role}</span>
                <span className="text-xs text-gray-500">{entry.time_in_call_secs}s</span>
              </div>
              <p className="text-sm">{entry.message}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Call Details</SheetTitle>
          <SheetDescription>
            Details for call ID: {call.conversation_id}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          <div className="mt-4 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Agent:</div>
                <div>{call.agent_name} (ID: {call.agent_id})</div>
                <div>Date and Time:</div>
                <div>{format(new Date(call.start_time_unix_secs * 1000), 'MMM d, yyyy HH:mm:ss')}</div>
                <div>Duration:</div>
                <div>{call.call_duration_secs} seconds</div>
                <div>Message Count:</div>
                <div>{call.message_count}</div>
                <div>Status:</div>
                <div>{call.status}</div>
                <div>Call Successful:</div>
                <div>
                  <Badge variant={call.call_successful === "success" ? "success" : "destructive"}>
                    {call.call_successful}
                  </Badge>
                </div>
                {call.analysis && call.analysis.transcript_summary && (
                  <>
                    <div>Call Summary:</div>
                    <div>{call.analysis.transcript_summary}</div>
                  </>
                )}
              </div>
            </div>

            {/* Metadata */}
            {call.metadata && (
              <div>
                <h3 className="font-semibold mb-2">Metadata</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Cost:</div>
                  <div>{call.metadata.cost}</div>
                  <div>Feedback Score:</div>
                  <div>
                    {call.metadata.feedback?.overall_score ?? 'N/A'}
                  </div>
                  <div>Likes:</div>
                  <div>{call.metadata.feedback?.likes ?? 'N/A'}</div>
                  <div>Dislikes:</div>
                  <div>{call.metadata.feedback?.dislikes ?? 'N/A'}</div>
                </div>
              </div>
            )}

            {/* Analysis */}
            {call.analysis && (
              <div>
                <h3 className="font-semibold mb-2">Analysis</h3>
                <p className="text-sm">{call.analysis.transcript_summary}</p>
              </div>
            )}

            {/* Transcript */}
            <div>
              <h3 className="font-semibold mb-4">Transcript</h3>
              {renderTranscript()}
            </div>

            {/* Audio Player */}
            <div>
              <h3 className="font-semibold mb-2">Audio</h3>
              <AudioPlayer conversationId={call.conversation_id} />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

