import { useState } from "react";
import api from "../api";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    alert("Login successful ✅");   // ✅ SIMPLE + RELIABLE

    setUser(res.data.user);

  } catch (err) {
    setError("Invalid email or password");
  }
};


  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Login</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
  type="email"
  name="email"                 // ✅ REQUIRED
  autoComplete="email"         // ✅ HELPS BROWSER
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

      <input
  type="password"
  name="password"
  autoComplete="current-password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

      <button className="primary">Login</button>
    </form>
  );
}

export default Login;
