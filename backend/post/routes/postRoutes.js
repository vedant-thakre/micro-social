import express from 'express';
import { createPost, deletePost, getAllPosts } from '../controllers/postController.js';

const router = express.Router();

router.post("/create", createPost);
router.get("/all-posts", getAllPosts);
router.delete("/delete/:id", deletePost);

export default router;