const express = require("express");

const {
  getTodos,
  getDeletedTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/tasks");

const authentication = require("../middlewares/authentication");

const tasksRouter = express.Router();

tasksRouter.get("/todos", authentication, getTodos);
tasksRouter.get("/deletedTodos", authentication, getDeletedTodos);
tasksRouter.get("/todos/:id", authentication, getTodo);
tasksRouter.post("/addTodo", authentication, addTodo);
tasksRouter.put("/todos/:id", authentication, updateTodo);
tasksRouter.delete("/todos/:id", authentication, deleteTodo);

module.exports = tasksRouter;
