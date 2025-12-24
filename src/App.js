import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import DashboardStats from "./components/DashboardStats";
import DashboardCharts from "./components/DashboardCharts";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dark, setDark] = useState(false);
  const [reload, setReload] = useState(false);
  

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ================= AUTH ================= */
  if (!user) {
    return (
      <div className={dark ? "container dark" : "container"}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Smart Task Management System</h1>
          <button className="primary" onClick={() => setDark(!dark)}>
            {dark ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="auth-buttons">
          <button className={showLogin ? "primary" : ""} onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button className={!showLogin ? "primary" : ""} onClick={() => setShowLogin(false)}>
            Register
          </button>
        </div>

        {loading && <div className="loader"></div>}

        {showLogin ? (
          <Login
            setUser={(u) => {
              setLoading(true);
              setTimeout(() => {
                setUser(u);
                setLoading(false);
                showToast("Login successful ✅");
              }, 700);
            }}
          />
        ) : (
          <Register onRegister={() => showToast("Registered successfully 🎉")} />
        )}

        {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div className={dark ? "container dark" : "container"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcome, {user.name}</h1>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="primary" onClick={() => setDark(!dark)}>
            {dark ? "🌞 Light" : "🌙 Dark"}
          </button>

          <button
            className="danger"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
              showToast("Logged out 👋");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* 🔥 DASHBOARD STATS */}
      <DashboardStats reload={reload} />
      <ProgressBar reload={reload} />
      <DashboardCharts reload={reload} />

      {/* 🔥 ADD TASK */}
      <TaskForm
        refresh={() => {
          setReload(!reload); // 🔥 single source trigger
          showToast("Task added ✅");
        }}
      />

      {/* 🔥 TASK LIST */}
      <TaskList
  reload={reload}
  triggerReload={() => setReload(!reload)}
/>


      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

export default App;
