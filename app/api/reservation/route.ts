import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Initialize Twilio client
const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    // Check if Twilio credentials are set
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.error('Twilio credentials or phone numbers are not properly set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const twilioReceiveNumber = request.headers.get('agent_phone');
    if (!twilioReceiveNumber) {
      return NextResponse.json({ error: 'Missing agent_phone header' }, { status: 400 });
    }

    // Lookup notification phone number from Supabase
    const { data: userData, error: userError } = await supabase
      .from('app_users')
      .select('notification_phone')
      .eq('phone', twilioReceiveNumber)
      .single();

    if (userError || !userData) {
      console.error('Failed to find restaurant notification number:', userError);
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    const restaurantPhone = userData.notification_phone;
    if (!restaurantPhone) {
      return NextResponse.json({ error: 'Restaurant notification phone not set' }, { status: 400 });
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

    // Create and send SMS to both the customer and restaurant
    console.log(`Sending SMS to customer ${callerNumber} and restaurant ${restaurantPhone}`);
    
    // Send SMS to customer
    const customerMessage = await client.messages.create({
      body: `Votre reservation pour ${persons} personnes à ${time} le ${date} a été confirmée. Merci ${name}!`,
      from: twilioPhoneNumber,
      to: callerNumber
    });

    // Send SMS to restaurant
    const restaurantMessage = await client.messages.create({
      body: `Nouvelle reservation: ${name} pour ${persons} personnes à ${time} le ${date}. Numéro de téléphone du client: ${callerNumber}`,
      from: twilioPhoneNumber,
      to: restaurantPhone
    });

    console.log(`SMS sent successfully, Customer SID: ${customerMessage.sid}, Restaurant SID: ${restaurantMessage.sid}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Reservation confirmed and notifications sent',
      customerSmsId: customerMessage.sid,
      restaurantSmsId: restaurantMessage.sid,
      callerNumber: callerNumber
    });

  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json({ 
      error: 'Failed to process reservation',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

