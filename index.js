const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const app = express();
const port = 3000;

app.get("/", async (req, res, next) => {
  const body = await axios.get(
    "https://www.amazon.ca/Apple-Watch-GPS-Cellular-45mm/dp/B09HFJWY6X/ref=lp_33897839011_1_1",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        headless: true,
      },
    }
  );

  const $ = cheerio.load(body.data);
  const reviews = $(".review");
  const postTitles = [];
  reviews.each((i, review) => {
    // Find the text children
    const textReview = $(review).find(".review-text").text();
    postTitles.push(textReview);
  });

  console.log(postTitles.length);

  const sents = await SentimentData(postTitles.join(" "));
  res.json(sents);
});

const SentimentData = async (text) => {
  const result = await sentiment.analyze(text);
  return result;
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
