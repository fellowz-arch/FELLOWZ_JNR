import React, { useState } from "react";
import "./adminStyles.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = () => {
    if (email === "admin@fxpro.com" && password === "admin123") {
      localStorage.setItem("adminAuth", true);
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid admin login");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>

      <input
        placeholder="Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Admin Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginAdmin}>Login</button>
    </div>
  );
};

export default AdminLogin;
