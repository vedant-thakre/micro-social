import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import postRoutes from './routes/postRoutes.js'
import { connectDB } from './db/db.js';
import cors from 'cors';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Post service is live");
})


// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1",postRoutes)

app.listen(PORT, ()=> {
    console.log(`Post service is running on PORT ${PORT}`.yellow.bold)
})