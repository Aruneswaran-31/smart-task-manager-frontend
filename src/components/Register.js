import { useState } from "react";
import api from "../api";

function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", data);
    alert("Registered successfully");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="primary">Register</button>
    </form>
  );
}

export default Register;
