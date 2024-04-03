import mongoose from "mongoose";

const queryUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QueryUser = mongoose.model("QueryUser", queryUserSchema);

export default QueryUser;
