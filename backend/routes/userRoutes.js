const express = require("express");
const {
  signupUser,
  loginUser,
  saveDungeonDifficulty,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/dungeon", saveDungeonDifficulty);
router.delete("/:username", deleteUser);

module.exports = router;