import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} />

      <button className="primary-btn" onClick={login}>Login</button>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
