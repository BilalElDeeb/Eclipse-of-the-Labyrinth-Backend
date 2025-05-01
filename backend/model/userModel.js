const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    dungeonDifficulty: {
      type: Number,
      default: 1,
      required: [true, "Please add dungeon difficulty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);