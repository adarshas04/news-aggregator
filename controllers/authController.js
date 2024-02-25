const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../user.json");
const {fetchUserIfExists} = require('../helpers/utils');
const path = require("path");
const fs = require("fs");
require('dotenv').config()

const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60);

const register = async (req, res) => {
  try {
    const { name, email, username, newsPreferences, password } = req.body;
    const existingUser = fetchUserIfExists(users.users, username, email);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = {
        username,
        name,
        email,
        newsPreferences,
        password: hashedPassword
      };
      users.users.push(newUser);
      fs.writeFileSync(path.resolve(__dirname, "../user.json"), JSON.stringify(users), { encoding: "utf8", flag: "w" });
      res.status(201).send("User registered successfully");
    } else {
      res.status(400).send("User already exists. Please provide a new username and email");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = fetchUserIfExists(users.users, username);
  if (!user) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: expirationTime });
      res.json({ accessToken });
    } else {
      res.status(403).send("Invalid username or password");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };