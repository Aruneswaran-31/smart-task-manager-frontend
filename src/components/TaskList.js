import { useEffect, useState } from "react";
import api from "../api";

function TaskList({ reload, triggerReload }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, [reload]);

  const isOverdue = (task) => {
    if (!task.due_date || task.status === "Completed") return false;
    return new Date(task.due_date) < new Date();
  };

  const toggleStatus = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    triggerReload();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    triggerReload();
  };
  
  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "asc") {
    filteredTasks.sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );
  } else if (sort === "desc") {
    filteredTasks.sort(
      (a, b) => new Date(b.due_date) - new Date(a.due_date)
    );
  }

  return (
    <div>
      <h2>Tasks</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sort by date</option>
          <option value="asc">Due Date ↑</option>
          <option value="desc">Due Date ↓</option>
        </select>
      </div>

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`card ${isOverdue(task) ? "overdue" : ""}`}
        >
          <h4>
            {task.title}
            <span
              className={`badge ${
                task.status === "Pending" ? "pending" : "completed"
              }`}
            >
              {task.status}
            </span>

            {isOverdue(task) && (
              <span className="badge overdue-badge">⚠️ Overdue</span>
            )}
          </h4>

          <p>{task.description}</p>

          <div className={`priority-badge ${task.priority.toLowerCase()}`}>
            ⭐ {task.priority}
          </div>

          <p>
            <b>Due:</b> {task.due_date?.slice(0, 10)}
          </p>

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
