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
  if (!req.token.deleted) {
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
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

const getTodo = (req, res) => {
  if (!req.token.deleted) {
    const { id } = req.params;

    tasksModel
      .findOne({ _id: id, creator: req.token.id })
      .then((result) => {
        if (result) {
          if (!result.deleted) {
            res.status(200).json(result);
          } else {
            res.status(404).json({ message: "This todo is deleted" });
          }
        } else {
          res
            .status(404)
            .json({ message: `There is no todo with this ID: ${id}` });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

const addTodo = (req, res) => {
  if (!req.token.deleted) {
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
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

const updateTodo = (req, res) => {
  if (!req.token.deleted) {
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
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

const deleteTodo = (req, res) => {
  if (!req.token.deleted) {
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
  } else {
    res.status(404).json({ message: "This user is deleted" });
  }
};

module.exports = {
  getTodos,
  getDeletedTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
