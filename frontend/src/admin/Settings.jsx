import React, { useState } from "react";
import "./adminStyles.css";

const Settings = () => {
  const [paybill, setPaybill] = useState("123456");
  const [appName, setAppName] = useState("FX PRO");

  const saveSettings = () => {
    alert("Saved (demo mode)");
  };

  return (
    <div>
      <h1>⚙ Settings</h1>

      <div className="settings-box">
        <label>App Name</label>
        <input value={appName} onChange={(e) => setAppName(e.target.value)} />

        <label>M-Pesa Paybill Number</label>
        <input value={paybill} onChange={(e) => setPaybill(e.target.value)} />

        <button onClick={saveSettings} className="admin-save-btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
