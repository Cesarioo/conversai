import fetch from 'node-fetch';

const API_URL = 'http://localhost:3000/api/reservation';

async function testReservation() {
  try {
    const testData = {
      name: "John Doe",
      persons: 4,
      date: "2024-03-20",
      time: "19:30"
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'agent_phone': '+33159133377' // Replace with an actual phone number from your app_users table
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
console.log('Starting reservation API test...');
testReservation(); 