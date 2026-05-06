const Todo = require("../models/Todo");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const createTodo = asyncHandler(async (req, res) => {
  const { title, completed } = req.body;

  const todo = await Todo.create({
    title,
    completed,
    user: req.user.id
  });

  return sendSuccess(res, 201, "To-Do created successfully", { todo });
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });

  return sendSuccess(res, 200, "To-Dos fetched successfully", {
    count: todos.length,
    todos
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const updateData = {};

  ["title", "completed"].forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    updateData,
    { new: true, runValidators: true }
  );

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "To-Do not found",
      data: null
    });
  }

  return sendSuccess(res, 200, "To-Do updated successfully", { todo });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "To-Do not found",
      data: null
    });
  }

  return sendSuccess(res, 200, "To-Do deleted successfully", { todo });
});

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};
