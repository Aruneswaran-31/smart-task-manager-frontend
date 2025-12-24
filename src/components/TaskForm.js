import { useState } from "react";
import api from "../api";

function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Pending",
    due_date: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", task);
    refresh();
    setTask({
      title: "",
      description: "",
      priority: "Low",
      status: "Pending",
      due_date: ""
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add Task</h3>

      <input name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <input type="date" name="due_date" value={task.due_date} onChange={handleChange} />

      <select name="priority" value={task.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select name="status" value={task.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <button className="primary">➕ Add Task</button>
    </form>
  );
}

export default TaskForm;
