const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token is missing",
      data: null
    });
  }

  if (!process.env.JWT_SECRET) {
    const error = new Error("JWT_SECRET is missing in the .env file");
    error.statusCode = 500;
    throw error;
  }

  const token = authHeader.slice(7);
  let decoded;

  // JWT errors are returned as 401 responses instead of leaking internals.
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      data: null
    });
  }

  const user = await User.findById(decoded.id).select("_id fullName email");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Authenticated user no longer exists",
      data: null
    });
  }

  req.user = {
    id: user.id,
    fullName: user.fullName,
    email: user.email
  };

  return next();
});

module.exports = auth;
