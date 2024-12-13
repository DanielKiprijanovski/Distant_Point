// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({handleLogin}) => {  // Add onLogin here to trigger login state in App.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setError(false)
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7256/api/auth/login",
        { username, password }
      );
      handleLogin(true)
      localStorage.setItem("token", response.data.token);
    } catch (error) {
        handleLogin(false)
      console.error("Invalid username or password");
      setError("Invalid username or password");
   
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
