const Workout = require("../models/workoutModel"); //we need to import the workout model, because we use this to interact with the database
const mongoose = require("mongoose")

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

//get a single workout 
const getSingleWorkout = async (req, res) => {
    //all the route parameters coming from the frontend are stored in req.params property
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { //We need to check if the id passed in is a valid mongoose id, or else the server might crash.
        return res.status(404).json({ error: "No such workout" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "Workout does not exist" }) // If we dont return here, it is going to carry on and fire the rest of the code.
    }

    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req, res) => {

    const { title, reps, load } = req.body


    //handler errors
    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    } 
    if(!load) {
        emptyFields.push('load')
    } 
    if(!reps) {
        emptyFields.push('reps')
    } 

    if(emptyFields.length > 0 ) {
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields})
    }

    //add doc to db
    try {
        const workout = await Workout.create({ title, reps, load })
        res.json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//delete workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { //We need to check if the id passed in is a valid mongoose id, or else the server might crash.
        return res.status(404).json({ error: "No such workout" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    res.status(200).json(workout)

}


//update workout
const updateWorkout = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { //We need to check if the id passed in is a valid mongoose id, or else the server might crash.
        return res.status(404).json({ error: "No such workout" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id },
        {
            ...req.body //spreading the propeties of the body object to update the workout
        }
    )

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" })
    }

    res.status(200).json(workout)
}



module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};