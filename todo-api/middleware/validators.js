const { body, param } = require("express-validator");
const mongoose = require("mongoose");

const registerRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 80 })
    .withMessage("Full name must be between 2 and 80 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .isString()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters")
];

const loginRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

const createTodoRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 120 })
    .withMessage("Title cannot be more than 120 characters"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false")
    .toBoolean()
];

const updateTodoRules = [
  body()
    .custom((value) => value && Object.keys(value).length > 0)
    .withMessage("Provide at least one field to update"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 120 })
    .withMessage("Title cannot be more than 120 characters"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false")
    .toBoolean()
];

const todoIdRules = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid To-Do id")
];

module.exports = {
  registerRules,
  loginRules,
  createTodoRules,
  updateTodoRules,
  todoIdRules
};
