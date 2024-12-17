// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";  // Import your App component
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter for routing

ReactDOM.render(
  <BrowserRouter> {/* Wrap your app with BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
