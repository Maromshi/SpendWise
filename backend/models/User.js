const mongoose = require("mongoose");
// temp comment to force Git to track file again

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    budget: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
