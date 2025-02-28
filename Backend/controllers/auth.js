const asyncErrorWrapper = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const CustomError = require("../utils/CustomError");

const sendToken = (user, statusCode, res) => {
  const token = user.generateJwtToken();

  return res.status(statusCode).json({
    success: true,
    token,
  });
};

const getPrivateData = asyncErrorWrapper((req, res) => {
  res.status(200).json({
    success: true,
    message: "You have access to private data",
    user: req.user,
  });
});

const register = asyncErrorWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = await User.create({ username, email, password });

  sendToken(newUser, 201, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  sendToken(user, 200, res);
});

module.exports = {
  register,
  login,
  getPrivateData,
};
