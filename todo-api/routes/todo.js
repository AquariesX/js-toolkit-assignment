const express = require("express");
const auth = require("../middleware/auth");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");
const {
  createTodoRules,
  todoIdRules,
  updateTodoRules
} = require("../middleware/validators");
const {
  validateAllowedFields,
  validateRequest
} = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  auth,
  validateAllowedFields(["title", "completed"]),
  createTodoRules,
  validateRequest,
  createTodo
);

router.get("/", auth, getTodos);

router.put(
  "/:id",
  auth,
  validateAllowedFields(["title", "completed"]),
  todoIdRules,
  updateTodoRules,
  validateRequest,
  updateTodo
);

router.delete("/:id", auth, todoIdRules, validateRequest, deleteTodo);

module.exports = router;
