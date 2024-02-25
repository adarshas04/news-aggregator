const axios = require('axios');
const NodeCache = require('node-cache');

const newsCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const newsArticlesPromise = async (url) => {
  const articlesInCache = newsCache.get('cachedNewsArticles');
  if (articlesInCache) {
    return { news: articlesInCache };
  } else {
    try {
      const res = await axios.get(url);
      newsCache.set('cachedNewsArticles', res.data.articles, 600);
      return { news: res.data.articles };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { newsArticlesPromise };