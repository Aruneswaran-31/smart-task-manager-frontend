import { useState } from "react";
import api from "../api";

function Login({ setUser }) {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await api.post("/auth/login", data);

  // 🔥 STORE TOKEN AUTOMATICALLY
  localStorage.setItem("token", res.data.token);

  setUser(res.data.user);
};

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="primary">Login</button>
    </form>
  );
}


export default Login;
