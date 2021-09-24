const mongoose = require("mongoose");
const db = require("./connect.js");
mongoose.Promise = global.Promise;

const UsersSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    type: { type: String, default: "Users" },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
