import express from "express";
import path from "path";
import HabitController from "./src/Feature/Habit/habit.controller.js";

const habitController = new HabitController();

export const app = new express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "public", "views"));

app.use(express.static("public/views"));
app.get("/", (req, res) => {
  res.redirect("/habits");
});
app.get("/habits", habitController.GetHabits);
app.get("/habit", habitController.GetHabitDetails);
app.post("/habit", habitController.AddHabit);
app.get("/allhabits", habitController.GetAllHabits);
app.get("/habit/:id/status", habitController.GetHabitStaus);
app.post("/habit/:id/status", habitController.SetHabitStatus);
app.post("/deletehabit", habitController.DeleteHabit);
