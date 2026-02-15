import { useState } from "react";
import api from "../api";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      onRegister();

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Register</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="primary">Register</button>
    </form>
  );
}

export default Register;
