import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    processed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
