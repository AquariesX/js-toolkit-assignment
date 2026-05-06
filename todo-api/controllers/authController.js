const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const { sendSuccess } = require("../utils/apiResponse");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.exists({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered",
      data: null,
    });
  }

  const user = await User.create({ fullName, email, password });
  const token = generateToken(user.id);

  return sendSuccess(res, 201, "User registered successfully", {
    token,
    user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  }

  const token = generateToken(user.id);

  return sendSuccess(res, 200, "Login successful", {
    token,
    user: user.toJSON(),
  });
});

module.exports = {
  registerUser,
  loginUser,
};