import React, { useContext, useEffect, useState } from "react";
import AppContext, { fetchUserData } from "../context/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [allPosts, setAllPosts] = useState([]);

  const navigate = useNavigate();

  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useContext(AppContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/v1/create", {
        title: post.title,
        description: post.description,
        userId: user.id,
      });
      console.log(res.data);
    } catch (error) {
      console.error("Post create error:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
    fetchUserData(setUser, navigate);
  }, []);
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
      {/* Create Post */}
      <button
        onClick={handleLogout}
        style={{ position: "absolute", top: "50px", right: "50px" }}
      >
        logout
      </button>
      <div style={{ minWidth: "200px" }}>
        <h3 style={{ textAlign: "center" }}>Create Post</h3>
        <form
          onSubmit={handlesubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={post.description}
            onChange={(e) => {
              setPost({ ...post, [e.target.name]: e.target.value });
            }}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
