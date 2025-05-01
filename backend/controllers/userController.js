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

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username }).select("+password");
      if (!user) return res.status(400).json({ error: "User not found" });
  
      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
};

const saveDungeonDifficulty = async (req, res) => {
    const { username, difficulty } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { dungeonDifficulty: difficulty },
        { new: true }
      );
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json({ message: "Dungeon difficulty updated" });
    } catch (err) {
      res.status(500).json({ error: "Update failed" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ error: "Delete failed" });
    }
};

module.exports = {
    signupUser,
    loginUser,
    saveDungeonDifficulty,
    deleteUser
  };
