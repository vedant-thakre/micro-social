import React, { useContext, useEffect, useState } from "react";
import AppContext, { fetchUserData } from "../context/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AllComments from "./AllComments";
import { MdDelete } from "react-icons/md";
import { pastelColors, letterToNumber } from "../config/data";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const {
    user,
    setUser,
    setIsAuthenticated,
    allPosts,
    setAllPosts,
  } = useContext(AppContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/v1/create", {
        title: post.title,
        description: post.description,
        userId: user.id,
        name: user.name,
      });
      console.log(res.data);
      setPost({ title: "", description: "" });
      console.log("fetchPostData function call");
      fetchPostData();
    } catch (error) {
      console.error("Post create error:", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const fetchPostData = async () => {
    try {
      const res = await axios.get("http://localhost:3004/api/v1/post-com");
      console.log("Post and Comments", res.data.data);
      setAllPosts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3002/api/v1/delete/${id}`
      );
      fetchPostData();
      //console.log(res.data);
    } catch (error) {
      console.error("Post create error:", error);
    }
  };

  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
    fetchUserData(setUser, navigate);
  }, []);

  //console.log(allPosts);

  useEffect(() => {
    fetchPostData();
  }, []);

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
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 20px",
          backgroundColor: "#ff3d3d",
        }}
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
          <button style={{ backgroundColor: "#636bfe" }} type="submit">
            Create
          </button>
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
        {allPosts.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px 25px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {user?.id === item?.userId ? (
              <MdDelete
                onClick={() => handleDelete(item._id)}
                fontSize={"22px"}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "10px",
                  cursor: "pointer",
                  color: "#ff3d3d",
                }}
              />
            ) : null}
            <h4
              style={{
                textAlign: "center",
                margin: "0px",
                padding: "5px 0px",
              }}
            >
              {item.title}
            </h4>
            <p style={{ margin: "0px", padding: "20px 0px 30px 0px" }}>
              {item.description}
            </p>
            <div style={{ height: "1px", background: "gray" }}></div>
            <div
              style={{
                padding: "7px 5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${
                    item?.name.charAt(0)
                      ? pastelColors[letterToNumber(item.name.charAt(0)) - 1]
                      : "orange"
                  }`,
                  borderRadius: "50%",
                }}
              >
                <p style={{ fontSize: "18px", paddingBottom: "1px" }}>
                  {item?.name.charAt(0).toUpperCase()}
                </p>
              </div>
              <span style={{ fontSize: "14px" }}>
                <b>{item.name}</b>
              </span>
            </div>
            <div style={{ height: "1px", background: "gray" }}></div>

            <AllComments
              fetchPostData={fetchPostData}
              comments={item.comments}
              id={item.postId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
