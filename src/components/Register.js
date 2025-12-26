import { useState } from "react";
import api from "../api";

function Register({ setUser }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ AUTO LOGIN
      setUser(res.data.user);

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Register</h3>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button className="primary">Register</button>
    </form>
  );
}

export default Register;
