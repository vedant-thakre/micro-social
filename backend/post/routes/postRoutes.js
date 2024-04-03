import express from 'express';
import { createPost, deletePost, getAllPosts, getEvent } from '../controllers/postController.js';

const router = express.Router();

router.post("/create", createPost);
router.get("/all-posts", getAllPosts);
router.post("/events", getEvent);
router.delete("/delete/:id", deletePost);

export default router;