const mongoose = require("mongoose");

// Tasks Schema
const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const tasksModel = mongoose.model("tasks", tasksSchema);

module.exports = tasksModel;
