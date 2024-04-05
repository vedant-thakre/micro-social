import Event from "../model/eventModel.js";
import axios from "axios";

export const emmitEvent = async (req, res) => {
  try {
     const event = req.body;
     const { type,  data} = event;

     const newEvent = await Event.create({
      type,
      data
     });

     if (event.type === "CommentModerated") {
       await axios.post("http://localhost:3001/api/v1/events", event);
     } else if (event.type === "CommentUpdated") {
       await axios.post("http://localhost:3004/api/v1/events", event);
     } else {
       await axios.post("http://localhost:3001/api/v1/events", event);
       await axios.post("http://localhost:3002/api/v1/events", event);
       await axios.post("http://localhost:3003/api/v1/events", event);
       await axios.post("http://localhost:3004/api/v1/events", event);
       await axios.post("http://localhost:3005/api/v1/events", event);
     }

     console.log("done");

    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: "Events retrieved successfully", events });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

