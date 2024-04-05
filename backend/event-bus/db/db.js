import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully!".bgRed.bold);
  } catch (error) {
    console.error("Error connecting to MongoDB:".bgRed.bold, error.message);
    process.exit(1);
  }
};
