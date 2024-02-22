const express = require("express");
const { 
  createWorkout,
  getWorkouts,
  getSingleWorkout,

} = require('../controllers/workoutController')


const router = express.Router(); //Creating an instance of the express Router

//REQUEST HANDLERS

//Get all workouts
router.get("/", getWorkouts);

//get single workout
router.get("/:id", getSingleWorkout);

//post a new workout
router.post("/", createWorkout);

//delete workout
router.delete("/:id", (req, res) => {
  res.json({ message: "deleted workout" });
});

//update workout
router.patch("/:id", (req, res) => {
  res.json({ message: "updated workout" });
});

module.exports = router;
