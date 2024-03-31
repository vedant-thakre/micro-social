import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AppContext, { fetchUserData } from "../context/appContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setIsAuthenticated, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handlesubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3003/api/v1/login", {
        email: form.email,
        password: form.password,
      });

      if (res.status === 201) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          setIsAuthenticated(true);
          fetchUserData(setUser, navigate);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Login error:", error);
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
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <form
          onSubmit={handlesubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
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
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an Account ? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
