import React, { useState, useEffect } from "react";
import {
  getWalletBalance,
  addToWallet,
  withdrawFromWallet,
  depositWithMpesa,
  withdrawMpesa,
  getProfile,
} from "../services/api";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState({});

  const loadData = async () => {
    const walletRes = await getWalletBalance();
    const profileRes = await getProfile();

    setBalance(walletRes.data.wallet);
    setUser(profileRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <h2>Wallet</h2>

      <div className="card">
        <h3>Balance: ${balance}</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={() => addToWallet(amount).then(loadData)}
        >
          Deposit (Manual)
        </button>

        <button
          className="secondary-btn"
          onClick={() => withdrawFromWallet(amount).then(loadData)}
        >
          Withdraw (Manual)
        </button>

        {/* ----------------- M-PESA BUTTONS ----------------- */}

        <button
          className="primary-btn"
          onClick={() =>
            depositWithMpesa({
              phone: user.phone,
              amount,
              userId: user._id,
            })
          }
        >
          Deposit via M-Pesa
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            withdrawMpesa({
              phone: user.phone,
              amount,
              userId: user._id,
            })
          }
        >
          Withdraw via M-Pesa
        </button>
      </div>
    </div>
  );
};

export default Wallet;
