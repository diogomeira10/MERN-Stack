const Workout = require("../models/workoutModel"); //we need to import the workout model, because we use this to interact with the database

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json({workouts})

}

//get a single workout 
const getSingleWorkout = async (req, res) => {
    const { id } = req.params //all the route parameters coming from the frontend are stored in req.params property
    const workout = await Workout.findById(id)

    if(!workout) {
       return res.status(404).json({error: "Workout does not exist"})
    }
}


//create new workout
const createWorkout = async (req, res) => {

    const { title, reps, load } = req.body

    //add doc to db
    try {
        const workout = await Workout.create({ title, reps, load })
        res.json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//delete workout

const deleteWorkout = async (req,res) => {
    
}

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout
};