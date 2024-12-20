import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  const conversationId = params.conversationId;

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`, {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237"
      },
    });

    if (!response.ok) {
      throw new Error(`Eleven Labs API error: ${response.status}`);
    }

    const body = await response.json();
    console.log('Conversation details:', body);

    return NextResponse.json(body);
  } catch (error) {
    console.error('Error fetching conversation details:', error);
    return NextResponse.json({ error: 'Failed to fetch conversation details' }, { status: 500 });
  }
}

