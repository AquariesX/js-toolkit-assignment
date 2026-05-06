const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const {
  registerRules,
  loginRules,
} = require("../middleware/validators");

const {
  validateRequest,
} = require("../middleware/validate");

router.post("/register", registerRules, validateRequest, registerUser);
router.post("/login", loginRules, validateRequest, loginUser);

module.exports = router;