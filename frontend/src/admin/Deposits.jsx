import React, { useEffect, useState } from "react";
import axios from "../services/api";
import "./adminStyles.css";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    axios.get("/admin/deposits").then((res) => setDeposits(res.data));
  }, []);

  return (
    <div>
      <h1>💰 Deposits</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {deposits.map((d) => (
            <tr key={d._id}>
              <td>{d.user?.email}</td>
              <td>${d.amount}</td>
              <td>{d.method}</td>
              <td>{d.status}</td>
              <td>{d.createdAt.substring(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deposits;
