const CustomError = require("../../utils/CustomError");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const asyncErrorWrapper = require("express-async-handler");

const getAccessToRoute = asyncErrorWrapper(async (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  // Check if token is included in the request headers
  const isTokenIncluded = (req) => {
    return (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    );
  };

  if (!isTokenIncluded(req)) {
    return next(
      new CustomError(
        "You are not authorized to access this route, No token found",
        401
      )
    );
  }

  // Extract access token from the authorization header
  const getAccessTokenFromHeader = (req) => {
    return req.headers.authorization.split(" ")[1];
  };

  const accessToken = getAccessTokenFromHeader(req);

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new CustomError(
          "You are not authorized to access this route, No user found",
          401
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new CustomError("Invalid or expired token", 401));
  }
});

// Function to generate and send JWT token
const sendToken = (user, statusCode, res) => {
  const token = user.generateJwtFromUser();
  return res.status(statusCode).json({
    success: true,
    token,
  });
};

module.exports = { getAccessToRoute, sendToken };
