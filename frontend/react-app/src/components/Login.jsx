// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

// Login component that handles user authentication
const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

// Function to handle form submission
  const handleSubmit = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        { username, password }
      );
      handleLogin(true);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      handleLogin(false);
      console.error("Invalid username or password");
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", padding: "20px", backgroundColor: "#f4f7fc", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Username</label>
          <input
            id="username"
            type="text"
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Password</label>
          <input
            id="password"
            type="password"
            style={{ width: "100%", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "15px" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4f6ef3", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
