import express from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/commentControllers.js";

const router = express.Router();

router.post("/add", createComment);
router.get("/all-comments/:id", getAllComments);

export default router;
