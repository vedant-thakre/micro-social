import mongoose from "mongoose";

const moderationSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Moderation = mongoose.model("Moderation", moderationSchema);

export default Moderation;
