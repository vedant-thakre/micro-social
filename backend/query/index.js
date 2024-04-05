import express, { query } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import queryRoutes from './routes/queryRoutes.js'
import { connectDB } from './db/db.js';
import axios from 'axios';

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
    res.send("Query service is Live");
})

app.listen(PORT, async () => {
    console.log(`Query service is live on PORT ${PORT}`.yellow.bold);

    const res = await axios.get("http://localhost:3050/api/v1/all-events");

    const events = res.data.events;

    for(let event in events){
        const { data, type } = event;

        console.log(data, type);

         if (type == "UserCreated") {
           console.log("Creating QueryUser");
           const NewQueryUser = await QueryUser.create({
             name: data.name,
             userId: data.id,
           });
           console.log(NewQueryUser);
           res.status(201).json({
             message: "QueryUser created successfully",
             data: NewQueryUser,
           });
         } else if (type == "PostCreated") {
           console.log("Creating QueryPost", req.body);
           const NewQueryPost = await QueryPost.create({
             title: data.title,
             description: data.description,
             postId: data.id,
             userId: data.userId,
             name: data.name,
           });
           console.log(NewQueryPost);
           res.status(201).json({
             message: "QueryPost created successfully",
             data: NewQueryPost,
           });
         } else if (type == "CommentCreated") {
           console.log("Creating QueryComment");
           const NewQueryComment = await QueryComment.create({
             content: data.content,
             name: data.name,
             comId: data.id,
             postId: data.postId,
             status: data.status,
           });
           console.log(NewQueryComment);
           res.status(201).json({
             message: "QueryComment created successfully",
             data: NewQueryComment,
           });
         } else if (type == "CommentUpdated") {
           console.log("Recieved Event", type);
           const UpdateComment = await QueryComment.findOneAndUpdate(
             { comId: data.id },
             { status: data.status },
             { new: true }
           );
           res.status(201).json({
             message: "QueryComment status updated successfully",
             data: UpdateComment,
           });
         }
    }   
})