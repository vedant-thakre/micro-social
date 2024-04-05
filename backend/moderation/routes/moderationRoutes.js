import express from "express";
import { createModeratedWord, getAllModeratedWords, getEvent } from "../controllers/moderationControllers.js";

const router = express.Router();

router.post("/add-word", createModeratedWord);
router.post("/events", getEvent);
router.get("/all-words", getAllModeratedWords);

export default router;
