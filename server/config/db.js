import mongoose from "mongoose";
import dotenv from "dotenv/config"
const databaseUrl = process.env.dbUrl;
const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl, {});
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;
