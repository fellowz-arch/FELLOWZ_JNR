import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await registerUser({ name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="page">
      <h2>Create Account</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} />

      <button className="primary-btn" onClick={register}>Register</button>
    </div>
  );
}
