const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    sno: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", userSchema);