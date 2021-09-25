const { Schema, model, SchemaTypes } = require("mongoose");

const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
    list: { type: SchemaTypes.ObjectId, ref: "List" },
    user: { type: SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
