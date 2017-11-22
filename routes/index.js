"use strict";

const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const User = require("../models/user");
const requestToken = require("../twitterOauth").requestToken;
const queryApi = require("../twitterOauth").queryApi;
const Article = require("../models/article");
let bearerToken = null;

/* GET home page. */
router.get("/", ensureLoggedIn("auth/login"), (req, res, next) => {
  requestToken(function(err, resp, body) {
    if (err) {
      throw (err);
    }
    bearerToken = body; // the bearer token...
    console.log(bearerToken);
  });
  res.render("index", {
    title: "Your News Feed",
    user: req.user
  });
});

router.post("/", (req, res, next) => {
  const lat = req.body.userlat;
  const lng = req.body.userlng;
  console.log(lat, lng);
  queryApi(bearerToken);
});

router.get("/saved", ensureLoggedIn("../auth/login"), (req, res, next) => {
  const userId = req.query.id;
  // find user correspondent to the passed ID
  User.findById(userId, (err, user) => {
    if (err) {
      next(err);
    }
    const savedArticles = [];
    // for each article that belong to this user, do this
    user.articles.forEach((article) => {
      // get article properties (key value pairs)
      console.log(article);
      Article.findById(article, (err, element) => {
        if (err) {
          next(err);
        }
        // console.log(element);
        savedArticles.push({
          title: element.title,
          URL: element.URL,
          img: element.img,
          categories: element.categories,
          location: element.location
          // date: { $dateToString: { format: "%Y-%m-%d", date: "$element.date" } }
        });
      });
    });
    res.render("saved", {
      user: req.user,
      articles: savedArticles
    });
  });
});

module.exports = router;
