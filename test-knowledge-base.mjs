import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

async function testWithFile() {
  try {
    const formData = new FormData();
    
    // Add the text file
    const fileBuffer = fs.readFileSync('text.txt');
    formData.append('file', fileBuffer, { filename: 'text.txt' });
    
    console.log('\nTesting with file...');
    const response = await fetch('http://localhost:3000/api/knowledge-base/new', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log('File Response:', data);
  } catch (error) {
    console.error('File Error:', error);
  }
}

async function testWithUrl() {
  try {
    const formData = new FormData();
    formData.append('url', 'https://charlie-paris.com/');

    console.log('\nTesting with URL...');
    const response = await fetch('http://localhost:3000/api/knowledge-base/new', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log('URL Response:', data);
  } catch (error) {
    console.error('URL Error:', error);
  }
}

// Run tests
async function runTests() {
  await testWithFile();
  await testWithUrl();
}

runTests(); 