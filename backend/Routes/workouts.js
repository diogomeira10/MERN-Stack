const express = require("express");
const Workout = require("../models/workoutModel");

const router = express.Router(); //Creating an instance of the express Router

//REQUEST HANDLERS

//Get all workouts
router.get("/", (req, res) => {
  //attaching the handler to this
  res.json({ message: "get all workouts" });
});

//get single workout
router.get("/:id", (req, res) => {
  //the id represents a parameter that can change
  res.json({ message: "get single workout" });
});

//post a new workout
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({
      title,
      load,
      reps
    }); //creating a new workout model
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

//delete workout
router.delete("/:id", (req, res) => {
  res.json({ message: "deleted workout" });
});

//update workout
router.patch("/:id", (req, res) => {
  res.json({ message: "updated workout" });
});

module.exports = router;
