const express = require("express");
const verifyToken = require("../middlewares/authToken");
const { getPreferences, updatePreferences } = require("../controllers/preferencesController");
const { validatePreferenceParam } = require('../middlewares/validator');

const preferences = express.Router();

preferences.get("/", verifyToken, getPreferences);
preferences.put("/", validatePreferenceParam, verifyToken, updatePreferences);

module.exports = preferences;