"use strict";

const express = require("express");
const router = express.Router();
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require("../models/user");

// -- LOGIN PAGE
router.get("/login", function(req, res, next) {
  res.render("auth/login");
});

/* router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
})); */

// -- SIGNUPLocalStrategy
/* router.get("/signup", function(req, res, next) {
  res.render("auth/signup", {
    errorMessage: ""
  });
});

router.post("/auth/signup", function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate an email and a password to sign up"
    });
    return;
  }

  User.findOne({"email": email}, "username", (err, user) => {
    if (email !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists"
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = User({
      email: email,
      password: hashPass
    });
    newUser.save((err) => {
      if (err) {
        next(err);
      }
      req.login(newUser, () => {
        res.redirect("/index");
      });
    });
  });
}); */

module.exports = router;
