"use client"

import { useState } from 'react'
import { PhoneCall } from 'lucide-react'
import { format } from 'date-fns'
import { Conversation } from '@/data/sampleConversations'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CallDetailsModal } from './CallDetailsModal'
import { useConversations } from '../contexts/ConversationsContext'

export function CallHistory() {
  const { conversations, isLoading, error, refetch } = useConversations()
  const [selectedCall, setSelectedCall] = useState<Conversation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCallDetails = (call: Conversation) => {
    setSelectedCall(call)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading conversations...</div>
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Call History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Date and Time</TableHead>
            <TableHead className="text-right">Messages</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversations.map((conversation) => (
            <TableRow key={conversation.conversation_id}>
              <TableCell>
                <PhoneCall className="h-4 w-4 text-gray-500" />
              </TableCell>
              <TableCell>
                {format(new Date(conversation.start_time_unix_secs * 1000), 'MMM d, yyyy HH:mm')}
              </TableCell>
              <TableCell className="text-right">{conversation.message_count}</TableCell>
              <TableCell className="text-right">
                <Badge variant={conversation.call_successful === "success" ? "success" : "destructive"}>
                  {conversation.call_successful}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="btn-outline" onClick={() => openCallDetails(conversation)}>
                  See more details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CallDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        call={selectedCall}
      />
    </div>
  )
}

