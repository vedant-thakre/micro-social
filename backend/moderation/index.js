import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import { connectDB } from './db/db.js';
import moderationRoutes from './routes/moderationRoutes.js';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Moderatiion Service is Live");
})

// middleware
app.use(express.json());

// routes
app.use("/api/v1", moderationRoutes);

app.listen(PORT, () => {
    console.log(`Moderation service is running on PORT ${PORT}`.yellow.bold);
})