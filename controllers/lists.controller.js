const List = require("../models/List.model");
const Todo = require("../models/Todo.model");

module.exports.listsController = {
  getAll: async (req, res) => {
    try {
      const lists = await List.find({ user: req.user.id });
      res.json(lists);
    } catch (e) {
      console.log(e.message);
    }
  },
  createList: async (req, res) => {
    try {
      const { title } = req.body;
      const list = new List({ title, user: req.user.id });
      await list.save((error, data) => {
        if (error) {
          console.log("Error", error);
        }
        console.log("Save list ", data);
        res.redirect("/api/lists");
      });
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteList: async (req, res) => {
    try {
      const { id } = req.params;
      await List.remove({ _id: id });
      await Todo.remove({ list: id });
      res.send("Ok");
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error!" });
    }
  },
};
