import { NextRequest, NextResponse } from 'next/server';
import { getElevenLabsId } from '../../../lib/elevenlabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const agentId = await getElevenLabsId();

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "PATCH",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Eleven Labs API error! status: ${response.status}, message: ${errorText}`);
      return NextResponse.json({ 
        error: `Eleven Labs API error: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    const responseBody = await response.json();

    return NextResponse.json(responseBody, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error updating agent settings:', error);
    return NextResponse.json({ 
      error: 'Failed to update agent settings',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

