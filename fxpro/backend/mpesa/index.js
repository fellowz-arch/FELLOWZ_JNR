const express = require('express');
const axios = require('axios');
const moment = require('moment');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// ======= M-PESA CREDENTIALS =======
const consumerKey = 'sTSLQmoKWGwL8DCKGf8BBQmnvNlEx6AGjfCU5YrpnuOj5Ic1';
const consumerSecret = 'RgdAAYV7jLqzdxvzAB9nEDzvCA0wquRmKLCP5j3yrGIKJWcZH8E1BXArfzIUz2BB';
const shortCode = 'YOUR_SHORTCODE'; // e.g., 174379
const passkey = 'YOUR_PASSKEY'; // Daraja passkey
const callbackURL = 'https://yourwebsite.com/mpesa/callback'; // your endpoint

// ======= ACCESS TOKEN FUNCTION =======
async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating access token:', error.response.data);
  }
}

// ======= STK PUSH FUNCTION =======
async function stkPush(amount, phoneNumber) {
  const accessToken = await getAccessToken();
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: shortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackURL,
    AccountReference: 'FXPRODeposit',
    TransactionDesc: 'Deposit to FX PRO Wallet'
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      data,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('STK Push Error:', error.response.data);
  }
}

// ======= CALLBACK ENDPOINT =======
app.post('/mpesa/callback', (req, res) => {
  console.log('M-Pesa Callback:', req.body);

  const callbackData = req.body.Body.stkCallback;

  if (callbackData.ResultCode === 0) {
    // Payment successful
    const amount = callbackData.CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
    const receipt = callbackData.CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber').Value;
    const phone = callbackData.CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber').Value;

    console.log(`Payment Success: KES ${amount}, Receipt: ${receipt}, Phone: ${phone}`);

    // ======= UPDATE WALLET FUNCTION =======
    updateUserWallet(phone, amount, receipt); // Connect to your DB here
  } else {
    console.log('Payment failed or cancelled:', callbackData.ResultDesc);
  }

  res.status(200).send('Callback received');
});

// ======= WALLET UPDATE FUNCTION =======
function updateUserWallet(phone, amount, receipt) {
  // TODO: Connect to your database and update the user's wallet
  console.log(`Updating wallet for ${phone} with KES ${amount}, receipt ${receipt}`);
}

// ======= START SERVER =======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`M-Pesa server running on port ${PORT}`));

// ======= TEST STK PUSH =======
// Example: stkPush(100, '254797378249').then(res => console.log(res));
