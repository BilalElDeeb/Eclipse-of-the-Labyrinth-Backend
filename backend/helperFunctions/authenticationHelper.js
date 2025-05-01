const bcrypt = require("bcrypt");

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(plainPassword, salt);
    return hashedpassword;
  };

module.exports = { hashPassword, comparePasswords };