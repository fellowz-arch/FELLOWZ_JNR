import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/api";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile().then((res) => setUser(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Your Profile</h2>

      <div className="card">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>ID:</b> {user._id}</p>
      </div>
    </div>
  );
}
