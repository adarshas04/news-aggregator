const express = require('express');
const verifyToken = require("../middlewares/authToken");
const {getNews} = require('../controllers/newsController');

const news = express.Router();

news.get('/', verifyToken, getNews);

module.exports = news;