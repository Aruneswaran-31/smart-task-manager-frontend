import { useEffect, useState } from "react";
import api from "../api";

function DashboardStats({ reload }) {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
  });

  const loadStats = async () => {
    try {
      const res = await api.get("/tasks");
      const tasks = res.data;

      const total = tasks.length;
      const pending = tasks.filter(t => t.status === "Pending").length;
      const completed = tasks.filter(t => t.status === "Completed").length;

      setStats({ total, pending, completed });
    } catch (err) {
      console.error("Failed to load stats");
    }
  };

  useEffect(() => {
    loadStats();
  }, [reload]); // 🔥 THIS IS THE FIX

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>{stats.total}</h3>
        <p>Total Tasks</p>
      </div>

      <div className="stat-card pending">
        <h3>{stats.pending}</h3>
        <p>Pending</p>
      </div>

      <div className="stat-card completed">
        <h3>{stats.completed}</h3>
        <p>Completed</p>
      </div>
    </div>
  );
}

export default DashboardStats;
