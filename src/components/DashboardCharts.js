import { useEffect, useState } from "react";
import api from "../api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function DashboardCharts({ reload }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [reload]);

  const pending = tasks.filter(t => t.status === "Pending").length;
  const completed = tasks.filter(t => t.status === "Completed").length;

  const low = tasks.filter(t => t.priority === "Low").length;
  const medium = tasks.filter(t => t.priority === "Medium").length;
  const high = tasks.filter(t => t.priority === "High").length;

  const pieData = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [pending, completed],
        backgroundColor: ["#f1c40f", "#2ecc71"],
      },
    ],
  };

  const barData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Tasks by Priority",
        data: [low, medium, high],
        backgroundColor: ["#2ecc71", "#f39c12", "#e74c3c"],
      },
    ],
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Status Overview</h3>
        <Pie data={pieData} />
      </div>

      <div className="chart-card">
        <h3>Priority Distribution</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
}

export default DashboardCharts;
