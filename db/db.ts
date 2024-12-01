import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI;

    if (!dbUri) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
