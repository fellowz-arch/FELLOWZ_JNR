import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./adminStyles.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-title">FX PRO ADMIN</h2>

        <nav>
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/trades">📈 Trades</Link>
          <Link to="/admin/deposits">💰 Deposits</Link>
          <Link to="/admin/withdrawals">💸 Withdrawals</Link>
          <Link to="/admin/wallets">💳 Wallets</Link>
          <Link to="/admin/settings">⚙ Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
