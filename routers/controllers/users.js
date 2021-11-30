const usersModel = require("./../../db/models/users");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Config .env file
dotenv.config();

// Get SALT variable from .env
const SALT = Number(process.env.SALT);

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new usersModel({
    email: lowerCaseEmail,
    password: hashedPassword,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  // code
};

const getUsers = (req, res) => {
  // code
};

const deleteUser = (req, res) => {
  // code
};

module.exports = { signup, login, getUsers, deleteUser };
