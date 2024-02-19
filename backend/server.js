//requiring the express package
const express = require("express");

//starting the express app
const app = express();



//We also want to react to requests
//this is going to respond to a get request

//request object has the information about the request
//response object we use to send the response back to the browser, or the client
app.get("/", (req, res) => {
    res.json({message: "Welcome to the app"})
});

//Listen for request in a port number
app.listen(4000, () => {
  console.log("listening on port 4000");
});
