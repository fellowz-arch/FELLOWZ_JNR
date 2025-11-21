import React, { useState, useEffect } from "react";
import LiveChart from "../components/LiveChart";
import { placeTrade, getOpenTrades } from "../services/api";

export default function Trade() {
  const [amount, setAmount] = useState(5);
  const [direction, setDirection] = useState("buy");
  const [openTrades, setOpenTrades] = useState([]);

  const loadTrades = async () => {
    const res = await getOpenTrades();
    setOpenTrades(res.data);
  };

  useEffect(() => {
    loadTrades();
  }, []);

  const execute = async () => {
    await placeTrade({ amount, direction });
    loadTrades();
  };

  return (
    <div className="page">
      <LiveChart />

      <div className="card">
        <h3>Place Trade</h3>

        <input type="number" value={amount}
               onChange={(e) => setAmount(e.target.value)} />

        <select value={direction} onChange={(e) => setDirection(e.target.value)}>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>

        <button className="primary-btn" onClick={execute}>Execute</button>
      </div>

      <div className="card">
        <h3>Open Trades</h3>

        {openTrades.map((t) => (
          <div key={t._id} className="trade-box">
            {t.direction.toUpperCase()} • ${t.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
