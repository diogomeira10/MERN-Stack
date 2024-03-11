const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); //This is the package to generate a new token. In this we can use the method create and sign a token


//This takes up to 3 aguments. The first represents kind of the payload on the token we want to create. The second is the secret string only known to the server, so it must be in a safe place(.env file). The third argument is going to be some options,
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "3d"}) //This can only take strings as an argument
}

//login user
const loginUser = async (req, res) => {
  res.json({ message: "login user" });
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  

  try {
    const user = await User.signup(email, password);
    
    //this is going to return 3 strings merged together, payload secret and headers all encoded
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
