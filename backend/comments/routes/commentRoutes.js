import express from "express";
import {
  createComment,
  getAllComments,
  getEvent,
} from "../controllers/commentControllers.js";

const router = express.Router();

router.post("/add", createComment);
router.post("/events", getEvent);
router.get("/all-comments/:id", getAllComments);

export default router;
