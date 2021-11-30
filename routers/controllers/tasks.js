const tasksModel = require("./../../db/models/tasks");

const getTodos = (req, res) => {
  if (!req.token.deleted) {
    tasksModel
      .find({ creator: req.token.id, deleted: false })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "There is no todos yet!!" });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

const getDeletedTodos = (req, res) => {
  // code
};

const getTodo = (req, res) => {
  // code
};

const addTodo = (req, res) => {
  const { name } = req.body;

  const newTodo = new tasksModel({
    name,
    creator: req.token.id,
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
