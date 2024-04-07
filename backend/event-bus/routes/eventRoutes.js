import express from "express";

import { emmitEvent, getAllEvents, updateEventById } from "../controllers/eventControllers.js";

const router = express.Router();

router.post("/events", emmitEvent);
router.put("/events/:id", updateEventById);
router.get("/all-events", getAllEvents);

export default router;
