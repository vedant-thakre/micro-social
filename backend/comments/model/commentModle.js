import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
