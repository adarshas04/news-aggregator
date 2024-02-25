const express = require("express");
const verifyToken = require("../middlewares/authToken");
const users = require("../user.json");
const preferences = express.Router();
const path = require("path");
const fs = require("fs");
const { validatePreferenceParam } = require('../helpers/validator');
const { sendResponse, fetchUserIfExists } = require('../helpers/utils');

preferences.get("/", verifyToken, (req, res) => {
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
});

preferences.put("/", validatePreferenceParam, verifyToken, (req, res) => {
    try {
        const { username } = req.user;
        const user = fetchUserIfExists(users.users, username);
        if (user) {
            user.newsPreferences = req.body.newsPreferences;
            fs.writeFile(
                path.resolve(__dirname, "../user.json"),
                JSON.stringify(users),
                { encoding: "utf8", flag: "w" },
                (err) => {
                    if (err) {
                        sendResponse(res, 500, "Write to file failed. Please try again later");
                    } else {
                        sendResponse(res, 200, { message: "User preferences updated", newsPreferences: user.newsPreferences });
                    }
                }
            );
        } else {
            sendResponse(res, 404, "User not found");
        }
    } catch (e) {
        sendResponse(res, 500, { message: e.message });
    }
});

module.exports = preferences;