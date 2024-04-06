import express from 'express';
import { getPostsAndComments, getcomments, getposts, getusers, handleEvent } from '../controller/queryContoller.js';

const router = express.Router();

router.post("/events", handleEvent);
router.get("/comm", getcomments);
router.get("/post", getposts);
router.get("/post-com", getPostsAndComments);
router.get("/user", getusers);


export default router;