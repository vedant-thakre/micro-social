import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Moderatiion Service is Live");
})

// middleware
app.use(express.json());

// routes

app.listen(PORT, () => {
    console.log(`Moderation service is running on PORT ${PORT}`.yellow.bold);
})