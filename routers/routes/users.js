const express = require("express");

const { signup, login, getUsers, deleteUser } = require("../controllers/users");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/signup", signup);
usersRouter.post("/login", login);
usersRouter.get("/users", authentication, authorization, getUsers);
usersRouter.delete("/users/:id", authentication, authorization, deleteUser);

module.exports = usersRouter;
