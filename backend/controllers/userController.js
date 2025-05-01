const User = require("../models/userModel");
const { hashPassword, comparePasswords } = require("../helperFunctions/authenticationHelper");

const signupUser = async (req, res) => {
  const { username, password, dungeonDifficulty = 1 } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ 
        success: false,
        error: "User already exists"
    });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, dungeonDifficulty });

    res.status(201).json({
        success: true,
        message: "User created",
        data: {
            username: user.username,
            dungeonDifficulty: user.dungeonDifficulty
      }
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        error: "Signup failed"
    });
  }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username }).select("+password");
      if (!user) return res.status(400).json({
        success: false,
        error: "User not found"
      });
  
      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            username: user.username
      }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Login failed"
      });
    }
};

const saveDungeonDifficulty = async (req, res) => {
    const { username, dungeonDifficulty } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { dungeonDifficulty: dungeonDifficulty },
        { new: true }
      );
      if (!user) return res.status(404).json({
        success: false,
        error: "User not found"
      });
  
      res.status(200).json({
        success: true,
      message: "Dungeon difficulty updated",
      data: {
        username: user.username,
        dungeonDifficulty: user.dungeonDifficulty
      }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Update failed"
      });
    }
};

const deleteUser = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOneAndDelete({ username });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json({
        success: true,
        message: "User deleted",
        data: {
            username: user.username,
        }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Delete failed"
      });
    }
};

module.exports = {
    signupUser,
    loginUser,
    saveDungeonDifficulty,
    deleteUser
  };
