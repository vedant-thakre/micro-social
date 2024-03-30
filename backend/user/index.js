import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import { connectDB } from './db/db.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("User service is live");
})

// middleware
app.use(express.json());

// routes
app.use("/api/v1", userRoutes);

app.listen(PORT, ()=> {
    console.log(`User service is running on PORT ${PORT}`.bold.yellow)
})