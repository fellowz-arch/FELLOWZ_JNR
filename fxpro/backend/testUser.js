const axios = require('axios');

const API_URL = 'http://localhost:5000/api/users';

async function testUser() {
  try {
    console.log('--- Testing user endpoints ---');

    // Create a test user
    const newUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const createUserResponse = await axios.post(`${API_URL}/register`, newUser);
    console.log('User created:', createUserResponse.data);

    const token = createUserResponse.data.token;

    // Login the test user
    const loginResponse = await axios.post(`${API_URL}/login`, {
      email: newUser.email,
      password: newUser.password,
    });
    console.log('User logged in:', loginResponse.data);

    // Get user profile
    const profileResponse = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User profile:', profileResponse.data);

  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else {
      console.error('Error testing user:', error.message);
    }
  }
}

testUser();
