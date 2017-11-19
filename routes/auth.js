const express = require("express");
const router = express.Router();

// -- LOGIN PAGE
router.get("/login", function(req, res, next) {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  console.log("sent");
});

// -- SIGNUP
router.get("/signup", function(req, res, next) {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  console.log("sent");
});

module.exports = router;
