const usersModel = require("./../../db/models/users");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Config .env file
dotenv.config();

// Get SALT variable from .env
const SALT = Number(process.env.SALT);

// Get SECRET_KEY variable from .env
const SECRET = process.env.SECRET_KEY;

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
  const { email, password } = req.body;

  const lowerCaseEmail = email.toLowerCase();

  usersModel
    .findOne({ email: lowerCaseEmail })
    .populate("role")
    .then(async (result) => {
      if (result) {
        if (result.email == lowerCaseEmail) {
          const matchedPassword = await bcrypt.compare(
            password,
            result.password
          );
          
          if (matchedPassword) {
            const payload = {
              email: result.email,
              role: result.role.role,
            };

            const options = {
              expiresIn: "60m",
            };

            const token = jwt.sign(payload, SECRET, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("Invalid Email or Password!!");
          }
        } else {
          res.status(400).json("Invalid Email or Password!!");
        }
      } else {
        res.status(404).json("Email does not exist!!");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  // code
};

const deleteUser = (req, res) => {
  // code
};

module.exports = { signup, login, getUsers, deleteUser };
