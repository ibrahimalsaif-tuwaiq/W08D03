const express = require("express");

const {
  getTodos,
  getUserTodos,
  getDeletedTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteUserTodo,
} = require("../controllers/tasks");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const tasksRouter = express.Router();

tasksRouter.get("/todos", authentication, getTodos);
tasksRouter.get("/userTodos/:id", authentication, authorization, getUserTodos);
tasksRouter.get("/deletedTodos", authentication, getDeletedTodos);
tasksRouter.get("/todos/:id", authentication, getTodo);
tasksRouter.post("/todos", authentication, addTodo);
tasksRouter.put("/todos/:id", authentication, updateTodo);
tasksRouter.delete("/todos/:id", authentication, deleteTodo);
tasksRouter.put("/deleteUserTodo/:id", authentication, authorization, deleteUserTodo);

module.exports = tasksRouter;
