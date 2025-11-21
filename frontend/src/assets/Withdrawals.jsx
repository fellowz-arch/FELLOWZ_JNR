import React, { useEffect, useState } from "react";
import axios from "../services/api";
import "./adminStyles.css";

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    axios.get("/admin/withdrawals").then((res) => setWithdrawals(res.data));
  }, []);

  return (
    <div>
      <h1>💸 Withdrawals</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Requested</th>
          </tr>
        </thead>

        <tbody>
          {withdrawals.map((w) => (
            <tr key={w._id}>
              <td>{w.user?.email}</td>
              <td>${w.amount}</td>
              <td>{w.status}</td>
              <td>{w.createdAt.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Withdrawals;
