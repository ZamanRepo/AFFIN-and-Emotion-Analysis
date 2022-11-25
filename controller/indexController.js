const ScrapService = require("../services/ScrapService");
const SentimentService = require("../services/SentimentService");

exports.get = async (req, res, next) => {
  try {
    return res.render("layout/index", {
      pageTitle: "Welcome",
      template: "index",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};

exports.post = async (req, res, next) => {
  try {
    console.log(req.body);
    const scrapService = new ScrapService(req.body.productLink);
    await scrapService.loadProductDetails();
    const sentiments = await scrapService.getReviews();

    const sentimentService = new SentimentService();

    const data = await sentimentService.getSentiments(sentiments.join(" "));

    console.log(sentiments);
    return res.render("layout/index", {
      pageTitle: "Welcome",
      template: "index",
      productUrl: req.body.productLink,
      data,
    });
  } catch (err) {
    return next(err);
  }
};
