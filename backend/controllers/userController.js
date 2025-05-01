const User = require("../models/userModel");
const { hashPassword, comparePasswords } = require("../helperFunctions/authenticationHelper");

const signupUser = async (req, res) => {
  const { username, password, dungeonDifficulty = 1 } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, dungeonDifficulty });

    res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

module.exports = {
    signupUser
  };
