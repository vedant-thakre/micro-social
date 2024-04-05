import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/appContext";
import axios from "axios";
import { pastelColors, letterToNumber } from "../config/data";

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
        name: user.name,
        postId: id,
      });
      console.log(res.data);
      setContent({ ...content, [id]: "" });
      getCommentsForPost(id, setAllComments);
    } catch (error) {
      console.error("Post create error:", error);
    }
  };

  console.log(allComments)

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
          height: `${
            allComments[id] && allComments[id].length ? "95px" : "0px"
          }`,
          overflowY: "scroll",
          marginTop: "20px",
        }}
      >
        {allComments[id]?.map((comment) => (
          <div
            key={comment._id}
            style={{
              padding: "7px 5px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* <p
              style={{
                margin: "10px 10px 0px 0px",
                padding: "5px 15px",
                border: "1px solid gray",
                borderRadius: "20px",
              }}
            >
              {comment.content}
            </p> */}

            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${
                  comment?.name.charAt(0)
                    ? pastelColors[
                        26 - (letterToNumber(comment.name.charAt(0)) - 1) - 1
                      ]
                    : "orange"
                }`,
                borderRadius: "50%",
              }}
            >
              <p style={{ fontSize: "18px", paddingBottom: "1px" }}>
                {comment?.name.charAt(0).toUpperCase()}
              </p>
            </div>
            <div>
              <p style={{ fontSize: "12px", margin: "0px", color: "#b1b1b1" }}>
                <b>@{comment.name.replace(/\s/g, "").toLowerCase()}</b>
              </p>
              <p
                style={{
                  fontSize: "14px",
                  margin: "0px",
                  color: `${
                    comment.status === "rejected"
                      ? "red"
                      : comment.status === "pending"
                      ? "grey"
                      : "white"
                  }`,
                }}
              >
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllComments;
