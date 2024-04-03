import express, { query } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import queryRoutes from './routes/queryRoutes.js'
import { connectDB } from './db/db.js';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", queryRoutes);

app.get("/", (req, res) => {
    res.send("Query serice is Live");
})

app.listen(PORT, () => {
    console.log(`Query service is live on PORT ${PORT}`.yellow.bold);
})