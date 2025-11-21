import axios from "axios";
import moment from "moment";
import Wallet from "../models/walletModel.js";

// GENERATE ACCESS TOKEN
export const getMpesaToken = async () => {
  const auth = Buffer.from(
    process.env.MPESA_CONSUMER_KEY + ":" + process.env.MPESA_CONSUMER_SECRET
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );

  return response.data.access_token;
};

// STK PUSH (Deposit)
export const stkPush = async (req, res) => {
  try {
    const { phone, amount, userId } = req.body;
    const token = await getMpesaToken();

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: userId,
      TransactionDesc: "FX PRO Deposit",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CALLBACK HANDLER (DEPOSIT SUCCESS)
export const mpesaCallback = async (req, res) => {
  try {
    const body = req.body.Body.stkCallback;

    if (body.ResultCode === 0) {
      const amount = body.CallbackMetadata.Item.find((i) => i.Name === "Amount")?.Value;

      const userId = body.CallbackMetadata.Item.find(
        (i) => i.Name === "AccountReference"
      )?.Value;

      await Wallet.findOneAndUpdate(
        { user: userId },
        { $inc: { wallet: amount } }
      );

      return res.json({ message: "Deposit updated successfully" });
    }

    res.json({ error: "Transaction failed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// WITHDRAW FUNCTION (B2C)
export const mpesaWithdraw = async (req, res) => {
  try {
    const { phone, amount, userId } = req.body;
    const token = await getMpesaToken();

    const payload = {
      InitiatorName: "testapi",
      SecurityCredential: "Safaricom123!",
      CommandID: "BusinessPayment",
      Amount: amount,
      PartyA: process.env.MPESA_SHORTCODE,
      PartyB: phone,
      Remarks: "FX PRO Withdraw",
      QueueTimeOutURL: process.env.MPESA_CALLBACK_URL,
      ResultURL: process.env.MPESA_CALLBACK_URL,
      Occasion: userId,
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
