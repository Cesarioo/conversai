import { NextRequest, NextResponse } from 'next/server';
import { getElevenLabsId } from '../../../lib/elevenlabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const agentId = await getElevenLabsId();

    // Create a new FormData instance for the ElevenLabs API
    const apiFormData = new FormData();

    // Handle file upload if present
    const file = formData.get("file");
    const url = formData.get("url");

    // Ensure only one input type is provided
    if (file && url) {
      return NextResponse.json({ 
        error: 'Invalid request',
        details: 'Please provide either a file or a URL, not both.'
      }, { status: 400 });
    }

    if (!file && !url) {
      return NextResponse.json({ 
        error: 'Invalid request',
        details: 'Please provide either a file or a URL.'
      }, { status: 400 });
    }

    if (file) {
      apiFormData.append("file", file);
      console.log('Adding file to knowledge base');
    } else if (url) {
      apiFormData.append("url", url);
      console.log('Adding URL to knowledge base:', url);
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/agents/${agentId}/add-to-knowledge-base`,
      {
        method: "POST",
        headers: {
          "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
          "Cache-Control": "no-cache",
        },
        body: apiFormData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error! status: ${response.status}, message: ${errorText}`);
      return NextResponse.json({ 
        error: `ElevenLabs API error: ${response.status}`,
        details: errorText
      }, { status: response.status });
    }

    const responseBody = await response.json();
    console.log('Knowledge base updated successfully:', responseBody);

    return NextResponse.json(responseBody, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Error updating knowledge base:', error);
    return NextResponse.json({ 
      error: 'Failed to update knowledge base',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
} 