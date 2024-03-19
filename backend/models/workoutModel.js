//Models and Schemas are created so we make sure that every document that we have and we save in a database colleciton follows the same predictable structure.

//It is mongoose that allows us to create this models and schemas for our data and database
const mongoose = require("mongoose");

//function to create a new Schema
const Schema = mongoose.Schema;

//If we for example, try to save a new workout document where on of these fields are missing, it is not going to allow us to do that, it enforces the following schema.
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }//when we tr to create a document,it automatically adds a created app property for us to say when the document was created.
);


//This basically creates a workoutSchema collection. It is used to interact with the workout collection in the MongoDB database
module.exports = mongoose.model("Workout", workoutSchema)
//we want to export the module


//Example
//If we wanted all the workoutswe could something like 
//Workout.find.()