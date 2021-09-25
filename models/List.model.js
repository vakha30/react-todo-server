const { Schema, model, SchemaTypes } = require("mongoose");

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: SchemaTypes.ObjectId, ref: "User" },
    tasks: [{ type: SchemaTypes.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

const List = model("List", listSchema);

module.exports = List;
