import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import { connectDB } from './db/db.js';
import commentRoutes from './routes/commentRoutes.js'
import cors from 'cors';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Comments service is live");
})

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", commentRoutes);

app.listen(PORT, ()=> {
    console.log(`Comments service is running on PORT ${PORT}`.yellow.bold);
})