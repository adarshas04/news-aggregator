const {default: axios} = require('axios');
const NodeCache = require('node-cache');

const newsCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
function newsArticlesPromise(url) {
    const articlesInCache = newsCache.get('cachedNewsArticles');
    if(articlesInCache) {
        return new Promise((resolve, reject) => {
            return resolve({news: articlesInCache});
        });
    }else{
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                newsCache.set('cachedNewsArticles', res.data.articles, 600);
                return resolve({news: res.data.articles});
            }).catch(err => {
                return reject(err);
            });
        })
    }
}

module.exports = { newsArticlesPromise }