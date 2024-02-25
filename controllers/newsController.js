const { newsArticlesPromise } = require("../helpers/newsArticles");
const users = require("../user.json");

const getNews = async (req, res) => {
  try {
    if (req.user) {
      const user = users.users.find((user) => user.username === req.user.username);
      const preferences = user.newsPreferences.join('&category=');
      const newsApiKey = process.env.NEWS_API_KEY;
      const newsApiUrl = `https://newsapi.org/v2/top-headlines?category=${preferences}&country=in&apiKey=${newsApiKey}`;
      const response = await newsArticlesPromise(newsApiUrl);
      res.status(200).json(response);
    } else {
      res.status(401).send("User not authorized");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNews };