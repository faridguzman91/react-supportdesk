// @desc Register a new user
// @route /api/users
// @access {auth, token to acces route, public}
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
      //  return res.status(400).json({message: 'please include all fields'})

      res.status(400);

      //create new error handler

      throw new Error("please include all fields");
    }
    res.send("register route");
  };

});

// @desc Login a new user
// @route /api/users/login
// @access {auth, token to acces route, public}

const loginUser = asyncHandler( async (req, res) => {
  res.send("login route");
});

module.exports = {
  registerUser,
  loginUser,
};
