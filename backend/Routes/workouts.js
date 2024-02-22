const express = require("express");
const { 
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout

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
router.delete("/:id", deleteWorkout);

//update workout
router.patch("/:id", updateWorkout);

module.exports = router;
