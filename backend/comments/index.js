import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import { connectDB } from './db/db.js';
import Comment from './commentModle.js';

dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Comments service is live");
})


// middleware
app.use(express.json());

app.post("/api/v1/add", async(req, res) => {
    const { content, userId } = req.body;

    const newCom = await Comment.create({ content, userId });

    console.log(newCom)

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newCom });
});

app.listen(PORT, ()=> {
    console.log(`Comments service is running on PORT ${PORT}`.yellow.bold);
})