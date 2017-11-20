"use strict";

const express = require("express");
const router = express.Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

/* const User = require("../models/user");
const Article = require("../models/article"); */

/* GET home page. */
router.get("/", ensureLoggedIn("auth/login"), (req, res, next) => {
  res.render("index", { title: "Your News Feed" });
});

module.exports = router;
