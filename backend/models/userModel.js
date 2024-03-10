const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true // if I user signsup with an email address, we save that to the database, if someone tries to sign up with that same email address monngoose will not allow us to save it 
        },
        password: {
            type: String,
            required: true,
        }

    }
)


module.exports = mongoose.model('User', userSchema)
