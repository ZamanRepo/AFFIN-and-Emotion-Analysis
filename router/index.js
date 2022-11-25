const express = require("express");

const router = express.Router();

module.exports = (params) => {
  router.get("/", async (req, res, next) => {
    try {
      return res.render("layout/index", {
        pageTitle: "Welcome",
        template: "index",
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
