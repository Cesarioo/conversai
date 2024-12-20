import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/convai/conversations?agent_id=L319wrQIMAX7Fr8UQn1N&page_size=100", {
      method: "GET",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237"
      },
    });

    if (!response.ok) {
      throw new Error(`Eleven Labs API error: ${response.status}`);
    }

    const body = await response.json();
    console.log(body);

    return NextResponse.json(body);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

