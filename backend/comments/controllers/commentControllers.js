import Comment from "../model/commentModle.js";
import axios from 'axios';

export const createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    console.log(req.body);
    if (!content) {
      return res.status(400).json({ message: "Comment can't be empty" });
    }

    const newCom = await Comment.create({ content, userId, postId });

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newCom });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
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

