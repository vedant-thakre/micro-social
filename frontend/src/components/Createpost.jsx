import React, { useContext, useEffect, useState } from "react";
import AppContext, { fetchPostData } from "../context/appContext";
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

  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
    fetchPostData(setUser, navigate);
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/v1/all-posts");
        setAllPosts(res.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostData();
  }, [allPosts]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Create Post */}
      <button
        onClick={handleLogout}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        logout
      </button>
      <div
        style={{
          width: "400px",
          paddingBottom: "15px",
          margin: "0px auto",
        }}
      >
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
      <div style={{ height: "1px", background: "gray" }}></div>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginTop: "25px",
          padding: "20px",
        }}
      >
        {allPosts.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}
          >
            <h4 style={{ textAlign: "center", margin: "0px" }}>{item.title}</h4>
            <p style={{ margin: "0px", padding: "10px 0px" }}>
              {item.description}
            </p>
            <div style={{ height: "1px", background: "gray" }}></div>
            <h5 style={{ margin: "10px 0px" }}>Comments</h5>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Add comment"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
