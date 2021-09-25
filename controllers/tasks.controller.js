const List = require("../models/List.model");
const Todo = require("../models/Todo.model");

module.exports.tasksController = {
  getAll: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id });
      res.json(todos);
    } catch (e) {
      console.log(e.message);
    }
  },

  getTasksByListId: async (req, res) => {
    try {
      const todos = await Todo.find({ list: req.params.listId });
      res.json(todos);
    } catch (e) {
      console.log(e.message);
    }
  },

  createTasks: async (req, res) => {
    try {
      const { list, text, completed } = req.body;
      const todo = new Todo({ list, text, completed, user: req.user.id });
      const update = { $push: { tasks: [todo] } };

      await List.updateOne({ _id: list }, update);

      await todo.save((error, data) => {
        if (error) {
          console.log("Error", error);
        }
        console.log("Save task ", data);

        res.redirect("/api/tasks");
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  updateCompletedTask: async (req, res) => {
    try {
      await Todo.update(
        { _id: req.params.id },
        { $set: { completed: req.body.completed } }
      );
      res.send("Ok");
    } catch (e) {
      console.log(e.message);
    }
  },

  updateTask: async (req, res) => {
    try {
      await Todo.update(
        { _id: req.params.id },
        { $set: { text: req.body.text } }
      );
      res.send("Ok");
    } catch (e) {
      console.log(e.message);
    }
  },

  deleteAllTasks: async (req, res) => {
    try {
      const { listId } = req.params;

      await Todo.remove({ list: listId });
      res.send("Remove ok!");
    } catch (error) {
      console.log(error);
      res.send({ message: "Error!" });
    }
  },

  deleteOneTask: async (req, res) => {
    try {
      await Todo.remove({ _id: req.params.id });
      res.send("Ok");
    } catch (e) {
      console.log(e.message);
    }
  },
};
