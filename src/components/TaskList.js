import { useEffect, useState } from "react";
import api from "../api";

function TaskList({ reload }) {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [reload]);

  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="card">
          <h4>
            {task.title}
            <span
              className={`badge ${
                task.status === "Pending" ? "pending" : "completed"
              }`}
            >
              {task.status}
            </span>
          </h4>

          <p>{task.description}</p>

          <p><b>Priority:</b> {task.priority}</p>
          <p><b>Due:</b> {task.due_date?.slice(0, 10)}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="toggle" onClick={() => toggleStatus(task)}>
              🔄 Toggle
            </button>

            <button className="danger" onClick={() => deleteTask(task.id)}>
              ❌ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
