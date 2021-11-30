const tasksModel = require("./../../db/models/tasks");

const getTodos = (req, res) => {
  // code
};

const getDeletedTodos = (req, res) => {
  // code
};

const getTodo = (req, res) => {
  // code
};

const addTodo = (req, res) => {
  const { name, creator } = req.body;

  const newTodo = new tasksModel({
    name,
    creator,
  });

  newTodo
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateTodo = (req, res) => {
  // code
};

const deleteTodo = (req, res) => {
  // code
};

module.exports = {
  getTodos,
  getDeletedTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
