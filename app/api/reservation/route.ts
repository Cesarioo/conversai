import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioReceiveNumber = process.env.TWILIO_RECEIVE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    // Check if Twilio credentials are set
    if (!accountSid || !authToken || !twilioPhoneNumber || !twilioReceiveNumber) {
      console.error('Twilio credentials or phone numbers are not properly set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await request.json();
    const { name, persons, date, time } = body;

    if (!name || !persons || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log(`Processing reservation for ${name}, ${persons} person(s) on ${date} at ${time}`);

    // Fetch the latest call to the receive number
    console.log(`Fetching latest call to: ${twilioReceiveNumber}`);
    const calls = await client.calls.list({
      to: twilioReceiveNumber,
      limit: 1
    });

    if (calls.length === 0) {
      console.warn('No recent calls found');
      return NextResponse.json({ error: 'No recent calls found' }, { status: 404 });
    }

    const latestCall = calls[0];
    const callerNumber = latestCall.from;

    console.log(`Latest call found from: ${callerNumber}`);

    // Create and send SMS to the latest caller
    console.log(`Sending SMS from ${twilioPhoneNumber} to ${callerNumber}`);
    const message = await client.messages.create({
      body: `Your Reservation for ${persons} person(s) at ${time} on ${date} has been confirmed. Thank you, ${name}!`,
      from: twilioPhoneNumber,
      to: callerNumber
    });

    console.log(`SMS sent successfully, SID: ${message.sid}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Reservation confirmed and SMS sent',
      smsId: message.sid,
      callerNumber: callerNumber // Include the caller number in the response for verification
    });

  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ 
      error: 'Failed to process reservation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

