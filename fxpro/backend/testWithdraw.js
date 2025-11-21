const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/wallet';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTViOWJhMjExNThkNDdiMDVmNzA0NSIsImlhdCI6MTc2MzAzMTQ4MiwiZXhwIjoxNzY1NjIzNDgyfQ.nqkht9DYLBmWFYLJlM9xdcqB6ZHem76JCYS8QdZKA60'; // admin token

async function withdraw(amount) {
  try {
    const response = await axios.post(
      `${BASE_URL}/withdraw`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Withdrawal successful:', response.data);
  } catch (error) {
    console.error('Error during withdrawal:', error.response?.data || error.message);
  }
}

withdraw(300); // Example withdrawal amount
