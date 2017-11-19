"use strict";

const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Article = require("../models/article");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Your News Feed" });
});

module.exports = router;
