export interface Conversation {
  agent_id: string;
  agent_name: string;
  conversation_id: string;
  start_time_unix_secs: number;
  call_duration_secs: number;
  message_count: number;
  status: string;
  call_successful: string;
  transcript?: {
    role: string;
    message: string;
    time_in_call_secs: number;
  }[];
  metadata?: {
    cost: number;
    feedback: {
      overall_score: number | null;
      likes: number;
      dislikes: number;
    };
  };
  analysis?: {
    transcript_summary: string;
  };
  audioSrc?: string
}

