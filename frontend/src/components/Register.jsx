import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3003/api/v1/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      console.log(res); 
       if (res.status === 201) {
            navigate("/login");
       } else {
            console.error("Error submitting form:", res.statusText);
       }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
      }}
    >
      <div>
        <h3 style={{ textAlign: "center" }}>Register</h3>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an Account ? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
