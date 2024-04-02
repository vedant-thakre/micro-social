import Post from "../model/postModel.js";
import axios from 'axios';

export const createPost = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide title, description, and userId" });
    }

    const newPost = await Post.create({ title, description, userId });

    
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Posts deleted successfully" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
