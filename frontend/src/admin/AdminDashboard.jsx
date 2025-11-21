import React from "react";
import "./adminStyles.css";

const AdminDashboard = () => {
  return (
    <div>
      <h1>📊 Admin Dashboard</h1>

      <div className="admin-cards">
        <div className="admin-card">Total Users: 134</div>
        <div className="admin-card">Total Trades: 548</div>
        <div className="admin-card">Total Deposits: $10,942</div>
        <div className="admin-card">Total Withdrawals: $3,210</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
