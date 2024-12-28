import { NextResponse } from 'next/server';
import { getElevenLabsId } from '../../lib/elevenlabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const agentId = await getElevenLabsId();

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversations?agent_id=${agentId}&page_size=100`, {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(`Eleven Labs API error: ${response.status}`);
    }

    const body = await response.json();

    return NextResponse.json(body, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch conversations',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

