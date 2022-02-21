const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//provide protection to current logged in user

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //access the headers of the request, check if auth type starts with bearer (token bearer)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token, exclude password
      req.user = await User.findById(decoded.id).select("-password");
      // call next piece of middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  }

  //if there no token, dont auth
  if (!token) {
    res.status(401);
    throw new Error("not authorized");
  }
});

module.exports = {protect}
