const Sentiment = require("sentiment");
const sentiment = new Sentiment();

class SentimentService {
  constructor() {}

  async getSentiments(text) {
    const result = await sentiment.analyze(text);
    return result;
  }
}

module.exports = SentimentService;
