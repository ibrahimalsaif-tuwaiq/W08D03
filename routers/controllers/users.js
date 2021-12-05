const usersModel = require("./../../db/models/users");
const tasksModel = require("./../../db/models/tasks");
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
        if (result.deleted === false) {
          if (result.email == lowerCaseEmail) {
            const matchedPassword = await bcrypt.compare(
              password,
              result.password
            );

            if (matchedPassword) {
              const payload = {
                id: result._id,
                email: result.email,
                role: result.role.role,
                deleted: result.deleted,
              };

              const options = {
                expiresIn: "60m",
              };

              const token = jwt.sign(payload, SECRET, options);

              res.status(200).json({ result, token });
            } else {
              res.status(400).json({ message: "Invalid Email or Password!!" });
            }
          } else {
            res.status(400).json({ message: "Invalid Email or Password!!" });
          }
        } else {
          res.status(404).json({ message: "This user is deleted!!" });
        }
      } else {
        res.status(404).json({ message: "Email does not exist!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  usersModel
    .find({ deleted: false })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There is no users yet!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  usersModel
    .findByIdAndUpdate(id, { deleted: true })
    .then((result) => {
      if (result) {
        tasksModel
          .updateMany({ creator: id, deleted: false }, { deleted: true })
          .then(() => {
            console.log(`All the todos for user:${id} has been deleted`);
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(200).json({ message: "User has been deleted successfully" });
      } else {
        res
          .status(404)
          .json({ message: `There is no user with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { signup, login, getUsers, deleteUser };
