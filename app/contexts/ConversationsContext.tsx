"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Conversation } from '@/data/sampleConversations'

interface AgentData {
  agent_id: string;
  name: string;
  conversation_config: {
    agent: {
      prompt: {
        prompt: string;
        llm: string;
        temperature: number;
        max_tokens: number;
        tools: any[];
        knowledge_base: any[];
        custom_llm: null;
      };
      first_message: string;
      language: string;
    };
    tts: {
      voice_id: string;
    };
  };
}

interface ConversationsContextType {
  conversations: Conversation[]
  agentData: AgentData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined)

export function ConversationsProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [agentData, setAgentData] = useState<AgentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [conversationsResponse, agentResponse] = await Promise.all([
        fetch('/api/conversations'),
        fetch('/api/agent')
      ])

      if (!conversationsResponse.ok) {
        throw new Error('Failed to fetch conversations')
      }
      if (!agentResponse.ok) {
        throw new Error('Failed to fetch agent data')
      }

      const conversationsData = await conversationsResponse.json()
      const agentData = await agentResponse.json()

      setConversations(conversationsData.conversations || [])
      setAgentData(agentData)
    } catch (err) {
      setError('Failed to load data. Please try again later.')
      console.error('Error fetching data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ConversationsContext.Provider value={{ conversations, agentData, isLoading, error, refetch: fetchData }}>
      {children}
    </ConversationsContext.Provider>
  )
}

export function useConversations() {
  const context = useContext(ConversationsContext)
  if (context === undefined) {
    throw new Error('useConversations must be used within a ConversationsProvider')
  }
  return context
}

