const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
   
    username: {
      type: String,
      required: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
    },
    mobileNo: {
      type: String,
      required: true,
      maxLength: 15,
    },
    designation: {
      type: String,
      required: true,
      
    },
    gender: {
      type: String,
      required: true,
      
    },
    course: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    image: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Emp", employeeSchema);