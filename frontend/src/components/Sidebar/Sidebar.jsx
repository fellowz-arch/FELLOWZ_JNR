import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>FX PRO</h2>

      <Link to="/app">Dashboard</Link>
      <Link to="/app/trade">Trade</Link>
      <Link to="/app/wallet">Wallet</Link>
      <Link to="/app/profile">Profile</Link>
    </div>
  );
}
