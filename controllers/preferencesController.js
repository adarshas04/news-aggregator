const path = require("path");
const fs = require("fs");
const users = require("../user.json");
const { sendResponse, fetchUserIfExists } = require('../helpers/utils');

const getPreferences = (req, res) => {
  try {
    if (req.statusCode === 200) {
      const user = fetchUserIfExists(users.users, req.user.username);
      sendResponse(res, 200, { username: user.username, newsPreferences: user.newsPreferences, message: "Request successful" });
    } else {
      sendResponse(res, req.statusCode, { user: req.user, message: req.message });
    }
  } catch (e) {
    sendResponse(res, 500, { message: e.message });
  }
};

const updatePreferences = (req, res) => {
  try {
    const { username } = req.user;
    const user = fetchUserIfExists(users.users, username);
    if (user) {
      user.newsPreferences = req.body.newsPreferences;
      fs.writeFileSync(path.resolve(__dirname, "../user.json"), JSON.stringify(users), { encoding: "utf8", flag: "w" });
      sendResponse(res, 200, { message: "User preferences updated", newsPreferences: user.newsPreferences });
    } else {
      sendResponse(res, 404, "User not found");
    }
  } catch (e) {
    sendResponse(res, 500, { message: e.message });
  }
};

module.exports = { getPreferences, updatePreferences };