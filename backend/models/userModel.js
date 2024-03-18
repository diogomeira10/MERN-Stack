const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require("validator");

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


 //static signup method
 //We can later call this signup function whenver we want to signup a new User
 //When we create a static method like this instead of using the model name , we can just reference it by using the 'this' keyword.
 userSchema.statics.signup = async function (email, password) {

    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({email}) //to be able to use the this keyword, it has to be inside a regular function, not an arrow function

    if(exists) {
        throw Error('Email already in use')
    }

    // mypasswordj87123sf125fg

    const salt = await bcrypt.genSalt(10) //this generates the sault, which is an extra layer of protection matching of passwords

    //Now we hash the salt with the password
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user

}

userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect login credencials')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)
