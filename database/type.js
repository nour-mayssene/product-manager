const mongoose = require("mongoose");
const db = require("./connect.js");
mongoose.Promise = global.Promise;

const TypeSchema = new mongoose.Schema(
  {
    name: String,
    type: { type: String, default: "Type" },
  },
  {
    timestamps: true,
  }
);

const Type = mongoose.model("Type", TypeSchema);

module.exports = Type;
