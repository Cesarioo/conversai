import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const agentId = "L319wrQIMAX7Fr8UQn1N"; // Replace with the actual agent ID or make it dynamic

    // Remove knowledge_base from the request body if it exists
    if (body.conversation_config?.agent?.prompt?.knowledge_base) {
      delete body.conversation_config.agent.prompt.knowledge_base;
    }

    console.log('Updating agent settings with body:', JSON.stringify(body, null, 2));

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
      method: "PATCH",
      headers: {
        "Xi-Api-Key": "sk_afd7d8e7e3757ecd54bebd15b82507236ccd3b7380956237",
        "Content-Type": "application/json"
      },
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
    console.log('Agent settings updated successfully:', JSON.stringify(responseBody, null, 2));

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Error updating agent settings:', error);
    return NextResponse.json({ 
      error: 'Failed to update agent settings',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

