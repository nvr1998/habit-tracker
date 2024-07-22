// habit.repository.js
import { Habit } from "./habit.schema.js";

export class HabitRepository {
  // Function to add a new habit
  addHabit = async (name) => {
    console.log("Reached here1");
    const habit = new Habit({ name, dates: [] });
    console.log("Reached here2");
    console.log(habit);
    await habit.save();
    return habit;
  };
  deleteHabit = async (id) => {
    try {
      console.log("deleting " + id);
      const result = await Habit.findByIdAndDelete(id);
      // Check if a document was deleted
      console.log(result);
      return result !== null;
    } catch (error) {
      console.error("Error deleting habit:", error);
      return false;
    }
  };

  // Function to get the status of a specific date for a habit
  getHabitStatus = async (habitId, year, month, day) => {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      throw new Error("Habit not found");
    }

    let dateEntry = habit.dates.find(
      (entry) =>
        entry.year === Number(year) &&
        entry.month === Number(month) &&
        entry.day === Number(day)
    );

    if (!dateEntry) {
      // Create a new date entry with status 'neutral' if it doesn't exist
      dateEntry = { year, month, day, status: "neutral" };
      habit.dates.push(dateEntry);
      await habit.save();
    }

    return dateEntry.status;
  };

  // Function to update a date entry for a habit
  setHabitStatus = async (habitId, year, month, day, status) => {
    if (!["hit", "miss", "neutral"].includes(status)) {
      throw new Error("Invalid status");
    }

    const habit = await Habit.findById(habitId);
    if (!habit) {
      throw new Error("Habit not found");
    }

    // Find the index of the date to update
    const dateEntryIndex = habit.dates.findIndex(
      (entry) =>
        entry.year === Number(year) &&
        entry.month === Number(month) &&
        entry.day === Number(day)
    );

    if (dateEntryIndex === -1) {
      // If the date entry does not exist, create a new one with 'neutral' status
      habit.dates.push({ year, month, day, status: "neutral" });
    } else {
      // Update the status of the existing date entry
      habit.dates[dateEntryIndex].status = status;
    }

    await habit.save();
    return habit;
  };

  // Function to get all habits
  getAllHabits = async () => {
    return await Habit.find();
  };

  // Function to get a habit by ID
  getHabitById = async (habitId) => {
    return await Habit.findById(habitId);
  };
}
