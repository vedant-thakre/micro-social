import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, verifyToken, getEvent } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/events", getEvent);
router.get("/all", getAllUsers);
router.get("/profile", verifyToken, getUserById);

export default router;