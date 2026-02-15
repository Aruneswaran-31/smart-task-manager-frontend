import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [reload, setReload] = useState(false);

  if (!user) {
    return (
      <div className="container">
        <h1>Smart Task Management</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Register</button>
        </div>

        {showLogin ? (
          <Login setUser={setUser} />
        ) : (
          <Register onRegister={() => alert("Registered! Please login")} />
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.name}</h1>

      <button
        className="danger"
        onClick={() => {
          setUser(null);
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>

      <TaskForm refresh={() => setReload(!reload)} />
      <TaskList reload={reload} />
    </div>
  );
}

export default App;
