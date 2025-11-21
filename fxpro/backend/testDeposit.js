const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/wallet';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTViOWJhMjExNThkNDdiMDVmNzA0NSIsImlhdCI6MTc2MzAzMTQ4MiwiZXhwIjoxNzY1NjIzNDgyfQ.nqkht9DYLBmWFYLJlM9xdcqB6ZHem76JCYS8QdZKA60'; // admin token

async function deposit(amount) {
  try {
    const response = await axios.post(
      `${BASE_URL}/deposit`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Deposit successful:', response.data);
  } catch (error) {
    console.error('Error during deposit:', error.response?.data || error.message);
  }
}

deposit(500); // Example deposit amount
