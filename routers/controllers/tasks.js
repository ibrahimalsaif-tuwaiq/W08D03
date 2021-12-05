const tasksModel = require("./../../db/models/tasks");

const getTodos = (req, res) => {
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
};

const getUserTodos = (req, res) => {
  const { id } = req.params;

  tasksModel
    .find({ creator: id, deleted: false })
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
};

const getDeletedTodos = (req, res) => {
  tasksModel
    .find({ creator: req.token.id, deleted: true })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "There is no deleted todos!!" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getTodo = (req, res) => {
  const { id } = req.params;

  tasksModel
    .findOne({ _id: id, creator: req.token.id, deleted: false })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no todo with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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
  const { id } = req.params;
  const { name } = req.body;

  tasksModel
    .findOneAndUpdate(
      { _id: id, creator: req.token.id, deleted: false },
      { name: name },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no todo with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;

  tasksModel
    .findOneAndUpdate(
      { _id: id, creator: req.token.id, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no todo with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUserTodo = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  tasksModel
    .findOneAndUpdate(
      { _id: id, creator: userId, deleted: false },
      { deleted: true },
      { new: true }
    )
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ message: `There is no todo with this ID: ${id}` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getTodos,
  getUserTodos,
  getDeletedTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteUserTodo,
};
