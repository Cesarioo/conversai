import { NextRequest, NextResponse } from 'next/server';
import { getElevenLabsId } from '../../../lib/elevenlabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const agentId = await getElevenLabsId();

    // Extract knowledge base info from request
    const { id, type, name = type } = body;

    if (!id || !type) {
      return NextResponse.json({ 
        error: 'Invalid request',
        details: 'Please provide both id and type (file/url) for the knowledge base'
      }, { status: 400 });
    }

    // Validate type
    if (type !== 'file' && type !== 'url') {
      return NextResponse.json({ 
        error: 'Invalid type',
        details: 'Type must be either "file" or "url"'
      }, { status: 400 });
    }

    // First, get the current agent configuration
    const getResponse = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Cache-Control": "no-cache",
      },
    });

    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      console.error(`Failed to get agent config: ${getResponse.status}, message: ${errorText}`);
      return NextResponse.json({ 
        error: `Failed to get agent config: ${getResponse.status}`,
        details: errorText
      }, { status: getResponse.status });
    }

    const currentConfig = await getResponse.json();
    
    // Prepare the update payload, preserving existing configuration
    const updatePayload = {
      conversation_config: {
        ...currentConfig.conversation_config,
        agent: {
          ...currentConfig.conversation_config.agent,
          prompt: {
            ...currentConfig.conversation_config.agent.prompt,
            knowledge_base: [
              {
                name,
                id,
                type
              }
            ]
          }
        }
      }
    };

    console.log('Updating agent with knowledge base:', JSON.stringify(updatePayload, null, 2));

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "PATCH",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(updatePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error! status: ${response.status}, message: ${errorText}`);
      return NextResponse.json({ 
        error: `ElevenLabs API error: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    const responseBody = await response.json();
    console.log('Agent updated successfully with knowledge base:', responseBody);

    return NextResponse.json(responseBody, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Error updating agent with knowledge base:', error);
    return NextResponse.json({ 
      error: 'Failed to update agent with knowledge base',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
} 