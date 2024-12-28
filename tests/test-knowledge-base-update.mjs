import fetch from 'node-fetch';

async function testKnowledgeBaseUpdate() {
  try {
    const payload = {
      id: 'ETsiICjcIUOWRH44DpFx', // Using the ID we got from the previous file upload
      type: 'file',
      name: 'Restaurant Menu'
    };

    console.log('\nUpdating agent with knowledge base...');
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch('http://localhost:3000/api/knowledge-base/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testKnowledgeBaseUpdate(); 