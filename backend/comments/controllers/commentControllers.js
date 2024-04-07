import Comment from "../model/commentModle.js";
import axios from "axios";

export const createComment = async (req, res) => {
  try {
    const { content, name, postId } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Comment can't be empty" });
    }

    const newCom = await Comment.create({ content, name, postId });

    console.log(newCom);

    const event = await axios.post("http://localhost:3050/api/v1/events", {
      type: "CommentCreated",
      data: {
        id: newCom._id,
        content,
        name,
        postId,
        status: "pending",
      },
    });

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newCom });
  } catch (error) {
    console.error("Error creating adding comment:");
    // res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id });
    res
      .status(200)
      .json({ message: "Comments retrieved successfully", comments });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { data, type } = req.body;
    const msg = "Recieved Event";
    console.log(msg, type, data);

    if (type === "CommentModerated") {
      const comment = await Comment.findByIdAndUpdate(data.id, {
        status: data.status,
      });

      const event = await axios.post("http://localhost:3050/api/v1/events", {
        type: "CommentUpdated",
        data: {
          id: data.id,
          content: data.content,
          name: data.name,
          postId: data.postId,
          status: data.status,
        },
      });

      return res.status(200).json({ message: "Comment status updated" });
    }
    res.status(201).json({ message: "Work done successfully" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
