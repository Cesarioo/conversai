import { NextResponse } from 'next/server';
import { getElevenLabsId } from '../../lib/elevenlabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const agentId = await getElevenLabsId();

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const agentData = await response.json();

    // Find the file-type knowledge base entry
    const fileKnowledgeBase = agentData.conversation_config?.agent?.prompt?.knowledge_base?.find(
      (kb: { type: string; id: string; name: string }) => kb.type === 'file'
    );

    // If we have a file-type knowledge base, fetch its content
    if (fileKnowledgeBase) {
      const kbResponse = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${agentId}/knowledge-base/${fileKnowledgeBase.id}`,
        {
          method: "GET",
          headers: {
            "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (kbResponse.ok) {
        const kbData = await kbResponse.json();
        // Add the content to the agent data
        if (kbData.extracted_inner_html) {
          agentData.knowledgeBaseContent = kbData.extracted_inner_html;
        }
      }
    }

    return NextResponse.json(agentData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Error fetching agent:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch agent',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

