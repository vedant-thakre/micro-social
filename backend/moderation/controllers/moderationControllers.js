import Moderation from "../model/moderationModel.js";
import axios from "axios";

export const createModeratedWord = async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({ message: "Word can't be empty" });
    }

    const newWord = await Moderation.create({ word });

    res.status(201).json({
      success: true,
      message: "Moderated word added successfully",
      data: newWord,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllModeratedWords = async (req, res) => {
  try {
    const { id } = req.params;
    const ModeratedWords = await Moderation.find();
    res.status(200).json({
      message: "Moderated word retrieved successfully",
      ModeratedWords,
    });
  } catch (error) {
    console.error("Error fetching Moderated word:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { data, type } = req.body;
    const msg = "Recieved Event";
    console.log(msg, req.body);

    if (type === "CommentCreated") {
      const moderatedWords = await Moderation.find();
      const commentWords = data.content.split(/\s+/);

      console.log(commentWords);

      const hasModeratedWord = commentWords.some((commentWord) => {
        return moderatedWords.some((moderatedWord) => {
          return commentWord.toLowerCase() === moderatedWord.word.toLowerCase();
        });
      });

      if (hasModeratedWord) {
        data.status = "rejected";
        console.log(data.status);
      } else {
        data.status = "approved";
      }

      console.log("data", data);

      const event = await axios.post("http://localhost:3050/api/v1/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          content: data.content,
          name: data.name,
          postId: data.postId,
          status: data.status,
        },
      });
    }
    res.status(201).json({ message: "Work done successfully" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
