const express = require("express");

const { getRoles, createRole } = require("../controllers/roles");
const authentication = require("../middlewares/authentication");

const rolesRouter = express.Router();

rolesRouter.get("/roles", getRoles);
rolesRouter.post("/createRole", authentication, createRole);

module.exports = rolesRouter;
