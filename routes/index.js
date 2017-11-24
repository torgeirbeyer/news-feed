"use strict";

const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
const User = require("../models/user");
const requestToken = require("../services/twitterService").requestToken;
const queryApi = require("../services/twitterService").queryApi;
const bearerQueryApi = require("../services/twitterService").bearerQueryApi;
const Article = require("../services/twitterService");
const accessToken = null;

/* GET home page. */
router.get("/", ensureLoggedIn("auth/login"), (req, res, next) => {
  res.render("index", {
    title: "Your News Feed",
    user: req.user,
    results: null
  });
});

router.post("/", ensureLoggedIn("auth/login"), (req, res, next) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const city = req.body.city;
  if (!req.body.twitterId) {
    queryApi(req.user.token, req.user.tokenSecret, lat, lng, city, (err, results) => {
      if (err) {
        return next(err);
      }
      // console.log(results.statuses);
      res.send({
        results: results.statuses
      });
    });
  } /* else {
    requestToken(function(err, resp, body) {
      if (err) {
        throw (err);
      }
      accessToken = body; // the bearer token...
    });
    bearerQueryApi(accessToken, lat, lng, city, (err, results) => {
      if (err) {
        return next(err);
      }
      console.log(results.statuses[0].user.name);
      res.render("index", {
        title: "Your News Feed",
        user: req.user,
        results: results
      });
    });
  } */
});

router.get("/saved", ensureLoggedIn("../auth/login"), (req, res, next) => {
  const userId = req.user.id;
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
