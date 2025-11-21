const moment = require('moment');

const shortCode = 'YOUR_SHORTCODE'; // e.g., 174379
const passkey = 'YOUR_PASSKEY'; // Daraja passkey
const amount = 100; // Amount user wants to deposit
const phoneNumber = '2547XXXXXXXX'; // User's phone
const callbackURL = 'https://yourwebsite.com/callback';

async function stkPush(accessToken) {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
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
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log('STK Push Response:', response.data);
  } catch (error) {
    console.error('STK Push Error:', error.response.data);
  }
}
