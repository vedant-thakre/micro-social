import express from 'express';
import dotenv from "dotenv";
import colors from 'colors';
import { connectDB } from './db/db.js';
import moderationRoutes from './routes/moderationRoutes.js';
import axios from 'axios';
import Moderation from './model/moderationModel.js';

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

app.listen(PORT, async() => {
    console.log(`Moderation service is running on PORT ${PORT}`.yellow.bold);

    try {
    const res = await axios.get(
      "http://localhost:3050/api/v1/all-moderated-events"
    );
    const events = res.data.events;

    console.log(events);
     
     if (events && events.length) {
         for (const event of events) {
           const { data, type, _id } = event;

           console.log(data, type, _id);

           const moderatedWords = await Moderation.find();
           const commentWords = data.content.split(/\s+/);

           const hasModeratedWord = commentWords.some((commentWord) => {
             return moderatedWords.some((moderatedWord) => {
               return (
                 commentWord.toLowerCase() === moderatedWord.word.toLowerCase()
               );
             });
           });

           if (hasModeratedWord) {
             data.status = "rejected";
           } else {
             data.status = "approved";
           }

           console.log("Comment moderated");
           const EmitModeratedEvent = await axios.post(
             "http://localhost:3050/api/v1/events",
             {
               type: "CommentModerated",
               data: {
                 id: data.id,
                 content: data.content,
                 name: data.name,
                 postId: data.postId,
                 status: data.status,
               },
             }
           );

           await axios.put(`http://localhost:3050/api/v1/events/${_id}`);
         }
     }
     

    console.log("All events processed successfully");
  } catch (error) {
    console.log("Error processing events when service was down");
    // console.log(error);
  }
})