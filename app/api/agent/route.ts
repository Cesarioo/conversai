import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/convai/agents/L319wrQIMAX7Fr8UQn1N", {
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
    console.error('Error fetching agent data:', error);
    return NextResponse.json({ error: 'Failed to fetch agent data' }, { status: 500 });
  }
}

