require('dotenv').config()

//requiring the express package
const express = require("express");
const workoutRoutes = require("./Routes/workouts")
const mongoose = require('mongoose')

//starting the express app
const app = express();




app.use(express.json()) //what this does is, any request that comes in it looks if it has some body to the request(some data that has been sent to the server), if it does the it passes it and attaches it to the request object so that we can access it in the request handler.
//Middleware é codigo que é executado entre nós recebermos um pedido do servidor e nós mandarmos uma resposta
//This is kinda of a global middleware.This function is going to "fire" for every request that comes in.
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

/* app.get('/', (req, res) => {
  res.json({mssg: 'hello'})
})
 */
/* We also want to react to requests
this is going to respond to a get request
app.get("/", (req, res) => {request object has the information about the request. Response object we use to send the response back to the browser, or the client
    res.json({message: "Welcome to the app"})
}); */

//routes
//This grabs all the different routes I attached to the Router and basically uses them on the app
app.use('/api/workouts', workoutRoutes) //first argument is the defined path to fire specific routes, the second argument is using the workouts routes in the app
//This means when received a request to the path /api/workouts it is going to use the workoutRoutes

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => { // I dont want to start accepting any kind of requests or listening to requests before its connected to the database
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
    
  })
  .catch((error) => {console.log(error)})
//this is assynchronous in nature so it returns a promise 

//In Express, the process object refers to the global Node.js process object. It provides information and control over the current Node.js process. It contains several useful properties and methods for managing the current Node.js process.

/* //Listen for request in a port number
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
}); //moving this into the mongoose connect  */


