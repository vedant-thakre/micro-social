import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import axios from "axios";

export const getCommentsForPost = async (id, setAllComments) => {
  try {
    const res = await axios.get(
      `http://localhost:3001/api/v1/all-comments/${id}`
    );
    const { data } = res;
    setAllComments((prevComments) => ({
      ...prevComments,
      [id]: data.comments,
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

const AllComments = ({ id }) => {
  const { allComments, setAllComments, user } = useContext(AppContext);
  const [content, setContent] = useState({});

  const handleCommentSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/add", {
        content: content[id],
        userId: user.id,
        postId: id,
      });
      console.log(res.data);
      setContent({ ...content, [id]: "" });
      getCommentsForPost(id, setAllComments);
    } catch (error) {
      console.error("Post create error:", error);
    }
  };

  useEffect(() => {
    getCommentsForPost(id, setAllComments);
  }, []);

  return (
    <>
      <h5 style={{ margin: "10px 0px" }}>
        Comments
        <span style={{ fontWeight: "400", color: "grey", marginLeft: "1px" }}>
          {" "}
          {allComments[id] && allComments[id].length}{" "}
        </span>
      </h5>
      <form
        onSubmit={(e) => handleCommentSubmit(e, id)}
        style={{ display: "flex", gap: "15px" }}
      >
        <input
          style={{ width: "100%" }}
          value={content[id]}
          onChange={(e) => setContent({ ...content, [id]: e.target.value })}
          type="text"
          placeholder="Add comment"
        />
        <button
          style={{
            backgroundColor: "#636bfe",
            padding: "3px 10px",
            borderRadius: "4px",
            fontSize: "13px",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "95px",
          overflowY: "scroll",
          marginTop: "20px",
        }}
      >
        {allComments[id]?.map((comment) => (
          <div key={comment._id}>
            <p
              style={{
                margin: "10px 10px 0px 0px",
                padding: "5px 15px",
                border: "1px solid gray",
                borderRadius: "20px",
              }}
            >
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllComments;
