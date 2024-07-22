// db.js
import mongoose from "mongoose";

const mongoURI = "mongodb+srv://gnickyraj:1234@habit.s4ktenh.mongodb.net/habit"; // Include your database name here

export const ConnectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};
