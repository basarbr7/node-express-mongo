const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

   // Extra profile fields
  title: {
    type: string,
    default: ""
  }, 
  bio: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
});

const User = model("User", userSchema);

module.exports = User;
