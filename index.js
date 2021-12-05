const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
require("./db");

// Config .env file
dotenv.config();

// Iinitiating the app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Roles Router
const rolesRouter = require("./routers/routes/roles");
app.use(rolesRouter);

// Users Router
const usersRouter = require("./routers/routes/users");
app.use(usersRouter);

// Tasks Router
const tasksRouter = require("./routers/routes/tasks");
app.use(tasksRouter);

// Get PORT variable from .env
const PORT = process.env.PORT;

// Start the app
app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
