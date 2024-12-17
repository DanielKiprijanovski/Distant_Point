// src/App.js
import React, { useState } from "react";
import TasksList from "./components/TasksList";
import Login from "./components/Login";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (isLogged) => {
    setAuthenticated(isLogged);
  };

  return (
    <div>
      {!authenticated ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <TasksList/>
      )}
    </div>
  );
};

export default App;


