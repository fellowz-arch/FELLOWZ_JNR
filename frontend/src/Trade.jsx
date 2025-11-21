import React, { useState, useEffect } from "react";
import { placeTrade, getOpenTrades } from "../services/api";
import { onPriceUpdate } from "../price/livePrice";

const Trade = () => {
  const [amount, setAmount] = useState(10);
  const [direction, setDirection] = useState("buy");
  const [openTrades, setOpenTrades] = useState([]);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const res = await getOpenTrades();
      setOpenTrades(res.data);
    } catch (error) {
      console.error("Failed to load trades", error);
    }
  };

  const executeTrade = async () => {
    try {
      const res = await placeTrade({ amount, direction });
      alert("Trade Executed!");
      fetchTrades();
    } catch (error) {
      alert("Trade Failed!");
    }
  };

  return (
    <div className="page">
      <h2>Trade</h2>

      <div className="card">
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Direction</label>
        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>

        <button onClick={executeTrade}>Execute Trade</button>
      </div>

      <div className="card">
        <h3>Open Trades</h3>
        {openTrades.map((t, i) => (
          <div key={i} className="trade-box">
            {t.direction.toUpperCase()} - ${t.amount}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trade;
