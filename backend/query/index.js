import express, { query } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import queryRoutes from './routes/queryRoutes.js'
import { connectDB } from './db/db.js';
import axios from 'axios';
import QueryUser from './models/queryUserModel.js';
import QueryPost from './models/queryPostModel.js';
import QueryComment from './models/queryCommentModel.js';

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

  try {
    const res = await axios.get("http://localhost:3050/api/v1/all-events");
    console.log(res);
    const events = res.data.events;

    for (const event of events) {
      const { data, type } = event;

      if (type === "UserCreated") {
        console.log("Creating QueryUser");
        await QueryUser.create({
          name: data.name,
          userId: data.id,
        });
      } else if (type === "PostCreated") {
        console.log("Creating QueryPost", data);
        await QueryPost.create({
          title: data.title,
          description: data.description,
          postId: data.id,
          userId: data.userId,
          name: data.name,
        });
      } else if (type === "CommentCreated") {
        console.log("Creating QueryComment");
        await QueryComment.create({
          content: data.content,
          name: data.name,
          comId: data.id,
          postId: data.postId,
          status: data.status,
        });
      } else if (type === "CommentUpdated") {
        console.log("Received Event: CommentUpdated");
        await QueryComment.findOneAndUpdate(
          { comId: data.id },
          { status: data.status },
          { new: true }
        );
      }
    }

    console.log("All events processed successfully");
  } catch (error) {
    console.log("Error processing events when service was down");
    console.log(error);
  }
});
