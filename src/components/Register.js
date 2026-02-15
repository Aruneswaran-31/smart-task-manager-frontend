import { useState } from "react";
import { supabase } from "../supabase";

function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Registered successfully!");
      setUser(data.user);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Register</h3>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button className="primary">Register</button>
    </form>
  );
}

export default Register;
