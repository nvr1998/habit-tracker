// habit.model.js
import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["hit", "miss", "neutral"],
    required: true,
  },
});

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: [dateSchema],
});

export const Habit = mongoose.model("Habit", habitSchema);
