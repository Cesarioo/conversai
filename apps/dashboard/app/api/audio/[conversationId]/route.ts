import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  const conversationId = params.conversationId;

  try {
    console.log(`Fetching audio for conversation ID: ${conversationId}`);
    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`, {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237"
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Eleven Labs API error! status: ${response.status}, message: ${errorText}`);
      return NextResponse.json({ 
        error: `Eleven Labs API error: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    const audioBlob = await response.blob();
    const headers = new Headers();
    headers.append('Content-Type', audioBlob.type);
    headers.append('Content-Length', audioBlob.size.toString());

    return new NextResponse(audioBlob, { 
      status: 200, 
      headers: headers 
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'An unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

