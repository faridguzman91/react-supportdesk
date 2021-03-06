const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc Register a new user
// @route /api/users
// @access {auth, token to acces route, public}

const registerUser = asyncHandler(async (req, res) => {
  // const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    //  return res.status(400).json({message: 'please include all fields'})

    res.status(400);

    //create new error handler

    throw new Error("please include all fields");
  }

  // find if user already exists
  const userExisits = await User.findOne({ email });

  if (userExisits) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
  }
  throw new error("Invalid user data");

  // res.send("register route");
});

// @desc Login a new user
// @route /api/users/login
// @access {auth, token to acces route, public}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //await stored user email

  const user = await User.findOne({ email });

  // check user and password match, compare password, and stored password

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials/info");
  }
  // res.send("login route");
});

// @desc get current user
// @route /api/users/me
// @access private_access

const getMe = asyncHandler(async (req, res) => {
  // res.send("me");

  //show only user id, user email and user name

const user = {
  id: req.user._id,
  email: req.user.email,
  name: req.user.name
}


  res.status(200).json(user)
});

// generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
