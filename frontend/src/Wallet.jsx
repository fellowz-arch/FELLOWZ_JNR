import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const fetchBalance = async () => {
    try {
      const res = await api.get("/wallet"); // GET wallet balance
      setBalance(res.data.wallet);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch balance");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    try {
      if (!amount) return alert("Enter an amount");
      await api.post("/wallet/add", { amount: parseFloat(amount) });
      fetchBalance();
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!amount) return alert("Enter an amount");
      await api.post("/wallet/withdraw", { amount: parseFloat(amount) });
      fetchBalance();
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Withdraw failed");
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      <div className="card">
        <p>Current Balance: ${balance.toFixed(2)}</p>
      </div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div style={{ marginTop: "10px" }}>
        <button className="primary" onClick={handleDeposit}>
          Deposit
        </button>
        <button className="primary" style={{ backgroundColor: "#ff444f" }} onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Wallet;
