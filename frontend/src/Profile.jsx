import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.put("/user/update", user);
      alert("Profile saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <div className="card">
        <label>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} />
      </div>
      <div className="card">
        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div className="card">
        <label>Phone:</label>
        <input type="text" name="phone" value={user.phone} onChange={handleChange} />
      </div>
      <button className="primary" onClick={handleSave}>
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
