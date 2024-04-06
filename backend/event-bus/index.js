import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import colors from "colors";
import { connectDB } from "./db/db.js";
import eventRoutes from './routes/eventRoutes.js'

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Event bus is Live");
});

// middleware
app.use(express.json());

// routes
app.use("/api/v1", eventRoutes);


app.listen(PORT, () => {
  console.log(`Event bus is running on PORT ${PORT}`.yellow.bold);
});
