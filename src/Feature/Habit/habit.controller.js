import { HabitRepository } from "./habit.repository.js";

export default class HabitController {
  GetHabits(req, res) {
    res.render("Habits");
  }

  GetHabitDetails(req, res) {
    const habitId = req.query.habitid;
    const nameOfHabit = req.query.name;
    res.render("HabitDetails", { habitId: habitId, nameOfHabit: nameOfHabit });
  }

  async AddHabit(req, res) {
    const { name } = req.query;
    console.log("Adding habit with name " + name);
    try {
      const habit = await new HabitRepository().addHabit(name);
      res
        .status(201)
        .json({ message: "Habit Added Successfully!", habit: habit });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  async DeleteHabit(req, res) {
    const { id } = req.query;
    console.log(id);
    try {
      const result = await new HabitRepository().deleteHabit(id);
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Successfull" });
      } else {
        res.status(500).json({ message: "Server Error" });
      }
    } catch {
      res.status(500).json({ message: "Server Error" });
    }
  }
  async GetAllHabits(req, res) {
    try {
      const habits = await new HabitRepository().getAllHabits();
      res
        .status(200)
        .json({ message: "Retrived all successfully", habits: habits });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async GetHabitStaus(req, res) {
    const { id } = req.params;
    const { month, year, day } = req.query;
    try {
      const status = await new HabitRepository().getHabitStatus(
        id,
        year,
        month,
        day
      );
      res.status(200).json({ message: "Retriving Successful", status: status });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async SetHabitStatus(req, res) {
    const { id } = req.params;
    const { to, year, month, day } = req.query;
    console.log(id);
    console.log(to);
    console.log(year);
    console.log(month);
    console.log(day);

    try {
      await new HabitRepository().setHabitStatus(id, year, month, day, to);
      res.status(200).json({ message: "Successfully Updated!" });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
