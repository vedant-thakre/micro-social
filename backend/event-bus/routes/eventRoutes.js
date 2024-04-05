import express from "express";

import { emmitEvent, getAllEvents } from "../controllers/eventControllers.js";

const router = express.Router();

router.post("/events", emmitEvent);
router.get("/all-events", getAllEvents);

export default router;
