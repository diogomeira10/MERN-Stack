//This middleware function is going to fire for every single workout route, before the controller functions, and it is going to check taht the user making the request is authenticated. To do that, it needs to check if the requerst came loaded with the json web token fot that user, if it did it also needs to check if the token is valid, if both those criteria are passed we can allow access to the user to the workouts resource.
//Midddleare can perform tasks such as logging, authentication, data parsing, error handling, etc., and they can also modify the request or response objects.


const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => { // we invoque the next function, to move on to  the next piece of middleware


    //we are going to receive this authorization value from the frontend
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // 'Bearer tokenqr2123mdsacm123123' The authorization looks like this 

    const token = authorization.split(' ')[1]

    try {
       const {_id} = jwt.verify(token, process.env.SECRET)  //this verifys and returns the token 

       req.user = await User.findOne({_id}).select('_id')
       //by doing this req.user we are attatching the user property to the request object, so when we go to the next piece of middleware, that middleware is going to have access to the user property 
       // We also want to attatch the id property to the user, by using the select method the user only has the _id property on it

       next() //fire the next handler function


    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }



}


module.exports = requireAuth