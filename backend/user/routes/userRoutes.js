import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, verifyToken } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.get("/profile", verifyToken, getUserById);

export default router;