const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://image.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-260nw-1151124605.jpg",
    },
    lists: [{ type: SchemaTypes.ObjectId, ref: "List" }],
    todos: [{ type: SchemaTypes.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
