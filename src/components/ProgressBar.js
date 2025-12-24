import { useEffect, useState } from "react";
import api from "../api";

function ProgressBar({ reload }) {
  const [percent, setPercent] = useState(0);

  const loadProgress = async () => {
    const res = await api.get("/tasks");
    const tasks = res.data;

    if (tasks.length === 0) {
      setPercent(0);
      return;
    }

    const completed = tasks.filter(t => t.status === "Completed").length;
    setPercent(Math.round((completed / tasks.length) * 100));
  };

  useEffect(() => {
    loadProgress();
  }, [reload]);

  return (
    <div className="progress-container">
      <div className="progress-label">
        Progress: {percent}%
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
