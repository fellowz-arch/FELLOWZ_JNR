import React, { useEffect, useState } from "react";
import axios from "../services/api";
import "./adminStyles.css";

const Trades = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios.get("/admin/trades").then((res) => setTrades(res.data));
  }, []);

  return (
    <div>
      <h1>📈 All Trades</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Direction</th>
            <th>Status</th>
            <th>Profit</th>
            <th>Opened</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((t) => (
            <tr key={t._id}>
              <td>{t.user?.email || "Unknown"}</td>
              <td>${t.amount}</td>
              <td>{t.direction}</td>
              <td>{t.status}</td>
              <td>{t.profit ?? "–"}</td>
              <td>{t.createdAt.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
