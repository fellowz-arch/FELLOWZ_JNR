const axios = require('axios');

// ✅ Replace with your actual admin token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTVkYzMwN2I2ZmFhNTA3MGMxODc3MiIsImlhdCI6MTc2MzA0MDMwNCwiZXhwIjoxNzY1NjMyMzA0fQ.tGXE8rHdlpVtreF6a7r4xRCbz1YHvcP7PsYPJMLKPQg';

const API_URL = 'http://localhost:5000/api/wallet';

async function testWallet() {
  try {
    console.log('--- Testing wallet endpoints ---');

    // Get wallet balance
    const balanceResponse = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Wallet balance:', balanceResponse.data);

    // Add funds
    const addFundsResponse = await axios.post(
      `${API_URL}/add`,
      { amount: 500 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Funds added:', addFundsResponse.data);

    // Withdraw funds
    const withdrawResponse = await axios.post(
      `${API_URL}/withdraw`,
      { amount: 200 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('Funds withdrawn:', withdrawResponse.data);

    // Final balance
    const finalBalance = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Wallet balance after operations:', finalBalance.data);

  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else {
      console.error('Error testing wallet:', error.message);
    }
  }
}

testWallet();
